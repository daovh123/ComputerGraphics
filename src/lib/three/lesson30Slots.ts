import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
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
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

const KEY_ALIASES: Record<string, string[]> = {
  [normalizeKey("human")]: [normalizeKey("nguoi")],

  // Lesson 30: mapping for sense-related assets.
  [normalizeKey("giác quan")]: [normalizeKey("đầu (tai, mắt, mũi, miệng)")],
  [normalizeKey("các giác quan")]: [
    normalizeKey("đầu (tai, mắt, mũi, miệng)"),
  ],
  [normalizeKey("tai")]: [normalizeKey("đầu (tai, mắt, mũi, miệng)")],
  [normalizeKey("mũi")]: [normalizeKey("đầu (tai, mắt, mũi, miệng)")],
  [normalizeKey("mắt")]: [normalizeKey("đầu (tai, mắt, mũi, miệng)")],
  [normalizeKey("miệng")]: [normalizeKey("đầu (tai, mắt, mũi, miệng)")],
  [normalizeKey("lưỡi/miệng")]: [
    normalizeKey("đầu (tai, mắt, mũi, miệng)"),
  ],
  [normalizeKey("da")]: [normalizeKey("da_nguoi")],
  [normalizeKey("da/tay")]: [normalizeKey("da_nguoi")],

  // Lesson 30: reproductive system uses a combined PNG (no 3D).
  [normalizeKey("hệ sinh dục")]: [normalizeKey("cơ quan sinh dục nam + nữ")],
  [normalizeKey("sinh dục")]: [normalizeKey("cơ quan sinh dục nam + nữ")],
  [normalizeKey("sinh duc")]: [normalizeKey("cơ quan sinh dục nam + nữ")],
  [normalizeKey("cơ quan sinh dục")]: [
    normalizeKey("cơ quan sinh dục nam + nữ"),
  ],
  [normalizeKey("cơ quan sinh dục nam")]: [
    normalizeKey("cơ quan sinh dục nam + nữ"),
  ],
  [normalizeKey("cơ quan sinh dục nữ")]: [
    normalizeKey("cơ quan sinh dục nam + nữ"),
  ],

  // Lesson 30: organ aliases for available models.
  [normalizeKey("não bộ")]: [normalizeKey("nao_nguoi")],
  [normalizeKey("khí quản")]: [normalizeKey("khí quản, phế quản, phổi")],
  [normalizeKey("phế quản")]: [normalizeKey("khí quản, phế quản, phổi")],
  [normalizeKey("phổi")]: [normalizeKey("khí quản, phế quản, phổi")],
  [normalizeKey("ruột non")]: [
    normalizeKey("ruột non, ruột già , trực tràng"),
  ],
  [normalizeKey("ruột già")]: [
    normalizeKey("ruột non, ruột già , trực tràng"),
  ],
  [normalizeKey("trực tràng")]: [
    normalizeKey("ruột non, ruột già , trực tràng"),
  ],
};

function resolveAssetByKey(key: string): ResolvedAsset {
  const modelUrl = modelsByKey.get(key);
  if (modelUrl) return { kind: "gltf", url: modelUrl };

  const imageUrl = imagesByKey.get(key);
  if (imageUrl) return { kind: "image", url: imageUrl };

  return { kind: "none" };
}

function resolveAssetByKeyPreferImage(key: string): ResolvedAsset {
  const imageUrl = imagesByKey.get(key);
  if (imageUrl) return { kind: "image", url: imageUrl };

  const modelUrl = modelsByKey.get(key);
  if (modelUrl) return { kind: "gltf", url: modelUrl };

  return { kind: "none" };
}

function resolveAssetByKeyWithAliases(key: string): ResolvedAsset {
  const direct = resolveAssetByKey(key);
  if (direct.kind !== "none") return direct;

  const aliases = KEY_ALIASES[key];
  if (!aliases) return { kind: "none" };

  for (const aliasKey of aliases) {
    const resolved = resolveAssetByKey(aliasKey);
    if (resolved.kind !== "none") return resolved;
  }

  return { kind: "none" };
}

function resolveAssetByKeyWithAliasesPreferImage(key: string): ResolvedAsset {
  const direct = resolveAssetByKeyPreferImage(key);
  if (direct.kind !== "none") return direct;

  const aliases = KEY_ALIASES[key];
  if (!aliases) return { kind: "none" };

  for (const aliasKey of aliases) {
    const resolved = resolveAssetByKeyPreferImage(aliasKey);
    if (resolved.kind !== "none") return resolved;
  }

  return { kind: "none" };
}

function resolveLesson30ReproductiveAsset(): ResolvedAsset {
  const candidates = [
    normalizeKey("cơ quan sinh dục nam + nữ"),
    normalizeKey("cơ quan sinh dục"),
    normalizeKey("hệ sinh dục"),
    normalizeKey("sinh dục"),
    normalizeKey("sinh duc"),
  ];

  for (const key of candidates) {
    const resolved = resolveAssetByKeyWithAliasesPreferImage(key);
    if (resolved.kind === "image") return resolved;
  }

  return { kind: "none" };
}

function resolveLesson30SystemAsset(systemId: string): ResolvedAsset {
  if (normalizeKey(systemId) === normalizeKey("sinh duc")) {
    return resolveLesson30ReproductiveAsset();
  }

  const system = LESSON30_SYSTEMS.find((s) => s.id === systemId);
  if (!system) {
    return resolveAssetByKeyWithAliases(normalizeKey(systemId));
  }

  const candidates = new Set<string>();
  candidates.add(normalizeKey(system.name));
  candidates.add(normalizeKey(system.id));

  const withoutPrefix = system.name.replace(/^hệ\s+/i, "");
  if (withoutPrefix !== system.name) {
    candidates.add(normalizeKey(withoutPrefix));
  }

  if (system.id === "giac-quan") {
    candidates.add(normalizeKey("giác quan"));
    candidates.add(normalizeKey("các giác quan"));
    candidates.add(normalizeKey("đầu (tai, mắt, mũi, miệng)"));
  }

  for (const key of candidates) {
    const resolved = resolveAssetByKeyWithAliases(key);
    if (resolved.kind !== "none") return resolved;
  }

  return { kind: "none" };
}

function resolveLesson30HumanAsset(): ResolvedAsset {
  // Keep `human` as a stable key; it aliases to `nguoi` if needed.
  const resolved = resolveAssetByKeyWithAliases(normalizeKey("human"));
  if (resolved.kind !== "none") return resolved;
  return resolveAssetByKeyWithAliases(normalizeKey("nguoi"));
}

function resolveAssetForSlot(slotIdRaw: string): ResolvedAsset {
  const slotId = slotIdRaw.trim();

  // Try direct match first (if user names assets same as slot ids).
  const directKey = normalizeKey(slotId);
  const directResolved = resolveAssetByKeyWithAliases(directKey);
  if (directResolved.kind !== "none") return directResolved;

  // Lesson 30: organ selector pattern, with fallback to system/human.
  const organMatch = slotId.match(/^lesson30-organ-([a-z-]+):(.+)$/);
  if (organMatch) {
    const systemId = organMatch[1];
    const organLabel = organMatch[2];

    if (normalizeKey(systemId) === normalizeKey("sinh duc")) {
      const reproResolved = resolveLesson30ReproductiveAsset();
      if (reproResolved.kind !== "none") return reproResolved;
      return { kind: "none" };
    }

    const organKey = normalizeKey(organLabel);

    const organResolved = resolveAssetByKeyWithAliases(organKey);
    if (organResolved.kind !== "none") return organResolved;

    const systemResolved = resolveLesson30SystemAsset(systemId);
    if (systemResolved.kind !== "none") return systemResolved;

    const humanResolved = resolveLesson30HumanAsset();
    if (humanResolved.kind !== "none") return humanResolved;
  }

  // Lesson 30: system/role cards use IDs; map to Vietnamese asset names.
  const systemMatch = slotId.match(/^lesson30-(system|role)-([a-z-]+)$/);
  if (systemMatch) {
    const systemId = systemMatch[2];

    if (normalizeKey(systemId) === normalizeKey("sinh duc")) {
      const reproResolved = resolveLesson30ReproductiveAsset();
      if (reproResolved.kind !== "none") return reproResolved;
      return { kind: "none" };
    }

    const systemResolved = resolveLesson30SystemAsset(systemId);
    if (systemResolved.kind !== "none") return systemResolved;

    const humanResolved = resolveLesson30HumanAsset();
    if (humanResolved.kind !== "none") return humanResolved;
  }

  // Lesson 30: Overview (Khái quát)
  // Avoid showing the exact same human model in both cards.
  if (slotId === "lesson30-khai-quat-parts") {
    const humanResolved = resolveLesson30HumanAsset();
    if (humanResolved.kind !== "none") return humanResolved;
  }

  if (slotId === "lesson30-khai-quat-layers") {
    // Default to skin if available; fallback to human.
    const skinResolved = resolveAssetByKeyWithAliases(normalizeKey("da"));
    if (skinResolved.kind !== "none") return skinResolved;

    const humanResolved = resolveLesson30HumanAsset();
    if (humanResolved.kind !== "none") return humanResolved;
  }

  // Dedicated hero slots: show the human model when available.
  if (
    slotId === "lesson30-overview-hero" ||
    slotId === "lesson30-khai-quat-hero" ||
    slotId === "lesson30-summary-hero" ||
    slotId === "lesson30-overview-body"
  ) {
    const humanResolved = resolveLesson30HumanAsset();
    if (humanResolved.kind !== "none") return humanResolved;
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
  if (asset.kind === "image" && asset.url) {
    const img = document.createElement("img");
    img.src = asset.url;
    img.alt = "";
    img.decoding = "async";
    img.loading = "lazy";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.display = "block";
    img.style.objectFit = "contain";
    img.style.pointerEvents = "none";
    img.setAttribute("data-lesson30-asset", "img");

    const computed = window.getComputedStyle(el);
    const borderRadius = computed.borderRadius;
    if (borderRadius) {
      img.style.borderRadius = borderRadius;
      el.style.overflow = "hidden";
    }

    el.appendChild(img);

    return () => {
      if (img.parentElement === el) {
        el.removeChild(img);
      }
    };
  }

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

      // Avoid double-mounting if something else already injected an asset.
      if (el.querySelector("canvas, [data-lesson30-asset]")) {
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
