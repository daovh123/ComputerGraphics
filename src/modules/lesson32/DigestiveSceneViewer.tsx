import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Group, Box3, Vector3 } from "three";
import Fullscreenable from "../../components/Fullscreenable";
import { resolveOrganModel } from "../../lib/three/lesson32Slots";

interface DigestiveSceneViewerProps {
  modelName?: string;
}

function normalizeModelScale(model: Group): number {
  const box = new Box3().setFromObject(model);
  const size = box.getSize(new Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 1 / maxDim;
  return scale;
}

function useDigestiveSystemModel(modelName: string) {
  const [model, setModel] = useState<Group | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const resolved = resolveOrganModel(modelName);
    if (!resolved.available || !resolved.url) {
      setStatus("error");
      return;
    }

    let mounted = true;
    const loader = new GLTFLoader();
    setStatus("loading");

    loader.load(
      resolved.url,
      (gltf) => {
        if (!mounted) return;
        const clonedScene = gltf.scene.clone();
        
        // Normalize scale
        const scale = normalizeModelScale(clonedScene);
        clonedScene.scale.set(scale, scale, scale);
        
        // Center model
        const box = new Box3().setFromObject(clonedScene);
        const center = box.getCenter(new Vector3());
        clonedScene.position.sub(center);
        
        setModel(clonedScene);
        setStatus("ready");
      },
      undefined,
      (error) => {
        if (!mounted) return;
        console.error("Error loading model:", error);
        setStatus("error");
      },
    );

    return () => {
      mounted = false;
    };
  }, [modelName]);

  return { model, status };
}

function DigestiveSystemModel({ modelName }: { modelName: string }) {
  const { model } = useDigestiveSystemModel(modelName);

  if (!model) return null;

  return (
    <group>
      <primitive object={model} />
    </group>
  );
}

export default function DigestiveSceneViewer({
  modelName = "he-tieu-hoa",
}: DigestiveSceneViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Fullscreenable className="w-full h-full bg-gradient-to-b from-[#f8fbff] to-[#eef7ff] rounded-3xl border border-[#E0F0FF] overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 3.5], fov: 50 }} 
        shadows
        onCreated={() => setIsLoading(false)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} castShadow />
        <directionalLight position={[-3, 2, -3]} intensity={0.6} />
        
        <DigestiveSystemModel modelName={modelName} />

        {isLoading && (
          <Html center>
            <div className="px-3 py-1 rounded-lg bg-[#0f172a] text-white text-xs font-semibold">
              Đang tải...
            </div>
          </Html>
        )}

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          maxDistance={8}
          minDistance={0.5}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
    </Fullscreenable>
  );
}
