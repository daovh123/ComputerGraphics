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

const zoneHotspots: Record<string, { top: string; left: string; label: string }> = {
  heart: { top: "43%", left: "48%", label: "Tim" },
  arteries: { top: "28%", left: "58%", label: "Động mạch" },
  veins: { top: "58%", left: "38%", label: "Tĩnh mạch" },
  capillaries: { top: "68%", left: "60%", label: "Mao mạch" },
};

export default function HeartAnatomy() {
  const [activeZoneId, setActiveZoneId] = useState(heartZones[0].id);
  const activeZone = heartZones.find((zone) => zone.id === activeZoneId) ?? heartZones[0];
  const activeHotspot = zoneHotspots[activeZoneId];

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
            Bấm trực tiếp vào điểm sáng trên mô hình
          </div>
        </div>
        <div className="relative">
          <AngiologyViewer className="rounded-[28px] bg-white/70" />
          <div
            className="pointer-events-none absolute z-[5] rounded-full bg-[linear-gradient(90deg,rgba(14,165,233,0.7),rgba(14,165,233,0.08))]"
            style={{
              top: activeHotspot.top,
              left: activeHotspot.left,
              width: "22%",
              height: "2px",
              transform: "translateY(-50%)",
            }}
          />
          <div
            className="pointer-events-none absolute z-[5] rounded-full bg-[#0EA5E9]/70"
            style={{
              top: activeHotspot.top,
              left: "calc(" + activeHotspot.left + " + 22%)",
              width: "10px",
              height: "10px",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 0 8px rgba(14,165,233,0.10)",
            }}
          />
          {heartZones.map((zone) => {
            const hotspot = zoneHotspots[zone.id];
            const isActive = zone.id === activeZoneId;

            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveZoneId(zone.id)}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ top: hotspot.top, left: hotspot.left }}
              >
                <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent" />
                <span className="relative flex flex-col items-center">
                  <span
                    className={
                      isActive
                        ? "flex h-7 w-7 items-center justify-center rounded-full bg-[#0EA5E9] shadow-[0_0_0_10px_rgba(14,165,233,0.16)]"
                        : "flex h-6 w-6 items-center justify-center rounded-full bg-white/95 shadow-[0_0_0_8px_rgba(255,255,255,0.45)]"
                    }
                  >
                    <span
                      className={
                        isActive
                          ? "h-3 w-3 rounded-full bg-white"
                          : "h-3 w-3 rounded-full bg-[#0EA5E9]"
                      }
                    />
                  </span>
                  <span
                    className={
                      isActive
                        ? "mt-2 inline-flex rounded-full bg-[#0F172A] px-3 py-1 text-xs font-bold text-white shadow-lg"
                        : "mt-2 inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0F172A] shadow-sm"
                    }
                  >
                    {hotspot.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-[24px] border border-[#D7E8FF] bg-white/75 px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
            Phần đang được chọn trên mô hình
          </p>
          <p className="mt-2 text-xl font-black text-[#0F172A]">{activeHotspot.label}</p>
          <p className="mt-2 text-sm leading-7 text-[#475569]">
            Người học có thể bấm trực tiếp vào các điểm sáng để đổi nội dung mô tả ở cột phải.
          </p>
        </div>
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
