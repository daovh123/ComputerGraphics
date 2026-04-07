import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Box3, Group, PerspectiveCamera, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { cn } from "../../../lib/utils";
import angiologyModelUrl from "../assets/angiology.glb?url";

const ANGIOLOGY_MODEL_PATH = angiologyModelUrl;
const HIDDEN_NODE_NAME_PATTERNS = [/^labelgroup/i, /^label/i];
const MODEL_SCALE_FACTOR = 0.9;

let cachedAngiologySource: Group | null = null;
let cachedAngiologyPromise: Promise<Group> | null = null;

function prepareScene(scene: Group) {
  scene.traverse((child) => {
    if (
      HIDDEN_NODE_NAME_PATTERNS.some((pattern) => pattern.test(child.name))
    ) {
      child.visible = false;
    }

    if ("castShadow" in child) {
      child.castShadow = true;
    }

    if ("receiveShadow" in child) {
      child.receiveShadow = true;
    }
  });

  return scene;
}

function loadAngiologySource() {
  if (cachedAngiologySource) {
    return Promise.resolve(cachedAngiologySource);
  }

  if (cachedAngiologyPromise) {
    return cachedAngiologyPromise;
  }

  const loader = new GLTFLoader();

  cachedAngiologyPromise = new Promise<Group>((resolve, reject) => {
    loader.load(
      ANGIOLOGY_MODEL_PATH,
      (gltf) => {
        const prepared = prepareScene(gltf.scene as Group);
        cachedAngiologySource = prepared;
        resolve(prepared);
      },
      undefined,
      (error) => {
        cachedAngiologyPromise = null;
        reject(error);
      },
    );
  });

  return cachedAngiologyPromise;
}

export function preloadAngiologyModel() {
  void loadAngiologySource();
}

function useAngiologyModel() {
  const [model, setModel] = useState<Group | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let mounted = true;

    setStatus("loading");

    loadAngiologySource()
      .then((scene) => {
        if (!mounted) {
          return;
        }

        setModel(clone(scene) as Group);
        setStatus("ready");
      })
      .catch(() => {
        if (!mounted) {
          return;
        }

        setModel(null);
        setStatus("error");
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { model, status };
}

function FittedModel({ model }: { model: Group }) {
  const { camera, size } = useThree();

  const fitted = useMemo(() => {
    const box = new Box3().setFromObject(model);
    const modelSize = new Vector3();
    const center = new Vector3();

    box.getSize(modelSize);
    box.getCenter(center);

    const perspectiveCamera = camera as PerspectiveCamera;
    const distance = Math.abs(perspectiveCamera.position.z);
    const verticalFov = (perspectiveCamera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(verticalFov / 2) * distance;
    const visibleWidth = visibleHeight * (size.width / size.height);
    const heightScale = (visibleHeight * 0.88) / (modelSize.y || 1);
    const widthScale = (visibleWidth * 0.78) / (modelSize.x || 1);
    const depthScale = 2.8 / (modelSize.z || 1);
    const scale =
      Math.min(heightScale, widthScale, depthScale) * MODEL_SCALE_FACTOR;

    return {
      object: model,
      position: [-center.x * scale, -center.y * scale, -center.z * scale] as [
        number,
        number,
        number,
      ],
      scale,
    };
  }, [camera, model, size.height, size.width]);

  return (
    <group rotation={[0, -0.12, 0]}>
      <primitive
        object={fitted.object}
        scale={fitted.scale}
        position={fitted.position}
      />
    </group>
  );
}

function AutoRotateOrbitControls() {
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const resumeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const pauseAutoRotate = () => {
    setIsAutoRotating(false);

    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
  };

  const resumeAutoRotateSoon = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoRotating(true);
    }, 2200);
  };

  return (
    <OrbitControls
      enablePan={false}
      minDistance={2.8}
      maxDistance={6}
      autoRotate={isAutoRotating}
      autoRotateSpeed={0.55}
      onStart={pauseAutoRotate}
      onEnd={resumeAutoRotateSoon}
      onChange={() => {
        if (!isAutoRotating) {
          resumeAutoRotateSoon();
        }
      }}
    />
  );
}

export default function AngiologyViewer({
  className,
}: {
  className?: string;
}) {
  const { model, status } = useAngiologyModel();

  return (
    <div
      className={cn(
        "h-[clamp(22rem,calc(100vh-18rem),32rem)] w-full overflow-hidden",
        className,
      )}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 34 }}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 5, 4]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.45} />

        {model ? <FittedModel model={model} /> : null}

        {status === "loading" ? (
          <Html center>
            <div className="rounded-full bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white">
              Đang tải mô hình tuần hoàn...
            </div>
          </Html>
        ) : null}

        {status === "error" ? (
          <Html center>
            <div className="rounded-full bg-[#7F1D1D] px-4 py-2 text-xs font-semibold text-white">
              Không tải được mô hình.
            </div>
          </Html>
        ) : null}

        <AutoRotateOrbitControls />
      </Canvas>
    </div>
  );
}
