import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLessonStepProgression } from "../../../components/lesson-player/useLessonStepEnterAction";

type BloodIdentity = {
  id: string;
  antigen: string;
  antibody: string;
  canDonateTo: string;
  canReceiveFrom: string;
  note: string;
  accent: string;
};

const bloodIdentities: BloodIdentity[] = [
  {
    id: "O",
    antigen: "Không có kháng nguyên A hay B trên hồng cầu",
    antibody: "Có cả kháng thể alpha và beta trong huyết tương",
    canDonateTo: "O, A, B, AB",
    canReceiveFrom: "O",
    note: "Nhóm O thường được xem là nhóm cho phổ biến trong hệ ABO.",
    accent: "#EF4444",
  },
  {
    id: "A",
    antigen: "Có kháng nguyên A",
    antibody: "Có kháng thể beta",
    canDonateTo: "A, AB",
    canReceiveFrom: "A, O",
    note: "Người nhóm A không nhận hồng cầu có kháng nguyên B.",
    accent: "#10B981",
  },
  {
    id: "B",
    antigen: "Có kháng nguyên B",
    antibody: "Có kháng thể alpha",
    canDonateTo: "B, AB",
    canReceiveFrom: "B, O",
    note: "Người nhóm B không nhận hồng cầu có kháng nguyên A.",
    accent: "#3B82F6",
  },
  {
    id: "AB",
    antigen: "Có cả kháng nguyên A và B",
    antibody: "Không có kháng thể alpha hay beta",
    canDonateTo: "AB",
    canReceiveFrom: "O, A, B, AB",
    note: "Nhóm AB nhận được từ mọi nhóm trong hệ ABO.",
    accent: "#8B5CF6",
  },
];

function BloodGroupList({
  activeGroupId,
  onSelect,
}: {
  activeGroupId: string;
  onSelect: (groupId: string) => void;
}) {
  return (
    <div className="rounded-[32px] border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <p className="px-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#94A3B8]">
        Nhóm máu ABO
      </p>
      <div className="mt-4 grid gap-3">
        {bloodIdentities.map((group) => {
          const isActive = group.id === activeGroupId;

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => onSelect(group.id)}
              className={
                isActive
                  ? "flex items-center justify-between rounded-[24px] border border-transparent bg-[#0F172A] px-4 py-4 text-left text-white shadow-md"
                  : "flex items-center justify-between rounded-[24px] border border-[#E2E8F0] bg-white px-4 py-4 text-left text-[#0F172A] transition hover:border-[#38BDF8] hover:bg-[#F8FCFF]"
              }
            >
              <div>
                <p
                  className={
                    isActive
                      ? "text-xs font-semibold uppercase tracking-[0.24em] text-white/50"
                      : "text-xs font-semibold uppercase tracking-[0.24em] text-[#94A3B8]"
                  }
                >
                  Nhóm máu
                </p>
                <p className="mt-1 text-2xl font-black">{group.id}</p>
              </div>
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black text-white"
                style={{ backgroundColor: group.accent }}
              >
                {group.id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GroupDetailStage({ group }: { group: BloodIdentity }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={group.id}
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -18 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative flex min-h-[34rem] items-center justify-center overflow-hidden rounded-[40px] border border-[#E0F0FF] bg-[radial-gradient(circle_at_top,_#F8FBFF,_#EEF6FF_48%,_#FFFFFF_100%)] px-6 py-10"
      >
        <div
          className="absolute inset-x-auto top-10 h-36 w-36 rounded-full blur-3xl"
          style={{ backgroundColor: `${group.accent}22` }}
        />

        <div className="relative flex w-full max-w-3xl flex-col items-center">
          <div className="rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#64748B] shadow-sm backdrop-blur">
            Hồ sơ nhóm máu
          </div>

          <div
            className="mt-8 flex h-40 w-40 items-center justify-center rounded-[40px] text-7xl font-black text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)]"
            style={{ backgroundColor: group.accent }}
          >
            {group.id}
          </div>

          <div className="mt-8 grid w-full gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <article className="rounded-[28px] bg-white/90 p-5 text-right shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
                Kháng nguyên
              </p>
              <p className="mt-3 text-lg font-semibold leading-7 text-[#0F172A]">
                {group.antigen}
              </p>
            </article>

            <div className="hidden h-0.5 w-12 bg-[#D7E8FF] md:block" />

            <article className="rounded-[28px] bg-white/90 p-5 text-left shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
                Kháng thể
              </p>
              <p className="mt-3 text-lg font-semibold leading-7 text-[#0F172A]">
                {group.antibody}
              </p>
            </article>
          </div>

          <div className="mt-4 grid w-full gap-4 md:grid-cols-2">
            <article className="rounded-[28px] bg-[#F0FDF4] p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#166534]">
                Có thể cho
              </p>
              <p className="mt-3 text-lg font-semibold leading-7 text-[#14532D]">
                {group.canDonateTo}
              </p>
            </article>

            <article className="rounded-[28px] bg-[#F5F3FF] p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6D28D9]">
                Có thể nhận
              </p>
              <p className="mt-3 text-lg font-semibold leading-7 text-[#4C1D95]">
                {group.canReceiveFrom}
              </p>
            </article>
          </div>

          <div className="mt-4 w-full rounded-[28px] border border-[#E2E8F0] bg-white/90 px-5 py-4 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
              Ghi nhớ
            </p>
            <p className="mt-2 text-base leading-7 text-[#334155]">{group.note}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ImmuneMarkers() {
  const [mode, setMode] = useState<"intro" | "detail">("intro");
  const [activeGroupId, setActiveGroupId] = useState("O");
  const activeIndex = bloodIdentities.findIndex((group) => group.id === activeGroupId);
  const activeGroup = useMemo(
    () => bloodIdentities.find((group) => group.id === activeGroupId) ?? bloodIdentities[0],
    [activeGroupId],
  );

  useLessonStepProgression({
    canGoNext: mode === "intro" || activeIndex < bloodIdentities.length - 1,
    onNext: () => {
      if (mode === "intro") {
        setMode("detail");
        setActiveGroupId(bloodIdentities[0].id);
        return;
      }

      const nextGroup = bloodIdentities[activeIndex + 1];

      if (nextGroup) {
        setActiveGroupId(nextGroup.id);
      }
    },
    canGoBack: mode === "detail",
    onBack: () => {
      if (activeIndex > 0) {
        setActiveGroupId(bloodIdentities[activeIndex - 1].id);
        return;
      }

      setMode("intro");
    },
  });

  return (
    <AnimatePresence mode="wait">
      {mode === "intro" ? (
        <motion.section
          key="intro"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
              Kháng nguyên và kháng thể
            </p>
            <h2 className="text-4xl font-black tracking-tight text-[#020617] md:text-6xl">
              Vì sao truyền máu
              <br />
              phải đúng nhóm?
            </h2>
            <p className="max-w-xl text-lg leading-8 text-[#475569]">
              Mỗi nhóm máu mang một dấu hiệu nhận diện khác nhau trên hồng cầu. Nếu truyền
              sai nhóm, kháng thể trong huyết tương người nhận có thể làm hồng cầu bị ngưng
              kết, gây tai biến truyền máu.
            </p>
          </div>

          <BloodGroupList
            activeGroupId={activeGroupId}
            onSelect={(groupId) => {
              setMode("detail");
              setActiveGroupId(groupId);
            }}
          />
        </motion.section>
      ) : (
        <motion.section
          key={activeGroup.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="grid min-h-[calc(100vh-12rem)]"
        >
          <GroupDetailStage group={activeGroup} />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
