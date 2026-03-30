import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Library from "../views/Library";
import LessonPlaceholder from "../views/LessonPlaceholder";
import { LESSON_ROUTES } from "../lessons/registry";

interface AppRoutesProps {
  navigateToPath: (path: string) => void;
  goBack: () => void;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
}

export default function AppRoutes({
  navigateToPath,
  goBack,
  selectedSubjectId,
  setSelectedSubjectId,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            navigateToPath={navigateToPath}
            selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={setSelectedSubjectId}
          />
        }
      />
      <Route path="/lesson-overview" element={<Navigate to="/lesson-30" replace />} />
      <Route path="/body-parts" element={<Navigate to="/lesson-30/body-parts" replace />} />
      <Route path="/coordination" element={<Navigate to="/lesson-30/coordination" replace />} />
      <Route
        path="/biological-clock"
        element={<Navigate to="/lesson-30/biological-clock" replace />}
      />
      <Route path="/summary" element={<Navigate to="/lesson-30/summary" replace />} />
      <Route path="/challenge" element={<Navigate to="/lesson-30/challenge" replace />} />
      <Route
        path="/characteristics"
        element={<Navigate to="/lesson-30/characteristics" replace />}
      />
      <Route
        path="/lesson-placeholder/:lessonId"
        element={
          <LessonPlaceholder
            goBack={goBack}
          />
        }
      />
      <Route
        path="/library"
        element={
          <Library
            navigateToPath={navigateToPath}
            goBack={goBack}
            setSelectedSubjectId={setSelectedSubjectId}
          />
        }
      />
      {LESSON_ROUTES.map((route) => (
        <React.Fragment key={route.path}>
          <Route path={route.path} element={route.element} />
        </React.Fragment>
      ))}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
