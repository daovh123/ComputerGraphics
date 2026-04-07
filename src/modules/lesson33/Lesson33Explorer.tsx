import React, { useState } from "react";
import { type View } from "../../router/views";
import { organs } from "../../data/lesson33/organs";
import { ChevronRight, Activity } from "lucide-react";
import { cn } from "../../lib/utils";
import { LESSON_CARD_BASE } from "../../components/lessonClassNames";

const models = [
  {
    id: "cross-section",
    name: "Mặt cắt không gian",
    url: "https://sketchfab.com/models/a70c0c47fe4b4bbfabfc8f445365d5a4/embed?autostart=1&preload=1&ui_theme=dark"
  },
  {
    id: "full-anatomy",
    name: "Phẫu thuật tổng quát",
    url: "https://sketchfab.com/models/ebe5a8650a3348d795350a57672e8a8d/embed?autostart=1&preload=1&ui_theme=dark"
  }
];

export default function Lesson33Explorer({ setCurrentView }: { setCurrentView: (view: View) => void }) {
  const [selectedOrgan, setSelectedOrgan] = useState(organs[0]);
  const [activeModel, setActiveModel] = useState(models[0].id);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <section className="xl:col-span-8 space-y-4">
        <div className={cn(LESSON_CARD_BASE, "rounded-3xl overflow-hidden")}
        >
          <div className="relative h-[420px] md:h-[560px] bg-[#0f172a]">
            {models.map((model) => (
              <iframe
                key={model.id}
                title={model.name}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src={model.url}
                className={cn(
                  "absolute inset-0 h-full w-full transition-opacity duration-500",
                  activeModel === model.id
                    ? "pointer-events-auto opacity-100 z-10"
                    : "pointer-events-none opacity-0 z-0",
                )}
              />
            ))}

            <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex flex-wrap items-start justify-between gap-3 md:left-6 md:right-6 md:top-6">
              <div className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-md">
                <h2 className="text-lg font-bold text-white md:text-xl">
                  {selectedOrgan.name}
                </h2>
                <p className="text-sm text-white/70">
                  Mô hình 3D tương tác (Sketchfab)
                </p>
              </div>

              <div className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md shadow-xl">
                {models.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setActiveModel(model.id)}
                    className={cn(
                      "rounded-xl px-4 py-2 text-sm font-bold transition-colors",
                      activeModel === model.id
                        ? "bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20"
                        : "text-white/60 hover:text-white",
                    )}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-[#0f172a] to-transparent" />
          </div>
        </div>
      </section>

      <aside
        className={cn(
          LESSON_CARD_BASE,
          "xl:col-span-4 rounded-3xl p-6 shadow-sm flex flex-col space-y-6",
        )}
      >
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-[#333]">Hệ tuần hoàn</h3>
          <p className="text-sm text-[#00BFFF] font-bold bg-[#F0F8FF] p-3 rounded-xl border border-[#E0F0FF]">
            <Activity className="inline w-4 h-4 mr-1" /> Kéo thả chuột để xoay. Cuộn chuột để Thu/Phóng.
          </p>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {organs.map((organ) => (
            <button
              key={organ.id}
              type="button"
              onClick={() => setSelectedOrgan(organ)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border transition-all duration-200",
                selectedOrgan.id === organ.id
                  ? "border-[#00BFFF] bg-[#F0F8FF] shadow-sm"
                  : "border-[#E0F0FF] hover:border-[#00BFFF]/50 hover:bg-[#F5F9FF]",
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                  style={{ backgroundColor: organ.color }}
                >
                  {organ.name[0]}
                </div>
                <h4 className="font-bold text-[#333] text-lg">{organ.name}</h4>
              </div>
              <p className="text-[#666] text-sm leading-relaxed max-w-[90%]">
                {organ.description}
              </p>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-[#E0F0FF]">
          <button
            type="button"
            onClick={() => setCurrentView("lesson-33-blood" as View)}
            className="w-full bg-[#00BFFF] text-white py-3.5 rounded-2xl font-bold text-base shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-colors inline-flex items-center justify-center gap-2"
          >
            Nội dung tiếp: Cấu tạo máu <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </div>
  );
}
