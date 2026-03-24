/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
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

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedLessonTitle, setSelectedLessonTitle] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [history, setHistory] = useState<View[]>([]);

  const navigate = (view: View) => {
    if (view !== currentView) {
      setHistory(prev => [...prev, currentView]);
      setCurrentView(view);
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevView = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentView(prevView);
    } else {
      setCurrentView("dashboard");
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <Dashboard 
            setCurrentView={navigate} 
            setSelectedLessonTitle={setSelectedLessonTitle} 
            selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={setSelectedSubjectId}
          />
        );
      case "lesson-overview":
        return <LessonDetail setCurrentView={navigate} goBack={goBack} />;
      case "body-parts":
        return <BodyParts setCurrentView={navigate} goBack={goBack} />;
      case "coordination":
        return <Coordination setCurrentView={navigate} goBack={goBack} />;
      case "biological-clock":
        return <BiologicalClock setCurrentView={navigate} goBack={goBack} />;
      case "summary":
        return <Summary setCurrentView={navigate} goBack={goBack} />;
      case "challenge":
        return <Challenge setCurrentView={navigate} goBack={goBack} />;
      case "characteristics":
        return <Characteristics setCurrentView={navigate} goBack={goBack} />;
      case "lesson-placeholder":
        return <LessonPlaceholder setCurrentView={navigate} title={selectedLessonTitle} goBack={goBack} />;
      case "library":
        return (
          <Library 
            setCurrentView={navigate} 
            setSelectedLessonTitle={setSelectedLessonTitle} 
            goBack={goBack} 
            selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={setSelectedSubjectId}
          />
        );
      default:
        return (
          <Dashboard 
            setCurrentView={navigate} 
            setSelectedLessonTitle={setSelectedLessonTitle} 
            selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={setSelectedSubjectId}
          />
        );
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={navigate} 
      setSelectedLessonTitle={setSelectedLessonTitle}
      selectedLessonTitle={selectedLessonTitle}
      selectedSubjectId={selectedSubjectId}
      setSelectedSubjectId={setSelectedSubjectId}
    >
      {renderView()}
    </Layout>
  );
}
