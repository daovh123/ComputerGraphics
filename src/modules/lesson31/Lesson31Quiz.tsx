import React, { useMemo, useState } from "react";
import { lesson31KnowledgeContent } from "../../data/lesson31/content";

export default function Lesson31Quiz() {
  const quizQuestions = lesson31KnowledgeContent.quiz;
  const finalActivity = lesson31KnowledgeContent.activity;

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
      return "Rất tốt - Em đã nắm khá chắc nội dung Hệ vận động.";
    }
    if (percent >= 60) {
      return "Tốt - Em đã hiểu phần lớn nội dung, hãy ôn lại một vài mục.";
    }
    return "Cần ôn tập thêm - Thử xem lại bài Khám phá 3D và Sơ cứu.";
  }, [quizQuestions.length, score]);

  const feedbackText = item.feedback || item.explanation || "";
  const promptText = item.prompt || item.question || "";

  const activityResultLabel = useMemo(() => {
    const percent = (activityCorrectCount / activityTotalCount) * 100;
    if (percent >= 80) {
      return "Giỏi lắm, em có một thói quen sinh hoạt rất tốt cho xương khớp!";
    }
    if (percent >= 60) {
      return "Khá tốt, hãy cải thiện một số thói quen để bộ xương khỏe hơn nhé.";
    }
    return "Hãy đọc kỹ và thay đổi thói quen ngay từ bây giờ em nhé.";
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
          <div className="space-y-3 mt-4">
            <p className="text-sm text-[#334155] font-semibold">
              Kết quả chuẩn: {activityCorrectCount}/{activityTotalCount} mục.
            </p>
            <p className="text-sm text-[#475569]">{activityResultLabel}</p>
            <p className="text-sm text-[#475569] italic font-semibold">
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
          <p className="text-[#556070] text-lg">
            Bạn đạt <span className="font-bold text-blue-600">{score}/{quizQuestions.length}</span> câu đúng.
          </p>
          <p className="text-sm text-[#334155]">{scoreLabel}</p>
          <button
            onClick={reset}
            className="mt-4 inline-block px-5 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
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
        <h2 className="text-2xl font-extrabold text-[#333]">Trắc nghiệm Bài 31</h2>
        <span className="text-sm font-bold text-blue-600">
          {progressLabel}
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="inline-flex px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 text-xs font-bold text-blue-800">
        {item.category}
      </div>

      <p className="text-lg font-bold text-[#334155]">{promptText}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {item.options.map((option, optionIndex) => {
          const selected = picked === optionIndex;
          const showCorrect =
            answered && optionIndex === item.correctAnswerIndex;
          const showWrong = answered && selected && !showCorrect;

          return (
            <button
              key={optionIndex}
              onClick={() => onPick(optionIndex)}
              disabled={answered}
              className={`p-4 rounded-xl border text-left transition-colors font-medium ${
                showCorrect
                  ? "border-green-500 bg-green-50 text-green-700"
                  : showWrong
                    ? "border-red-500 bg-red-50 text-red-700"
                    : selected
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-slate-200 hover:border-blue-400 bg-white text-slate-600"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
        <p className="text-sm font-medium text-slate-500">
          {picked === null
            ? "Vui lòng chọn một đáp án"
            : !answered
              ? "Nhấn \"Kiểm tra\" để xem kết quả"
              : isCorrect
                ? "Chính xác! ✨"
                : "Chưa đúng ❌"}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCheckAnswer}
            disabled={picked === null || answered}
            className="px-6 py-2.5 rounded-xl bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold transition-colors"
          >
            Kiểm tra
          </button>
          <button
            onClick={onNext}
            disabled={!answered}
            className="px-6 py-2.5 rounded-xl bg-blue-600 disabled:bg-blue-200 text-white font-bold transition-colors"
          >
            {index === quizQuestions.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        </div>
      </div>

      {answered && (
        <div className={`rounded-xl border p-4 text-sm mt-6 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-rose-200 bg-rose-50'}`}>
          <p className="font-semibold mb-2">
            Giải thích:
          </p>
          <p className="text-slate-700">
            {feedbackText}
          </p>
          {!isCorrect && (
            <p className="mt-2 text-rose-800 font-medium">
              Đáp án đúng: {item.options[item.correctAnswerIndex]}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
