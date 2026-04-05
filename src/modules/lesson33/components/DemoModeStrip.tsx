import React from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Bot, HeartPulse, Layers3 } from "lucide-react";

const demoStops = [
  {
    id: "overview",
    title: "Mở bằng overview",
    description: "Giới thiệu mục tiêu bài học, audio nhịp tim và hỏi đáp nhanh.",
    path: "/lesson-33",
    icon: Layers3,
    tone: "bg-sky-100 text-sky-700",
  },
  {
    id: "explorer",
    title: "Chuyển sang 3D",
    description: "Cho người xem xoay mô hình tim và hệ mạch để tạo ấn tượng trực quan.",
    path: "/lesson-33/explorer",
    icon: Activity,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "simulation",
    title: "Demo mô phỏng",
    description: "Chạy truyền máu và hai vòng tuần hoàn để thể hiện tính tương tác.",
    path: "/lesson-33/simulation",
    icon: HeartPulse,
    tone: "bg-rose-100 text-rose-700",
  },
  {
    id: "quiz",
    title: "Chốt bằng game",
    description: "Cho xem quiz và mini game để nhấn mạnh yếu tố học tập tích cực.",
    path: "/lesson-33/quiz",
    icon: Bot,
    tone: "bg-violet-100 text-violet-700",
  },
];

export default function DemoModeStrip() {
  const navigate = useNavigate();

  return (
    <section className="rounded-[32px] border border-[#E0F0FF] bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#94A3B8]">
            Demo Mode
          </p>
          <h3 className="mt-2 text-3xl font-black text-[#0F172A]">Lộ trình trình bày nhanh trong 90 giây</h3>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#475569]">
            Nếu cần demo ngắn trước cô, chỉ cần đi theo 4 điểm dừng này để sản phẩm hiện ra đủ
            trực quan, tương tác, ứng dụng và sáng tạo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/lesson-33")}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#0EA5E9] px-5 text-sm font-bold text-white shadow-lg shadow-[#0EA5E9]/20 transition hover:bg-[#0284C7]"
        >
          Bắt đầu demo nhanh
        </button>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        {demoStops.map((stop, index) => {
          const Icon = stop.icon;

          return (
            <button
              key={stop.id}
              type="button"
              onClick={() => navigate(stop.path)}
              className="group rounded-[28px] border border-[#E2E8F0] bg-[#FCFEFF] p-5 text-left shadow-sm transition hover:border-[#7DD3FC] hover:bg-[#F8FCFF]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-black text-[#94A3B8]">0{index + 1}</span>
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${stop.tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h4 className="mt-5 text-xl font-black text-[#0F172A]">{stop.title}</h4>
              <p className="mt-3 text-sm leading-6 text-[#64748B]">{stop.description}</p>
              <p className="mt-4 text-sm font-bold text-[#0EA5E9] transition group-hover:translate-x-1">
                Mở phần này
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
