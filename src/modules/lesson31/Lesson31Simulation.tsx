import React, { useEffect, useMemo, useState } from "react";
import { lesson31KnowledgeContent } from "../../data/lesson31/content";

export default function Lesson31Simulation() {
  const steps = useMemo(
    () => [...lesson31KnowledgeContent.simulation].sort((a, b) => a.order - b.order),
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = steps[currentIndex];
  const totalSteps = steps.length;
  const progressPercent = ((currentIndex + 1) / totalSteps) * 100;

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPlaying, totalSteps]);

  const goNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const goPrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const resetFlow = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const togglePlayAll = () => {
    if (currentIndex >= totalSteps - 1) {
      setCurrentIndex(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const getPhaseColors = (phase: string) => {
    switch(phase) {
      case "Thần kinh": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Co cơ": return "bg-rose-100 text-rose-700 border-rose-200";
      case "Đòn bẩy": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-6">
      <h2 className="text-2xl font-extrabold text-[#333]">
        Mô phỏng Cơ chế Co cơ & Đòn bẩy
      </h2>
      <p className="text-[#5B6470] text-sm leading-relaxed">
        Theo dõi từng giai đoạn từ lúc nhận tín hiệu thần kinh đến khi cơ rút lại kéo theo hệ thống xương hoạt động như một đòn bẩy.
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#5B6470]">
          <span>
            Bước {currentIndex + 1}/{totalSteps}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Bước trước
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === totalSteps - 1}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Bước tiếp theo
        </button>
        <button
          onClick={togglePlayAll}
          className="px-4 py-2 rounded-xl border border-[#BEE3D8] bg-[#F0FFF6] text-sm font-semibold text-[#22543D] hover:bg-[#E4FAEE]"
        >
          {isPlaying ? "Tạm dừng" : "Phát tự động"}
        </button>
        <button
          onClick={resetFlow}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          Đặt lại
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-4">
        <aside className="xl:col-span-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mx-1">
            Dòng thời gian
          </p>
          <div className="space-y-2 relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 z-0"></div>
            {steps.map((step, idx) => {
              const isActive = idx === currentIndex;
              const isPassed = idx < currentIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`relative z-10 w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${
                    isActive
                      ? "bg-white border-blue-300 shadow-sm shadow-blue-100"
                      : isPassed
                      ? "bg-white/60 border-slate-200 opacity-70 hover:opacity-100"
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-200"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isActive ? "bg-blue-500 text-white" : isPassed ? "bg-slate-300 text-white" : "bg-slate-200 text-slate-500"
                  }`}>
                      {step.order}
                  </div>
                  <span className={isActive ? "font-bold text-blue-900" : "font-medium text-slate-600"}>{step.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="xl:col-span-8 rounded-2xl border border-slate-100 bg-white p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold shrink-0">{currentStep.order}</span>
              {currentStep.title}
            </h3>
          </div>

          <div className={`inline-flex px-3 py-1.5 rounded-lg border text-sm font-bold ${getPhaseColors(currentStep.phase)}`}>
            Giai đoạn: {currentStep.phase}
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed">
              {currentStep.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 p-4 bg-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Thành phần tham gia
              </p>
              <div className="flex flex-wrap gap-2">
                {currentStep.keyComponents.map((comp, i) => (
                  <span key={i} className="px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 p-4 bg-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Điểm nhấn
              </p>
              <div className="flex flex-wrap gap-2">
                {currentStep.summaryBadges.map((badge, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-sm font-bold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
