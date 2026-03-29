import React from "react";
import { lesson32KnowledgeContent } from "../../features/lessons/lesson32/data/content";

export default function Lesson32Diseases() {
  const diseases = lesson32KnowledgeContent.diseases;

  return (
    <div className="space-y-6">
      <header className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-2">
        <h2 className="text-2xl font-extrabold text-[#333]">
          Một số bệnh đường tiêu hóa
        </h2>
        <p className="text-sm text-[#556070] leading-relaxed">
          Tập trung vào hai bệnh thường gặp ở học sinh: sâu răng và viêm loét dạ
          dày - tá tràng.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {diseases.map((disease) => (
          <article
            key={disease.id}
            className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-4"
          >
            <h3 className="text-xl font-bold text-[#1f2937]">
              {disease.title}
            </h3>
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
                Dấu hiệu cơ bản
              </p>
              <ul className="list-disc pl-5 text-sm text-[#334155] mt-2 space-y-1">
                {disease.symptoms.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#00BFFF]">
                Phòng tránh
              </p>
              <ul className="list-disc pl-5 text-sm text-[#334155] mt-2 space-y-1">
                {disease.prevention.map((item) => (
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
                  {(disease.doList || []).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3">
                <p className="text-xs font-bold text-[#991b1b] uppercase">
                  Không nên
                </p>
                <ul className="mt-2 text-sm text-[#991b1b] space-y-1">
                  {(disease.avoidList || []).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="bg-[#F7FBFF] border border-[#EAF5FF] rounded-2xl p-4 text-sm text-[#475569]">
        Kết luận nhanh: Giữ vệ sinh răng miệng, ăn uống điều độ và theo dõi dấu
        hiệu bất thường để phòng tránh bệnh đường tiêu hóa.
      </section>
    </div>
  );
}
