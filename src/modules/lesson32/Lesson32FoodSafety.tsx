import React from "react";
import { lesson32KnowledgeContent } from "../../features/lessons/lesson32/data/content";

export default function Lesson32FoodSafety() {
  const foodSafety = lesson32KnowledgeContent.foodSafety;

  return (
    <div className="space-y-6">
      <header className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-2">
        <h2 className="text-2xl font-extrabold text-[#333]">
          An toàn vệ sinh thực phẩm
        </h2>
        <p className="text-sm text-[#556070] leading-relaxed">
          {foodSafety.safeFoodDefinition}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-[#1f2937]">
              Nguồn gây mất an toàn
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-[#334155]">
              {foodSafety.unsafeSources.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1f2937]">Hậu quả</h3>
            <ul className="mt-3 space-y-1 text-sm text-[#334155]">
              {foodSafety.consequences.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-[#1f2937]">
              Lựa chọn thực phẩm an toàn
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-[#334155]">
              {foodSafety.choosingRules.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1f2937]">Bảo quản đúng cách</h3>
            <ul className="mt-3 space-y-1 text-sm text-[#334155]">
              {foodSafety.storageRules.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1f2937]">Chế biến an toàn</h3>
            <ul className="mt-3 space-y-1 text-sm text-[#334155]">
              {foodSafety.cookingRules.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1f2937]">
            Phân loại nhanh an toàn/không an toàn
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-[#334155]">
            {foodSafety.classificationItems.map((item) => (
              <li
                key={item.id}
                className="p-2 rounded-lg border border-[#EAF5FF] bg-[#F8FCFF]"
              >
                {item.item}
                <span
                  className={
                    item.isSafe
                      ? "text-[#166534] font-bold"
                      : "text-[#991b1b] font-bold"
                  }
                >
                  {item.isSafe ? " (An toàn)" : " (Không an toàn)"}
                </span>
                <p className="text-xs text-[#64748B] mt-1">{item.reason}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1f2937]">Đúng / Sai nhanh</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#334155]">
            {foodSafety.trueFalseItems.map((item) => (
              <li
                key={item.id}
                className="p-2 rounded-lg border border-[#EAF5FF] bg-[#F8FCFF]"
              >
                {item.statement}
                <span
                  className={
                    item.isTrue
                      ? "text-[#166534] font-bold"
                      : "text-[#991b1b] font-bold"
                  }
                >
                  {item.isTrue ? " (Đúng)" : " (Sai)"}
                </span>
                <p className="text-xs text-[#64748B] mt-1">
                  {item.explanation}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="bg-[#F7FBFF] border border-[#EAF5FF] rounded-2xl p-4 text-sm text-[#475569]">
        Ghi nhớ: Chọn đúng, bảo quản đúng, chế biến đúng là 3 bước quan trọng để
        phòng tránh ngộ độc thực phẩm.
      </section>
    </div>
  );
}
