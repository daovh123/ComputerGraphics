import React from "react";
import type { Lesson31PartItem } from "../../data/lesson31";
import PartsList from "./PartsList";
import PartDetail from "./PartDetail";

interface Lesson31PartsPanelProps {
  parts: Lesson31PartItem[];
  selectedPart: Lesson31PartItem | null;
  onSelectPart: (id: string) => void;
}

export default function Lesson31PartsPanel({
  parts,
  selectedPart,
  onSelectPart,
}: Lesson31PartsPanelProps) {
  return (
    <div className="space-y-3">
      <PartsList parts={parts} selectedId={selectedPart?.id ?? null} onSelect={onSelectPart} />
      <PartDetail selectedPart={selectedPart} />
    </div>
  );
}
