import { useEffect } from "react";
import type {
  LessonPlayerBackAction,
  LessonPlayerEnterAction,
} from "./LessonPlayerInteractionContext";
import type { LessonPlayerStepLink } from "./types";

interface LessonPlayerKeyboardOptions {
  previousPath?: string;
  nextPath?: string;
  exitPath: string;
  steps: LessonPlayerStepLink[];
  enterAction?: LessonPlayerEnterAction | null;
  backAction?: LessonPlayerBackAction | null;
  enterCanHandle: boolean;
  backCanHandle: boolean;
  onNavigate: (path: string) => void;
  onExit: () => void;
  onToggleOutline: () => void;
  onToggleFullscreen: () => void;
}

export function useLessonPlayerKeyboard({
  previousPath,
  nextPath,
  exitPath,
  steps,
  enterAction,
  backAction,
  enterCanHandle,
  backCanHandle,
  onNavigate,
  onExit,
  onToggleOutline,
  onToggleFullscreen,
}: LessonPlayerKeyboardOptions) {
  useEffect(() => {
    const handlePrevious = () => {
      if (backCanHandle) {
        backAction?.run();
        return;
      }

      if (previousPath) {
        onNavigate(previousPath);
      }
    };

    const handleNext = () => {
      if (enterCanHandle) {
        enterAction?.run();
        return;
      }

      if (nextPath) {
        onNavigate(nextPath);
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
        onToggleOutline();
        return;
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        onToggleFullscreen();
        return;
      }

      if (/^[1-9]$/.test(event.key)) {
        const step = steps[Number(event.key) - 1];

        if (step) {
          event.preventDefault();
          onNavigate(step.path);
        }

        return;
      }

      if (event.key.toLowerCase() === "q" || event.key === "Escape") {
        event.preventDefault();
        if (document.fullscreenElement) {
          void document.exitFullscreen();
          return;
        }

        onNavigate(exitPath);
        onExit();
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
    nextPath,
    onExit,
    onNavigate,
    onToggleFullscreen,
    onToggleOutline,
    previousPath,
    steps,
  ]);
}
