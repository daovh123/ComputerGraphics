import { useEffect, useRef } from "react";
import type {
  LessonPlayerBackAction,
  LessonPlayerEnterAction,
} from "./LessonPlayerInteractionContext";
import { useLessonPlayerInteraction } from "./LessonPlayerInteractionContext";

export function useLessonStepEnterAction(
  action: LessonPlayerEnterAction | null,
) {
  const { setEnterAction, setEnterCanHandle } = useLessonPlayerInteraction();
  const actionRef = useRef<LessonPlayerEnterAction | null>(action);
  const canHandle = action?.canHandle() ?? false;

  actionRef.current = action;

  useEffect(() => {
    if (!actionRef.current) {
      setEnterAction(null);
      setEnterCanHandle(false);
      return () => {
        setEnterAction(null);
        setEnterCanHandle(false);
      };
    }

    setEnterAction({
      canHandle: () => actionRef.current?.canHandle() ?? false,
      run: () => {
        actionRef.current?.run();
      },
    });
    setEnterCanHandle(canHandle);

    return () => {
      setEnterAction(null);
      setEnterCanHandle(false);
    };
  }, [canHandle, setEnterAction, setEnterCanHandle]);

  useEffect(() => {
    setEnterCanHandle(canHandle);
  }, [canHandle, setEnterCanHandle]);
}

export function useLessonStepBackAction(action: LessonPlayerBackAction | null) {
  const { setBackAction, setBackCanHandle } = useLessonPlayerInteraction();
  const actionRef = useRef<LessonPlayerBackAction | null>(action);
  const canHandle = action?.canHandle() ?? false;

  actionRef.current = action;

  useEffect(() => {
    if (!actionRef.current) {
      setBackAction(null);
      setBackCanHandle(false);
      return () => {
        setBackAction(null);
        setBackCanHandle(false);
      };
    }

    setBackAction({
      canHandle: () => actionRef.current?.canHandle() ?? false,
      run: () => {
        actionRef.current?.run();
      },
    });
    setBackCanHandle(canHandle);

    return () => {
      setBackAction(null);
      setBackCanHandle(false);
    };
  }, [canHandle, setBackAction, setBackCanHandle]);

  useEffect(() => {
    setBackCanHandle(canHandle);
  }, [canHandle, setBackCanHandle]);
}
