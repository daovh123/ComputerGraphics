import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LessonHeader from "../../components/LessonHeader";
import LessonTabs from "../../components/LessonTabs";
import { LESSON_CARD_BASE } from "../../components/lessonClassNames";
import { lesson30Tabs } from "../../config/lessonCatalog";
import { cn } from "../../lib/utils";
import { mountLesson30ThreeSlots } from "../../lib/three/lesson30Slots";

export default function Lesson30Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = mountLesson30ThreeSlots(rootRef.current);
    return cleanup;
  }, [location.pathname]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className={cn(LESSON_CARD_BASE, "rounded-3xl p-6 space-y-4")}>
        <LessonHeader
          title="Bài 30: Khái quát về cơ thể người"
          variant="embedded"
        />
        <LessonTabs tabs={lesson30Tabs} variant="embedded" />
      </div>
      <div ref={rootRef}>{children}</div>
    </div>
  );
}
