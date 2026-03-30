import { getLessonsBySubject } from "../../lessons/registry";
import type { LessonCardMeta } from "../../lessons/types";

export const khtnLessonCards: LessonCardMeta[] = getLessonsBySubject("khtn")
  .map((lesson) => lesson.card)
  .filter((lesson): lesson is LessonCardMeta => Boolean(lesson));
