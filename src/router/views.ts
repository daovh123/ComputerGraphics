export type View =
  | "dashboard"
  | "lesson-overview"
  | "body-parts"
  | "coordination"
  | "biological-clock"
  | "summary"
  | "challenge"
  | "characteristics"
  | "lesson-placeholder"
  | "library"
  | "lesson-32-overview"
  | "lesson-32-explorer"
  | "lesson-32-simulation"
  | "lesson-32-diseases"
  | "lesson-32-nutrition"
  | "lesson-32-food-safety"
  | "lesson-32-quiz"
  | "lesson-33-overview"
  | "lesson-33-explorer"
  | "lesson-33-blood"
  | "lesson-33-simulation"
  | "lesson-33-diseases"
  | "lesson-33-quiz";

export const VIEW_PATHS: Record<View, string> = {
  dashboard: "/dashboard",
  "lesson-overview": "/lesson-30",
  "body-parts": "/lesson-30/body-parts",
  coordination: "/lesson-30/coordination",
  "biological-clock": "/lesson-30/biological-clock",
  summary: "/lesson-30/summary",
  challenge: "/lesson-30/challenge",
  characteristics: "/lesson-30/characteristics",
  "lesson-placeholder": "/lesson-placeholder",
  library: "/library",
  "lesson-32-overview": "/lesson-32",
  "lesson-32-explorer": "/lesson-32/explorer",
  "lesson-32-simulation": "/lesson-32/simulation",
  "lesson-32-diseases": "/lesson-32/diseases",
  "lesson-32-nutrition": "/lesson-32/nutrition",
  "lesson-32-food-safety": "/lesson-32/food-safety",
  "lesson-32-quiz": "/lesson-32/quiz",
  "lesson-33-overview": "/lesson-33",
  "lesson-33-explorer": "/lesson-33/explorer",
  "lesson-33-blood": "/lesson-33/blood",
  "lesson-33-simulation": "/lesson-33/simulation",
  "lesson-33-diseases": "/lesson-33/diseases",
  "lesson-33-quiz": "/lesson-33/quiz",
};

export const getViewFromPath = (pathname: string): View => {
  const pairs = Object.entries(VIEW_PATHS) as [View, string][];
  const found = pairs.find(([, path]) => path === pathname);
  if (found) {
    return found[0];
  }

  if (
    pathname.startsWith("/lesson-30") ||
    pathname.startsWith("/lesson-31") ||
    pathname.startsWith("/lesson-32") ||
    pathname.startsWith("/lesson-33")
  ) {
    return "lesson-placeholder";
  }

  return "dashboard";
};
