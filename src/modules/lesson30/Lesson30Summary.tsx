import React from "react";
import { CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { type View } from "../../router/views";
import { BODY_LAYERS, BODY_PARTS } from "../../data/lesson30/overview";
import { LESSON30_SYSTEMS } from "../../data/lesson30/systems";
import Fullscreenable from "../../components/Fullscreenable";

export default function Lesson30Summary({
  setCurrentView,
}: {
  setCurrentView: (view: View) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#00BFFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00BFFF]/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#333]">Tổng kết</h2>
            <p className="text-[#666] font-medium">
              Nhắc lại các ý chính của bài.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F0F8FF] rounded-2xl flex items-center justify-center text-[#00BFFF] border border-[#E0F0FF]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-extrabold text-[#333]">Khái quát</h3>
          </div>

          <div className="space-y-2">
            <p className="text-[#666] font-medium">5 phần chính:</p>
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
          </div>

          <div className="space-y-2">
            <p className="text-[#666] font-medium">
              Lớp bao bọc (ngoài → trong):
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
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-6 space-y-4">
          <h3 className="text-xl font-extrabold text-[#333]">Minh hoạ 3D</h3>
          <p className="text-[#666] leading-relaxed">
            Bạn có thể gắn mô hình cơ thể người tổng quát vào khung dưới đây.
          </p>
          <Fullscreenable
            className="w-full aspect-[16/9] rounded-2xl border border-[#E0F0FF] bg-[#F5F9FF]"
            dataThreeSlot="lesson30-summary-hero"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-6 space-y-4">
        <h3 className="text-xl font-extrabold text-[#333]">
          Vai trò các hệ cơ quan
        </h3>
        <div className="overflow-x-auto no-scrollbar">
          <table className="min-w-[900px] w-full border-separate border-spacing-0">
            <thead>
              <tr>

                <th className="text-left p-4 bg-[#F5F9FF] border-y border-r border-[#E0F0FF] text-[#333] font-black">
                  Cơ quan tiêu biểu
                </th>
                <th className="text-left p-4 bg-[#F5F9FF] border-y border-r border-[#E0F0FF] rounded-tr-2xl text-[#333] font-black">
                  Vai trò chính
                </th>
              </tr>
            </thead>
            <tbody>
              {LESSON30_SYSTEMS.map((s) => (
                <tr key={s.id}>
                  <td className="p-4 bg-white border-x border-b border-[#E0F0FF] font-bold text-[#00BFFF]">
                    {s.name}
                  </td>
                  <td className="p-4 bg-white border-b border-r border-[#E0F0FF] text-[#666]">
                    {s.organs.join(" • ")}
                  </td>
                  <td className="p-4 bg-white border-b border-r border-[#E0F0FF] text-[#666]">
                    {s.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setCurrentView("lesson-30-quiz")}
          className="bg-[#00BFFF] text-white px-7 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2"
        >
          Làm Quiz (Kahoot) <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentView("lesson-30-overview")}
          className="bg-white text-[#00BFFF] px-7 py-4 rounded-2xl font-bold text-base border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all inline-flex items-center justify-center gap-2"
        >
          Về Tổng quan <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
