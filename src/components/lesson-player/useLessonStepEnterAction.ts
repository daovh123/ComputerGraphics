import { useEffect, useRef } from "react";
import type {
  LessonPlayerBackAction,
  LessonPlayerEnterAction,
} from "./LessonPlayerInteractionContext";
import { useLessonPlayerInteraction } from "./LessonPlayerInteractionContext";

interface LessonStepActionRegistration<TAction> {
  action: TAction | null;
  setAction: (action: TAction | null) => void;
  setCanHandle: (canHandle: boolean) => void;
  canHandle: boolean;
}

export interface LessonStepProgression {
  canGoNext?: boolean;
  onNext?: () => void;
  canGoBack?: boolean;
  onBack?: () => void;
}

function useLessonStepAction<TAction extends { canHandle: () => boolean; run: () => void }>({
  action,
  setAction,
  setCanHandle,
  canHandle,
}: LessonStepActionRegistration<TAction>) {
  const actionRef = useRef<TAction | null>(action);

  actionRef.current = action;

  useEffect(() => {
    if (!actionRef.current) {
      setAction(null);
      setCanHandle(false);
      return () => {
        setAction(null);
        setCanHandle(false);
      };
    }

    setAction({
      canHandle: () => actionRef.current?.canHandle() ?? false,
      run: () => {
        actionRef.current?.run();
      },
    } as TAction);
    setCanHandle(canHandle);

    return () => {
      setAction(null);
      setCanHandle(false);
    };
  }, [canHandle, setAction, setCanHandle]);

  useEffect(() => {
    setCanHandle(canHandle);
  }, [canHandle, setCanHandle]);
}

export function useLessonStepEnterAction(
  action: LessonPlayerEnterAction | null,
) {
  const { setEnterAction, setEnterCanHandle } = useLessonPlayerInteraction();
  const canHandle = action?.canHandle() ?? false;

  useLessonStepAction({
    action,
    setAction: setEnterAction,
    setCanHandle: setEnterCanHandle,
    canHandle,
  });
}

export function useLessonStepBackAction(action: LessonPlayerBackAction | null) {
  const { setBackAction, setBackCanHandle } = useLessonPlayerInteraction();
  const canHandle = action?.canHandle() ?? false;

  useLessonStepAction({
    action,
    setAction: setBackAction,
    setCanHandle: setBackCanHandle,
    canHandle,
  });
}

export function useLessonStepProgression({
  canGoNext = false,
  onNext,
  canGoBack = false,
  onBack,
}: LessonStepProgression) {
  useLessonStepEnterAction(
    onNext
      ? {
          canHandle: () => canGoNext,
          run: onNext,
        }
      : null,
  );

  useLessonStepBackAction(
    onBack
      ? {
          canHandle: () => canGoBack,
          run: onBack,
        }
      : null,
  );
}
