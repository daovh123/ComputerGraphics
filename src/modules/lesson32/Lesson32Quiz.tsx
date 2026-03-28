import React, { useMemo, useState } from "react";
import { lesson32Quiz } from "./content";

export default function Lesson32Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const item = lesson32Quiz[index];
  const isCorrect = picked === item.answer;

  const progressLabel = useMemo(
    () => `${index + 1}/${lesson32Quiz.length}`,
    [index],
  );

  const onPick = (optionIndex: number) => {
    if (picked !== null) {
      return;
    }
    setPicked(optionIndex);
    if (optionIndex === item.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const onNext = () => {
    if (index === lesson32Quiz.length - 1) {
      setDone(true);
      return;
    }
    setIndex((prev) => prev + 1);
    setPicked(null);
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  if (done) {
    return (
      <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-[#333]">Hoàn thành quiz</h2>
        <p className="text-[#556070]">
          Bạn đạt {score}/{lesson32Quiz.length} câu đúng.
        </p>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-xl bg-[#00BFFF] text-white font-bold hover:bg-[#009FD8] transition-colors"
        >
          Làm lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-[#333]">Quiz Bài 32</h2>
        <span className="text-sm font-bold text-[#00BFFF]">
          {progressLabel}
        </span>
      </div>
      <p className="text-lg font-bold text-[#334155]">{item.question}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {item.options.map((option, optionIndex) => {
          const selected = picked === optionIndex;
          const showCorrect = picked !== null && optionIndex === item.answer;
          return (
            <button
              key={option}
              onClick={() => onPick(optionIndex)}
              className={`p-4 rounded-xl border text-left transition-colors ${
                showCorrect
                  ? "border-green-500 bg-green-50 text-green-700"
                  : selected
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-[#DCEEFF] hover:border-[#00BFFF] bg-white text-[#475569]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748B]">
          {picked === null
            ? "Chọn đáp án để tiếp tục"
            : isCorrect
              ? "Chính xác"
              : "Chưa đúng"}
        </p>
        <button
          onClick={onNext}
          disabled={picked === null}
          className="px-5 py-2 rounded-xl bg-[#00BFFF] disabled:bg-[#B7E8FF] text-white font-bold transition-colors"
        >
          {index === lesson32Quiz.length - 1 ? "Xem kết quả" : "Câu tiếp"}
        </button>
      </div>
      {picked !== null && (
        <div className="rounded-xl border border-[#DDF0FF] bg-[#F8FCFF] p-3 text-sm text-[#334155]">
          <span className="font-bold">Giải thích: </span>
          <span>{item.explanation}</span>
        </div>
      )}
    </div>
  );
}
