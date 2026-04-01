import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import LessonPlayerCompleteScreen, {
  type LessonPlayerCompleteAction,
  type LessonPlayerCompleteHighlight,
} from "./LessonPlayerCompleteScreen";
import LessonPlayerLayout from "./LessonPlayerLayout";
import {
  type LessonPlayerBackAction,
  LessonPlayerInteractionProvider,
  type LessonPlayerEnterAction,
} from "./lesson-player/LessonPlayerInteractionContext";
import type {
  LessonLearnConfig,
  LessonPlayerResolvedStep,
} from "./lesson-player/types";

interface LessonPlayerProps extends LessonLearnConfig {}

export default function LessonPlayer({
  lessonTitle,
  exitPath,
  steps,
  preload,
  completion,
}: LessonPlayerProps) {
  const { stepId } = useParams<{ stepId: string }>();
  const [enterAction, setEnterAction] = useState<LessonPlayerEnterAction | null>(
    null,
  );
  const [enterCanHandle, setEnterCanHandle] = useState(false);
  const [backAction, setBackAction] = useState<LessonPlayerBackAction | null>(
    null,
  );
  const [backCanHandle, setBackCanHandle] = useState(false);
  const completionPath = `${exitPath}/learn/complete`;
  const isCompletionStep = stepId === "complete";
  const currentIndex = steps.findIndex((step) => step.id === stepId);

  useEffect(() => {
    preload?.();
  }, [preload]);

  if (!isCompletionStep && currentIndex === -1) {
    return <Navigate to={steps[0].path} replace />;
  }

  const currentStep = !isCompletionStep ? steps[currentIndex] : null;
  const previousStep = !isCompletionStep
    ? steps[currentIndex - 1]
    : steps[steps.length - 1];
  const nextStep = !isCompletionStep ? steps[currentIndex + 1] : undefined;
  const completionContent = completion ?? {};
  const renderedContent = isCompletionStep ? (
    <LessonPlayerCompleteScreen
      title={completionContent.title ?? "Em đã hoàn thành bài học"}
      description={
        completionContent.description ??
        "Em đã đi hết toàn bộ các bước trong bài học tương tác này."
      }
      highlights={
        completionContent.highlights ?? [
          {
            title: "Đã hoàn thành toàn bộ các bước",
            description:
              "Em đã đi hết hành trình của bài học và có thể quay lại từng phần để xem lại.",
          },
          {
            title: "Có thể tiếp tục khám phá",
            description:
              "Từ đây, em có thể mở mô hình, làm quiz hoặc chuyển về trang bài học để xem chi tiết hơn.",
          },
          {
            title: "Tiến độ đã khép lại rõ ràng",
            description:
              "Màn hoàn thành giúp tách phần học nội dung với điểm kết của hành trình bài học.",
          },
        ]
      }
      actions={
        completionContent.actions ?? [
          { label: "Quay lại trang bài học", path: exitPath },
        ]
      }
    />
  ) : (
    currentStep?.content
  );

  return (
    <LessonPlayerInteractionProvider
      value={{
        setEnterAction,
        setBackAction,
        setEnterCanHandle,
        setBackCanHandle,
      }}
    >
      <LessonPlayerLayout
        lessonTitle={lessonTitle}
        stepTitle={isCompletionStep ? "Hoàn thành bài học" : currentStep!.title}
        currentStep={isCompletionStep ? steps.length : currentIndex + 1}
        totalSteps={steps.length}
        exitPath={exitPath}
        previousPath={previousStep?.path}
        nextPath={isCompletionStep ? undefined : nextStep?.path ?? completionPath}
        isNextCompletion={!isCompletionStep && !nextStep}
        steps={steps}
        contentWidth={isCompletionStep ? "default" : currentStep!.width}
        enterAction={isCompletionStep ? null : enterAction}
        backAction={isCompletionStep ? null : backAction}
        enterCanHandle={isCompletionStep ? false : enterCanHandle}
        backCanHandle={isCompletionStep ? false : backCanHandle}
      >
        {renderedContent}
      </LessonPlayerLayout>
    </LessonPlayerInteractionProvider>
  );
}
