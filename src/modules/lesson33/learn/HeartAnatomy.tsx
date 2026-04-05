import React, { useState } from "react";
import AngiologyViewer from "./AngiologyViewer";

const heartZones = [
  {
    id: "heart",
    title: "Tim là máy bơm trung tâm",
    description:
      "Tim co bóp liên tục để đẩy máu đi. Ở người, tim gồm 4 ngăn giúp tách riêng máu giàu oxygen và máu giàu carbon dioxide.",
    bullets: ["2 tâm nhĩ ở phía trên", "2 tâm thất ở phía dưới", "Thành thất trái dày hơn vì bơm máu đi toàn cơ thể"],
  },
  {
    id: "arteries",
    title: "Động mạch đưa máu rời tim",
    description:
      "Động mạch có thành dày, đàn hồi tốt, chịu áp lực lớn mỗi khi tim co bóp. Máu trong động mạch thường đi từ tim đến cơ quan.",
    bullets: ["Áp lực máu cao", "Thành mạch dày", "Mạch đập rõ hơn gần tim"],
  },
  {
    id: "veins",
    title: "Tĩnh mạch đưa máu trở về tim",
    description:
      "Tĩnh mạch có lòng rộng hơn và thường có van để giúp máu chảy một chiều, nhất là ở các chi dưới.",
    bullets: ["Áp lực thấp hơn động mạch", "Có van ngăn máu chảy ngược", "Đưa máu từ cơ quan trở lại tim"],
  },
  {
    id: "capillaries",
    title: "Mao mạch là nơi trao đổi chất",
    description:
      "Mao mạch rất nhỏ, thành chỉ gồm một lớp tế bào. Đây là nơi oxygen, chất dinh dưỡng và chất thải trao đổi với tế bào.",
    bullets: ["Mạng lưới phủ khắp cơ thể", "Trao đổi chất trực tiếp với mô", "Nối động mạch với tĩnh mạch"],
  },
];

export default function HeartAnatomy() {
  const [activeZoneId, setActiveZoneId] = useState(heartZones[0].id);
  const activeZone = heartZones.find((zone) => zone.id === activeZoneId) ?? heartZones[0];

  return (
    <section className="grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[36px] border border-[#D7E8FF] bg-[linear-gradient(180deg,#F8FCFF_0%,#E0F2FE_100%)] p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#64748B]">
              Mô hình 3D nội bộ
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#0F172A]">Tim và hệ mạch</h2>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-[#334155]">
            Xoay để xem tổng thể
          </div>
        </div>
        <AngiologyViewer className="rounded-[28px] bg-white/70" />
      </div>

      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
          Cấu tạo tim và hệ mạch
        </p>
        <h2 className="text-4xl font-black tracking-tight text-[#020617] md:text-5xl">
          Từ tim, máu đi qua
          <br />
          ba loại mạch chính
        </h2>
        <p className="max-w-2xl text-lg leading-8 text-[#475569]">
          Chọn từng mục để đọc nhanh chức năng của tim, động mạch, tĩnh mạch và mao mạch.
          Phần này giúp nối mô hình 3D với kiến thức sách giáo khoa.
        </p>

        <div className="grid gap-4">
          {heartZones.map((zone, index) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActiveZoneId(zone.id)}
              className={
                zone.id === activeZoneId
                  ? "rounded-[28px] border border-[#7DD3FC] bg-[#F0F9FF] p-5 text-left shadow-sm"
                  : "rounded-[28px] border border-[#E2E8F0] bg-white p-5 text-left shadow-sm transition hover:border-[#BAE6FD] hover:bg-[#F8FCFF]"
              }
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F172A] text-sm font-black text-white">
                  {index + 1}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-[#0F172A]">{zone.title}</h3>
                  <p className="text-base leading-7 text-[#475569]">{zone.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {zone.bullets.map((bullet) => (
                      <span
                        key={bullet}
                        className="rounded-full border border-[#D7E8FF] bg-white px-3 py-1.5 text-sm font-semibold text-[#334155]"
                      >
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-[28px] bg-[#0F172A] p-5 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
            Trọng tâm đang chọn
          </p>
          <p className="mt-3 text-xl font-bold">{activeZone.title}</p>
          <p className="mt-2 text-sm leading-7 text-white/80">{activeZone.description}</p>
        </div>
      </div>
    </section>
  );
}
