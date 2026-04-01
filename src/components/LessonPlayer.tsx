import React from "react";
import { Navigate, useParams } from "react-router-dom";
import LessonPlayerLayout from "./LessonPlayerLayout";
import type { LessonPlayerResolvedStep } from "./lesson-player/types";

interface LessonPlayerProps {
  lessonTitle: string;
  exitPath: string;
  steps: LessonPlayerResolvedStep[];
}

export default function LessonPlayer({
  lessonTitle,
  exitPath,
  steps,
}: LessonPlayerProps) {
  const { stepId } = useParams<{ stepId: string }>();
  const currentIndex = steps.findIndex((step) => step.id === stepId);

  if (currentIndex === -1) {
    return <Navigate to={steps[0].path} replace />;
  }

  const currentStep = steps[currentIndex];
  const previousStep = steps[currentIndex - 1];
  const nextStep = steps[currentIndex + 1];

  return (
    <LessonPlayerLayout
      lessonTitle={lessonTitle}
      stepTitle={currentStep.title}
      currentStep={currentIndex + 1}
      totalSteps={steps.length}
      exitPath={exitPath}
      previousPath={previousStep?.path}
      nextPath={nextStep?.path}
      steps={steps}
    >
      {currentStep.content}
    </LessonPlayerLayout>
  );
}
