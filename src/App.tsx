/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./router/AppRoutes";
import { getViewFromPath, VIEW_PATHS, type View } from "./router/views";

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
      <AppRoutes
        navigate={navigate}
        navigateToPath={navigateToPath}
        goBack={goBack}
        selectedLessonTitle={selectedLessonTitle}
        setSelectedLessonTitle={setSelectedLessonTitle}
        selectedSubjectId={selectedSubjectId}
        setSelectedSubjectId={setSelectedSubjectId}
      />
    </Layout>
  );
}
