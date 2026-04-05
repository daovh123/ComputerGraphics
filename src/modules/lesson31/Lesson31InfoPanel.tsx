import React from "react";
import type { BodyPart } from "../../data/lesson31";

interface Lesson31InfoPanelProps {
  selectedPart: BodyPart | null;
}

const systemLabel: Record<BodyPart["system"], string> = {
  muscle: "Hệ cơ",
  skeleton: "Hệ xương",
};

const viewLabel: Record<BodyPart["view"], string> = {
  front: "Mặt trước",
  back: "Mặt sau",
};

export default function Lesson31InfoPanel({ selectedPart }: Lesson31InfoPanelProps) {
  if (!selectedPart) {
    return (
      <aside className="bg-white border border-[#E0F0FF] rounded-2xl p-4 min-h-[300px] flex items-center justify-center text-center">
        <p className="text-[#64748B] font-medium">Hãy chọn một bộ phận trên hình.</p>
      </aside>
    );
  }

  return (
    <aside className="bg-white border border-[#E0F0FF] rounded-2xl p-4 min-h-[300px] space-y-3.5">
      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-[#1F2937]">{selectedPart.name}</h3>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-[#ECFEFF] text-[#0E7490]">
            Nhóm: {systemLabel[selectedPart.system]}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8]">
            Vị trí: {viewLabel[selectedPart.view]}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Mô tả cấu tạo</p>
        <p className="text-sm text-[#475569] leading-relaxed">{selectedPart.shortDescription}</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Chức năng chính</p>
        <p className="text-sm text-[#475569] leading-relaxed">{selectedPart.function}</p>
      </div>

      <div className="space-y-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
        <p className="text-xs uppercase tracking-wider font-bold text-[#475569]">Gợi ý cho học sinh lớp 8</p>
        <p className="text-sm text-[#475569] leading-relaxed">{selectedPart.gradeLevelNote}</p>
      </div>
    </aside>
  );
}
