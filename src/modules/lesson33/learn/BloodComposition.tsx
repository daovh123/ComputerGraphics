import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { useLessonStepProgression } from "../../../components/lesson-player/useLessonStepEnterAction";

type BloodLayer = {
  id: string;
  label: string;
  tubeLabel: string;
  subtitle: string;
  percentLabel: string;
  heightPercent: number;
  color: string;
  textColor: string;
  description: string;
  details: Array<{ label: string; value: string }>;
};

const bloodLayers: BloodLayer[] = [
  {
    id: "plasma",
    label: "Huyết tương",
    tubeLabel: "Huyết tương",
    subtitle: "Phần dịch lỏng của máu",
    percentLabel: "55%",
    heightPercent: 55,
    color: "#D6AE4D",
    textColor: "#5B3A00",
    description:
      "Huyết tương là môi trường lỏng giúp vận chuyển chất dinh dưỡng, hormone, khí hòa tan và chất thải trong cơ thể.",
    details: [
      { label: "Thành phần chính", value: "Nước, protein, muối khoáng" },
      { label: "Vai trò", value: "Vận chuyển các chất hòa tan" },
      { label: "Tỉ lệ", value: "Chiếm phần thể tích lớn nhất của máu" },
    ],
  },
  {
    id: "buffy",
    label: "Lớp bạch cầu và tiểu cầu",
    tubeLabel: "BC + TC",
    subtitle: "Một lớp rất mỏng sau ly tâm",
    percentLabel: "<1%",
    heightPercent: 6,
    color: "#EEF0D0",
    textColor: "#55603A",
    description:
      "Lớp mỏng này chứa bạch cầu và tiểu cầu. Dù chiếm tỉ lệ rất nhỏ, đây là thành phần quan trọng cho miễn dịch và đông máu.",
    details: [
      { label: "Bạch cầu", value: "Giúp cơ thể chống tác nhân gây bệnh" },
      { label: "Tiểu cầu", value: "Tham gia tạo nút chặn khi mạch máu tổn thương" },
      { label: "Đặc điểm", value: "Mỏng nhưng chức năng rất quan trọng" },
    ],
  },
  {
    id: "red-cells",
    label: "Hồng cầu",
    tubeLabel: "Hồng cầu",
    subtitle: "Lớp tế bào máu dày nhất",
    percentLabel: "Khoảng 45%",
    heightPercent: 39,
    color: "#B6323C",
    textColor: "#FFE7EA",
    description:
      "Hồng cầu chiếm phần lớn trong khối tế bào máu. Chúng mang oxygen từ phổi đến các tế bào và mang carbon dioxide theo chiều ngược lại.",
    details: [
      { label: "Chức năng", value: "Vận chuyển oxygen và carbon dioxide" },
      { label: "Màu sắc", value: "Đỏ do chứa hemoglobin" },
      { label: "Tỉ lệ", value: "Chiếm phần lớn khối tế bào máu" },
    ],
  },
];

function BloodTube({
  activeLayerId,
  onSelectLayer,
}: {
  activeLayerId: string;
  onSelectLayer: (layerId: string) => void;
}) {
  let currentBottom = 0;
  const activeLayer = bloodLayers.find((layer) => layer.id === activeLayerId) ?? bloodLayers[0];
  const activeBottom =
    bloodLayers
      .slice()
      .reverse()
      .reduce<{ value: number; found: boolean }>(
        (acc, layer) => {
          if (acc.found) {
            return acc;
          }

          if (layer.id === activeLayerId) {
            return { value: acc.value + layer.heightPercent / 2, found: true };
          }

          return { value: acc.value + layer.heightPercent, found: false };
        },
        { value: 0, found: false },
      ).value || 50;

  return (
    <div className="mx-auto flex w-full max-w-[11rem] flex-col items-center">
      <div className="h-6 w-16 rounded-t-xl bg-[#2F7F88]" />
      <div className="relative h-[29rem] w-24 overflow-visible rounded-b-[2.25rem] border-[3px] border-white/50 bg-white/25 shadow-[inset_10px_0_24px_rgba(255,255,255,0.16)]">
        {bloodLayers
          .slice()
          .reverse()
          .map((layer) => {
            const isActive = layer.id === activeLayerId;
            const segment = (
              <button
                key={layer.id}
                type="button"
                onClick={() => onSelectLayer(layer.id)}
                className="absolute left-0 right-0 flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  bottom: `${currentBottom}%`,
                  height: `${layer.heightPercent}%`,
                  background: layer.color,
                  filter:
                    isActive
                      ? "brightness(1.08) saturate(1.05)"
                      : "brightness(0.96)",
                  boxShadow: isActive
                    ? "inset 0 0 0 2px rgba(255,255,255,0.7)"
                    : "none",
                }}
              >
                <span
                  className={cn(
                    "px-1 text-center font-semibold leading-tight",
                    layer.id === "buffy" ? "text-[9px]" : "text-[11px]",
                  )}
                  style={{ color: layer.textColor }}
                >
                  {layer.tubeLabel}
                </span>
                {layer.id !== "buffy" ? (
                  <span
                    className="mt-1 text-[10px] opacity-80"
                    style={{ color: layer.textColor }}
                  >
                    {layer.percentLabel}
                  </span>
                ) : null}
              </button>
            );

            currentBottom += layer.heightPercent;
            return segment;
          })}

        <div
          className="pointer-events-none absolute -right-16 z-20 transition-all duration-300"
          style={{ bottom: `calc(${activeBottom}% - 0.9rem)` }}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#0EA5E9] shadow-[0_0_0_6px_rgba(14,165,233,0.12)]" />
            <span className="h-px w-8 bg-[#0EA5E9]" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.24em] text-[#94A3B8]">
        Mẫu máu sau ly tâm
      </p>
      <p className="mt-2 text-center text-xs font-semibold text-[#0F172A]">
        {activeLayer.label}
      </p>
    </div>
  );
}

export default function BloodComposition() {
  const [mode, setMode] = useState<"intro" | "explore">("intro");
  const [activeLayerId, setActiveLayerId] = useState("plasma");

  const activeIndex = bloodLayers.findIndex((layer) => layer.id === activeLayerId);
  const activeLayer = useMemo(
    () => bloodLayers.find((layer) => layer.id === activeLayerId) ?? bloodLayers[0],
    [activeLayerId],
  );

  useLessonStepProgression({
    canGoNext: mode === "intro" || activeIndex < bloodLayers.length - 1,
    onNext: () => {
      if (mode === "intro") {
        setMode("explore");
        return;
      }

      const nextLayer = bloodLayers[activeIndex + 1];

      if (nextLayer) {
        setActiveLayerId(nextLayer.id);
      }
    },
    canGoBack: mode === "explore",
    onBack: () => {
      if (activeIndex > 0) {
        setActiveLayerId(bloodLayers[activeIndex - 1].id);
        return;
      }

      setMode("intro");
    },
  });

  if (mode === "intro") {
    return (
      <section className="grid min-h-[calc(100vh-12rem)] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="pt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
            Thành phần của máu
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#020617] md:text-6xl">
            Nếu quay nhanh một mẫu máu,
            <br />
            em sẽ thấy gì?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#475569]">
            Khi ly tâm, máu không còn là một khối đỏ đồng nhất. Các thành phần
            của nó tách ra thành những lớp khác nhau theo tỉ lệ và khối lượng.
          </p>
        </div>

        <div className="min-w-0">
          <BloodTube activeLayerId={activeLayerId} onSelectLayer={setActiveLayerId} />
        </div>
      </section>
    );
  }

  return (
    <section className="grid min-h-[calc(100vh-12rem)] items-center gap-12 lg:grid-cols-[1fr_1fr]">
      <motion.div
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="grid gap-8"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
                Khám phá từng lớp máu
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-[#020617] md:text-5xl">
                {activeLayer.label}
              </h2>
              <p className="mt-3 text-lg font-medium text-[#64748B]">
                {activeLayer.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#334155]">
                {activeLayer.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {activeLayer.details.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.26, delay: index * 0.05, ease: "easeOut" }}
                  className="border-t border-[#E2E8F0] pt-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">
                    {detail.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-7 text-[#0F172A]">
                    {detail.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div layout className="flex flex-wrap gap-3">
          {bloodLayers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveLayerId(layer.id)}
              className={
                layer.id === activeLayerId
                  ? "rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white"
                  : "rounded-full border border-[#D7E8FF] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#334155]"
              }
            >
              {layer.label}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="min-w-0"
      >
        <motion.div
          key={`tube-${activeLayer.id}`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <BloodTube activeLayerId={activeLayerId} onSelectLayer={setActiveLayerId} />
        </motion.div>
      </motion.div>
    </section>
  );
}
