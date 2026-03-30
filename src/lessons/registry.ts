import type { LessonManifest, LessonRouteConfig } from "./types";

const manifestModules = import.meta.glob("../modules/lesson*/manifest.ts", {
  eager: true,
}) as Record<string, Record<string, unknown>>;

const routeModules = import.meta.glob("../modules/lesson*/routes.tsx", {
  eager: true,
}) as Record<string, Record<string, unknown>>;

function isLessonManifest(value: unknown): value is LessonManifest {
  return Boolean(
    value &&
      typeof value === "object" &&
      "id" in value &&
      "order" in value &&
      "subjectId" in value &&
      "title" in value,
  );
}

function isLessonRouteConfigArray(value: unknown): value is LessonRouteConfig[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        "path" in item &&
        "element" in item,
    )
  );
}

function getLessonManifestFromModule(moduleExports: Record<string, unknown>) {
  const manifest = Object.values(moduleExports).find(isLessonManifest);
  if (!manifest) {
    throw new Error("Khong tim thay LessonManifest hop le trong module lesson manifest.");
  }

  return manifest;
}

function getLessonRoutesFromModule(moduleExports: Record<string, unknown>) {
  const routes = Object.values(moduleExports).find(isLessonRouteConfigArray);
  if (!routes) {
    throw new Error("Khong tim thay danh sach route hop le trong module lesson routes.");
  }

  return routes;
}

const discoveredLessons = Object.values(manifestModules).map(getLessonManifestFromModule);
const discoveredLessonRoutes = Object.values(routeModules).flatMap(getLessonRoutesFromModule);

export const LESSONS: LessonManifest[] = [
  ...discoveredLessons,
].sort((a, b) => a.order - b.order);

export const LESSON_ROUTES: LessonRouteConfig[] = discoveredLessonRoutes;

export function getLessonsBySubject(subjectId: string) {
  return LESSONS.filter((lesson) => lesson.subjectId === subjectId);
}

export function getLessonById(lessonId: string) {
  return LESSONS.find((lesson) => lesson.id === lessonId);
}
