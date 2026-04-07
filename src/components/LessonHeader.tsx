import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { LESSON_CARD_BASE } from "./lessonClassNames";

interface LessonHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "card" | "embedded";
  className?: string;
}

export default function LessonHeader({
  title,
  subtitle = "Khoa học tự nhiên 8",
  icon,
  variant = "card",
  className,
}: LessonHeaderProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        variant === "card"
          ? [
              LESSON_CARD_BASE,
              "rounded-3xl p-6 flex items-center justify-between flex-wrap gap-4",
            ]
          : "flex items-center justify-between flex-wrap gap-4",
        className,
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm font-bold text-[#00BFFF] uppercase tracking-wider">
          <span>{subtitle}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#333]">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-16 h-16 hidden sm:flex bg-[#F5F9FF] rounded-2xl items-center justify-center border border-[#E0F0FF]">
            {icon}
          </div>
        )}
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 h-12 rounded-xl bg-[#F0F8FF] text-[#00BFFF] font-bold hover:bg-[#E0F2FF] transition-colors"
        >
          Về dashboard
        </button>
      </div>
    </div>
  );
}
