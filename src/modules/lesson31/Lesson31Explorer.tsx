import React, { useMemo, useState } from "react";
import { Layers } from "lucide-react";
import { cn } from "../../lib/utils";
import MusculoskeletalScene from "./MusculoskeletalScene";
import { lesson31OrgansData } from "../../data/lesson31/organs";

export default function Lesson31Explorer() {
  const organs = useMemo(
    () => [...lesson31OrgansData].sort((a, b) => a.order - b.order),
    [],
  );

  const [selectedOrganId, setSelectedOrganId] = useState(organs[0].id);

  const selectedOrgan = useMemo(
    () => organs.find((o) => o.id === selectedOrganId) || organs[0],
    [organs, selectedOrganId]
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[540px] h-[540px] bg-blue-50/50 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0F8FF] rounded-full text-[#00BFFF] font-bold text-sm border border-[#E0F0FF]">
            <Layers className="w-4 h-4" />
            <span>Minh hoạ 3D</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#333] leading-[1.1]">
            Khám phá chi tiết hệ vận động
          </h2>
          <p className="text-[#666] text-lg leading-relaxed max-w-3xl">
            Sử dụng mô hình lập thể để quan sát cấu trúc của tệp xương và những lớp cơ phân bổ quanh thân người. Tương tác đa chiều để nắm rõ mối quan hệ giữa chúng.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <aside className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-6 lg:col-span-1 space-y-6">
          <h3 className="text-xl font-extrabold text-[#333]">
            Hệ cơ quan
          </h3>
          <div className="flex flex-wrap gap-2">
            {organs.map((organ) => (
              <button
                key={organ.id}
                type="button"
                onClick={() => setSelectedOrganId(organ.id)}
                aria-pressed={selectedOrganId === organ.id}
                className={cn(
                  "px-5 py-3 rounded-2xl border font-bold transition-colors w-full text-left flex justify-between items-center group",
                  selectedOrganId === organ.id
                    ? "bg-[#00BFFF] border-[#00BFFF] text-white shadow-md shadow-[#00BFFF]/20"
                    : "bg-[#F5F9FF] border-[#E0F0FF] text-[#333] hover:bg-[#EBF5FF] hover:border-[#00BFFF]/50",
                )}
              >
                <span>{organ.title}</span>
                <span className={cn(
                    "text-xs px-2 py-1 rounded-lg",
                    selectedOrganId === organ.id ? "bg-white/20 text-white" : "bg-white text-blue-500"
                )}>
                    Hiển thị 3D
                </span>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="space-y-2">
                <p className="font-bold text-slate-800 uppercase text-xs tracking-wider">Cấu tạo & Tác dụng</p>
                <p className="text-slate-600 leading-relaxed text-sm">{selectedOrgan.functionText}</p>
            </div>
            
            <div className="space-y-2 rounded-xl bg-orange-50 border border-orange-100 p-4">
                <p className="font-bold text-orange-800 uppercase text-xs tracking-wider">Bảo vệ sức khoẻ</p>
                <p className="text-orange-700 leading-relaxed text-sm">{selectedOrgan.healthNote}</p>
            </div>
          </div>
        </aside>

        <section className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-4 lg:col-span-2 min-h-[500px]">
           <MusculoskeletalScene selectedOrganId={selectedOrganId} />
        </section>
      </div>
    </div>
  );
}
