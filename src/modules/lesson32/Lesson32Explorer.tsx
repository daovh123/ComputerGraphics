import React, { useMemo, useState } from "react";
import DigestiveScene from "./DigestiveScene";
import { lesson32Organs } from "./content";

export default function Lesson32Explorer() {
  const [selectedOrganId, setSelectedOrganId] = useState(lesson32Organs[0].id);

  const selectedOrgan = useMemo(
    () =>
      lesson32Organs.find((organ) => organ.id === selectedOrganId) ||
      lesson32Organs[0],
    [selectedOrganId],
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <section className="xl:col-span-8 space-y-4">
        <DigestiveScene
          selectedOrganId={selectedOrganId}
          onSelectOrgan={setSelectedOrganId}
        />
        <div className="bg-white border border-[#E0F0FF] rounded-2xl p-4 text-sm text-[#556070]">
          Bấm vào cơ quan trong mô hình để highlight và mở thông tin.
        </div>
      </section>

      <aside className="xl:col-span-4 bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-5">
        <h2 className="text-2xl font-extrabold text-[#333]">
          {selectedOrgan.name}
        </h2>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#00BFFF]">
            Chức năng
          </p>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            {selectedOrgan.role}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#00BFFF]">
            Tiêu hóa cơ học / hóa học
          </p>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            {selectedOrgan.mechanicalChemical}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-[#00BFFF]">
            Lưu ý sức khỏe
          </p>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            {selectedOrgan.healthTip}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-2">
          {lesson32Organs.map((organ) => (
            <button
              key={organ.id}
              onClick={() => setSelectedOrganId(organ.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedOrgan.id === organ.id
                  ? "bg-[#00BFFF] text-white"
                  : "bg-[#F5F9FF] text-[#4A5568] hover:bg-[#E7F3FF]"
              }`}
            >
              {organ.name}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
