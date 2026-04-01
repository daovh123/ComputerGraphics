import React from "react";
import { motion, AnimatePresence } from "motion/react";
import LessonHeader from "../../components/LessonHeader";
import LessonTabs from "../../components/LessonTabs";
import { LESSON_CARD_BASE } from "../../components/lessonClassNames";
import { lesson33Tabs } from "../../config/lessonCatalog";
import { cn } from "../../lib/utils";

export default function Lesson33Shell({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname?: string;
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className={cn(LESSON_CARD_BASE, "rounded-3xl p-6 space-y-4")}>
        <LessonHeader
          title="Bài 33: Máu và hệ tuần hoàn"
          subtitle="Khoa học tự nhiên 8 • Phần cơ thể người"
          variant="embedded"
        />

        <LessonTabs tabs={lesson33Tabs} variant="embedded" />
      </div>

      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname || "lesson-33"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
