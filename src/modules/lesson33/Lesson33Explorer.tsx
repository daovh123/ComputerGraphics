import React from "react";
import Explorer from "./tabs/Explorer";
import { type View } from "../../router/views";

type LegacyLesson33ExplorerProps = {
  setCurrentView: (view: View) => void;
};

export default function Lesson33Explorer(_: LegacyLesson33ExplorerProps) {
  return <Explorer />;
}
