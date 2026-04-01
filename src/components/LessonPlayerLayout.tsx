import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, List, X } from "lucide-react";
import { cn } from "../lib/utils";
import type { LessonPlayerStepLink } from "./lesson-player/types";

interface LessonPlayerLayoutProps {
  lessonTitle: string;
  stepTitle: string;
  currentStep: number;
  totalSteps: number;
  exitPath: string;
  previousPath?: string;
  nextPath?: string;
  children: React.ReactNode;
  steps: LessonPlayerStepLink[];
}

export default function LessonPlayerLayout({
  lessonTitle,
  stepTitle,
  currentStep,
  totalSteps,
  exitPath,
  previousPath,
  nextPath,
  children,
  steps,
}: LessonPlayerLayoutProps) {
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!outlineRef.current?.contains(event.target as Node)) {
        setIsOutlineOpen(false);
      }
    };

    if (isOutlineOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOutlineOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      if (event.key === "ArrowLeft" && previousPath) {
        event.preventDefault();
        navigate(previousPath);
        return;
      }

      if (event.key === "ArrowRight" && nextPath) {
        event.preventDefault();
        navigate(nextPath);
        return;
      }

      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        setIsOutlineOpen((current) => !current);
        return;
      }

      if (event.key.toLowerCase() === "q" || event.key === "Escape") {
        event.preventDefault();
        navigate(exitPath);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [exitPath, navigate, nextPath, previousPath]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#E0F4FF,_#F8FCFF_38%,_#F0F8FF_100%)] text-[#1F2937]">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-4 md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex items-center gap-3 text-sm text-[#4B5563]">
              <div className="shrink-0">
                <span className="rounded-full bg-[#E0F4FF] px-3 py-1 font-semibold text-[#0369A1]">
                  {lessonTitle}
                </span>
              </div>
              <h1 className="truncate text-xl font-black leading-tight text-[#0F172A] md:text-2xl">
                {stepTitle}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <div className="relative" ref={outlineRef}>
                <button
                  type="button"
                  onClick={() => setIsOutlineOpen((current) => !current)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#D7E8FF] bg-white px-4 py-2 text-sm font-semibold text-[#334155] hover:bg-[#F8FCFF]"
                >
                  <List className="h-4 w-4" />
                  <span className="hidden md:inline">Mục lục</span>
                </button>
                {isOutlineOpen ? (
                  <div className="absolute right-0 top-full mt-2 flex max-h-[70vh] w-80 flex-col rounded-2xl border border-[#D7E8FF] bg-white p-3 shadow-2xl">
                    <div className="mb-2 px-2">
                      <p className="text-sm font-black text-[#1F2937]">Các bước trong bài</p>
                      <p className="text-xs text-[#6B7280]">
                        Chọn bước để chuyển nhanh trong chế độ học.
                      </p>
                    </div>
                    <div className="space-y-1 overflow-y-auto pr-1">
                      {steps.map((step, index) => (
                        <Link
                          key={step.id}
                          to={step.path}
                          onClick={() => setIsOutlineOpen(false)}
                          className={cn(
                            "block rounded-xl px-3 py-3 text-sm transition-colors",
                            index + 1 === currentStep
                              ? "bg-[#E6F7FF] text-[#0369A1]"
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
                        onClick={() => setIsOutlineOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#F8FCFF]"
                      >
                        Về trang bài học
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
              <Link
                to={exitPath}
                aria-label="Thoát bài học"
                title="Thoát bài học"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-white hover:bg-[#1E293B]"
              >
                <X className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#4B5563] md:w-40 md:shrink-0">
              <span>
                Bước {currentStep}/{totalSteps}
              </span>
            </div>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E6EEF5]">
              <div
                className="h-full rounded-full bg-[#00BFFF] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {previousPath ? (
                <Link
                  to={previousPath}
                  aria-label="Bước trước"
                  title="Bước trước"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D7E8FF] bg-white text-[#334155] hover:bg-[#F8FCFF]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : null}
              {nextPath ? (
                <Link
                  to={nextPath}
                  aria-label="Bước sau"
                  title="Bước sau"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009FD8]"
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="space-y-8">{children}</div>
      </main>
    </div>
  );
}
