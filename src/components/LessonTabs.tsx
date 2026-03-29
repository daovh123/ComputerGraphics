import React from "react";
import { NavLink } from "react-router-dom";
import type { LessonTabConfig } from "../config/lessonTypes";
import { cn } from "../lib/utils";

interface LessonTabsProps {
  tabs: LessonTabConfig[];
}

export default function LessonTabs({ tabs }: LessonTabsProps) {
  return (
    <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-sm border border-[#E0F0FF] overflow-x-auto no-scrollbar">
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
