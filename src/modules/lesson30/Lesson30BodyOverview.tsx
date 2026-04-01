import React from "react";
import { ChevronRight, Layers } from "lucide-react";
import { type View } from "../../router/views";
import { BODY_LAYERS, BODY_PARTS } from "../../data/lesson30/overview";

export default function Lesson30BodyOverview({
  setCurrentView,
}: {
  setCurrentView: (view: View) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[540px] h-[540px] bg-cyan-50 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0F8FF] rounded-full text-[#00BFFF] font-bold text-sm border border-[#E0F0FF]">
            <Layers className="w-4 h-4" />
            <span>Khái quát</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#333] leading-[1.1]">
            Khái quát về cơ thể người
          </h2>
          <p className="text-[#666] text-lg leading-relaxed max-w-3xl">
            Cơ thể người gồm 5 phần chính và được bao bọc bởi nhiều lớp từ ngoài
            vào trong. Đây là kiến thức nền để hiểu vai trò của các hệ cơ quan.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-xl font-extrabold text-[#333]">
              1) Các phần của cơ thể
            </h3>
            <p className="text-[#666] leading-relaxed">
              Cơ thể người gồm các phần:
            </p>

            <div className="flex flex-wrap gap-2">
              {BODY_PARTS.map((part) => (
                <span
                  key={part}
                  className="px-4 py-2 rounded-2xl bg-[#F5F9FF] border border-[#E0F0FF] text-[#333] font-bold"
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="rounded-3xl border border-[#E0F0FF] bg-[#F5F9FF] p-4">
              <div
                className="w-full aspect-[16/10] rounded-2xl bg-slate-900"
                data-three-slot="lesson30-khai-quat-parts"
              />
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xl font-extrabold text-[#333]">
              2) Lớp bao bọc cơ thể
            </h3>
            <p className="text-[#666] leading-relaxed">
              Từ ngoài vào trong, cơ thể được bao bọc bởi:
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {BODY_LAYERS.map((layer, idx) => (
                <React.Fragment key={layer}>
                  <span className="px-4 py-2 rounded-2xl bg-[#F5F9FF] border border-[#E0F0FF] text-[#333] font-bold">
                    {layer}
                  </span>
                  {idx !== BODY_LAYERS.length - 1 && (
                    <span className="text-[#999] font-black">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="rounded-3xl border border-[#E0F0FF] bg-[#F5F9FF] p-4">
              <div
                className="w-full aspect-[16/10] rounded-2xl bg-slate-900"
                data-three-slot="lesson30-khai-quat-layers"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-6 space-y-4">
        <h3 className="text-xl font-extrabold text-[#333]">Minh hoạ 3D</h3>
        <p className="text-[#666] leading-relaxed">
          Khung dưới đây để bạn gắn mô hình cơ thể người tổng quát (Three.js).
        </p>
        <div
          className="w-full aspect-[16/9] rounded-2xl border border-[#E0F0FF] bg-[#F5F9FF]"
          data-three-slot="lesson30-khai-quat-hero"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setCurrentView("lesson-30-overview")}
          className="bg-white text-[#00BFFF] px-7 py-4 rounded-2xl font-bold text-base border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all inline-flex items-center justify-center gap-2"
        >
          Về Tổng quan <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentView("lesson-30-role")}
          className="bg-[#00BFFF] text-white px-7 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2"
        >
          Tiếp theo: Vai trò <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
