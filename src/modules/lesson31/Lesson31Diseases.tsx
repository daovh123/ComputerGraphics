import React from "react";
import { lesson31DiseasesData } from "../../data/lesson31/diseases";

export default function Lesson31Diseases() {
  const diseases = lesson31DiseasesData;

  return (
    <div className="space-y-6">
      <header className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm space-y-2">
        <h2 className="text-2xl font-extrabold text-[#333]">
          Một số bệnh đường Hệ vận động
        </h2>
        <p className="text-sm text-[#556070] leading-relaxed">
          Tìm hiểu chi tiết về hai bệnh - tật liên quan mật thiết đến người ở lứa tuổi học đường và người trưởng thành: Cong vẹo cột sống và Loãng xương.
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
                {disease.causes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#00BFFF]">
                Biểu hiện
              </p>
              <ul className="list-disc pl-5 text-sm text-[#334155] mt-2 space-y-1">
                {disease.symptoms.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#00BFFF]">
                Phòng tránh
              </p>
              <ul className="list-disc pl-5 text-sm text-[#334155] mt-2 space-y-1">
                {disease.prevention.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#ecfdf5] border border-[#bbf7d0] p-3">
                <p className="text-xs font-bold text-[#166534] uppercase">
                  Nên làm
                </p>
                <ul className="mt-2 text-sm text-[#166534] space-y-1">
                  {(disease.doList || []).map((item, index) => (
                    <li key={index}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3">
                <p className="text-xs font-bold text-[#991b1b] uppercase">
                  Không nên
                </p>
                <ul className="mt-2 text-sm text-[#991b1b] space-y-1">
                  {(disease.avoidList || []).map((item, index) => (
                    <li key={index}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="bg-[#F7FBFF] border border-[#EAF5FF] rounded-2xl p-4 text-sm text-[#475569]">
        Kết luận nhanh: Chú ý tư thế ngồi học ngay ngắn, bổ sung Canxi, Vitamin D và tập thể dục vừa sức để có hệ xương khớp luôn khỏe mạnh.
      </section>
    </div>
  );
}
