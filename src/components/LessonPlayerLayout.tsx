import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  Shrink,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import type {
  LessonPlayerBackAction,
  LessonPlayerEnterAction,
} from "./lesson-player/LessonPlayerInteractionContext";
import LessonPlayerOutline from "./lesson-player/LessonPlayerOutline";
import type { LessonPlayerStepLink } from "./lesson-player/types";
import { useLessonPlayerFullscreen } from "./lesson-player/useLessonPlayerFullscreen";
import { useLessonPlayerKeyboard } from "./lesson-player/useLessonPlayerKeyboard";

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
  contentWidth?: "default" | "wide" | "full";
  enterAction?: LessonPlayerEnterAction | null;
  backAction?: LessonPlayerBackAction | null;
  enterCanHandle?: boolean;
  backCanHandle?: boolean;
  isNextCompletion?: boolean;
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
  contentWidth = "default",
  enterAction,
  backAction,
  enterCanHandle = false,
  backCanHandle = false,
  isNextCompletion = false,
}: LessonPlayerLayoutProps) {
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);
  const navigate = useNavigate();
  const { shellRef, isFullscreen, showFullscreenTopbar, toggleFullscreen } =
    useLessonPlayerFullscreen();
  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  const isCompletionTrigger = isNextCompletion && !enterCanHandle;

  useLessonPlayerKeyboard({
    previousPath,
    nextPath,
    exitPath,
    steps,
    enterAction,
    backAction,
    enterCanHandle,
    backCanHandle,
    onNavigate: navigate,
    onExit: () => undefined,
    onToggleOutline: () => setIsOutlineOpen((current) => !current),
    onToggleFullscreen: toggleFullscreen,
  });

  return (
    <div
      ref={shellRef}
      className="min-h-screen bg-[linear-gradient(180deg,_#f7fbff_0%,_#fefefe_35%,_#f2f7ff_100%)] text-[#0F172A]"
    >
      <header
        className={cn(
          "z-20 backdrop-blur-2xl transition-transform duration-300",
          isFullscreen
            ? cn(
                "fixed inset-x-0 top-0 border-b border-black/5 bg-white/78",
                showFullscreenTopbar ? "translate-y-0" : "-translate-y-[140%]",
              )
            : "sticky top-0 border-b border-black/5 bg-white/78",
        )}
      >
        <div className="space-y-3 px-4 py-3 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex items-center gap-3">
              <span className="shrink-0 rounded-full bg-[#E0F2FE] px-3 py-1 text-sm font-semibold text-[#075985]">
                {lessonTitle}
              </span>
              <h1 className="truncate text-base font-black leading-tight text-[#020617] md:text-xl">
                {stepTitle}
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
                title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E8FF] bg-white/90 text-[#334155] hover:bg-white"
              >
                {isFullscreen ? (
                  <Shrink className="h-4 w-4" />
                ) : (
                  <Expand className="h-4 w-4" />
                )}
              </button>
              <LessonPlayerOutline
                steps={steps}
                currentStep={currentStep}
                exitPath={exitPath}
                isOpen={isOutlineOpen}
                onToggle={() => setIsOutlineOpen((current) => !current)}
                onClose={() => setIsOutlineOpen(false)}
              />
              <Link
                to={exitPath}
                aria-label="Thoát bài học"
                title="Thoát bài học"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0F172A] text-white hover:bg-[#1E293B]"
              >
                <X className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 shrink-0 text-sm font-semibold text-[#475569]">
              <span>
                Bước {currentStep}/{totalSteps}
              </span>
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className="h-full rounded-full bg-[#00BFFF] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center gap-2">
              {previousPath || backCanHandle ? (
                <button
                  type="button"
                  onClick={() => {
                    if (backCanHandle) {
                      backAction.run();
                      return;
                    }

                    if (previousPath) {
                      navigate(previousPath);
                    }
                  }}
                  aria-label="Bước trước"
                  title="Bước trước"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E8FF] bg-white text-[#334155] hover:bg-[#F8FCFF]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              ) : null}
              {nextPath ? (
                <button
                  type="button"
                  onClick={() => {
                    if (enterCanHandle) {
                      enterAction.run();
                      return;
                    }

                    navigate(nextPath);
                  }}
                  aria-label={isCompletionTrigger ? "Hoàn thành bài học" : "Bước sau"}
                  title={isCompletionTrigger ? "Hoàn thành bài học" : "Bước sau"}
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg",
                    isCompletionTrigger
                      ? "bg-[#16A34A] shadow-[#16A34A]/25 hover:bg-[#15803D]"
                      : "bg-[#00BFFF] shadow-[#00BFFF]/20 hover:bg-[#009FD8]",
                  )}
                >
                  {isCompletionTrigger ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main
        className={cn(
          "px-4 py-8 md:px-8 md:py-10",
          isFullscreen ? "pt-4 md:pt-4" : "",
        )}
      >
        <div
          className={cn(
            contentWidth === "full"
              ? "w-full"
              : contentWidth === "wide"
                ? "mx-auto w-full max-w-7xl"
                : "mx-auto w-full max-w-5xl",
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
