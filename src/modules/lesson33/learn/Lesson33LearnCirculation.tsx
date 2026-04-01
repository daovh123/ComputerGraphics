import React, { useState } from "react";
import { useLessonStepEnterAction } from "../../../components/lesson-player/useLessonStepEnterAction";

const loops = [
  {
    id: "small",
    title: "Vòng tuần hoàn nhỏ",
    subtitle: "Tim → Phổi → Tim",
    description:
      "Máu từ tim lên phổi để trao đổi khí, nhận oxygen và thải carbon dioxide rồi trở về tim.",
  },
  {
    id: "large",
    title: "Vòng tuần hoàn lớn",
    subtitle: "Tim → Cơ thể → Tim",
    description:
      "Máu giàu oxygen và dinh dưỡng được đưa từ tim đến các cơ quan, rồi quay lại tim cùng chất thải và carbon dioxide.",
  },
];

export default function Lesson33LearnCirculation() {
  const [activeLoop, setActiveLoop] = useState("small");

  useLessonStepEnterAction({
    canHandle: () => activeLoop === "small",
    run: () => {
      setActiveLoop("large");
    },
  });

  return (
    <section className="grid min-h-[calc(100vh-12rem)] gap-12 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="pt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
          Hệ tuần hoàn
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-[#020617] md:text-6xl">
          Tim là bơm trung tâm,
          <br />
          mạch máu là đường đi
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#475569]">
          Chọn từng vòng tuần hoàn để theo dấu đường đi của máu trong cơ thể.
        </p>
      </div>

      <div className="grid content-center gap-6">
        <div className="flex gap-3">
          {loops.map((loop) => (
            <button
              key={loop.id}
              type="button"
              onClick={() => setActiveLoop(loop.id)}
              className={
                loop.id === activeLoop
                  ? "rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white"
                  : "rounded-full border border-[#D7E8FF] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#334155]"
              }
            >
              {loop.title}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {loops.map((loop) => {
            const isActive = loop.id === activeLoop;

            return (
              <button
                key={loop.id}
                type="button"
                onClick={() => setActiveLoop(loop.id)}
                className={
                  isActive
                    ? "border-b-4 border-[#0EA5E9] pb-6 text-left"
                    : "border-b border-[#E2E8F0] pb-6 text-left opacity-60"
                }
              >
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
                  {loop.subtitle}
                </p>
                <p className="mt-4 text-3xl font-black leading-tight text-[#0F172A]">
                  {loop.title}
                </p>
                <p className="mt-4 text-lg leading-8 text-[#475569]">
                  {loop.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
