import React from "react";
import { lesson32FoodSafetyData } from "../../features/lesson32/data/foodSafety";

export default function Lesson32FoodSafety() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-[#333]">
        An toàn vệ sinh thực phẩm
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1f2937]">Nguồn mất an toàn</h3>
          <ul className="mt-3 space-y-1 text-sm text-[#334155]">
            {lesson32FoodSafetyData.unsafeSources.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </section>
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1f2937]">
            Nguyên tắc lựa chọn và bảo quản
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-[#334155]">
            {lesson32FoodSafetyData.choosingRules.map((item) => (
              <li key={item}>- {item}</li>
            ))}
            {lesson32FoodSafetyData.storageRules.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </section>
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1f2937]">Tình huống nhanh</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#334155]">
            {lesson32FoodSafetyData.safetyScenarios.map((item) => (
              <li
                key={item.id}
                className="p-2 rounded-lg border border-[#EAF5FF] bg-[#F8FCFF]"
              >
                {item.prompt}
                <span
                  className={
                    item.isSafe
                      ? "text-[#166534] font-bold"
                      : "text-[#991b1b] font-bold"
                  }
                >
                  {" "}
                  {item.isSafe ? "(An toàn)" : "(Không an toàn)"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
