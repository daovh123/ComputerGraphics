import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRightLeft } from "lucide-react";
import { useLessonStepProgression } from "../../../components/lesson-player/useLessonStepEnterAction";

const circulationStages = [
  {
    id: "start",
    title: "Tâm thất phải bơm máu lên phổi",
    description:
      "Máu giàu carbon dioxide rời tim phải để đến phổi. Tại đây, máu nhả carbon dioxide và nhận oxygen.",
    loop: "Vòng tuần hoàn nhỏ",
    accent: "bg-sky-100 text-sky-700",
    glow: "#0EA5E9",
    route: ["Tim phải", "Phổi"],
    summary: "Đưa máu lên phổi để trao đổi khí.",
  },
  {
    id: "return",
    title: "Máu giàu oxygen trở về tim trái",
    description:
      "Sau trao đổi khí ở phổi, máu trở về tâm nhĩ trái rồi xuống tâm thất trái để chuẩn bị đi nuôi cơ thể.",
    loop: "Vòng tuần hoàn nhỏ",
    accent: "bg-emerald-100 text-emerald-700",
    glow: "#10B981",
    route: ["Phổi", "Tim trái"],
    summary: "Đưa máu giàu oxygen quay lại tim trái.",
  },
  {
    id: "body",
    title: "Tâm thất trái bơm máu đi khắp cơ thể",
    description:
      "Đây là vòng tuần hoàn lớn. Máu giàu oxygen mang theo chất dinh dưỡng đến từng mô, từng cơ quan.",
    loop: "Vòng tuần hoàn lớn",
    accent: "bg-rose-100 text-rose-700",
    glow: "#F43F5E",
    route: ["Tim trái", "Cơ thể"],
    summary: "Phân phối oxygen và chất dinh dưỡng cho toàn cơ thể.",
  },
  {
    id: "back",
    title: "Máu nghèo oxygen quay về tim phải",
    description:
      "Sau khi trao đổi chất ở tế bào, máu đi vào tĩnh mạch và trở lại tâm nhĩ phải, khép kín chu trình tuần hoàn.",
    loop: "Vòng tuần hoàn lớn",
    accent: "bg-violet-100 text-violet-700",
    glow: "#8B5CF6",
    route: ["Cơ thể", "Tim phải"],
    summary: "Khép kín chu trình để bắt đầu một vòng mới.",
  },
];

function StageOverview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
    >
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
          Hai vòng tuần hoàn
        </p>
        <h2 className="text-4xl font-black tracking-tight text-[#020617] md:text-6xl">
          Dòng máu luôn đi
          <br />
          theo một chu trình kín
        </h2>
        <p className="max-w-2xl text-lg leading-8 text-[#475569]">
          Máu không đi ngẫu nhiên. Nó chạy theo một lộ trình khép kín qua tim, phổi và
          toàn bộ cơ thể. Ở phần này, em sẽ xem tuần tự từng chặng của chu trình đó.
        </p>
      </div>

      <div className="rounded-[36px] border border-[#E0F0FF] bg-white p-8 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] bg-[#F0F9FF] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0369A1]">
              Vòng tuần hoàn nhỏ
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#0F172A]">
              Tim phải → Phổi → Tim trái
            </p>
          </div>
          <div className="rounded-[28px] bg-[#FFF1F2] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#BE123C]">
              Vòng tuần hoàn lớn
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#0F172A]">
              Tim trái → Cơ thể → Tim phải
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {circulationStages.map((stage, index) => (
            <div
              key={stage.id}
              className="flex items-center gap-4 rounded-[24px] border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0F172A] text-sm font-black text-white">
                {index + 1}
              </div>
              <div>
                <p className="text-lg font-bold text-[#0F172A]">{stage.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">{stage.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function StageList({
  activeStageId,
  onSelect,
}: {
  activeStageId: string;
  onSelect: (stageId: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {circulationStages.map((stage, index) => (
        <button
          key={stage.id}
          type="button"
          onClick={() => onSelect(stage.id)}
          className={
            stage.id === activeStageId
              ? "rounded-[28px] border border-[#7DD3FC] bg-[#F0F9FF] p-5 text-left shadow-sm"
              : "rounded-[28px] border border-[#E2E8F0] bg-white p-5 text-left shadow-sm transition hover:border-[#BAE6FD] hover:bg-[#F8FCFF]"
          }
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F172A] text-sm font-black text-white">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0F172A]">{stage.title}</h3>
              <p className="mt-2 text-base leading-7 text-[#475569]">{stage.summary}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function StageFocus({
  stage,
  index,
  onSelectStage,
}: {
  stage: (typeof circulationStages)[number];
  index: number;
  onSelectStage: (stageId: string) => void;
}) {
  return (
    <section className="grid min-h-[calc(100vh-12rem)] items-center">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
            Hai vòng tuần hoàn
          </p>
          <h2 className="text-4xl font-black tracking-tight text-[#020617] md:text-5xl">
            Dòng máu đang đi
            <br />
            tới đâu?
          </h2>
          <StageList activeStageId={stage.id} onSelect={onSelectStage} />
        </div>

        <div className="relative overflow-hidden rounded-[40px] border border-[#E0F0FF] bg-[radial-gradient(circle_at_top,_#F8FBFF,_#EEF6FF_48%,_#FFFFFF_100%)] p-8 md:p-10 shadow-sm">
          <div
            className="absolute right-10 top-10 h-40 w-40 rounded-full blur-3xl"
            style={{ backgroundColor: `${stage.glow}20` }}
          />

          <div className="relative grid gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0EA5E9] text-white">
                <ArrowRightLeft className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
                  Chặng {index + 1}
                </p>
                <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${stage.accent}`}>
                  {stage.loop}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-4xl font-black tracking-tight text-[#020617] md:text-5xl">
                {stage.title}
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#475569]">
                {stage.description}
              </p>
            </div>

            <div className="rounded-[32px] bg-[#0F172A] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Đường đi đang diễn ra
              </p>
              <div className="mt-5 flex items-center justify-center gap-3 md:gap-5">
                <div className="min-w-[8.5rem] rounded-[24px] bg-white/10 px-4 py-5 text-center">
                  <p className="text-lg font-black">{stage.route[0]}</p>
                </div>
                <div className="text-3xl font-black text-white/60">→</div>
                <div className="min-w-[8.5rem] rounded-[24px] bg-white/10 px-4 py-5 text-center">
                  <p className="text-lg font-black">{stage.route[1]}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Ý nghĩa của chặng này
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-[#0F172A]">
                  {stage.summary}
                </p>
              </div>

              <div className="rounded-[28px] border border-[#E2E8F0] bg-[#F8FBFF] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Ghi nhớ nhanh
                </p>
                <p className="mt-3 text-base leading-7 text-[#334155]">
                  {stage.loop === "Vòng tuần hoàn nhỏ"
                    ? "Đây là phần chu trình gắn với phổi, nơi máu trao đổi khí."
                    : "Đây là phần chu trình gắn với toàn cơ thể, nơi máu nuôi tế bào và thu chất thải."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CirculationLoops() {
  const [mode, setMode] = useState<"overview" | "detail">("overview");
  const [activeStageId, setActiveStageId] = useState(circulationStages[0].id);
  const activeIndex = circulationStages.findIndex((stage) => stage.id === activeStageId);
  const activeStage = useMemo(
    () => circulationStages.find((stage) => stage.id === activeStageId) ?? circulationStages[0],
    [activeStageId],
  );

  useLessonStepProgression({
    canGoNext: mode === "overview" || activeIndex < circulationStages.length - 1,
    onNext: () => {
      if (mode === "overview") {
        setMode("detail");
        setActiveStageId(circulationStages[0].id);
        return;
      }

      const nextStage = circulationStages[activeIndex + 1];
      if (nextStage) {
        setActiveStageId(nextStage.id);
      }
    },
    canGoBack: mode === "detail",
    onBack: () => {
      if (activeIndex > 0) {
        setActiveStageId(circulationStages[activeIndex - 1].id);
        return;
      }

      setMode("overview");
    },
  });

  return (
    mode === "overview" ? (
      <StageOverview key="overview" />
    ) : (
      <StageFocus
        stage={activeStage}
        index={activeIndex}
        onSelectStage={setActiveStageId}
      />
    )
  );
}
