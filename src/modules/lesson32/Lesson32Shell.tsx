import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Tổng quan", path: "/lesson-32" },
  { label: "Explorer 3D", path: "/lesson-32/explorer" },
  { label: "Simulation", path: "/lesson-32/simulation" },
  { label: "Diseases", path: "/lesson-32/diseases" },
  { label: "Nutrition", path: "/lesson-32/nutrition" },
  { label: "Food Safety", path: "/lesson-32/food-safety" },
  { label: "Quiz", path: "/lesson-32/quiz" },
];

export default function Lesson32Shell({
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
              Lesson 32: Dinh dưỡng và tiêu hóa
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
              end={tab.path === "/lesson-32"}
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
