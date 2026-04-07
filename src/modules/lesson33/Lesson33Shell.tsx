import React from "react";
import Shell from "./Shell";

type LegacyLesson33ShellProps = {
  children: React.ReactNode;
  pathname?: string;
};

export default function Lesson33Shell({
  children,
  pathname,
}: LegacyLesson33ShellProps) {
  return <Shell pathname={pathname}>{children}</Shell>;
}
