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
import Lesson30Shell from "./modules/lesson30/Lesson30Shell";
import Lesson30Overview from "./modules/lesson30/Lesson30Overview";
import Lesson30BodyParts from "./modules/lesson30/Lesson30BodyParts";
import Lesson30Coordination from "./modules/lesson30/Lesson30Coordination";
import Lesson30BiologicalClock from "./modules/lesson30/Lesson30BiologicalClock";
import Lesson30Summary from "./modules/lesson30/Lesson30Summary";
import Lesson30Challenge from "./modules/lesson30/Lesson30Challenge";
import Lesson30Characteristics from "./modules/lesson30/Lesson30Characteristics";
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
// import Lesson30Module from "./modules/lesson30/Lesson30Module";
import Lesson31Module from "./modules/lesson31/Lesson31Module";
import Lesson33Shell from "./modules/lesson33/Lesson33Shell";

const VIEW_PATHS: Record<View, string> = {
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
        <Route path="/lesson-overview" element={<Navigate to="/lesson-30" replace />} />
        <Route path="/lesson-30" element={<Lesson30Shell><Lesson30Overview setCurrentView={navigate} goBack={goBack} /></Lesson30Shell>} />
        <Route path="/body-parts" element={<Navigate to="/lesson-30/body-parts" replace />} />
        <Route path="/lesson-30/body-parts" element={<Lesson30Shell><Lesson30BodyParts setCurrentView={navigate} goBack={goBack} /></Lesson30Shell>} />
        <Route path="/coordination" element={<Navigate to="/lesson-30/coordination" replace />} />
        <Route path="/lesson-30/coordination" element={<Lesson30Shell><Lesson30Coordination setCurrentView={navigate} goBack={goBack} /></Lesson30Shell>} />
        <Route path="/biological-clock" element={<Navigate to="/lesson-30/biological-clock" replace />} />
        <Route path="/lesson-30/biological-clock" element={<Lesson30Shell><Lesson30BiologicalClock setCurrentView={navigate} goBack={goBack} /></Lesson30Shell>} />
        <Route path="/summary" element={<Navigate to="/lesson-30/summary" replace />} />
        <Route path="/lesson-30/summary" element={<Lesson30Shell><Lesson30Summary setCurrentView={navigate} goBack={goBack} /></Lesson30Shell>} />
        <Route path="/challenge" element={<Navigate to="/lesson-30/challenge" replace />} />
        <Route path="/lesson-30/challenge" element={<Lesson30Shell><Lesson30Challenge setCurrentView={navigate} goBack={goBack} /></Lesson30Shell>} />
        <Route path="/characteristics" element={<Navigate to="/lesson-30/characteristics" replace />} />
        <Route path="/lesson-30/characteristics" element={<Lesson30Shell><Lesson30Characteristics setCurrentView={navigate} goBack={goBack} /></Lesson30Shell>} />
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
              goBack={goBack}
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
        <Route path="/lesson-33" element={<Lesson33Shell currentView={currentView} setCurrentView={navigate} />} />
        <Route path="/lesson-33/explorer" element={<Lesson33Shell currentView={currentView} setCurrentView={navigate} />} />
        <Route path="/lesson-33/blood" element={<Lesson33Shell currentView={currentView} setCurrentView={navigate} />} />
        <Route path="/lesson-33/simulation" element={<Lesson33Shell currentView={currentView} setCurrentView={navigate} />} />
        <Route path="/lesson-33/diseases" element={<Lesson33Shell currentView={currentView} setCurrentView={navigate} />} />
        <Route path="/lesson-33/quiz" element={<Lesson33Shell currentView={currentView} setCurrentView={navigate} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}
