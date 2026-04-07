import React from "react";
import type { BodySystem, BodyView, Lesson31PartItem } from "../../data/lesson31";
import { cn } from "../../lib/utils";
import Lesson31ImageMap from "./Lesson31ImageMap";
import Lesson31PartsPanel from "./Lesson31PartsPanel";

interface Lesson31ExplorerProps {
  system: BodySystem;
  view: BodyView;
  imageSrc: string;
  parts: Lesson31PartItem[];
  selectedPart: Lesson31PartItem | null;
  onSystemChange: (system: BodySystem) => void;
  onViewChange: (view: BodyView) => void;
  onSelectPart: (id: string) => void;
}

const systemOptions: Array<{ id: BodySystem; label: string }> = [
  { id: "muscle", label: "Hệ cơ" },
  { id: "skeleton", label: "Hệ xương" },
];

const viewOptions: Array<{ id: BodyView; label: string }> = [
  { id: "front", label: "Mặt trước" },
  { id: "back", label: "Mặt sau" },
];

export default function Lesson31Explorer({
  system,
  view,
  imageSrc,
  parts,
  selectedPart,
  onSystemChange,
  onViewChange,
  onSelectPart,
}: Lesson31ExplorerProps) {
  return (
    <section className="bg-white border border-[#E0F0FF] rounded-3xl p-4 md:p-5 shadow-sm space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-[#1F2937]">Cấu tạo & chức năng</h2>
        <p className="text-sm text-[#64748B]">
          Chọn hệ cơ hoặc hệ xương, sau đó bấm vào tên bộ phận để xem thông tin.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-xl border border-[#D7E8FF] p-1 bg-[#F8FBFF]">
          {systemOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => onSystemChange(item.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                system === item.id
                  ? "bg-[#00BFFF] text-white"
                  : "text-[#475569] hover:bg-[#EAF5FF]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center rounded-xl border border-[#D7E8FF] p-1 bg-[#F8FBFF]">
          {viewOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                view === item.id
                  ? "bg-[#00BFFF] text-white"
                  : "text-[#475569] hover:bg-[#EAF5FF]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(380px,460px)_minmax(340px,420px)] gap-4 lg:gap-5 justify-center items-start">
        <div className="w-full max-w-[460px]">
          <Lesson31ImageMap
            imageSrc={imageSrc}
            imageAlt={`Sơ đồ ${system === "muscle" ? "hệ cơ" : "hệ xương"} ${view === "front" ? "mặt trước" : "mặt sau"}`}
          />
        </div>

        <div className="w-full max-w-[420px]">
          <Lesson31PartsPanel
            parts={parts}
            selectedPart={selectedPart}
            onSelectPart={onSelectPart}
          />
        </div>
      </div>
    </section>
  );
}
