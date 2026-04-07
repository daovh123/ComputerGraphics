import React, { useEffect, useMemo, useState } from "react";
import {
  lesson31Header,
  lesson31ImageMap,
  lesson31Overview,
  lesson31Parts,
  lesson31Summary,
  type BodySystem,
  type BodyView,
  type Lesson31PartItem,
  type Lesson31Tab,
} from "../../data/lesson31";
import LessonHeader from "../../components/LessonHeader";
import LessonTabs from "../../components/LessonTabs";
import { LESSON_CARD_BASE } from "../../components/lessonClassNames";
import { lesson31Tabs } from "../../config/lessonCatalog";
import { cn } from "../../lib/utils";
import Lesson31Explorer from "./Lesson31Explorer";
import MovementDiseasesSection from "./MovementDiseasesSection";
import MovementFunctionSection from "./MovementFunctionSection";
import Lesson31Model3D from "./Lesson31Model3D";
import MovementQuizV2 from "./MovementQuizV2";
import Lesson31Summary from "./Lesson31Summary";

interface Lesson31OverviewProps {
  initialTab?: Lesson31Tab;
}

export default function Lesson31Overview({ initialTab = "overview" }: Lesson31OverviewProps) {
  const [activeSystem, setActiveSystem] = useState<BodySystem>("skeleton");
  const [activeView, setActiveView] = useState<BodyView>("front");
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  const currentParts = useMemo(
    () =>
      lesson31Parts.filter(
        (part) => part.system === activeSystem && part.side === activeView,
      ),
    [activeSystem, activeView],
  );

  const selectedPart = useMemo<Lesson31PartItem | null>(
    () => currentParts.find((part) => part.id === selectedPartId) ?? null,
    [currentParts, selectedPartId],
  );

  useEffect(() => {
    setSelectedPartId(null);
  }, [activeSystem, activeView]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className={cn(LESSON_CARD_BASE, "rounded-3xl p-6 space-y-4")}
      >
        <LessonHeader title={lesson31Header.title} variant="embedded" />
        <LessonTabs tabs={lesson31Tabs} variant="embedded" />
      </div>

      {initialTab === "overview" && (
        <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-[#1F2937]">Tổng quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <article className="rounded-2xl border border-[#DDEBFF] bg-[#F8FBFF] p-5 space-y-3">
              <h3 className="text-lg font-bold text-[#1F2937]">Cấu tạo hệ vận động</h3>
              <ul className="space-y-2 text-sm text-[#475569]">
                <li>- Gồm bộ xương và hệ cơ.</li>
                <li>- Xương tạo khung cơ thể.</li>
                <li>- Cơ bám vào xương giúp vận động.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#DDEBFF] bg-[#F8FBFF] p-5 space-y-3">
              <h3 className="text-lg font-bold text-[#1F2937]">Chức năng chính</h3>
              <ul className="space-y-2 text-sm text-[#475569]">
                <li>- Nâng đỡ cơ thể.</li>
                <li>- Bảo vệ cơ quan bên trong.</li>
                <li>- Giúp cơ thể vận động.</li>
              </ul>
            </article>
          </div>

          <div className="rounded-2xl border border-[#E5EEF8] bg-[#F8FAFC] p-5 space-y-3">
            <h3 className="text-lg font-bold text-[#1F2937]">Mục tiêu bài học</h3>
            <ul className="space-y-2 text-sm text-[#475569]">
              {lesson31Overview.goals.map((goal) => (
                <li key={goal}>- {goal}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5EEF8] bg-[#F8FAFC] p-5 space-y-3">
            <h3 className="text-lg font-bold text-[#1F2937]">Ghi nhớ nhanh</h3>
            <ul className="space-y-2 text-sm text-[#475569]">
              {lesson31Overview.quickFacts.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {initialTab === "anatomy" && (
        <Lesson31Explorer
          system={activeSystem}
          view={activeView}
          imageSrc={lesson31ImageMap[activeSystem][activeView]}
          parts={currentParts}
          selectedPart={selectedPart}
          onSystemChange={setActiveSystem}
          onViewChange={setActiveView}
          onSelectPart={setSelectedPartId}
        />
      )}

      {initialTab === "movement-function" && <MovementFunctionSection />}

      {initialTab === "model3d" && (
        <Lesson31Model3D />
      )}

      {initialTab === "diseases" && <MovementDiseasesSection />}

      {initialTab === "quiz" && <MovementQuizV2 />}

      {initialTab === "summary" && (
        <Lesson31Summary
          structureTitle={lesson31Summary.structureTitle}
          structureText={lesson31Summary.structureText}
          functionTitle={lesson31Summary.functionTitle}
          functionText={lesson31Summary.functionText}
          bullets={lesson31Summary.bullets}
          keyPoints={lesson31Summary.keyPoints}
          selfCheckQuestions={lesson31Summary.selfCheckQuestions}
          dailyHabits={lesson31Summary.dailyHabits}
          finalMessage={lesson31Summary.finalMessage}
        />
      )}
    </div>
  );
}
