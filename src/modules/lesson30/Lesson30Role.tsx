import React from "react";
import { ChevronRight, Layers } from "lucide-react";
import { type View } from "../../router/views";
import { LESSON30_SYSTEMS } from "../../data/lesson30/systems";

export default function Lesson30Role({
  setCurrentView,
}: {
  setCurrentView: (view: View) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-blue-50 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0F8FF] rounded-full text-[#00BFFF] font-bold text-sm border border-[#E0F0FF]">
            <Layers className="w-4 h-4" />
            <span>Vai trò của cơ quan & hệ cơ quan</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#333] leading-[1.1]">
            Vai trò của các hệ cơ quan trong cơ thể người
          </h2>
          <p className="text-[#666] text-lg leading-relaxed max-w-3xl">
            Mỗi hệ cơ quan đảm nhiệm một vai trò chính. Hãy chọn từng hệ bên dưới
            để xem cơ quan tiêu biểu và chức năng của hệ đó.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-[#E0F0FF] shadow-sm p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-black text-[#333]">
            Danh sách hệ cơ quan
          </h3>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#00BFFF] bg-[#F0F8FF] px-3 py-1.5 rounded-full border border-[#E0F0FF]">
            {LESSON30_SYSTEMS.length} hệ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LESSON30_SYSTEMS.map((system) => (
            <button
              key={system.id}
              type="button"
              onClick={() => setCurrentView(system.viewId)}
              className="group w-full text-left rounded-3xl border border-[#E0F0FF] bg-[#F5F9FF] p-5 flex items-center justify-between gap-4 hover:bg-white hover:border-[#00BFFF] transition-colors"
            >
              <span className="font-black text-[#333] leading-tight">
                {system.name}
              </span>
              <span className="w-10 h-10 rounded-2xl bg-white border border-[#E0F0FF] flex items-center justify-center text-[#00BFFF] group-hover:border-[#00BFFF] transition-colors">
                <ChevronRight className="w-5 h-5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setCurrentView("lesson-30-summary")}
          className="bg-white text-[#00BFFF] px-7 py-4 rounded-2xl font-bold text-base border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all inline-flex items-center justify-center gap-2"
        >
          Xem tổng kết <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentView("lesson-30-quiz")}
          className="bg-[#00BFFF] text-white px-7 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2"
        >
          Làm Quiz (Kahoot) <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
