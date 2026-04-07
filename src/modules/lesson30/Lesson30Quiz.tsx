import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, RotateCcw, Trophy } from "lucide-react";
import { cn } from "../../lib/utils";
import { LESSON_CARD_BASE } from "../../components/lessonClassNames";
import { type View } from "../../router/views";
import { LESSON30_QUIZ_QUESTIONS } from "../../data/lesson30/quiz";

type Phase = "intro" | "question" | "reveal" | "result";

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
  const isLastQuestion = index >= total - 1;
  const percentCorrect = Math.round((correctCount / total) * 100);

  return (
    <div className="space-y-6">
      {phase === "intro" ? (
        <section className={cn(LESSON_CARD_BASE, "rounded-3xl p-8 shadow-sm space-y-6")}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F0F8FF] border border-[#E0F0FF] flex items-center justify-center text-[#00BFFF]">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[#64748B] font-bold uppercase tracking-wider text-xs">
                {total} câu hỏi • Có tính thời gian
              </p>
              <p className="text-2xl font-black text-[#333]">Trắc nghiệm Bài 30</p>
            </div>
          </div>

          <p className="text-[#556070] text-base leading-relaxed max-w-3xl">
            Trả lời nhanh – đúng được nhiều điểm hơn. Mỗi câu có giới hạn thời gian.
          </p>

          <button
            type="button"
            onClick={start}
            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg bg-[#00BFFF] text-white shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-colors"
          >
            Bắt đầu
          </button>
        </section>
      ) : null}

      {phase === "question" || phase === "reveal" ? (
        <section className={cn(LESSON_CARD_BASE, "rounded-3xl p-8 shadow-sm space-y-6")}
        >
          <header className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#333]">Trắc nghiệm Bài 30</h2>
              <p className="text-sm text-[#64748B]">Chọn đáp án đúng nhất</p>
            </div>

            <div className="text-right space-y-2">
              <div className="flex items-center justify-end gap-2">
                <span className="inline-flex items-center rounded-full bg-[#F0F8FF] text-[#00BFFF] px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  Câu {index + 1}/{total}
                </span>
                <span className="inline-flex items-center rounded-full bg-[#0f172a] text-white px-3 py-1 text-xs font-black">
                  {timeLeft}s
                </span>
              </div>
              <p className="text-sm font-black text-[#333]">
                Điểm: <span className="text-[#00BFFF]">{score}</span>
              </p>
            </div>
          </header>

          <div className="h-2 rounded-full bg-[#E8F3FF] overflow-hidden">
            <div
              className="h-full bg-[#00BFFF] transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="rounded-2xl border border-[#DDF0FF] bg-[#F8FCFF] p-4 md:p-5">
            <p className="text-lg md:text-xl font-bold text-[#334155] leading-relaxed">
              {current.question}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.options.map((opt, optIndex) => {
              const showReveal = phase === "reveal";
              const isCorrect = optIndex === current.answerIndex;
              const isSelected = selectedIndex === optIndex;
              const showCorrect = showReveal && isCorrect;
              const showWrong = showReveal && isSelected && !isCorrect;

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onPick(optIndex)}
                  disabled={phase !== "question"}
                  className={cn(
                    "p-4 md:p-5 rounded-2xl border text-left transition-colors flex items-start gap-4",
                    !showReveal &&
                      "bg-white border-[#DCEEFF] hover:border-[#00BFFF] hover:bg-[#F5F9FF]",
                    showCorrect && "border-green-500 bg-green-50 text-green-700",
                    showWrong && "border-red-500 bg-red-50 text-red-700",
                    showReveal &&
                      !showCorrect &&
                      !showWrong &&
                      "border-slate-200 bg-slate-50 text-slate-400",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black",
                      !showReveal && "bg-[#F0F8FF] text-[#00BFFF]",
                      showCorrect && "bg-green-500 text-white",
                      showWrong && "bg-red-500 text-white",
                      showReveal &&
                        !showCorrect &&
                        !showWrong &&
                        "bg-slate-100 text-slate-400",
                    )}
                  >
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  <span className="font-bold text-base md:text-lg leading-relaxed">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {phase === "reveal" ? (
            <div className="rounded-xl border border-[#DDF0FF] bg-[#F8FCFF] p-4 text-sm text-[#334155] space-y-2">
              <p>
                <span className="font-bold">Đáp án đúng: </span>
                {correctOptionText}
              </p>
              {current.explanation ? (
                <p>
                  <span className="font-bold">Giải thích: </span>
                  {current.explanation}
                </p>
              ) : null}
              {selectedIndex === null ? (
                <p className="text-[#64748B]">Hết thời gian.</p>
              ) : selectedIndex === current.answerIndex ? (
                <p className="font-semibold text-green-700">Chính xác!</p>
              ) : (
                <p className="font-semibold text-red-700">Chưa đúng.</p>
              )}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-4">
            {phase === "reveal" ? (
              <button
                type="button"
                onClick={next}
                className="ml-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl font-bold bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-colors"
              >
                {isLastQuestion ? "Xem kết quả" : "Câu tiếp"}
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <p className="text-sm font-semibold text-[#64748B]">Chọn 1 đáp án</p>
            )}
          </div>
        </section>
      ) : null}

      {phase === "result" ? (
        <section className={cn(LESSON_CARD_BASE, "rounded-3xl p-8 shadow-sm space-y-6")}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F0F8FF] border border-[#E0F0FF] flex items-center justify-center text-[#00BFFF]">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[#64748B] font-bold uppercase tracking-wider text-xs">
                Kết quả
              </p>
              <h3 className="text-3xl font-black text-[#333]">Hoàn thành trắc nghiệm</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-[#DDF0FF] bg-[#F8FCFF] p-5 space-y-3">
            <p className="text-[#556070] font-semibold">
              Bạn trả lời đúng{" "}
              <span className="font-bold text-[#00BFFF]">{correctCount}</span>/{total} câu.
            </p>
            <div className="h-2 rounded-full bg-[#E8F3FF] overflow-hidden">
              <div
                className="h-full bg-[#00BFFF] transition-all duration-300"
                style={{ width: `${percentCorrect}%` }}
              />
            </div>
            <p className="text-sm text-[#64748B]">Tỉ lệ đúng: {percentCorrect}%</p>
          </div>

          <div className="rounded-2xl border border-[#DDF0FF] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Tổng điểm</p>
            <p className="mt-2 text-5xl font-black text-[#00BFFF]">{score}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold bg-[#00BFFF] text-white shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-colors"
            >
              Chơi lại <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentView("lesson-30-summary")}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold bg-white text-[#00BFFF] border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-colors"
            >
              Về Tổng kết <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold bg-white text-[#00BFFF] border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-colors"
            >
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
