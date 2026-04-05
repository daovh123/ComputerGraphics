import React, { useMemo, useState } from "react";
import { CheckCircle2, Stethoscope, XCircle } from "lucide-react";

type PatientCase = {
  id: string;
  title: string;
  symptoms: string[];
  hint: string;
  options: string[];
  answer: string;
  explanation: string;
};

const patientCases: PatientCase[] = [
  {
    id: "case-anemia",
    title: "Tình huống 1",
    symptoms: ["Da xanh xao", "Mệt mỏi", "Tim đập nhanh khi vận động nhẹ"],
    hint: "Hãy nghĩ đến tình trạng liên quan đến số lượng hồng cầu hoặc hemoglobin.",
    options: ["Thiếu máu", "Cao huyết áp", "Xơ vữa động mạch"],
    answer: "Thiếu máu",
    explanation:
      "Các dấu hiệu mệt mỏi, da xanh xao và tim đập nhanh thường gợi ý thiếu máu vì cơ thể thiếu khả năng vận chuyển oxygen hiệu quả.",
  },
  {
    id: "case-hypertension",
    title: "Tình huống 2",
    symptoms: ["Đau đầu", "Chóng mặt", "Ăn mặn thường xuyên và ít vận động"],
    hint: "Hãy liên hệ với áp lực máu tác động lên thành mạch.",
    options: ["Thiếu máu", "Cao huyết áp", "Xơ vữa động mạch"],
    answer: "Cao huyết áp",
    explanation:
      "Đau đầu, chóng mặt cùng thói quen ăn mặn, ít vận động là nhóm dấu hiệu rất gần với nguy cơ cao huyết áp.",
  },
];

export default function PatientCaseTrainer() {
  const [activeCaseId, setActiveCaseId] = useState(patientCases[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const activeCase =
    useMemo(
      () => patientCases.find((patientCase) => patientCase.id === activeCaseId) ?? patientCases[0],
      [activeCaseId],
    );

  const currentSelection = selectedAnswers[activeCase.id];
  const isCorrect = currentSelection === activeCase.answer;
  const hasAnswered = Boolean(currentSelection);

  return (
    <section className="grid gap-6 rounded-[36px] border border-[#E0F0FF] bg-white p-8 shadow-sm lg:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8FF] bg-[#F5FBFF] px-4 py-2 text-sm font-bold text-[#0369A1]">
          <Stethoscope className="h-4 w-4" />
          Tình huống bệnh nhân
        </div>
        <h3 className="text-3xl font-black text-[#0F172A]">Đoán nhanh vấn đề tuần hoàn</h3>
        <p className="max-w-2xl text-base leading-7 text-[#475569]">
          Giáo viên có thể dùng mục này để cho học sinh đọc triệu chứng, đoán nhanh bệnh lý liên
          quan rồi xem giải thích. Cách này tăng tính ứng dụng trong dạy học.
        </p>

        <div className="grid gap-3">
          {patientCases.map((patientCase) => (
            <button
              key={patientCase.id}
              type="button"
              onClick={() => setActiveCaseId(patientCase.id)}
              className={
                patientCase.id === activeCase.id
                  ? "rounded-[24px] border border-[#7DD3FC] bg-[#F0F9FF] px-5 py-4 text-left shadow-sm"
                  : "rounded-[24px] border border-[#E2E8F0] bg-white px-5 py-4 text-left shadow-sm transition hover:border-[#BAE6FD] hover:bg-[#F8FCFF]"
              }
            >
              <p className="text-lg font-bold text-[#0F172A]">{patientCase.title}</p>
              <p className="mt-1 text-sm text-[#64748B]">{patientCase.symptoms.join(" • ")}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[30px] bg-[linear-gradient(145deg,#082F49,#0EA5E9_55%,#E0F2FE)] p-6 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
          {activeCase.title}
        </p>
        <h4 className="mt-2 text-3xl font-black">Phân tích triệu chứng</h4>

        <div className="mt-6 rounded-[24px] bg-white/12 p-5 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Biểu hiện</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeCase.symptoms.map((symptom) => (
              <span
                key={symptom}
                className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white"
              >
                {symptom}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-white/80">{activeCase.hint}</p>
        </div>

        <div className="mt-6 grid gap-3">
          {activeCase.options.map((option) => {
            const selected = currentSelection === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setSelectedAnswers((current) => ({ ...current, [activeCase.id]: option }))
                }
                className={
                  selected
                    ? "rounded-[24px] border border-white/40 bg-white/20 px-5 py-4 text-left text-white"
                    : "rounded-[24px] border border-white/15 bg-white/10 px-5 py-4 text-left text-white transition hover:bg-white/18"
                }
              >
                {option}
              </button>
            );
          })}
        </div>

        {hasAnswered ? (
          <div
            className={
              isCorrect
                ? "mt-6 rounded-[24px] border border-green-300/40 bg-green-500/20 p-5"
                : "mt-6 rounded-[24px] border border-rose-300/40 bg-rose-500/20 p-5"
            }
          >
            <div className="flex items-center gap-2 text-lg font-bold">
              {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {isCorrect ? "Chọn đúng" : "Chưa đúng"}
            </div>
            <p className="mt-3 text-sm leading-7 text-white">{activeCase.explanation}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
