import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF } from "@react-three/drei";
import { resolveOrganModel } from "../../lib/three/lesson31Slots";
import { lesson31BonesData } from "../../data/lesson31/bones";
import * as THREE from "three";

type ModelStatus = "loading" | "ready" | "error";

interface MusculoskeletalSceneProps {
  selectedOrganId: string;
  onModelStatusChange?: (status: ModelStatus) => void;
  onPartClick?: (partId: string) => void;
}

function OrganModel({ url, onPartClick }: { url: string; onPartClick?: (partId: string) => void }) {
  const { scene } = useGLTF(url);

  // Clone scene và tách riêng material cho từng mesh để khi đổi emissive không bị dính toàn bộ
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });
    return clone;
  }, [scene]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    const object = e.object as THREE.Mesh;
    if (object.name && lesson31BonesData[object.name]) {
      document.body.style.cursor = "pointer";
      if (object.material instanceof THREE.MeshStandardMaterial) {
        object.material.emissive.setHex(0x33ccff);
        object.material.emissiveIntensity = 0.6;
      }
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    const object = e.object as THREE.Mesh;
    if (object.name && lesson31BonesData[object.name]) {
      document.body.style.cursor = "auto";
      if (object.material instanceof THREE.MeshStandardMaterial) {
        object.material.emissive.setHex(0x000000);
      }
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    const object = e.object as THREE.Mesh;
    if (object.name && lesson31BonesData[object.name]) {
      onPartClick?.(object.name);
    }
  };

  return (
    <primitive
      object={clonedScene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}

export default function MusculoskeletalScene({
  selectedOrganId,
  onModelStatusChange,
  onPartClick,
}: MusculoskeletalSceneProps) {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    onModelStatusChange?.("loading");
    const resolved = resolveOrganModel(selectedOrganId);
    if (resolved.available && resolved.url) {
      setModelUrl(resolved.url);
      onModelStatusChange?.("ready");
    } else {
      setModelUrl(null);
      onModelStatusChange?.("error");
    }
  }, [selectedOrganId, onModelStatusChange]);

  if (!modelUrl) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-50 text-slate-400 rounded-3xl border border-[#E0F0FF]">
        Không tìm thấy mô hình 3D cho khu vực này.
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-[#D8EFFF] bg-[#F5F9FF] relative">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <OrganModel key={modelUrl} url={modelUrl} onPartClick={onPartClick} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>

      <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
        <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm">
          Xoay, thu phóng để tương tác với mô hình
        </span>
      </div>
    </div>
  );
}
