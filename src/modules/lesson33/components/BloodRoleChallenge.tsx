import React, { useMemo, useState } from "react";
import { CheckCircle2, Puzzle, RefreshCcw, XCircle } from "lucide-react";

type ChallengeCard = {
  id: string;
  label: string;
  answer: string;
};

const challengeCards: ChallengeCard[] = [
  { id: "rbc", label: "Hồng cầu", answer: "Vận chuyển oxygen và carbon dioxide" },
  { id: "wbc", label: "Bạch cầu", answer: "Bảo vệ cơ thể trước tác nhân gây bệnh" },
  { id: "platelets", label: "Tiểu cầu", answer: "Hỗ trợ đông máu khi mạch bị tổn thương" },
  { id: "plasma", label: "Huyết tương", answer: "Vận chuyển chất hòa tan và giữ máu ở dạng lỏng" },
];

const answerOptions = challengeCards.map((card) => card.answer);

export default function BloodRoleChallenge() {
  const [activeCardId, setActiveCardId] = useState(challengeCards[0].id);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  const activeCard = useMemo(
    () => challengeCards.find((card) => card.id === activeCardId) ?? challengeCards[0],
    [activeCardId],
  );

  const resolvedCount = Object.keys(feedback).filter((key) => feedback[key]).length;

  const handleChooseAnswer = (answer: string) => {
    const isCorrect = activeCard.answer === answer;
    setMatches((current) => ({ ...current, [activeCard.id]: answer }));
    setFeedback((current) => ({ ...current, [activeCard.id]: isCorrect }));
  };

  const resetGame = () => {
    setMatches({});
    setFeedback({});
    setActiveCardId(challengeCards[0].id);
  };

  return (
    <section className="mt-8 grid gap-6 rounded-[36px] border border-[#E0F0FF] bg-white p-8 shadow-sm lg:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8FF] bg-[#F5FBFF] px-4 py-2 text-sm font-bold text-[#0369A1]">
          <Puzzle className="h-4 w-4" />
          Mini game ghép nhanh
        </div>
        <h3 className="text-3xl font-black text-[#0F172A]">Ghép thành phần máu với chức năng</h3>
        <p className="max-w-2xl text-base leading-7 text-[#475569]">
          Chọn một thành phần máu rồi ghép với chức năng đúng. Phần này ngắn, rõ và hợp kiểu
          demo trực tiếp trước lớp.
        </p>

        <div className="grid gap-3">
          {challengeCards.map((card) => {
            const isCorrect = feedback[card.id] === true;
            const isWrong = feedback[card.id] === false;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveCardId(card.id)}
                className={
                  card.id === activeCardId
                    ? "rounded-[24px] border border-[#7DD3FC] bg-[#F0F9FF] px-5 py-4 text-left shadow-sm"
                    : "rounded-[24px] border border-[#E2E8F0] bg-white px-5 py-4 text-left shadow-sm transition hover:border-[#BAE6FD] hover:bg-[#F8FCFF]"
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xl font-black text-[#0F172A]">{card.label}</p>
                    <p className="mt-1 text-sm text-[#64748B]">
                      {matches[card.id] ? matches[card.id] : "Chưa ghép chức năng"}
                    </p>
                  </div>
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : isWrong ? (
                    <XCircle className="h-6 w-6 text-red-500" />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[30px] bg-[linear-gradient(145deg,#082F49,#0EA5E9_50%,#E0F2FE)] p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              Thành phần đang chọn
            </p>
            <h4 className="mt-2 text-3xl font-black">{activeCard.label}</h4>
          </div>
          <button
            type="button"
            onClick={resetGame}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
          >
            <RefreshCcw className="h-4 w-4" />
            Chơi lại
          </button>
        </div>

        <div className="mt-6 rounded-[24px] bg-white/12 p-5 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Điểm hiện tại
          </p>
          <p className="mt-3 text-5xl font-black">{resolvedCount} / {challengeCards.length}</p>
        </div>

        <div className="mt-6 grid gap-3">
          {answerOptions.map((answer) => {
            const isSelected = matches[activeCard.id] === answer;
            const isCorrectSelection = isSelected && feedback[activeCard.id] === true;
            const isWrongSelection = isSelected && feedback[activeCard.id] === false;

            return (
              <button
                key={answer}
                type="button"
                onClick={() => handleChooseAnswer(answer)}
                className={
                  isCorrectSelection
                    ? "rounded-[24px] border border-green-300 bg-green-500/20 px-5 py-4 text-left text-white"
                    : isWrongSelection
                      ? "rounded-[24px] border border-red-300 bg-red-500/20 px-5 py-4 text-left text-white"
                      : "rounded-[24px] border border-white/15 bg-white/10 px-5 py-4 text-left text-white transition hover:bg-white/18"
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold leading-7">{answer}</span>
                  {isCorrectSelection ? (
                    <CheckCircle2 className="h-5 w-5 text-green-200" />
                  ) : isWrongSelection ? (
                    <XCircle className="h-5 w-5 text-red-200" />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[24px] bg-white/12 p-5 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Trạng thái
          </p>
          <p className="mt-3 text-base leading-7 text-white">
            {feedback[activeCard.id] === true
              ? "Đúng. Bạn có thể chuyển sang thành phần tiếp theo."
              : feedback[activeCard.id] === false
                ? "Chưa đúng. Hãy thử ghép lại theo chức năng sinh học của thành phần này."
                : "Hãy chọn một chức năng phù hợp cho thành phần đang được chọn."}
          </p>
        </div>
      </div>
    </section>
  );
}
