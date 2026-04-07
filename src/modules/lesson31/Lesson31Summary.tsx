import React from "react";

interface Lesson31SummaryProps {
  structureTitle: string;
  structureText: string;
  functionTitle: string;
  functionText: string;
  bullets: string[];
  keyPoints: string[];
  selfCheckQuestions: string[];
  dailyHabits: string[];
  finalMessage: string;
}

export default function Lesson31Summary({
  structureTitle,
  structureText,
  functionTitle,
  functionText,
  bullets,
  keyPoints,
  selfCheckQuestions,
  dailyHabits,
  finalMessage,
}: Lesson31SummaryProps) {
  return (
    <section className="space-y-5">
      <div className="bg-white border border-[#E0F0FF] rounded-3xl p-5 md:p-6 shadow-sm space-y-5">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Tổng kết bài học</p>
          <h2 className="text-3xl font-extrabold text-[#1F2937]">Hoàn thành Bài 31: Hệ vận động ở người</h2>
          <p className="text-sm text-[#64748B]">
            Ôn lại kiến thức cốt lõi để ghi nhớ lâu hơn và áp dụng tốt trong học tập hằng ngày.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="bg-[#F8FBFF] border border-[#DDEBFF] rounded-2xl p-4 space-y-2">
            <p className="text-xs uppercase tracking-wider font-bold text-[#0284C7]">Nội dung chính</p>
            <h3 className="text-xl font-extrabold text-[#1F2937]">{structureTitle}</h3>
            <p className="text-sm text-[#475569] leading-relaxed">{structureText}</p>
          </article>

          <article className="bg-[#F8FBFF] border border-[#DDEBFF] rounded-2xl p-4 space-y-2">
            <p className="text-xs uppercase tracking-wider font-bold text-[#0284C7]">Nội dung chính</p>
            <h3 className="text-xl font-extrabold text-[#1F2937]">{functionTitle}</h3>
            <p className="text-sm text-[#475569] leading-relaxed">{functionText}</p>
          </article>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article className="bg-white border border-[#E0F0FF] rounded-2xl p-4">
            <h4 className="text-lg font-bold text-[#1F2937]">Ghi nhớ nhanh</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#475569]">
              {bullets.map((bullet) => (
                <li key={bullet}>- {bullet}</li>
              ))}
            </ul>
          </article>

          <article className="bg-white border border-[#E0F0FF] rounded-2xl p-4">
            <h4 className="text-lg font-bold text-[#1F2937]">Điểm cốt lõi cần nắm</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#475569]">
              {keyPoints.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-4">
            <h4 className="text-lg font-bold text-[#9A3412]">Em tự kiểm tra</h4>
            <ol className="mt-3 space-y-2 text-sm text-[#7C2D12]">
              {selfCheckQuestions.map((question, index) => (
                <li key={question}>{index + 1}. {question}</li>
              ))}
            </ol>
          </article>

          <article className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4">
            <h4 className="text-lg font-bold text-[#166534]">Thói quen tốt mỗi ngày</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#14532D]">
              {dailyHabits.map((habit) => (
                <li key={habit}>- {habit}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="rounded-2xl bg-[#F0F9FF] border-l-4 border-[#0ea5e9] p-4">
          <p className="text-xs uppercase tracking-wider font-bold text-[#0369A1]">Thông điệp cuối bài</p>
          <p className="mt-1 text-base font-semibold text-[#0F172A]">{finalMessage}</p>
        </div>
      </div>
    </section>
  );
}