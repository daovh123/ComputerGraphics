import React, { useState } from "react";
import { type View } from "../../router/views";
import { quizData } from "../../data/lesson33/quiz";
import {
  CheckCircle2,
  ChevronRight,
  Gamepad2,
  Info,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { cn } from "../../lib/utils";

export default function Lesson33Quiz({ setCurrentView }: { setCurrentView: (view: View) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = quizData[currentQuestion];
  const progressLabel = `${currentQuestion + 1}/${quizData.length}`;
  const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
  const isCorrect = selectedOption === question.correct;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizData[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const percent = Math.round((score / quizData.length) * 100);

    return (
      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-[#333]">Hoàn thành trắc nghiệm</h2>
        <p className="text-[#556070]">
          Bạn đạt <span className="font-bold text-[#00BFFF]">{score}</span>/{quizData.length} câu đúng.
        </p>

        <div className="h-2 rounded-full bg-[#E8F3FF] overflow-hidden">
          <div
            className="h-full bg-[#00BFFF] transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm text-[#64748B]">Tỉ lệ đúng: {percent}%</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={resetQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#00BFFF] border border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] font-bold transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Làm lại
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("lesson-33-overview" as View)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#00BFFF] text-white font-bold shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-colors"
          >
            Về Tổng quan
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[#333]">Trắc nghiệm Bài 33</h2>
          <p className="text-sm text-[#64748B]">Chọn đáp án đúng nhất</p>
        </div>

        <div className="text-right space-y-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F8FF] text-[#00BFFF] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Gamepad2 className="w-4 h-4" /> {progressLabel}
          </span>
          <div className="text-sm font-bold text-[#666]">Điểm: {score}</div>
        </div>
      </div>

      <div className="h-2 rounded-full bg-[#E8F3FF] overflow-hidden">
        <div
          className="h-full bg-[#00BFFF] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="rounded-2xl border border-[#DDF0FF] bg-[#F8FCFF] p-4 md:p-5">
        <p className="text-lg md:text-xl font-bold text-[#334155] leading-relaxed">
          {question.question}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = index === question.correct;
          const showCorrect = isAnswered && isCorrectOption;
          const showWrong = isAnswered && isSelected && !isCorrectOption;

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleOptionClick(index)}
              disabled={isAnswered}
              className={cn(
                "p-4 md:p-5 rounded-2xl border text-left transition-colors flex items-start gap-4",
                !isAnswered &&
                  "bg-white border-[#DCEEFF] hover:border-[#00BFFF] hover:bg-[#F5F9FF]",
                showCorrect && "border-green-500 bg-green-50 text-green-700",
                showWrong && "border-red-500 bg-red-50 text-red-700",
                isAnswered && !showCorrect && !showWrong &&
                  (isCorrectOption
                    ? "border-green-200 bg-green-50/60 text-green-700/80"
                    : "border-slate-200 bg-slate-50 text-slate-400"),
              )}
            >
              <span
                className={cn(
                  "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black",
                  !isAnswered && "bg-[#F0F8FF] text-[#00BFFF]",
                  showCorrect && "bg-green-500 text-white",
                  showWrong && "bg-red-500 text-white",
                  isAnswered && !showCorrect && !showWrong &&
                    (isCorrectOption
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-400"),
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>

              <span className="flex-1">
                <span className="block font-bold text-base md:text-lg">
                  {option}
                </span>
              </span>

              {isAnswered && isSelected ? (
                isCorrectOption ? (
                  <CheckCircle2 className="mt-1 h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="mt-1 h-6 w-6 text-red-600" />
                )
              ) : null}
            </button>
          );
        })}
      </div>

      {isAnswered ? (
        <div
          className={cn(
            "rounded-xl border p-4 text-sm space-y-2",
            isCorrect
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800",
          )}
        >
          <p className="font-semibold flex items-start gap-2">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{question.explanation}</span>
          </p>
          {!isCorrect ? (
            <p>
              <span className="font-bold">Đáp án đúng:</span> {question.options[question.correct]}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#64748B]">
          {!isAnswered ? "Chọn đáp án" : isCorrect ? "Đúng" : "Sai"}
        </p>

        <button
          type="button"
          onClick={handleNext}
          disabled={!isAnswered}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00BFFF] disabled:bg-[#B7E8FF] text-white font-bold transition-colors"
        >
          {currentQuestion === quizData.length - 1 ? "Xem kết quả" : "Câu tiếp"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
