import React from "react";
import { lesson32KnowledgeContent } from "../../features/lesson32/data/content";

export default function Lesson32Nutrition() {
  const nutrition = lesson32KnowledgeContent.nutrition;

  return (
    <div className="space-y-6">
      <header className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-2">
        <h2 className="text-2xl font-extrabold text-[#333]">
          Chế độ dinh dưỡng hợp lý
        </h2>
        <p className="text-sm text-[#556070] leading-relaxed">{nutrition.introSummary}</p>
      </header>

      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-[#1f2937]">Nhóm chất dinh dưỡng và vai trò</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {nutrition.nutrientGroups.map((group) => (
            <article
              key={group.id}
              className="rounded-xl bg-[#F8FCFF] border border-[#EAF5FF] p-4 space-y-2"
            >
              <h4 className="font-bold text-[#1F2937]">{group.title}</h4>
              <p className="text-sm text-[#475569]">{group.role}</p>
              <p className="text-xs text-[#64748B]">
                Vi du: {group.examples.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-[#1f2937]">Nguyên tắc dinh dưỡng</h3>
            <ul className="mt-2 text-sm text-[#334155] space-y-1">
              {nutrition.nutritionPrinciples.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#1f2937]">
              Yếu tố ảnh hưởng nhu cầu
            </h3>
            <ul className="mt-2 text-sm text-[#334155] space-y-1">
              {nutrition.factorsAffectingNeeds.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-[#1f2937]">Gợi ý bữa ăn cân đối</h3>
            <ul className="mt-2 text-sm text-[#334155] space-y-1">
              {nutrition.quickMealIdeas.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1f2937]">Mẹo ăn uống hợp lý</h3>
            <ul className="mt-2 text-sm text-[#334155] space-y-1">
              {nutrition.mealPlanningTips.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1f2937]">Hoạt động nhẹ trên lớp</h3>
            <ul className="mt-2 text-sm text-[#334155] space-y-1">
              {nutrition.simpleActivities.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="bg-[#F7FBFF] border border-[#EAF5FF] rounded-2xl p-4 text-sm text-[#475569]">
        Tong ket: An da dang, dung luong, ket hop van dong va ngu nghi hop ly de giu suc khoe he tieu hoa.
      </section>
    </div>
  );
}
