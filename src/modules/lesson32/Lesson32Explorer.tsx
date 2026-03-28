import React, { useMemo, useState } from "react";
import DigestiveScene from "./DigestiveScene";
import { lesson32OrgansData } from "../../features/lesson32/data/organs";

export default function Lesson32Explorer() {
  const organs = useMemo(
    () => [...lesson32OrgansData].sort((a, b) => a.order - b.order),
    [],
  );
  const [selectedOrganId, setSelectedOrganId] = useState(organs[0].id);
  const [modelStatus, setModelStatus] = useState<
    "loading" | "ready" | "fallback"
  >("loading");

  const selectedIndex = useMemo(
    () => organs.findIndex((organ) => organ.id === selectedOrganId),
    [organs, selectedOrganId],
  );

  const selectedOrgan = selectedIndex >= 0 ? organs[selectedIndex] : organs[0];
  const foodPathOrgans = useMemo(
    () => organs.filter((organ) => organ.isFoodPath),
    [organs],
  );
  const supportOrgans = useMemo(
    () => organs.filter((organ) => !organ.isFoodPath),
    [organs],
  );

  const goToNextOrgan = () => {
    const nextIndex = (selectedIndex + 1 + organs.length) % organs.length;
    setSelectedOrganId(organs[nextIndex].id);
  };

  const goToPreviousOrgan = () => {
    const prevIndex = (selectedIndex - 1 + organs.length) % organs.length;
    setSelectedOrganId(organs[prevIndex].id);
  };

  const resetSelection = () => {
    setSelectedOrganId(organs[0].id);
  };

  const modelStatusText =
    modelStatus === "ready"
      ? "Model 3D san sang"
      : modelStatus === "fallback"
        ? "Dang dung fallback de demo logic"
        : "Dang tai model 3D";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <section className="xl:col-span-8 space-y-4">
        <DigestiveScene
          selectedOrganId={selectedOrganId}
          onSelectOrgan={setSelectedOrganId}
          onModelStatusChange={setModelStatus}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <button
            onClick={goToPreviousOrgan}
            className="px-4 py-2.5 rounded-xl border border-[#D6E7FF] bg-white text-[#1F2937] text-sm font-semibold hover:bg-[#F5FAFF]"
          >
            Co quan truoc
          </button>
          <button
            onClick={goToNextOrgan}
            className="px-4 py-2.5 rounded-xl border border-[#D6E7FF] bg-white text-[#1F2937] text-sm font-semibold hover:bg-[#F5FAFF]"
          >
            Co quan tiep theo
          </button>
          <button
            onClick={resetSelection}
            className="px-4 py-2.5 rounded-xl border border-[#BEE3D8] bg-[#F0FFF6] text-[#22543D] text-sm font-semibold hover:bg-[#E4FAEE]"
          >
            Reset lua chon
          </button>
        </div>

        <div className="bg-white border border-[#E0F0FF] rounded-2xl p-4 space-y-3">
          <p className="text-sm text-[#556070]">
            Bam vao co quan trong scene de highlight va xem thong tin ngan gon.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#334155]">
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0ea5e9]" />
              Dang duoc chon
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
              Co quan thuc an di qua
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              Co quan ho tro tieu hoa
            </span>
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              {modelStatusText}
            </span>
          </div>
        </div>
      </section>

      <aside className="xl:col-span-4 bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-[#333]">
            {selectedOrgan.title}
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Co quan {selectedIndex + 1}/7
          </p>
          <p className="text-xs font-semibold text-[#0F766E]">
            Nhom:{" "}
            {selectedOrgan.isFoodPath ? "Thuc an di qua" : "Co quan ho tro"}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#00BFFF]">
            Chức năng
          </p>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            {selectedOrgan.functionText}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#00BFFF]">
            Tiêu hóa cơ học / hóa học
          </p>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            {selectedOrgan.digestionText}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#00BFFF]">
            Lưu ý sức khỏe
          </p>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            {selectedOrgan.healthNote}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#00BFFF]">
            Co quan thuc an di qua
          </p>
          <div className="flex flex-wrap gap-2">
            {foodPathOrgans.map((organ) => (
              <span
                key={organ.id}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ECFDF3] text-[#166534]"
              >
                {organ.shortLabel}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#00BFFF]">
            Co quan ho tro tieu hoa
          </p>
          <div className="flex flex-wrap gap-2">
            {supportOrgans.map((organ) => (
              <span
                key={organ.id}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FFF7ED] text-[#9A3412]"
              >
                {organ.shortLabel}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-2">
          {organs.map((organ) => (
            <button
              key={organ.id}
              onClick={() => setSelectedOrganId(organ.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedOrgan.id === organ.id
                  ? "bg-[#00BFFF] text-white"
                  : "bg-[#F5F9FF] text-[#4A5568] hover:bg-[#E7F3FF]"
              }`}
            >
              {organ.shortLabel}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
