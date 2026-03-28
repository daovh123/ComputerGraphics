import React from "react";
import { Link } from "react-router-dom";
import { lesson32OverviewData } from "../../features/lesson32/data/overview";

export default function Lesson32Overview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-5">
        <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">
          {lesson32OverviewData.subtitle}
        </p>
        <h2 className="text-2xl font-extrabold text-[#333]">
          {lesson32OverviewData.title}
        </h2>
        <p className="text-[#4A5568] leading-relaxed">
          {lesson32OverviewData.introSummary}
        </p>
        <p className="text-[#0f766e] bg-[#ecfeff] border border-[#ccfbf1] rounded-xl p-3 text-sm font-semibold">
          {lesson32OverviewData.heroQuestion}
        </p>
        <h3 className="text-xl font-bold text-[#334155]">Mục tiêu bài học</h3>
        <ul className="space-y-3 text-[#4A5568]">
          {lesson32OverviewData.learningObjectives.map((goal) => (
            <li
              key={goal}
              className="p-4 rounded-2xl bg-[#F7FBFF] border border-[#EAF5FF] font-medium"
            >
              {goal}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lesson32OverviewData.sections.map((section) => (
            <Link
              key={section.id}
              to={section.route}
              className="p-4 rounded-2xl bg-white border border-[#DDF0FF] hover:border-[#00BFFF] transition-colors"
            >
              <p className="font-bold text-[#1e293b]">{section.title}</p>
              <p className="text-sm text-[#64748b] mt-1">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <aside className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-xl font-extrabold text-[#333]">Kết quả Phase 1</h3>
        <p className="text-sm text-[#5B6470] leading-relaxed">
          Nội dung Lesson32 đã tách khỏi UI theo data spec. Team có thể cập nhật
          text trong data mà không cần sửa nhiều component.
        </p>
        <div className="rounded-2xl bg-[#F7FBFF] border border-[#EAF5FF] p-4 text-sm text-[#4A5568]">
          Bước tiếp theo: hoàn thiện explorer, simulation nâng cao, và thêm màn
          diseases, nutrition, food safety đầy đủ tương tác.
        </div>
      </aside>
    </div>
  );
}
