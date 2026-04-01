import React, { useState } from "react";
import { useLessonStepEnterAction } from "../../../components/lesson-player/useLessonStepEnterAction";

export default function Lesson33LearnImmunity() {
  const [mode, setMode] = useState<"natural" | "vaccine">("natural");

  useLessonStepEnterAction({
    canHandle: () => mode === "natural",
    run: () => {
      setMode("vaccine");
    },
  });

  return (
    <section className="grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="pt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
          Miễn dịch và vaccine
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-[#020617] md:text-6xl">
          Khi mầm bệnh xâm nhập,
          <br />
          cơ thể đáp trả như thế nào?
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#475569]">
          Chuyển giữa hai chế độ để so sánh cơ thể khi phải phản ứng tự nhiên và
          khi đã được chuẩn bị trước bằng vaccine.
        </p>
      </div>

      <div className="grid content-center gap-8">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setMode("natural")}
            className={
              mode === "natural"
                ? "rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white"
                : "rounded-full border border-[#D7E8FF] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#334155]"
            }
          >
            Chưa có vaccine
          </button>
          <button
            type="button"
            onClick={() => setMode("vaccine")}
            className={
              mode === "vaccine"
                ? "rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white"
                : "rounded-full border border-[#D7E8FF] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#334155]"
            }
          >
            Đã có vaccine
          </button>
        </div>

        <div className="grid min-h-[22rem] gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
              Kháng nguyên
            </p>
            <p className="mt-4 text-3xl font-black leading-tight text-[#0F172A]">
              Chất lạ xâm nhập và kích thích cơ thể tạo phản ứng miễn dịch.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
              {mode === "natural" ? "Phản ứng tự nhiên" : "Miễn dịch nhân tạo"}
            </p>
            <p className="mt-4 text-3xl font-black leading-tight text-[#0F172A]">
              {mode === "natural"
                ? "Cơ thể cần thời gian nhận diện mầm bệnh rồi mới tạo kháng thể để chống lại."
                : "Vaccine giúp cơ thể được tập dượt trước, nên khi mầm bệnh thật xuất hiện sẽ đáp trả nhanh hơn."}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#475569]">
              {mode === "natural"
                ? "Nếu phản ứng chậm, mầm bệnh có thể gây tổn thương trước khi cơ thể kiểm soát được."
                : "Đó là lý do vaccine giúp giảm nguy cơ mắc bệnh nặng và bảo vệ cộng đồng tốt hơn."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
