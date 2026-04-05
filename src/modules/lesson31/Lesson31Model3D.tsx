import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import Fullscreenable from "../../components/Fullscreenable";
import {
  lesson31Model3DData,
  lesson31ViewerTips,
  type Lesson31Model3DItem,
  type Lesson31ModelId,
} from "../../data/lesson31";

function ModelObject({
  modelPath,
  fitScale,
}: {
  modelPath: string;
  fitScale: number;
}) {
  const gltf = useGLTF(modelPath);

  const preparedScene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const box = new Box3().setFromObject(cloned);
    const size = box.getSize(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = fitScale / maxDimension;
    cloned.scale.setScalar(scale);

    const centeredBox = new Box3().setFromObject(cloned);
    const center = centeredBox.getCenter(new Vector3());
    cloned.position.set(-center.x, -center.y, -center.z);

    return cloned;
  }, [gltf.scene, fitScale]);

  return <primitive object={preparedScene} />;
}

function ModelFallback() {
  return (
    <Html center>
      <div className="px-3 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold">
        Đang tải mô hình 3D...
      </div>
    </Html>
  );
}

function ModelSelector({
  items,
  selectedId,
  onSelect,
}: {
  items: Lesson31Model3DItem[];
  selectedId: Lesson31ModelId;
  onSelect: (id: Lesson31ModelId) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((item) => {
        const isActive = item.id === selectedId;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`text-left rounded-2xl border p-4 transition-all ${
              isActive
                ? "border-[#00BFFF] bg-[#F0F9FF] shadow-sm"
                : "border-[#DDEBFF] bg-white hover:border-[#7DD3FC] hover:shadow-sm"
            }`}
          >
            <p className="text-base font-extrabold text-[#1F2937]">{item.label}</p>
            <p className="mt-1 text-sm text-[#64748B]">{item.cardDescription}</p>
          </button>
        );
      })}
    </div>
  );
}

function ModelInfoPanel({ model }: { model: Lesson31Model3DItem }) {
  return (
    <aside className="bg-white border border-[#E0F0FF] rounded-2xl p-5 space-y-4">
      <div>
        <h3 className="text-2xl font-extrabold text-[#1F2937]">{model.title}</h3>
        <p className="text-sm font-semibold text-[#0284C7]">{model.subtitle}</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Mô tả</p>
        <p className="mt-1 text-sm text-[#475569] leading-relaxed">{model.description}</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Điểm cần chú ý</p>
        <ul className="mt-2 space-y-1.5 text-sm text-[#475569]">
          {model.highlights.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Gợi ý quan sát</p>
        <ul className="mt-2 space-y-1.5 text-sm text-[#475569]">
          {model.observationTips.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-[#F0F9FF] border-l-4 border-[#0ea5e9] p-3">
        <p className="text-xs uppercase tracking-wider font-bold text-[#0369A1]">Ghi nhớ</p>
        <p className="mt-1 text-sm font-semibold text-[#0F172A]">{model.remember}</p>
      </div>
    </aside>
  );
}

export default function Lesson31Model3D() {
  const [selectedModelId, setSelectedModelId] = useState<Lesson31ModelId>("skeleton");
  const [viewerKey, setViewerKey] = useState(0);

  const selectedModel =
    lesson31Model3DData.find((item) => item.id === selectedModelId) || lesson31Model3DData[0];

  return (
    <section className="bg-white border border-[#E0F0FF] rounded-3xl p-5 md:p-6 shadow-sm space-y-5">
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold text-[#1F2937]">Khám phá mô hình 3D hệ vận động</h2>
        <p className="text-sm md:text-base text-[#556070] leading-relaxed max-w-4xl">
          Quan sát các mô hình 3D để hiểu rõ hơn cấu tạo và vai trò của xương, cơ và toàn bộ hệ vận động.
        </p>
      </header>

      <ModelSelector
        items={lesson31Model3DData}
        selectedId={selectedModel.id}
        onSelect={(id) => {
          setSelectedModelId(id);
          setViewerKey(0);
        }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)] gap-5 items-start">
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-[#64748B] font-medium">
              Kéo chuột để xoay, lăn chuột để phóng to hoặc thu nhỏ mô hình.
            </p>
            <button
              onClick={() => setViewerKey((prev) => prev + 1)}
              className="px-3 py-2 rounded-xl border border-[#D7E8FF] bg-white text-sm font-semibold text-[#1F2937] hover:bg-[#F5FAFF]"
            >
              Reset góc nhìn
            </button>
          </div>

          <Fullscreenable className="w-full h-[380px] md:h-[520px] xl:h-[580px] rounded-2xl overflow-hidden border border-[#DDEBFF] bg-gradient-to-b from-[#F5FAFF] to-[#EBF4FF]">
            <Canvas
              key={`${selectedModel.id}-${viewerKey}`}
              camera={{ position: selectedModel.cameraPosition, fov: 46 }}
            >
              <ambientLight intensity={0.72} />
              <directionalLight position={[4, 5, 4]} intensity={1.15} />
              <directionalLight position={[-3, 2, -3]} intensity={0.55} />

              <Suspense fallback={<ModelFallback />}>
                <ModelObject modelPath={selectedModel.modelPath} fitScale={selectedModel.fitScale} />
              </Suspense>

              <OrbitControls
                enableDamping
                dampingFactor={0.08}
                minDistance={selectedModel.minDistance}
                maxDistance={selectedModel.maxDistance}
              />
            </Canvas>
          </Fullscreenable>
        </div>

        <ModelInfoPanel model={selectedModel} />
      </div>

      <div className="rounded-2xl border border-[#E5EEF8] bg-[#F8FAFC] p-4 md:p-5">
        <h3 className="text-lg font-bold text-[#1F2937]">Em cần chú ý</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-[#475569]">
          {lesson31ViewerTips.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
