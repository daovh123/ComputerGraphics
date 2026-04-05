import React from "react";
import { cn } from "../../lib/utils";
import type { Lesson31Tab, Lesson31TabOption } from "../../data/lesson31";

interface Lesson31TabsProps {
  tabs: Lesson31TabOption[];
  activeTab: Lesson31Tab;
  onChange: (tab: Lesson31Tab) => void;
}

export default function Lesson31Tabs({
  tabs,
  activeTab,
  onChange,
}: Lesson31TabsProps) {
  return (
    <div className="bg-white border border-[#E0F0FF] rounded-2xl p-2 shadow-sm flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-2.5 rounded-xl text-sm font-bold transition-colors",
            activeTab === tab.id
              ? "bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20"
              : "bg-[#F7FBFF] text-[#475569] hover:bg-[#EAF5FF]",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
