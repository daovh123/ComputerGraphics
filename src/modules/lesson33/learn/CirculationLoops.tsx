import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

const circulationStages = [
  {
    id: "start",
    title: "Tâm thất phải bơm máu lên phổi",
    description:
      "Máu giàu carbon dioxide rời tim phải để đến phổi. Tại đây, máu nhả carbon dioxide và nhận oxygen.",
    loop: "Vòng tuần hoàn nhỏ",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    id: "return",
    title: "Máu giàu oxygen trở về tim trái",
    description:
      "Sau trao đổi khí ở phổi, máu trở về tâm nhĩ trái rồi xuống tâm thất trái để chuẩn bị đi nuôi cơ thể.",
    loop: "Vòng tuần hoàn nhỏ",
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "body",
    title: "Tâm thất trái bơm máu đi khắp cơ thể",
    description:
      "Đây là vòng tuần hoàn lớn. Máu giàu oxygen mang theo chất dinh dưỡng đến từng mô, từng cơ quan.",
    loop: "Vòng tuần hoàn lớn",
    accent: "bg-rose-100 text-rose-700",
  },
  {
    id: "back",
    title: "Máu nghèo oxygen quay về tim phải",
    description:
      "Sau khi trao đổi chất ở tế bào, máu đi vào tĩnh mạch và trở lại tâm nhĩ phải, khép kín chu trình tuần hoàn.",
    loop: "Vòng tuần hoàn lớn",
    accent: "bg-violet-100 text-violet-700",
  },
];

export default function CirculationLoops() {
  const [activeStageId, setActiveStageId] = useState(circulationStages[0].id);
  const activeStage =
    circulationStages.find((stage) => stage.id === activeStageId) ?? circulationStages[0];

  return (
    <section className="grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
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
          Chọn từng chặng để quan sát đường đi của máu qua tim, phổi và các cơ quan.
          Khi nối bốn chặng này lại, em sẽ thấy rõ hai vòng tuần hoàn trong cơ thể người.
        </p>

        <div className="grid gap-4">
          {circulationStages.map((stage, index) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStageId(stage.id)}
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
                  <p className="mt-2 text-base leading-7 text-[#475569]">{stage.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[36px] border border-[#E0F0FF] bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0EA5E9] text-white">
            <ArrowRightLeft className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
              Chặng đang xem
            </p>
            <h3 className="text-2xl font-black text-[#0F172A]">{activeStage.title}</h3>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] bg-[linear-gradient(145deg,#082F49,#0EA5E9_50%,#E0F2FE)] p-6 text-white">
          <div className="grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-black/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
                Sơ đồ rút gọn
              </p>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                  <span className="font-bold">Tim phải</span>
                  <span className="text-sm text-white/70">Máu giàu CO2</span>
                </div>
                <div className="text-center text-xl font-black text-white/70">↓</div>
                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                  <span className="font-bold">Phổi</span>
                  <span className="text-sm text-white/70">Trao đổi khí</span>
                </div>
                <div className="text-center text-xl font-black text-white/70">↓</div>
                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                  <span className="font-bold">Tim trái</span>
                  <span className="text-sm text-white/70">Máu giàu O2</span>
                </div>
                <div className="text-center text-xl font-black text-white/70">↓</div>
                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                  <span className="font-bold">Cơ thể</span>
                  <span className="text-sm text-white/70">Trao đổi chất</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] bg-white/12 p-4 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                  Thuộc vòng
                </p>
                <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${activeStage.accent}`}>
                  {activeStage.loop}
                </span>
              </div>
              <div className="rounded-[22px] bg-white/12 p-4 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                  Ý nghĩa
                </p>
                <p className="mt-3 text-sm leading-6 text-white/85">
                  {activeStageId === "start" || activeStageId === "return"
                    ? "Giúp máu trao đổi khí ở phổi."
                    : "Giúp máu nuôi toàn bộ cơ thể."}
                </p>
              </div>
            </div>

            <div className="rounded-[22px] border border-white/20 bg-white/12 p-4 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                Chặng đang xem
              </p>
              <p className="mt-3 text-lg font-bold">{activeStage.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/80">{activeStage.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-[#E2E8F0] bg-[#F8FBFF] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]">
            Kết luận
          </p>
          <p className="mt-3 text-base leading-7 text-[#334155]">
            Tim phải gắn với vòng tuần hoàn nhỏ, tim trái gắn với vòng tuần hoàn lớn.
            Hai vòng phối hợp để vừa trao đổi khí ở phổi vừa nuôi toàn bộ cơ thể.
          </p>
        </div>
      </div>
    </section>
  );
}
