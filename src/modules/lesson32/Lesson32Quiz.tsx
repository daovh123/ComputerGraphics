import React, { useMemo, useState } from "react";
import { lesson32KnowledgeContent } from "../../data/lesson32/content";

export default function Lesson32Quiz() {
  const quizQuestions = lesson32KnowledgeContent.quiz;
  const finalActivity = lesson32KnowledgeContent.activity;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const [activitySelections, setActivitySelections] = useState<string[]>([]);
  const [activitySubmitted, setActivitySubmitted] = useState(false);

  const item = quizQuestions[index];
  const isCorrect = picked === item.correctAnswerIndex;
  const progressPercent = ((index + 1) / quizQuestions.length) * 100;

  const progressLabel = useMemo(
    () => `${index + 1}/${quizQuestions.length}`,
    [index],
  );

  const onPick = (optionIndex: number) => {
    if (answered) {
      return;
    }
    setPicked(optionIndex);
  };

  const onCheckAnswer = () => {
    if (picked === null || answered) {
      return;
    }
    setAnswered(true);
    if (picked === item.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const onNext = () => {
    if (!answered) {
      return;
    }
    if (index === quizQuestions.length - 1) {
      setDone(true);
      return;
    }
    setIndex((prev) => prev + 1);
    setPicked(null);
    setAnswered(false);
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setPicked(null);
    setAnswered(false);
    setDone(false);
    setActivitySelections([]);
    setActivitySubmitted(false);
  };

  const toggleActivitySelection = (itemId: string) => {
    if (activitySubmitted) {
      return;
    }
    setActivitySelections((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const submitActivity = () => {
    setActivitySubmitted(true);
  };

  const activityCorrectCount = finalActivity.items.filter((activityItem) => {
    const selected = activitySelections.includes(activityItem.id);
    return selected === activityItem.isCorrect;
  }).length;

  const activityTotalCount = finalActivity.items.length;

  const scoreLabel = useMemo(() => {
    const percent = (score / quizQuestions.length) * 100;
    if (percent >= 80) {
      return "Rất tốt - Em đã nắm khá chắc nội dung bài học.";
    }
    if (percent >= 60) {
      return "Tốt - Em đã hiểu phần lớn nội dung, hãy ôn lại một vài mục.";
    }
    return "Cần ôn tập thêm - Thử xem lại từng màn học và làm lại trắc nghiệm.";
  }, [quizQuestions.length, score]);

  const feedbackText = item.feedback || item.explanation || "";
  const promptText = item.prompt || item.question || "";

  const activityResultLabel = useMemo(() => {
    const percent = (activityCorrectCount / activityTotalCount) * 100;
    if (percent >= 80) {
      return "Em đã chọn rất chính xác các thói quen tốt.";
    }
    if (percent >= 60) {
      return "Kết quả khá tốt, em cần xem lại một vài thói quen.";
    }
    return "Em nên đọc lại gợi ý và thử lại hoạt động.";
  }, [activityCorrectCount, activityTotalCount]);

  const renderActivity = () => {
    return (
      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4 text-left">
        <h3 className="text-xl font-extrabold text-[#1f2937]">
          {finalActivity.title}
        </h3>
        <p className="text-sm text-[#556070]">{finalActivity.instruction}</p>

        <div className="space-y-2">
          {finalActivity.items.map((activityItem) => {
            const checked = activitySelections.includes(activityItem.id);
            const showCorrect = activitySubmitted && activityItem.isCorrect;
            const showWrong =
              activitySubmitted && checked && !activityItem.isCorrect;

            return (
              <label
                key={activityItem.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer ${
                  showCorrect
                    ? "border-green-400 bg-green-50"
                    : showWrong
                      ? "border-red-400 bg-red-50"
                      : "border-[#DDEEFF] bg-[#F8FCFF]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={activitySubmitted}
                  onChange={() => toggleActivitySelection(activityItem.id)}
                  className="mt-1"
                />
                <span className="text-sm text-[#334155]">
                  {activityItem.label}
                </span>
              </label>
            );
          })}
        </div>

        {!activitySubmitted ? (
          <button
            onClick={submitActivity}
            className="px-5 py-2 rounded-xl bg-[#00BFFF] text-white font-bold hover:bg-[#009FD8] transition-colors"
          >
            Chấm hoạt động
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-[#334155] font-semibold">
              Kết quả hoạt động: {activityCorrectCount}/{activityTotalCount} mục
              đúng.
            </p>
            <p className="text-sm text-[#475569]">{activityResultLabel}</p>
            <p className="text-sm text-[#475569]">
              {finalActivity.feedbackSummary}
            </p>
          </div>
        )}
      </section>
    );
  };

  if (done) {
    return (
      <div className="space-y-5">
        <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-[#333]">
            Hoàn thành trắc nghiệm
          </h2>
          <p className="text-[#556070]">
            Bạn đạt {score}/{quizQuestions.length} câu đúng.
          </p>
          <p className="text-sm text-[#334155]">{scoreLabel}</p>
          <button
            onClick={reset}
            className="px-5 py-2 rounded-xl bg-[#00BFFF] text-white font-bold hover:bg-[#009FD8] transition-colors"
          >
            Làm lại từ đầu
          </button>
        </div>
        {renderActivity()}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-[#333]">Trắc nghiệm Bài 32</h2>
        <span className="text-sm font-bold text-[#00BFFF]">
          {progressLabel}
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-[#E8F3FF] overflow-hidden">
        <div
          className="h-full bg-[#00BFFF] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="inline-flex px-3 py-1 rounded-lg bg-[#F2FAFF] border border-[#D8F1FF] text-xs font-bold text-[#0369A1]">
        {item.category}
      </div>

      <p className="text-lg font-bold text-[#334155]">{promptText}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {item.options.map((option, optionIndex) => {
          const selected = picked === optionIndex;
          const showCorrect =
            answered && optionIndex === item.correctAnswerIndex;
          const showWrong = answered && selected && !showCorrect;

          return (
            <button
              key={option}
              onClick={() => onPick(optionIndex)}
              disabled={answered}
              className={`p-4 rounded-xl border text-left transition-colors ${
                showCorrect
                  ? "border-green-500 bg-green-50 text-green-700"
                  : showWrong
                    ? "border-red-500 bg-red-50 text-red-700"
                    : selected
                      ? "border-[#00BFFF] bg-[#F2FAFF] text-[#0F172A]"
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
            ? "Chọn đáp án"
            : !answered
              ? "Nhấn \"Kiểm tra\" để xem kết quả"
              : isCorrect
                ? "Đúng"
                : "Sai"}
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCheckAnswer}
            disabled={picked === null || answered}
            className="px-5 py-2 rounded-xl bg-white border border-[#E0F0FF] text-[#00BFFF] font-bold transition-colors hover:bg-[#F0F8FF] hover:border-[#00BFFF] disabled:bg-[#F8FBFF] disabled:text-[#94a3b8] disabled:border-[#E0F0FF]"
          >
            Kiểm tra
          </button>
          <button
            onClick={onNext}
            disabled={!answered}
            className="px-5 py-2 rounded-xl bg-[#00BFFF] hover:bg-[#009FD8] disabled:bg-[#B7E8FF] text-white font-bold transition-colors"
          >
            {index === quizQuestions.length - 1 ? "Xem kết quả" : "Câu tiếp"}
          </button>
        </div>
      </div>

      {answered && (
        <div className="rounded-xl border border-[#DDF0FF] bg-[#F8FCFF] p-3 text-sm text-[#334155] space-y-1">
          <p>
            <span className="font-bold">Kết quả: </span>
            {isCorrect ? "Đúng" : "Sai"}
          </p>
          <p>
            <span className="font-bold">Gợi ý: </span>
            {feedbackText}
          </p>
          {!isCorrect && (
            <p>
              <span className="font-bold">Đáp án đúng: </span>
              {item.options[item.correctAnswerIndex]}
            </p>
          )}
        </div>
      )}

      <div className="rounded-xl border border-[#EAF5FF] bg-[#F8FCFF] p-3 text-xs text-[#475569]">
        Phạm vi trắc nghiệm: dinh dưỡng, cơ quan tiêu hóa, quá trình tiêu hóa,
        bệnh đường tiêu hóa, an toàn thực phẩm.
      </div>
    </div>
  );
}
