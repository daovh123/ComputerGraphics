import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { List } from "lucide-react";
import { cn } from "../../lib/utils";
import type { LessonPlayerStepLink } from "./types";

interface LessonPlayerOutlineProps {
  steps: LessonPlayerStepLink[];
  currentStep: number;
  exitPath: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function LessonPlayerOutline({
  steps,
  currentStep,
  exitPath,
  isOpen,
  onToggle,
  onClose,
}: LessonPlayerOutlineProps) {
  const outlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!outlineRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={outlineRef}>
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D7E8FF] bg-white/90 px-4 py-2 text-sm font-semibold text-[#334155] hover:bg-white"
      >
        <List className="h-4 w-4" />
        <span>Mục lục</span>
      </button>
      {isOpen ? (
        <div className="absolute right-0 top-full mt-3 flex max-h-[70vh] w-[22rem] flex-col overflow-hidden rounded-[24px] border border-[#D7E8FF] bg-white/95 p-3 shadow-2xl shadow-sky-100/80">
          <div className="mb-2 px-2">
            <p className="text-sm font-black text-[#1F2937]">Lộ trình bài học</p>
            <p className="text-xs text-[#6B7280]">
              Nhấn số hoặc chọn bước để chuyển nhanh.
            </p>
          </div>
          <div className="space-y-1 overflow-y-auto pr-1">
            {steps.map((step, index) => (
              <Link
                key={step.id}
                to={step.path}
                onClick={onClose}
                className={cn(
                  "block rounded-2xl px-3 py-3 text-sm transition-colors",
                  index + 1 === currentStep
                    ? "bg-[#E6F4FF] text-[#0369A1]"
                    : "text-[#334155] hover:bg-[#F8FCFF]",
                )}
              >
                <span className="block text-xs font-bold uppercase tracking-wide text-[#64748B]">
                  Bước {index + 1}
                </span>
                <span className="block font-semibold">{step.title}</span>
              </Link>
            ))}
          </div>
          <div className="mt-3 border-t border-[#EEF2F7] pt-3">
            <Link
              to={exitPath}
              onClick={onClose}
              className="block rounded-2xl px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#F8FCFF]"
            >
              Về trang bài học
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
