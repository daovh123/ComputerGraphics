import React, { useMemo, useState } from "react";
import { Activity, Heart, ShieldCheck } from "lucide-react";

type HabitKey = "exercise" | "salt" | "sleep" | "smoking";

const initialHabits: Record<HabitKey, boolean> = {
  exercise: true,
  salt: false,
  sleep: true,
  smoking: false,
};

const habitLabels: Record<HabitKey, { label: string; good: string; bad: string }> = {
  exercise: {
    label: "Vận động hằng ngày",
    good: "Có vận động đều",
    bad: "Ít vận động",
  },
  salt: {
    label: "Chế độ ăn nhiều muối",
    good: "Ăn nhạt hơn",
    bad: "Ăn mặn thường xuyên",
  },
  sleep: {
    label: "Ngủ đủ giấc",
    good: "Ngủ điều độ",
    bad: "Ngủ thất thường",
  },
  smoking: {
    label: "Hút thuốc lá",
    good: "Không hút thuốc",
    bad: "Có hút thuốc",
  },
};

function computeScore(habits: Record<HabitKey, boolean>) {
  let score = 100;
  if (!habits.exercise) score -= 20;
  if (habits.salt) score -= 25;
  if (!habits.sleep) score -= 15;
  if (habits.smoking) score -= 30;
  return Math.max(0, score);
}

function buildAdvice(habits: Record<HabitKey, boolean>) {
  const notes: string[] = [];
  if (!habits.exercise) notes.push("Tăng vận động giúp tim và mạch máu làm việc hiệu quả hơn.");
  if (habits.salt) notes.push("Ăn mặn kéo dài làm tăng nguy cơ cao huyết áp.");
  if (!habits.sleep) notes.push("Ngủ đủ giúp cơ thể ổn định nhịp sinh học và giảm căng thẳng.");
  if (habits.smoking) notes.push("Thuốc lá làm tăng nguy cơ xơ vữa động mạch và tổn thương mạch máu.");
  if (notes.length === 0) {
    notes.push("Thói quen hiện tại đang khá tốt cho hệ tuần hoàn. Hãy duy trì đều đặn.");
  }
  return notes;
}

export default function CirculationHealthLab() {
  const [habits, setHabits] = useState(initialHabits);

  const score = useMemo(() => computeScore(habits), [habits]);
  const advice = useMemo(() => buildAdvice(habits), [habits]);
  const status =
    score >= 85 ? "Rất tốt" : score >= 65 ? "Cần duy trì" : score >= 45 ? "Cần cải thiện" : "Nguy cơ cao";
  const statusClass =
    score >= 85
      ? "bg-emerald-100 text-emerald-700"
      : score >= 65
        ? "bg-sky-100 text-sky-700"
        : score >= 45
          ? "bg-amber-100 text-amber-700"
          : "bg-rose-100 text-rose-700";

  return (
    <section className="grid gap-6 rounded-[36px] border border-[#E0F0FF] bg-white p-8 shadow-sm lg:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8FF] bg-[#F5FBFF] px-4 py-2 text-sm font-bold text-[#0369A1]">
          <Activity className="h-4 w-4" />
          Mô phỏng lối sống
        </div>
        <h3 className="text-3xl font-black text-[#0F172A]">Thói quen ảnh hưởng hệ tuần hoàn ra sao?</h3>
        <p className="max-w-2xl text-base leading-7 text-[#475569]">
          Bật tắt từng thói quen để xem sức khỏe tim mạch thay đổi thế nào. Phần này giúp sản phẩm
          có tính ứng dụng rõ hơn khi dùng để giảng dạy hoặc thảo luận với học sinh.
        </p>

        <div className="grid gap-3">
          {(Object.keys(habits) as HabitKey[]).map((key) => {
            const enabled = habits[key];
            const config = habitLabels[key];
            const isPositive = key === "exercise" || key === "sleep";
            const currentLabel = enabled
              ? isPositive
                ? config.good
                : config.bad
              : isPositive
                ? config.bad
                : config.good;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setHabits((current) => ({ ...current, [key]: !current[key] }))}
                className="flex items-center justify-between rounded-[24px] border border-[#E2E8F0] bg-white px-5 py-4 text-left shadow-sm transition hover:border-[#BAE6FD] hover:bg-[#F8FCFF]"
              >
                <div>
                  <p className="text-lg font-bold text-[#0F172A]">{config.label}</p>
                  <p className="mt-1 text-sm text-[#64748B]">{currentLabel}</p>
                </div>
                <span
                  className={
                    enabled
                      ? "inline-flex h-10 w-16 items-center justify-end rounded-full bg-[#0EA5E9] px-1"
                      : "inline-flex h-10 w-16 items-center justify-start rounded-full bg-[#CBD5E1] px-1"
                  }
                >
                  <span className="h-8 w-8 rounded-full bg-white shadow-sm" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[30px] bg-[linear-gradient(145deg,#082F49,#0EA5E9_55%,#E0F2FE)] p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              Chỉ số hiện tại
            </p>
            <h4 className="mt-2 text-3xl font-black">Sức khỏe tuần hoàn</h4>
          </div>
          <div className={`rounded-full px-4 py-2 text-sm font-bold ${statusClass}`}>{status}</div>
        </div>

        <div className="mt-6 rounded-[28px] bg-white/12 p-6 backdrop-blur">
          <div className="flex items-end gap-4">
            <Heart className="h-8 w-8 text-white/90" />
            <p className="text-6xl font-black">{score}</p>
            <p className="pb-2 text-lg font-semibold text-white/75">/ 100</p>
          </div>
          <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-sky-300 to-rose-300 transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-white/12 p-6 backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            <ShieldCheck className="h-4 w-4" />
            Gợi ý phòng ngừa
          </div>
          <div className="mt-4 space-y-3">
            {advice.map((note) => (
              <div key={note} className="rounded-2xl bg-white/10 px-4 py-3 text-sm leading-6 text-white">
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
