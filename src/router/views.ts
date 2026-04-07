export type View =
  | "dashboard"
  | "lesson-30-overview"
  | "lesson-30-khai-quat"
  | "lesson-30-role"
  | "lesson-30-van-dong"
  | "lesson-30-tuan-hoan"
  | "lesson-30-ho-hap"
  | "lesson-30-tieu-hoa"
  | "lesson-30-bai-tiet"
  | "lesson-30-than-kinh"
  | "lesson-30-noi-tiet"
  | "lesson-30-sinh-duc"
  | "lesson-30-giac-quan"
  | "lesson-30-summary"
  | "lesson-30-quiz"
  | "lesson-31-overview"
  | "lesson-31-anatomy"
  | "lesson-31-movement-function"
  | "lesson-31-diseases"
  | "lesson-31-model3d"
  | "lesson-31-quiz"
  | "lesson-31-summary"
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
  "lesson-30-overview": "/lesson-30",
  "lesson-30-khai-quat": "/lesson-30/khai-quat",
  "lesson-30-role": "/lesson-30/vai-tro",
  "lesson-30-van-dong": "/lesson-30/he-van-dong",
  "lesson-30-tuan-hoan": "/lesson-30/he-tuan-hoan",
  "lesson-30-ho-hap": "/lesson-30/he-ho-hap",
  "lesson-30-tieu-hoa": "/lesson-30/he-tieu-hoa",
  "lesson-30-bai-tiet": "/lesson-30/he-bai-tiet",
  "lesson-30-than-kinh": "/lesson-30/he-than-kinh",
  "lesson-30-noi-tiet": "/lesson-30/he-noi-tiet",
  "lesson-30-sinh-duc": "/lesson-30/he-sinh-duc",
  "lesson-30-giac-quan": "/lesson-30/giac-quan",
  "lesson-30-summary": "/lesson-30/tong-ket",
  "lesson-30-quiz": "/lesson-30/quiz",
  "lesson-31-overview": "/lesson-31",
  "lesson-31-anatomy": "/lesson-31/anatomy",
  "lesson-31-movement-function": "/lesson-31/movement-function",
  "lesson-31-diseases": "/lesson-31/diseases",
  "lesson-31-model3d": "/lesson-31/model3d",
  "lesson-31-quiz": "/lesson-31/quiz",
  "lesson-31-summary": "/lesson-31/summary",
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
