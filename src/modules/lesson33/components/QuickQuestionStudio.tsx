import React, { useMemo, useState } from "react";
import { Bot, HelpCircle, MessageCircleQuestion, Sparkles } from "lucide-react";

type QuestionCard = {
  id: string;
  prompt: string;
  answer: string;
  teacherCue: string;
};

const questionCards: QuestionCard[] = [
  {
    id: "wrong-blood",
    prompt: "Vì sao truyền sai nhóm máu có thể nguy hiểm?",
    answer:
      "Vì kháng thể trong huyết tương người nhận có thể nhận diện hồng cầu lạ và làm chúng ngưng kết. Khi đó mạch máu có thể bị tắc, việc vận chuyển oxygen bị rối loạn và bệnh nhân gặp tai biến.",
    teacherCue:
      "Cho học sinh nhìn lại mối quan hệ giữa kháng nguyên trên hồng cầu và kháng thể trong huyết tương.",
  },
  {
    id: "why-vein-valve",
    prompt: "Tại sao tĩnh mạch thường có van còn động mạch thì không?",
    answer:
      "Máu trong tĩnh mạch chảy với áp lực thấp hơn, nhất là khi phải đi ngược chiều trọng lực ở chân. Van giúp máu chỉ đi một chiều về tim. Động mạch nhận lực đẩy trực tiếp từ tim nên ít cần cơ chế này.",
    teacherCue:
      "Có thể liên hệ với hiện tượng đứng lâu bị mỏi chân hoặc giãn tĩnh mạch.",
  },
  {
    id: "double-circulation",
    prompt: "Hai vòng tuần hoàn giúp cơ thể lợi gì?",
    answer:
      "Vòng tuần hoàn nhỏ giúp máu trao đổi khí ở phổi, còn vòng tuần hoàn lớn đưa oxygen và chất dinh dưỡng đi nuôi toàn bộ cơ thể. Nhờ tách thành hai vòng, cơ thể kiểm soát trao đổi khí và nuôi mô hiệu quả hơn.",
    teacherCue:
      "Nhấn mạnh tim phải gắn với phổi, tim trái gắn với toàn cơ thể.",
  },
];

export default function QuickQuestionStudio() {
  const [activeQuestionId, setActiveQuestionId] = useState(questionCards[0].id);
  const activeQuestion = useMemo(
    () => questionCards.find((question) => question.id === activeQuestionId) ?? questionCards[0],
    [activeQuestionId],
  );

  return (
    <section className="grid gap-6 rounded-[32px] border border-[#E0F0FF] bg-white p-8 shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8FF] bg-[#F5FBFF] px-4 py-2 text-sm font-bold text-[#0369A1]">
          <MessageCircleQuestion className="h-4 w-4" />
          Hỏi đáp nhanh
        </div>
        <h3 className="text-3xl font-black text-[#0F172A]">Studio giải thích trong 30 giây</h3>
        <p className="max-w-2xl text-base leading-7 text-[#475569]">
          Chọn một câu hỏi thường gặp để sản phẩm trả lời ngắn gọn theo kiểu hỗ trợ giảng dạy.
          Phần này giúp nhóm bạn có thêm một điểm demo mới ngoài 3D và quiz.
        </p>

        <div className="grid gap-3">
          {questionCards.map((question) => (
            <button
              key={question.id}
              type="button"
              onClick={() => setActiveQuestionId(question.id)}
              className={
                question.id === activeQuestionId
                  ? "rounded-[24px] border border-[#7DD3FC] bg-[#F0F9FF] px-5 py-4 text-left shadow-sm"
                  : "rounded-[24px] border border-[#E2E8F0] bg-white px-5 py-4 text-left shadow-sm transition hover:border-[#BAE6FD] hover:bg-[#F8FCFF]"
              }
            >
              <p className="text-lg font-bold text-[#0F172A]">{question.prompt}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] bg-[linear-gradient(135deg,#082F49,#0EA5E9_58%,#E0F2FE)] p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              Câu hỏi đang chọn
            </p>
            <h4 className="mt-1 text-2xl font-black">{activeQuestion.prompt}</h4>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-[24px] bg-white/12 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              <HelpCircle className="h-4 w-4" />
              Trả lời ngắn
            </div>
            <p className="mt-3 text-base leading-7 text-white">{activeQuestion.answer}</p>
          </div>
          <div className="rounded-[24px] bg-white/12 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              <Sparkles className="h-4 w-4" />
              Gợi ý khi demo
            </div>
            <p className="mt-3 text-base leading-7 text-white">{activeQuestion.teacherCue}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
