import React, { useEffect, useState } from "react";
import { ChevronRight, Layers } from "lucide-react";
import { type View } from "../../router/views";
import { cn } from "../../lib/utils";
import Fullscreenable from "../../components/Fullscreenable";
import {
  LESSON30_SYSTEMS,
  type Lesson30SystemId,
  getLesson30System,
} from "../../data/lesson30/systems";

export default function Lesson30System({
  setCurrentView,
  systemId,
}: {
  setCurrentView: (view: View) => void;
  systemId: Lesson30SystemId;
}) {
  const system = getLesson30System(systemId);
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOrgan(null);
  }, [systemId]);

  const systemIndex = LESSON30_SYSTEMS.findIndex((s) => s.id === systemId);
  const nextSystem =
    systemIndex >= 0 ? LESSON30_SYSTEMS[systemIndex + 1] : undefined;
  const nextView: View = nextSystem ? nextSystem.viewId : "lesson-30-summary";
  const nextLabel = nextSystem ? `Tiếp theo: ${nextSystem.name}` : "Tới Tổng kết";

  const organButtons =
    system.id === "sinh-duc"
      ? ["Cơ quan sinh dục nam + nữ"]
      : system.organs;

  const viewerSlot = selectedOrgan
    ? `lesson30-organ-${system.id}:${selectedOrgan}`
    : system.threeSlot;

  useEffect(() => {
    setSelectedOrgan(organButtons[0] ?? null);
  }, [systemId]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-cyan-50 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0F8FF] rounded-full text-[#00BFFF] font-bold text-sm border border-[#E0F0FF]">
            <Layers className="w-4 h-4" />
            <span>Hệ cơ quan</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#333] leading-[1.1]">
            {system.name}
          </h2>
          <p className="text-[#666] text-lg leading-relaxed max-w-3xl">
            {system.role}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-6 space-y-4 lg:col-span-1">
          <h3 className="text-xl font-extrabold text-[#333]">
            Cơ quan tiêu biểu
          </h3>
          <div className="flex flex-wrap gap-2">
            {organButtons.map((organ) => (
              <button
                key={organ}
                type="button"
                onClick={() =>
                  setSelectedOrgan((prev) => (prev === organ ? null : organ))
                }
                aria-pressed={selectedOrgan === organ}
                className={cn(
                  "px-4 py-2 rounded-2xl border font-bold transition-colors",
                  selectedOrgan === organ
                    ? "bg-white border-[#00BFFF] text-[#00BFFF]"
                    : "bg-[#F5F9FF] border-[#E0F0FF] text-[#333] hover:bg-[#F0F8FF] hover:border-[#00BFFF]",
                )}
              >
                {organ}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <p className="font-bold text-[#333]">Vai trò chính</p>
            <p className="text-[#666] leading-relaxed">{system.role}</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-4 lg:col-span-2">
          <Fullscreenable
            className="w-full aspect-[16/10] rounded-2xl border border-[#E0F0FF] bg-[#F5F9FF]"
            dataThreeSlot={viewerSlot}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setCurrentView("lesson-30-role")}
          className="bg-white text-[#00BFFF] px-7 py-4 rounded-2xl font-bold text-base border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all inline-flex items-center justify-center gap-2"
        >
          Quay lại Vai trò <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentView(nextView)}
          className="bg-[#00BFFF] text-white px-7 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2"
        >
          {nextLabel} <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
