import React from "react";
import type { Lesson31PartItem } from "../../data/lesson31";

interface PartDetailProps {
  selectedPart: Lesson31PartItem | null;
}

const systemLabel: Record<Lesson31PartItem["system"], string> = {
  muscle: "Hệ cơ",
  skeleton: "Hệ xương",
};

const sideLabel: Record<Lesson31PartItem["side"], string> = {
  front: "Mặt trước",
  back: "Mặt sau",
};

export default function PartDetail({ selectedPart }: PartDetailProps) {
  if (!selectedPart) {
    return (
      <div className="rounded-xl border border-[#E0F0FF] bg-white p-4 min-h-[180px] flex items-center justify-center">
        <p className="text-sm text-[#64748B] font-medium">Hãy chọn một bộ phận.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#E0F0FF] bg-white p-4 space-y-3">
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold text-[#1F2937]">{selectedPart.name}</h3>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-[#ECFEFF] text-[#0E7490]">
            Hệ: {systemLabel[selectedPart.system]}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8]">
            Vị trí: {sideLabel[selectedPart.side]}
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Mô tả</p>
        <p className="text-sm text-[#475569]">{selectedPart.description}</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Cấu tạo / đặc điểm</p>
        <p className="text-sm text-[#475569]">{selectedPart.structure}</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Chức năng</p>
        <p className="text-sm text-[#475569]">{selectedPart.function}</p>
      </div>

      <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
        <p className="text-xs uppercase tracking-wider font-bold text-[#475569]">Gợi ý cho học sinh lớp 8</p>
        <p className="text-sm text-[#475569]">{selectedPart.note}</p>
      </div>
    </div>
  );
}
