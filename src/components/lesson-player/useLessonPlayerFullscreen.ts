import { useEffect, useRef, useState } from "react";

export function useLessonPlayerFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenTopbar, setShowFullscreenTopbar] = useState(true);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const topbarHideTimerRef = useRef<number | null>(null);

  const scheduleFullscreenTopbarHide = () => {
    if (topbarHideTimerRef.current) {
      window.clearTimeout(topbarHideTimerRef.current);
    }

    topbarHideTimerRef.current = window.setTimeout(() => {
      setShowFullscreenTopbar(false);
    }, 2200);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    void shellRef.current?.requestFullscreen();
  };

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

  return {
    shellRef,
    isFullscreen,
    showFullscreenTopbar,
    toggleFullscreen,
  };
}
