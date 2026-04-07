import React, { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "../lib/utils";

type FullscreenableProps = {
  className?: string;
  fullscreenClassName?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
  dataThreeSlot?: string;
  dataIllustrationSlot?: string;
  expandLabel?: string;
  collapseLabel?: string;
};

export default function Fullscreenable({
  className,
  fullscreenClassName = "w-screen h-screen aspect-auto",
  buttonClassName,
  children,
  dataThreeSlot,
  dataIllustrationSlot,
  expandLabel = "Phóng to",
  collapseLabel = "Thu nhỏ",
}: FullscreenableProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === rootRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    onFullscreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const el = rootRef.current;
    if (!el) return;

    try {
      if (document.fullscreenElement === el) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        return;
      }

      // If another element is fullscreen, exit first.
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }

      if (el.requestFullscreen) {
        await el.requestFullscreen();
      }
    } catch {
      // Ignore fullscreen errors (e.g., unsupported browser).
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("relative", className, isFullscreen && fullscreenClassName)}
      {...(dataThreeSlot ? { "data-three-slot": dataThreeSlot } : {})}
      {...(dataIllustrationSlot
        ? { "data-illustration-slot": dataIllustrationSlot }
        : {})}
    >
      {children}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void toggleFullscreen();
        }}
        aria-label={isFullscreen ? collapseLabel : expandLabel}
        title={isFullscreen ? collapseLabel : expandLabel}
        className={cn(
          "absolute top-3 right-3 z-20 inline-flex items-center gap-2 rounded-xl border border-[#E0F0FF] bg-white px-3 py-2 text-sm font-bold text-[#333] shadow-sm",
          "hover:bg-[#F0F8FF] hover:border-[#00BFFF]",
          buttonClassName,
        )}
      >
        {isFullscreen ? (
          <Minimize2 className="w-4 h-4" />
        ) : (
          <Maximize2 className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">
          {isFullscreen ? collapseLabel : expandLabel}
        </span>
      </button>
    </div>
  );
}
