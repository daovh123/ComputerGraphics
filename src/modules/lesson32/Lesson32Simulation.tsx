import React, { useEffect, useMemo, useState } from "react";
import { lesson32DigestionSteps } from "./data/digestionSteps";

export default function Lesson32Simulation() {
  const steps = useMemo(
    () => [...lesson32DigestionSteps].sort((a, b) => a.order - b.order),
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
    }, 1800);

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

  const boolLabel = (value: boolean) => (value ? "Có" : "Không");

  return (
    <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-6">
      <h2 className="text-2xl font-extrabold text-[#333]">
        Mô phỏng hành trình tiêu hóa
      </h2>
      <p className="text-[#5B6470] text-sm leading-relaxed">
        Theo dõi hành trình thức ăn theo từng bước để thấy rõ: cơ học, hóa học,
        hấp thu và vai trò hỗ trợ tiêu hóa.
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#5B6470]">
          <span>
            Bước {currentIndex + 1}/{totalSteps}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#E8F3FF] overflow-hidden">
          <div
            className="h-full bg-[#00BFFF] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={goPrev}
          className="px-4 py-2 rounded-xl border border-[#D7E8FF] bg-white text-sm font-semibold text-[#1F2937] hover:bg-[#F5FAFF]"
        >
          Bước trước
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 rounded-xl border border-[#D7E8FF] bg-white text-sm font-semibold text-[#1F2937] hover:bg-[#F5FAFF]"
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
          className="px-4 py-2 rounded-xl border border-[#E7D3F8] bg-[#FAF5FF] text-sm font-semibold text-[#6B21A8] hover:bg-[#F2E8FF]"
        >
          Đặt lại
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <aside className="xl:col-span-4 rounded-2xl border border-[#EAF5FF] bg-[#F8FCFF] p-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Dòng thời gian
          </p>
          <div className="space-y-2">
            {steps.map((step, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl border text-sm transition-colors ${
                    isActive
                      ? "bg-[#E0F4FF] border-[#8ED7FF] text-[#0C4A6E]"
                      : "bg-white border-[#E5EEF8] text-[#334155] hover:bg-[#F7FBFF]"
                  }`}
                >
                  <span className="font-bold">{step.order}. </span>
                  {step.title}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="xl:col-span-8 rounded-2xl border border-[#EAF5FF] bg-white p-5 space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="text-xl font-extrabold text-[#1F2937]">
              {currentStep.order}. {currentStep.title}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {currentStep.summaryBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-md bg-[#EEF7FF] text-[#0C4A6E]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#556070] leading-relaxed">
            {currentStep.shortDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                Cơ học
              </p>
              <p className="mt-1 font-semibold text-[#1E3A8A]">
                {boolLabel(currentStep.mechanicalDigestion)}
              </p>
            </div>

            <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Hóa học
              </p>
              <p className="mt-1 font-semibold text-[#92400E]">
                {boolLabel(currentStep.chemicalDigestion)}
              </p>
            </div>

            <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#15803D]">
                Hấp thu
              </p>
              <p className="mt-1 font-semibold text-[#166534]">
                {boolLabel(currentStep.absorption)}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5EEF8] bg-[#F8FAFC] p-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">
              Ghi chú hấp thu
            </p>
            <p className="mt-1 text-sm text-[#475569]">
              {currentStep.absorptionNote}
            </p>
          </div>

          {currentStep.supportOrgans.length > 0 && (
            <div className="rounded-xl border border-[#FFE4B5] bg-[#FFF7ED] p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">
                Cơ quan hỗ trợ tiêu hóa
              </p>
              <p className="mt-1 text-sm text-[#9A3412]">
                {currentStep.supportOrgans.join(", ")}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
