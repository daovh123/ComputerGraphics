import React from "react";
import { lesson32DiseasesData } from "../../features/lesson32/data/diseases";

export default function Lesson32Diseases() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-[#333]">
        Một số bệnh đường tiêu hóa
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {lesson32DiseasesData.map((disease) => (
          <article
            key={disease.id}
            className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4"
          >
            <h3 className="text-xl font-bold text-[#1f2937]">{disease.name}</h3>
            <p className="text-sm text-[#556070]">{disease.shortDescription}</p>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#00BFFF]">
                Nguyên nhân
              </p>
              <ul className="list-disc pl-5 text-sm text-[#334155] mt-2 space-y-1">
                {disease.causes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#00BFFF]">
                Dấu hiệu
              </p>
              <ul className="list-disc pl-5 text-sm text-[#334155] mt-2 space-y-1">
                {disease.symptoms.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#ecfdf5] border border-[#bbf7d0] p-3">
                <p className="text-xs font-bold text-[#166534] uppercase">
                  Nên làm
                </p>
                <ul className="mt-2 text-sm text-[#166534] space-y-1">
                  {disease.shouldDo.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3">
                <p className="text-xs font-bold text-[#991b1b] uppercase">
                  Tránh
                </p>
                <ul className="mt-2 text-sm text-[#991b1b] space-y-1">
                  {disease.shouldAvoid.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
