/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./views/Dashboard";
import LessonDetail from "./views/LessonDetail";
import BodyParts from "./views/BodyParts";
import Coordination from "./views/Coordination";
import BiologicalClock from "./views/BiologicalClock";
import Summary from "./views/Summary";
import Challenge from "./views/Challenge";
import Characteristics from "./views/Characteristics";
import LessonPlaceholder from "./views/LessonPlaceholder";
import Library from "./views/Library";
import { View } from "./types";
import Lesson32Shell from "./modules/lesson32/Lesson32Shell";
import Lesson32Overview from "./modules/lesson32/Lesson32Overview";
import Lesson32Explorer from "./modules/lesson32/Lesson32Explorer";
import Lesson32Simulation from "./modules/lesson32/Lesson32Simulation";
import Lesson32Quiz from "./modules/lesson32/Lesson32Quiz";
import Lesson32Diseases from "./modules/lesson32/Lesson32Diseases";
import Lesson32Nutrition from "./modules/lesson32/Lesson32Nutrition";
import Lesson32FoodSafety from "./modules/lesson32/Lesson32FoodSafety";
import Lesson30Module from "./modules/lesson30/Lesson30Module";
import Lesson31Module from "./modules/lesson31/Lesson31Module";
import Lesson33Module from "./modules/lesson33/Lesson33Module";

const VIEW_PATHS: Record<View, string> = {
  dashboard: "/dashboard",
  "lesson-overview": "/lesson-overview",
  "body-parts": "/body-parts",
  coordination: "/coordination",
  "biological-clock": "/biological-clock",
  summary: "/summary",
  challenge: "/challenge",
  characteristics: "/characteristics",
  "lesson-placeholder": "/lesson-placeholder",
  library: "/library",
};

const getViewFromPath = (pathname: string): View => {
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

export default function App() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const currentPath =
    location.pathname === "/" ? "/dashboard" : location.pathname;
  const currentView = getViewFromPath(currentPath);

  const [selectedLessonTitle, setSelectedLessonTitle] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  const navigate = (view: View) => {
    const targetPath = VIEW_PATHS[view];
    if (targetPath && targetPath !== currentPath) {
      routerNavigate(targetPath);
    }
  };

  const navigateToPath = (path: string) => {
    if (path !== currentPath) {
      routerNavigate(path);
    }
  };

  const goBack = () => {
    routerNavigate(-1);
  };

  return (
    <Layout
      currentView={currentView}
      currentPath={currentPath}
      setCurrentView={navigate}
      navigateToPath={navigateToPath}
      setSelectedLessonTitle={setSelectedLessonTitle}
      selectedLessonTitle={selectedLessonTitle}
      selectedSubjectId={selectedSubjectId}
      setSelectedSubjectId={setSelectedSubjectId}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              setCurrentView={navigate}
              navigateToPath={navigateToPath}
              setSelectedLessonTitle={setSelectedLessonTitle}
              selectedSubjectId={selectedSubjectId}
              setSelectedSubjectId={setSelectedSubjectId}
            />
          }
        />
        <Route
          path="/lesson-overview"
          element={<LessonDetail setCurrentView={navigate} goBack={goBack} />}
        />
        <Route path="/lesson-30" element={<Lesson30Module />} />
        <Route path="/lesson-31" element={<Lesson31Module />} />
        <Route
          path="/body-parts"
          element={<BodyParts setCurrentView={navigate} goBack={goBack} />}
        />
        <Route
          path="/coordination"
          element={<Coordination setCurrentView={navigate} goBack={goBack} />}
        />
        <Route
          path="/biological-clock"
          element={
            <BiologicalClock setCurrentView={navigate} goBack={goBack} />
          }
        />
        <Route
          path="/summary"
          element={<Summary setCurrentView={navigate} goBack={goBack} />}
        />
        <Route
          path="/challenge"
          element={<Challenge setCurrentView={navigate} goBack={goBack} />}
        />
        <Route
          path="/characteristics"
          element={
            <Characteristics setCurrentView={navigate} goBack={goBack} />
          }
        />
        <Route
          path="/lesson-placeholder"
          element={
            <LessonPlaceholder
              setCurrentView={navigate}
              title={selectedLessonTitle}
              goBack={goBack}
            />
          }
        />
        <Route
          path="/library"
          element={
            <Library
              setCurrentView={navigate}
              setSelectedLessonTitle={setSelectedLessonTitle}
              goBack={goBack}
              selectedSubjectId={selectedSubjectId}
              setSelectedSubjectId={setSelectedSubjectId}
            />
          }
        />
        <Route
          path="/lesson-32"
          element={
            <Lesson32Shell>
              <Lesson32Overview />
            </Lesson32Shell>
          }
        />
        <Route
          path="/lesson-32/explorer"
          element={
            <Lesson32Shell>
              <Lesson32Explorer />
            </Lesson32Shell>
          }
        />
        <Route
          path="/lesson-32/simulation"
          element={
            <Lesson32Shell>
              <Lesson32Simulation />
            </Lesson32Shell>
          }
        />
        <Route
          path="/lesson-32/diseases"
          element={
            <Lesson32Shell>
              <Lesson32Diseases />
            </Lesson32Shell>
          }
        />
        <Route
          path="/lesson-32/nutrition"
          element={
            <Lesson32Shell>
              <Lesson32Nutrition />
            </Lesson32Shell>
          }
        />
        <Route
          path="/lesson-32/food-safety"
          element={
            <Lesson32Shell>
              <Lesson32FoodSafety />
            </Lesson32Shell>
          }
        />
        <Route
          path="/lesson-32/quiz"
          element={
            <Lesson32Shell>
              <Lesson32Quiz />
            </Lesson32Shell>
          }
        />
        <Route path="/lesson-33/module" element={<Navigate to="/lesson-33" replace />} />
        <Route path="/lesson-33" element={<Lesson33Module />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}
