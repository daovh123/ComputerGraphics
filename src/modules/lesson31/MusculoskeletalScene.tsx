import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF } from "@react-three/drei";
import { resolveOrganModel } from "../../lib/three/lesson31Slots";

type ModelStatus = "loading" | "ready" | "error";

interface MusculoskeletalSceneProps {
  selectedOrganId: string;
  onModelStatusChange?: (status: ModelStatus) => void;
}

function OrganModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function MusculoskeletalScene({
  selectedOrganId,
  onModelStatusChange,
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
    <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-[#D8EFFF] bg-[#F5F9FF] relative cursor-move">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <OrganModel key={modelUrl} url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} />
      </Canvas>

      <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
        <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm">
          Xoay, thu phóng để tương tác với mô hình
        </span>
      </div>
    </div>
  );
}
