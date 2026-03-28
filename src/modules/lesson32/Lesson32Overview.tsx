import React from "react";
import { Link } from "react-router-dom";
import { lesson32OverviewData } from "../../features/lesson32/data/overview";

export default function Lesson32Overview() {
  const firstRoute =
    lesson32OverviewData.sections[0]?.route || "/lesson-32/explorer";

  return (
    <div className="space-y-6">
      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">
              {lesson32OverviewData.subtitle}
            </p>
            <h2 className="text-3xl font-extrabold text-[#1f2937]">
              {lesson32OverviewData.title}
            </h2>
            <p className="text-[#4A5568] leading-relaxed">
              {lesson32OverviewData.introSummary}
            </p>
          </div>
          <div className="rounded-2xl bg-[#ecfeff] border border-[#ccfbf1] px-4 py-3 text-sm font-semibold text-[#0f766e] max-w-md">
            {lesson32OverviewData.heroQuestion}
          </div>
        </div>

        <div className="rounded-2xl bg-[#F7FBFF] border border-[#EAF5FF] p-4 text-sm text-[#334155]">
          Gợi ý dẫn nhập cho giáo viên: bắt đầu bằng câu hỏi mở ở trên, sau đó
          cho học sinh dự đoán “thức ăn đi qua những cơ quan nào” trước khi vào
          explorer.
        </div>

        <div className="flex gap-3 flex-wrap pt-1">
          <Link
            to={firstRoute}
            className="px-5 py-3 rounded-xl bg-[#00BFFF] text-white font-bold hover:bg-[#009FD8] transition-colors"
          >
            Bắt đầu học ngay
          </Link>
          <Link
            to="/lesson-32/quiz"
            className="px-5 py-3 rounded-xl bg-[#F0F8FF] text-[#00BFFF] font-bold hover:bg-[#E0F2FF] transition-colors"
          >
            Kiểm tra nhanh cuối bài
          </Link>
        </div>
      </section>

      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-4">
        <h3 className="text-2xl font-extrabold text-[#1f2937]">
          Mục tiêu học tập
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#4A5568]">
          {lesson32OverviewData.learningObjectives.map((goal) => (
            <li
              key={goal}
              className="p-4 rounded-2xl bg-[#F7FBFF] border border-[#EAF5FF] font-medium"
            >
              {goal}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-4">
        <h3 className="text-2xl font-extrabold text-[#1f2937]">
          Các phần chính của bài học
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {lesson32OverviewData.sections.map((section) => (
            <article
              key={section.id}
              className="p-4 rounded-2xl bg-white border border-[#DDF0FF] hover:border-[#00BFFF] transition-colors"
            >
              <p className="font-bold text-[#1e293b]">{section.title}</p>
              <p className="text-sm text-[#64748b] mt-1">
                {section.description}
              </p>
              <Link
                to={section.route}
                className="inline-flex mt-3 text-sm font-bold text-[#00BFFF] hover:underline"
              >
                Mở phần học
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-4">
        <h3 className="text-2xl font-extrabold text-[#1f2937]">
          Lộ trình học gợi ý
        </h3>
        <ol className="space-y-2">
          {lesson32OverviewData.sections.map((section, index) => (
            <li
              key={`flow-${section.id}`}
              className="flex items-start gap-3 p-3 rounded-xl bg-[#F7FBFF] border border-[#EAF5FF]"
            >
              <span className="w-7 h-7 rounded-full bg-[#00BFFF] text-white text-sm font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-[#1f2937]">{section.title}</p>
                <p className="text-sm text-[#64748b]">{section.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
