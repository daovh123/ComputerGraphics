import React, { useMemo, useState } from "react";
import { ChevronRight, Layers } from "lucide-react";
import { type View } from "../../router/views";
import { LESSON30_SYSTEMS } from "../../data/lesson30/systems";

export default function Lesson30Role({
  setCurrentView,
}: {
  setCurrentView: (view: View) => void;
}) {
  const [systemIndex, setSystemIndex] = useState(0);
  const system = useMemo(
    () => LESSON30_SYSTEMS[systemIndex],
    [systemIndex],
  );
  const isLast = systemIndex >= LESSON30_SYSTEMS.length - 1;

  const goNextCard = () => {
    if (isLast) {
      setCurrentView("lesson-30-van-dong");
      return;
    }

    setSystemIndex((prev) => Math.min(prev + 1, LESSON30_SYSTEMS.length - 1));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-blue-50 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 space-y-4">
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

      <div className="bg-white rounded-[40px] border border-[#E0F0FF] shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 bg-[#F5F9FF] border-b border-[#E0F0FF] flex items-start justify-between gap-4">
          <div>
            <p className="text-[#00BFFF] font-black uppercase tracking-wider text-xs">
              Hệ cơ quan
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-[#333]">
              {system.name}
            </h3>
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#00BFFF] bg-white px-3 py-1.5 rounded-full border border-[#E0F0FF]">
            {systemIndex + 1}/{LESSON30_SYSTEMS.length}
          </span>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="font-bold text-[#333]">Cơ quan tiêu biểu</p>
              <div className="flex flex-wrap gap-2">
                {system.organs.map((organ) => (
                  <span
                    key={organ}
                    className="px-3 py-1.5 rounded-2xl bg-[#F5F9FF] border border-[#E0F0FF] text-[#333] font-bold text-sm"
                  >
                    {organ}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-[#333]">Vai trò chính</p>
              <p className="text-[#666] leading-relaxed">{system.role}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentView(system.viewId)}
                className="bg-[#00BFFF] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-colors inline-flex items-center justify-center gap-2"
              >
                Xem chi tiết <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={goNextCard}
                className="bg-white text-[#00BFFF] px-6 py-3 rounded-2xl font-bold border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all inline-flex items-center justify-center gap-2"
              >
                {isLast ? "Hệ vận động" : "Tiếp theo"}{" "}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#E0F0FF] bg-[#F5F9FF] p-4">
            <div
              className="w-full aspect-[16/10] rounded-2xl bg-slate-900"
              data-illustration-slot={`lesson30-role-${system.id}`}
            />
            <p className="mt-3 text-sm text-[#666] font-bold">
              Hình minh hoạ (thêm sau)
            </p>
          </div>
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
