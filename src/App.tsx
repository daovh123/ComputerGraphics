/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import { LESSON_ROUTES } from "./lessons/registry";
import AppRoutes from "./router/AppRoutes";

export default function App() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const currentPath =
    location.pathname === "/" ? "/dashboard" : location.pathname;
  const isLessonModePath = LESSON_ROUTES.some(
    (route) =>
      route.chrome === "lesson" &&
      Boolean(matchPath({ path: route.path, end: true }, currentPath)),
  );

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  const navigateToPath = (path: string) => {
    if (path !== currentPath) {
      routerNavigate(path);
    }
  };

  const goBack = () => {
    routerNavigate(-1);
  };

  const routes = (
    <AppRoutes
      navigateToPath={navigateToPath}
      goBack={goBack}
      selectedSubjectId={selectedSubjectId}
      setSelectedSubjectId={setSelectedSubjectId}
    />
  );

  if (isLessonModePath) {
    return routes;
  }

  return (
    <Layout
      currentPath={currentPath}
      navigateToPath={navigateToPath}
      selectedSubjectId={selectedSubjectId}
      setSelectedSubjectId={setSelectedSubjectId}
    >
      {routes}
    </Layout>
  );
}
