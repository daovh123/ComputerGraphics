import React, { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useLessonStepProgression } from "../../../components/lesson-player/useLessonStepEnterAction";
import { lessonOverview } from "../data/overview";

export default function Lesson33LearnObjectives() {
  const [activeIndex, setActiveIndex] = useState(0);

  useLessonStepProgression({
    canGoNext: activeIndex < lessonOverview.objectives.length - 1,
    onNext: () => {
      setActiveIndex((current) =>
        Math.min(current + 1, lessonOverview.objectives.length - 1),
      );
    },
    canGoBack: activeIndex > 0,
    onBack: () => {
      setActiveIndex((current) => Math.max(current - 1, 0));
    },
  });

  return (
    <section className="grid min-h-[calc(100vh-12rem)] items-center">
      <div className="grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
            Lộ trình bài học
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#020617] md:text-6xl">
            Chúng ta sẽ đi qua
            <br />
            5 ý chính
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#475569]">
            Chọn từng mục để xem trọng tâm của phần đó. Khi học, em chỉ cần giữ
            nhịp theo mũi tên trái và phải trên bàn phím.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
          className="grid gap-4"
        >
          <LayoutGroup>
            {lessonOverview.objectives.map((objective, index) => (
              <motion.button
                layout
                key={objective}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className="border-b border-[#E2E8F0] py-5 text-left"
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={
                      index === activeIndex
                        ? "text-3xl font-black text-[#0EA5E9]"
                        : "text-3xl font-black text-[#CBD5E1]"
                    }
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={
                        index === activeIndex
                          ? "text-2xl font-bold leading-tight text-[#0F172A]"
                          : "text-2xl font-bold leading-tight text-[#475569]"
                      }
                    >
                      {objective}
                    </p>
                    <AnimatePresence initial={false}>
                      {index === activeIndex ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl text-base leading-7 text-[#64748B]">
                            Phần này sẽ là điểm tựa để em nối kiến thức sinh học với cách
                            cơ thể tự bảo vệ và duy trì sự sống mỗi ngày.
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </LayoutGroup>
        </motion.div>
      </div>
    </section>
  );
}
