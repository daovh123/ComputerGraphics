import React from "react";
import { NavLink } from "react-router-dom";
import type { LessonTabConfig } from "../config/lessonTypes";
import { cn } from "../lib/utils";
import { LESSON_CARD_BASE } from "./lessonClassNames";

interface LessonTabsProps {
  tabs: LessonTabConfig[];
  variant?: "card" | "embedded";
  className?: string;
}

export default function LessonTabs({
  tabs,
  variant = "card",
  className,
}: LessonTabsProps) {
  return (
    <div
      className={cn(
        variant === "card"
          ? [
              LESSON_CARD_BASE,
              "flex flex-nowrap md:flex-wrap gap-2 p-2 rounded-2xl overflow-x-auto md:overflow-x-visible no-scrollbar",
            ]
          : "flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-x-visible no-scrollbar",
        className,
      )}
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path.split("/").length === 2}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap",
              isActive
                ? "bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20"
                : "text-[#666] hover:bg-[#F5F9FF] hover:text-[#00BFFF]",
            )
          }
        >
          {tab.icon && <tab.icon className="w-4 h-4" />}
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
