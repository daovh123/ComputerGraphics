import React, { useMemo, useState } from "react";
import { ArrowRight, HeartPulse, Play, RotateCcw, Wind } from "lucide-react";
import { motion } from "motion/react";

type FlowStep = {
  id: string;
  title: string;
  description: string;
  from: string;
  to: string;
  blood: "co2" | "o2";
};

const flowSteps: FlowStep[] = [
  {
    id: "heart-to-lungs",
    title: "Tim phải đưa máu lên phổi",
    description:
      "Máu nghèo oxygen đi từ tim phải lên phổi để thải carbon dioxide và nhận oxygen.",
    from: "Tim phải",
    to: "Phổi",
    blood: "co2",
  },
  {
    id: "lungs-to-heart",
    title: "Phổi trả máu giàu oxygen về tim trái",
    description:
      "Sau khi trao đổi khí, máu giàu oxygen trở lại tim trái để chuẩn bị đi nuôi cơ thể.",
    from: "Phổi",
    to: "Tim trái",
    blood: "o2",
  },
  {
    id: "heart-to-body",
    title: "Tim trái bơm máu đi toàn cơ thể",
    description:
      "Tim trái co mạnh để đưa máu giàu oxygen qua động mạch đến các cơ quan.",
    from: "Tim trái",
    to: "Cơ thể",
    blood: "o2",
  },
  {
    id: "body-to-heart",
    title: "Máu nghèo oxygen quay về tim phải",
    description:
      "Sau khi trao đổi chất tại mô, máu mang carbon dioxide trở về tim phải qua tĩnh mạch.",
    from: "Cơ thể",
    to: "Tim phải",
    blood: "co2",
  },
];

export default function CirculationFlowLab() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = flowSteps[activeStepIndex];
  const progressWidth = `${((activeStepIndex + 1) / flowSteps.length) * 100}%`;

  const pulseColor = useMemo(
    () => (activeStep.blood === "o2" ? "#EF4444" : "#3B82F6"),
    [activeStep.blood],
  );

  const handleNext = () => {
    setActiveStepIndex((current) => (current + 1) % flowSteps.length);
  };

  return (
    <section className="grid gap-8 rounded-[36px] border border-[#E0F0FF] bg-white p-8 shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8FF] bg-[#F5FBFF] px-4 py-2 text-sm font-bold text-[#0369A1]">
          <HeartPulse className="h-4 w-4" />
          Lab hai vòng tuần hoàn
        </div>
        <h3 className="text-3xl font-black text-[#0F172A]">Mô phỏng dòng máu theo từng chặng</h3>
        <p className="max-w-2xl text-base leading-7 text-[#475569]">
          Bấm chạy từng bước để minh họa máu đi từ tim lên phổi, trở về tim trái, rồi đi
          khắp cơ thể và quay lại tim phải. Đây là phần mới dễ tạo ấn tượng khi demo.
        </p>

        <div className="rounded-[28px] bg-[#0F172A] p-6 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
                Chặng {activeStepIndex + 1} / {flowSteps.length}
              </p>
              <h4 className="mt-2 text-2xl font-black">{activeStep.title}</h4>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0EA5E9] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0284C7]"
            >
              <Play className="h-4 w-4" />
              Chạy bước tiếp
            </button>
          </div>
          <p className="mt-4 text-sm leading-7 text-white/80">{activeStep.description}</p>
          <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#38BDF8] to-[#F43F5E] transition-all duration-500"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        <div className="grid gap-3">
          {flowSteps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStepIndex(index)}
              className={
                index === activeStepIndex
                  ? "rounded-[24px] border border-[#7DD3FC] bg-[#F0F9FF] px-5 py-4 text-left shadow-sm"
                  : "rounded-[24px] border border-[#E2E8F0] bg-white px-5 py-4 text-left shadow-sm transition hover:border-[#BAE6FD] hover:bg-[#F8FCFF]"
              }
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-[#0F172A]">{step.title}</p>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {step.from} <ArrowRight className="mx-1 inline h-4 w-4" /> {step.to}
                  </p>
                </div>
                <span
                  className={
                    step.blood === "o2"
                      ? "rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600"
                      : "rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600"
                  }
                >
                  {step.blood === "o2" ? "Máu giàu O2" : "Máu giàu CO2"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] bg-[linear-gradient(180deg,#082F49,#0EA5E9)] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              Sân khấu mô phỏng
            </p>
            <h4 className="mt-2 text-2xl font-black">Dòng máu đang di chuyển</h4>
          </div>
          <button
            type="button"
            onClick={() => setActiveStepIndex(0)}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[28px] border border-white/15 bg-[#061A2D] p-6">
          <svg viewBox="0 0 420 360" className="h-[26rem] w-full">
            <path d="M205 70 C135 70, 90 130, 95 180 C100 240, 155 288, 210 288" fill="none" stroke="#7DD3FC" strokeWidth="18" strokeLinecap="round" opacity="0.85" />
            <path d="M215 288 C275 288, 330 242, 325 180 C320 122, 282 84, 215 84" fill="none" stroke="#FCA5A5" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
            <circle cx="210" cy="178" r="46" fill="#F43F5E" />
            <circle cx="210" cy="178" r="22" fill="#FFF1F2" />
            <circle cx="90" cy="110" r="36" fill="#BAE6FD" />
            <circle cx="330" cy="246" r="42" fill="#C7D2FE" />
            <text x="210" y="184" textAnchor="middle" className="fill-white text-[15px] font-bold">
              Tim
            </text>
            <text x="90" y="116" textAnchor="middle" className="fill-[#082F49] text-[14px] font-bold">
              Phổi
            </text>
            <text x="330" y="252" textAnchor="middle" className="fill-[#312E81] text-[14px] font-bold">
              Cơ thể
            </text>
            <text x="76" y="54" className="fill-white/80 text-[13px] font-semibold">
              Tuần hoàn nhỏ
            </text>
            <text x="286" y="330" className="fill-white/80 text-[13px] font-semibold">
              Tuần hoàn lớn
            </text>
          </svg>

          <motion.div
            key={activeStep.id}
            className="pointer-events-none absolute top-0 left-0 h-4 w-4 rounded-full shadow-[0_0_22px_rgba(255,255,255,0.6)]"
            style={{ backgroundColor: pulseColor }}
            initial={
              activeStep.id === "heart-to-lungs"
                ? { x: 214, y: 182 }
                : activeStep.id === "lungs-to-heart"
                  ? { x: 96, y: 112 }
                  : activeStep.id === "heart-to-body"
                    ? { x: 214, y: 182 }
                    : { x: 334, y: 248 }
            }
            animate={
              activeStep.id === "heart-to-lungs"
                ? { x: 96, y: 112 }
                : activeStep.id === "lungs-to-heart"
                  ? { x: 214, y: 182 }
                  : activeStep.id === "heart-to-body"
                    ? { x: 334, y: 248 }
                    : { x: 214, y: 182 }
            }
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
              Bắt đầu
            </p>
            <p className="mt-2 text-lg font-bold">{activeStep.from}</p>
          </div>
          <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
              Kết thúc
            </p>
            <p className="mt-2 text-lg font-bold">{activeStep.to}</p>
          </div>
          <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur sm:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
              <Wind className="h-4 w-4" />
              Trạng thái máu
            </div>
            <p className="mt-2 text-base leading-7 text-white">
              {activeStep.blood === "o2"
                ? "Máu đang giàu oxygen, sẵn sàng nuôi các tế bào và cơ quan."
                : "Máu đang giàu carbon dioxide, cần quay về phổi để trao đổi khí."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
