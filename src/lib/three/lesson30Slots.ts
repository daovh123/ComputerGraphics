import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LESSON30_SYSTEMS } from "../../data/lesson30/systems";

type AssetKind = "gltf" | "image" | "none";
type ResolvedAsset = { kind: AssetKind; url?: string };

type UrlGlob = Record<string, string>;

function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function getBaseName(filePath: string): string {
  const fileName = filePath.split("/").pop() ?? filePath;
  return fileName.replace(/\.(glb|gltf|png|jpg|jpeg|webp|svg|gif)$/i, "");
}

function buildUrlIndex(urls: UrlGlob): Map<string, string> {
  const index = new Map<string, string>();
  for (const [path, url] of Object.entries(urls)) {
    index.set(normalizeKey(getBaseName(path)), url);
  }
  return index;
}

const modelUrls = import.meta.glob("../../assets/3d/**/*.{glb,gltf}", {
  eager: true,
  import: "default",
  query: "?url",
}) as UrlGlob;

const imageUrls = import.meta.glob(
  "../../assets/img/**/*.{png,jpg,jpeg,webp,svg,gif}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
) as UrlGlob;

const modelsByKey = buildUrlIndex(modelUrls);
const imagesByKey = buildUrlIndex(imageUrls);

function resolveLesson30KeyFromSystemId(systemId: string): string | null {
  const system = LESSON30_SYSTEMS.find((s) => s.id === systemId);
  if (!system) return null;

  if (system.id === "giac-quan") {
    return normalizeKey("giác quan");
  }

  return normalizeKey(system.name);
}

function resolveAssetForSlot(slotIdRaw: string): ResolvedAsset {
  const slotId = slotIdRaw.trim();

  // Try direct match first (if user names assets same as slot ids).
  const directKey = normalizeKey(slotId);
  const directModel = modelsByKey.get(directKey);
  if (directModel) return { kind: "gltf", url: directModel };

  const directImage = imagesByKey.get(directKey);
  if (directImage) return { kind: "image", url: directImage };

  // Lesson 30: system/role cards use IDs; map to Vietnamese asset names.
  const systemMatch = slotId.match(/^lesson30-(system|role)-([a-z-]+)$/);
  if (systemMatch) {
    const systemId = systemMatch[2];
    const systemKey = resolveLesson30KeyFromSystemId(systemId);
    if (systemKey) {
      const modelUrl = modelsByKey.get(systemKey);
      if (modelUrl) return { kind: "gltf", url: modelUrl };

      const imageUrl = imagesByKey.get(systemKey);
      if (imageUrl) return { kind: "image", url: imageUrl };
    }
  }

  // Dedicated hero slots: show the human model when available.
  if (
    slotId === "lesson30-overview-hero" ||
    slotId === "lesson30-khai-quat-hero" ||
    slotId === "lesson30-summary-hero"
  ) {
    const humanUrl = modelsByKey.get(normalizeKey("human"));
    if (humanUrl) return { kind: "gltf", url: humanUrl };
  }

  return { kind: "none" };
}

function fitCameraToObject(
  camera: PerspectiveCamera,
  object: Object3D,
  controls?: OrbitControls,
) {
  const box = new Box3().setFromObject(object);
  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = (camera.fov * Math.PI) / 180;
  const cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * 1.25;

  camera.position.set(center.x, center.y + maxDim * 0.1, center.z + cameraZ);
  camera.near = Math.max(0.01, maxDim / 200);
  camera.far = Math.max(50, maxDim * 50);
  camera.lookAt(center);
  camera.updateProjectionMatrix();

  if (controls) {
    controls.target.copy(center);
    controls.minDistance = Math.max(0.05, cameraZ * 0.2);
    controls.maxDistance = Math.max(2, cameraZ * 12);
    controls.update();
  }
}

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    const anyChild = child as unknown as {
      geometry?: { dispose: () => void };
      material?:
        | { dispose: () => void; [key: string]: unknown }
        | Array<{ dispose: () => void; [key: string]: unknown }>;
    };

    if (anyChild.geometry) {
      anyChild.geometry.dispose();
    }

    if (!anyChild.material) {
      return;
    }

    const disposeMaterial = (mat: { dispose: () => void; [key: string]: unknown }) => {
      for (const value of Object.values(mat)) {
        const maybeTexture = value as { dispose?: () => void };
        if (maybeTexture && typeof maybeTexture.dispose === "function") {
          maybeTexture.dispose();
        }
      }
      mat.dispose();
    };

    if (Array.isArray(anyChild.material)) {
      anyChild.material.forEach(disposeMaterial);
    } else {
      disposeMaterial(anyChild.material);
    }
  });
}

function mountThreeIntoElement(el: HTMLElement, asset: ResolvedAsset): () => void {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 200);
  camera.position.set(0, 0.6, 2.6);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = false;
  controls.rotateSpeed = 0.9;
  controls.zoomSpeed = 1.0;

  scene.add(new AmbientLight(0xffffff, 0.75));
  const keyLight = new DirectionalLight(0xffffff, 0.9);
  keyLight.position.set(2, 3, 4);
  scene.add(keyLight);

  const fillLight = new DirectionalLight(0xffffff, 0.45);
  fillLight.position.set(-2, 1.5, -3);
  scene.add(fillLight);

  const canvas = renderer.domElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.style.touchAction = "none";

  const computed = window.getComputedStyle(el);
  const borderRadius = computed.borderRadius;
  if (borderRadius) {
    canvas.style.borderRadius = borderRadius;
    el.style.overflow = "hidden";
  }

  el.appendChild(canvas);

  let rootObject: Object3D | null = null;
  let cancelled = false;

  const render = () => {
    if (cancelled) return;
    renderer.render(scene, camera);
  };

  // Only render when user interacts (rotate/zoom), to keep performance reasonable.
  controls.addEventListener("change", render);

  const resize = () => {
    const rect = el.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(el);
  resize();

  const unmount = () => {
    cancelled = true;
    resizeObserver.disconnect();

    disposeObject(scene);
    rootObject = null;

    controls.dispose();
    renderer.dispose();
    if (canvas.parentElement === el) {
      el.removeChild(canvas);
    }
  };

  if (asset.kind === "gltf" && asset.url) {
    const loader = new GLTFLoader();
    loader.load(
      asset.url,
      (gltf) => {
        if (cancelled) return;
        rootObject = gltf.scene;
        scene.add(rootObject);
        fitCameraToObject(camera, rootObject, controls);
        render();
      },
      undefined,
      () => {
        if (cancelled) return;
        unmount();
      },
    );
  } else if (asset.kind === "image" && asset.url) {
    const loader = new TextureLoader();
    loader.load(
      asset.url,
      (tex) => {
        if (cancelled) return;
        tex.colorSpace = SRGBColorSpace;
        const width = (tex.image as { width?: number }).width ?? 1;
        const height = (tex.image as { height?: number }).height ?? 1;
        const aspect = width > 0 && height > 0 ? width / height : 1;

        const plane = new Mesh(
          new PlaneGeometry(aspect, 1),
          new MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0 }),
        );
        plane.position.set(0, 0, 0);
        scene.add(plane);
        fitCameraToObject(camera, plane, controls);
        render();
      },
      undefined,
      () => {
        if (cancelled) return;
        unmount();
      },
    );
  }

  return unmount;
}

export function mountLesson30ThreeSlots(root: HTMLElement): () => void {
  const mounted = new Map<
    HTMLElement,
    { slotId: string; cleanup: () => void }
  >();

  let scanScheduled = false;

  const scan = () => {
    scanScheduled = false;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(
        "[data-three-slot], [data-illustration-slot]",
      ),
    );
    const active = new Set(elements);

    for (const el of elements) {
      const slotId =
        el.getAttribute("data-three-slot") ??
        el.getAttribute("data-illustration-slot");
      if (!slotId) continue;

      const current = mounted.get(el);
      const asset = resolveAssetForSlot(slotId);

      if (asset.kind === "none") {
        if (current) {
          current.cleanup();
          mounted.delete(el);
        }
        continue;
      }

      if (current && current.slotId === slotId) {
        continue;
      }

      if (current) {
        current.cleanup();
        mounted.delete(el);
      }

      // Avoid double-mounting if something else already injected a canvas.
      if (el.querySelector("canvas")) {
        continue;
      }

      const cleanup = mountThreeIntoElement(el, asset);
      mounted.set(el, { slotId, cleanup });
    }

    // Unmount elements that no longer have slot markers.
    for (const [el, current] of mounted.entries()) {
      if (!active.has(el)) {
        current.cleanup();
        mounted.delete(el);
      }
    }
  };

  const scheduleScan = () => {
    if (scanScheduled) return;
    scanScheduled = true;
    requestAnimationFrame(scan);
  };

  scan();

  const observer = new MutationObserver(scheduleScan);
  observer.observe(root, {
    attributes: true,
    subtree: true,
    attributeFilter: ["data-three-slot", "data-illustration-slot"],
  });

  return () => {
    observer.disconnect();
    mounted.forEach((m) => m.cleanup());
    mounted.clear();
  };
}
