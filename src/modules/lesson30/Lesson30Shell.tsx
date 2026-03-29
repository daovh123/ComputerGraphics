import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Tổng quan", path: "/lesson-30" },
  { label: "Cấu tạo cơ thể", path: "/lesson-30/body-parts" },
  { label: "Sự phối hợp", path: "/lesson-30/coordination" },
  { label: "Đồng hồ sinh học", path: "/lesson-30/biological-clock" },
  { label: "Đặc điểm riêng", path: "/lesson-30/characteristics" },
  { label: "Thử thách", path: "/lesson-30/challenge" },
  { label: "Tổng kết", path: "/lesson-30/summary" },
];

export default function Lesson30Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white border border-[#E0F0FF] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#00BFFF]">
              Khoa học tự nhiên 8
            </p>
            <h1 className="text-3xl font-extrabold text-[#333]">
              Lesson 30: Khái quát về cơ thể người
            </h1>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 rounded-xl bg-[#F0F8FF] text-[#00BFFF] font-bold hover:bg-[#E0F2FF] transition-colors"
          >
            Về dashboard
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === "/lesson-30"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-[#00BFFF] text-white"
                    : "bg-[#F5F9FF] text-[#4A5568] hover:bg-[#E8F4FF]"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
