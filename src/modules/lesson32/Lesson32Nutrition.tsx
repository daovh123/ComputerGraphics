import React from "react";
import { lesson32NutritionData } from "../../features/lesson32/data/nutrition";

export default function Lesson32Nutrition() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-[#333]">
        Chế độ dinh dưỡng hợp lý
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1f2937]">Nhóm chất dinh dưỡng</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#334155]">
            {lesson32NutritionData.nutrientGroups.map((item) => (
              <li
                key={item}
                className="rounded-lg bg-[#F8FCFF] border border-[#EAF5FF] px-3 py-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-[#1f2937]">Nguyên tắc dinh dưỡng</h3>
            <ul className="mt-2 text-sm text-[#334155] space-y-1">
              {lesson32NutritionData.nutritionPrinciples.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#1f2937]">
              Yếu tố ảnh hưởng nhu cầu
            </h3>
            <ul className="mt-2 text-sm text-[#334155] space-y-1">
              {lesson32NutritionData.factorsAffectingNeeds.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#1f2937]">Gợi ý hoạt động</h3>
            <ul className="mt-2 text-sm text-[#334155] space-y-1">
              {lesson32NutritionData.simpleActivities.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
