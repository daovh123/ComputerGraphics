import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  List,
  Shrink,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import type {
  LessonPlayerBackAction,
  LessonPlayerEnterAction,
} from "./lesson-player/LessonPlayerInteractionContext";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenTopbar, setShowFullscreenTopbar] = useState(true);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const topbarHideTimerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  const isCompletionTrigger = isNextCompletion && !enterCanHandle;

  const scheduleFullscreenTopbarHide = () => {
    if (topbarHideTimerRef.current) {
      window.clearTimeout(topbarHideTimerRef.current);
    }

    topbarHideTimerRef.current = window.setTimeout(() => {
      setShowFullscreenTopbar(false);
    }, 2200);
  };

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
    const node = shellRef.current;

    if (!node) {
      return;
    }

    const handleFullscreenChange = () => {
      const active = document.fullscreenElement === node;
      setIsFullscreen(active);
      setShowFullscreenTopbar(true);

      if (active) {
        scheduleFullscreenTopbarHide();
      } else if (topbarHideTimerRef.current) {
        window.clearTimeout(topbarHideTimerRef.current);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      return;
    }

    const showControls = () => {
      setShowFullscreenTopbar(true);
      scheduleFullscreenTopbarHide();
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY <= 88) {
        showControls();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerdown", showControls);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", showControls);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const handlePrevious = () => {
      if (backCanHandle) {
        backAction.run();
        return;
      }

      if (previousPath) {
        navigate(previousPath);
      }
    };

    const handleNext = () => {
      if (enterCanHandle) {
        enterAction.run();
        return;
      }

      if (nextPath) {
        navigate(nextPath);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      if (event.key === "ArrowLeft" && (previousPath || backCanHandle)) {
        event.preventDefault();
        handlePrevious();
        return;
      }

      if (event.key === "ArrowRight" && nextPath) {
        event.preventDefault();
        handleNext();
        return;
      }

      if (event.key === "Enter") {
        if (enterCanHandle || nextPath) {
          event.preventDefault();
          handleNext();
        }

        return;
      }

      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        setIsOutlineOpen((current) => !current);
        return;
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();

        if (document.fullscreenElement) {
          void document.exitFullscreen();
          return;
        }

        shellRef.current?.requestFullscreen();
        return;
      }

      if (/^[1-9]$/.test(event.key)) {
        const step = steps[Number(event.key) - 1];

        if (step) {
          event.preventDefault();
          navigate(step.path);
        }

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
  }, [
    backAction,
    backCanHandle,
    enterAction,
    enterCanHandle,
    exitPath,
    navigate,
    nextPath,
    previousPath,
    steps,
  ]);

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
                onClick={() => {
                  if (document.fullscreenElement) {
                    void document.exitFullscreen();
                    return;
                  }

                  void shellRef.current?.requestFullscreen();
                }}
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
              <div className="relative" ref={outlineRef}>
                <button
                  type="button"
                  onClick={() => setIsOutlineOpen((current) => !current)}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D7E8FF] bg-white/90 px-4 py-2 text-sm font-semibold text-[#334155] hover:bg-white"
                >
                  <List className="h-4 w-4" />
                  <span>Mục lục</span>
                </button>
                {isOutlineOpen ? (
                  <div className="absolute right-0 top-full mt-3 flex max-h-[70vh] w-[22rem] flex-col overflow-hidden rounded-[24px] border border-[#D7E8FF] bg-white/95 p-3 shadow-2xl shadow-sky-100/80">
                    <div className="mb-2 px-2">
                      <p className="text-sm font-black text-[#1F2937]">Lộ trình bài học</p>
                      <p className="text-xs text-[#6B7280]">Nhấn số hoặc chọn bước để chuyển nhanh.</p>
                    </div>
                    <div className="space-y-1 overflow-y-auto pr-1">
                      {steps.map((step, index) => (
                        <Link
                          key={step.id}
                          to={step.path}
                          onClick={() => setIsOutlineOpen(false)}
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
                        onClick={() => setIsOutlineOpen(false)}
                        className="block rounded-2xl px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#F8FCFF]"
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
