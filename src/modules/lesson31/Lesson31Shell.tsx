import React from "react";
import LessonHeader from "../../components/LessonHeader";
import LessonTabs from "../../components/LessonTabs";
import { LESSON_CARD_BASE } from "../../components/lessonClassNames";
import { lesson31Tabs } from "../../config/lessonCatalog";
import { cn } from "../../lib/utils";

export default function Lesson31Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className={cn(LESSON_CARD_BASE, "rounded-3xl p-6 space-y-4")}>
        <LessonHeader title="Bài 31: Hệ vận động ở người" variant="embedded" />
        <LessonTabs tabs={lesson31Tabs} variant="embedded" />
      </div>
      {children}
    </div>
  );
}
