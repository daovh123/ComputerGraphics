import React from "react";
import type { Lesson31PartItem } from "../../data/lesson31";

interface PartsListProps {
  parts: Lesson31PartItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function PartsList({ parts, selectedId, onSelect }: PartsListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {parts.map((part) => {
        const isSelected = selectedId === part.id;
        return (
          <button
            key={part.id}
            onClick={() => onSelect(part.id)}
            className={
              isSelected
                ? "px-3 py-2 rounded-lg border border-[#00BFFF] bg-[#00BFFF] text-white text-sm font-semibold text-left"
                : "px-3 py-2 rounded-lg border border-[#dbe3ef] bg-white text-[#334155] text-sm font-semibold text-left hover:bg-[#eaf6ff]"
            }
          >
            {part.name}
          </button>
        );
      })}
    </div>
  );
}
