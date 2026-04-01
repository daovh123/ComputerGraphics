import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, RotateCcw, Trophy } from "lucide-react";
import { cn } from "../../lib/utils";
import { type View } from "../../router/views";
import { LESSON30_QUIZ_QUESTIONS } from "../../data/lesson30/quiz";

type Phase = "intro" | "question" | "reveal" | "result";

const OPTION_COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-yellow-400",
  "bg-green-500",
] as const;

export default function Lesson30Quiz({
  setCurrentView,
}: {
  setCurrentView: (view: View) => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const current = useMemo(() => LESSON30_QUIZ_QUESTIONS[index], [index]);
  const total = LESSON30_QUIZ_QUESTIONS.length;

  const start = () => {
    setScore(0);
    setCorrectCount(0);
    setIndex(0);
    setSelectedIndex(null);
    setTimeLeft(LESSON30_QUIZ_QUESTIONS[0].timeLimitSec);
    setPhase("question");
  };

  const reset = () => {
    setPhase("intro");
    setIndex(0);
    setSelectedIndex(null);
    setTimeLeft(0);
    setScore(0);
    setCorrectCount(0);
  };

  useEffect(() => {
    if (phase !== "question") return;

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [phase, index]);

  useEffect(() => {
    if (phase !== "question") return;
    if (timeLeft > 0) return;
    setPhase("reveal");
  }, [phase, timeLeft]);

  const onPick = (optIndex: number) => {
    if (phase !== "question") return;

    setSelectedIndex(optIndex);
    setPhase("reveal");

    const isCorrect = optIndex === current.answerIndex;
    if (isCorrect) {
      setCorrectCount((v) => v + 1);
      const bonus = Math.round((timeLeft / current.timeLimitSec) * 500);
      setScore((s) => s + 500 + bonus);
    }
  };

  const next = () => {
    const isLast = index >= total - 1;
    if (isLast) {
      setPhase("result");
      return;
    }

    const nextIndex = index + 1;
    setIndex(nextIndex);
    setSelectedIndex(null);
    setTimeLeft(LESSON30_QUIZ_QUESTIONS[nextIndex].timeLimitSec);
    setPhase("question");
  };

  const progressPercent = useMemo(() => {
    if (phase === "intro" || phase === "result") return 0;
    return Math.round((timeLeft / current.timeLimitSec) * 100);
  }, [current.timeLimitSec, phase, timeLeft]);

  const correctOptionText = current?.options?.[current.answerIndex];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-purple-50 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-[#333]">
            Quiz
          </h2>
          <p className="text-[#666] text-lg leading-relaxed max-w-3xl">
            Trả lời nhanh – đúng được nhiều điểm hơn. Mỗi câu có giới hạn thời
            gian.
          </p>
        </div>
      </div>

      {phase === "intro" && (
        <div className="bg-[#1a1a1a] rounded-[40px] p-8 md:p-12 text-white shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#00BFFF]">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <p className="text-white/60 font-bold uppercase tracking-wider text-xs">
                {total} câu hỏi
              </p>
              <p className="text-2xl font-black">Sẵn sàng chưa?</p>
            </div>
          </div>
          <button
            onClick={start}
            className="bg-[#00BFFF] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-[1.02] transition-all"
          >
            Bắt đầu
          </button>
        </div>
      )}

      {(phase === "question" || phase === "reveal") && (
        <div className="bg-white rounded-[40px] border border-[#E0F0FF] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 bg-[#1a1a1a] text-white space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/70 font-bold">
                Câu {index + 1}/{total}
              </p>
              <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 font-black">
                {timeLeft}s
              </div>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00BFFF] transition-[width] duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <h3 className="text-xl md:text-2xl font-black leading-relaxed">
              {current.question}
            </h3>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.options.map((opt, optIndex) => {
              const isCorrect = optIndex === current.answerIndex;
              const isSelected = selectedIndex === optIndex;
              const showReveal = phase === "reveal";

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onPick(optIndex)}
                  className={cn(
                    "min-h-20 rounded-3xl p-5 text-left font-black text-white transition-all",
                    OPTION_COLORS[optIndex],
                    phase === "question" && "hover:scale-[1.01]",
                    showReveal && isCorrect && "ring-4 ring-[#00BFFF]",
                    showReveal && isSelected && !isCorrect && "ring-4 ring-red-200",
                    showReveal && !isSelected && !isCorrect && "opacity-70",
                  )}
                  aria-disabled={phase !== "question"}
                >
                  <span className="block text-base md:text-lg leading-relaxed">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-6 md:px-8 pb-8">
            <div className="bg-[#F5F9FF] rounded-3xl border border-[#E0F0FF] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="font-black text-[#333]">
                  Điểm: <span className="text-[#00BFFF]">{score}</span>
                </p>
                {phase === "reveal" && (
                  <p className="text-[#666] font-medium">
                    Đáp án đúng:{" "}
                    <span className="font-black">{correctOptionText}</span>
                  </p>
                )}
              </div>

              {phase === "reveal" ? (
                <button
                  onClick={next}
                  className="bg-[#00BFFF] text-white px-7 py-3 rounded-2xl font-bold shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-colors inline-flex items-center justify-center gap-2"
                >
                  Tiếp tục <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <p className="text-[#666] font-bold">Chọn 1 đáp án</p>
              )}
            </div>
          </div>
        </div>
      )}

      {phase === "result" && (
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F0F8FF] border border-[#E0F0FF] flex items-center justify-center text-[#00BFFF]">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[#666] font-bold">Kết quả</p>
              <h3 className="text-3xl font-black text-[#333]">
                {correctCount}/{total} câu đúng
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#1a1a1a] text-white">
            <p className="text-white/70 font-bold">Tổng điểm</p>
            <p className="text-5xl font-black text-[#00BFFF]">{score}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={start}
              className="bg-[#00BFFF] text-white px-7 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2"
            >
              Chơi lại <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentView("lesson-30-summary")}
              className="bg-white text-[#00BFFF] px-7 py-4 rounded-2xl font-bold text-base border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all inline-flex items-center justify-center gap-2"
            >
              Về Tổng kết <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={reset}
              className="bg-white text-[#00BFFF] px-7 py-4 rounded-2xl font-bold text-base border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all inline-flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
