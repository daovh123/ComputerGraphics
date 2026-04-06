import React from "react";
import { LESSON_CARD_BASE } from "../../components/lessonClassNames";
import { cn } from "../../lib/utils";

export default function Lesson31Simulation() {
  return (
    <div className={cn(LESSON_CARD_BASE, "p-8 md:p-12 space-y-6 bg-white min-h-[500px] flex items-center justify-center")}>
      <h2 className="text-2xl font-bold text-slate-800">Cơ chế co cơ & Nguyên lý đòn bẩy</h2>
      <p className="text-slate-500">Nội dung đang được cập nhật...</p>
    </div>
  );
}
