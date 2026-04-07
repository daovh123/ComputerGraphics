import React, { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { quizQuestions } from "../../data/lesson31";

const QUESTION_TIME = 20;

export default function MovementQuizV2() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizQuestions[currentQuestion];
  const isLocked = selectedAnswer !== null;
  const progressPercent = ((currentQuestion + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    if (isFinished || isLocked) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          nextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentQuestion, isFinished, isLocked]);

  const nextQuestion = () => {
    setSelectedAnswer(null);

    if (currentQuestion >= quizQuestions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setTimeLeft(QUESTION_TIME);
  };

  const onSelectAnswer = (answerIndex: number) => {
    if (isLocked || isFinished) {
      return;
    }

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === question.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    window.setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const onRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(QUESTION_TIME);
    setIsFinished(false);
  };

  const timerColorClass = useMemo(() => {
    if (timeLeft <= 5) {
      return "bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]";
    }
    if (timeLeft <= 10) {
      return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
    }
    return "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]";
  }, [timeLeft]);

  if (isFinished) {
    const percent = Math.round((score / quizQuestions.length) * 100);

    return (
      <section className="bg-white border border-[#E0F0FF] rounded-3xl shadow-sm p-6 md:p-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-[#0F172A]">Kết quả bài quiz</h2>
          <p className="text-[#475569]">
            Em trả lời đúng <span className="font-bold text-[#00BFFF]">{score}</span> /{" "}
            <span className="font-bold">{quizQuestions.length}</span> câu.
          </p>
          <div className="h-3 rounded-full bg-[#E8F3FF] overflow-hidden">
            <div
              className="h-full bg-[#00BFFF] transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-sm text-[#64748B]">Tỉ lệ đúng: {percent}%</p>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#00BFFF] text-white font-bold hover:bg-[#009FD8] transition-colors"
          >
            Chơi lại
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border border-[#E0F0FF] rounded-3xl shadow-sm p-6 md:p-8 space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Kiểm tra kiến thức</h2>
          <p className="text-sm md:text-base text-[#64748B] mt-1">Chọn đáp án đúng nhất</p>
        </div>

        <div
          className={cn(
            "h-12 w-12 rounded-full border text-sm font-bold flex items-center justify-center transition-colors",
            timerColorClass,
          )}
        >
          {timeLeft}s
        </div>
      </header>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-[#64748B]">
          <span>
            Câu {currentQuestion + 1}/{quizQuestions.length}
          </span>
          <span>Điểm: {score}</span>
        </div>
        <div className="h-2.5 rounded-full bg-[#E8F3FF] overflow-hidden">
          <div
            className="h-full bg-[#00BFFF] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 md:p-5">
        <p className="text-lg md:text-xl font-bold text-[#1E293B] leading-relaxed">{question.question}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, optionIndex) => {
          const isCorrectOption = optionIndex === question.correctAnswer;
          const isSelected = optionIndex === selectedAnswer;
          const showCorrect = isLocked && isCorrectOption;
          const showWrong = isLocked && isSelected && !isCorrectOption;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelectAnswer(optionIndex)}
              disabled={isLocked}
              className={cn(
                "text-left p-4 rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-[1px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]/30",
                showCorrect && "border-[#22C55E] bg-[#DCFCE7] text-[#166534]",
                showWrong && "border-[#EF4444] bg-[#FEE2E2] text-[#991B1B]",
                !showCorrect &&
                  !showWrong &&
                  "border-[#DCEEFF] hover:border-[#00BFFF]/60 hover:bg-[#F0F9FF] text-[#334155]",
              )}
            >
              <span className="font-semibold">{option}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
