/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./router/AppRoutes";

export default function App() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const currentPath =
    location.pathname === "/" ? "/dashboard" : location.pathname;

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

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
      currentPath={currentPath}
      navigateToPath={navigateToPath}
      selectedSubjectId={selectedSubjectId}
      setSelectedSubjectId={setSelectedSubjectId}
    >
      <AppRoutes
        navigateToPath={navigateToPath}
        goBack={goBack}
        selectedSubjectId={selectedSubjectId}
        setSelectedSubjectId={setSelectedSubjectId}
      />
    </Layout>
  );
}
