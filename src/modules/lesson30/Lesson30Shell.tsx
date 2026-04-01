import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LessonHeader from "../../components/LessonHeader";
import LessonTabs from "../../components/LessonTabs";
import { lesson30Tabs } from "../../config/lessonCatalog";
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
      <LessonHeader title="Bài 30: Khái quát về cơ thể người" />
      <LessonTabs tabs={lesson30Tabs} />
      <div ref={rootRef}>{children}</div>
    </div>
  );
}
