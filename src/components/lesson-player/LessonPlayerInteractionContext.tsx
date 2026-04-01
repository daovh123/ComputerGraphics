import React, { createContext, useContext } from "react";

export interface LessonPlayerEnterAction {
  canHandle: () => boolean;
  run: () => void;
}

export interface LessonPlayerBackAction {
  canHandle: () => boolean;
  run: () => void;
}

interface LessonPlayerInteractionContextValue {
  setEnterAction: (action: LessonPlayerEnterAction | null) => void;
  setBackAction: (action: LessonPlayerBackAction | null) => void;
  setEnterCanHandle: (canHandle: boolean) => void;
  setBackCanHandle: (canHandle: boolean) => void;
}

const LessonPlayerInteractionContext =
  createContext<LessonPlayerInteractionContextValue | null>(null);

export function LessonPlayerInteractionProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: LessonPlayerInteractionContextValue;
}) {
  return (
    <LessonPlayerInteractionContext.Provider value={value}>
      {children}
    </LessonPlayerInteractionContext.Provider>
  );
}

export function useLessonPlayerInteraction() {
  const context = useContext(LessonPlayerInteractionContext);

  if (!context) {
    throw new Error(
      "useLessonPlayerInteraction must be used inside LessonPlayerInteractionProvider",
    );
  }

  return context;
}
