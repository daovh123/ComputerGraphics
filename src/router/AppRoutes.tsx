import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import type { View } from "./views";
import Dashboard from "../views/Dashboard";
import Library from "../views/Library";
import LessonPlaceholder from "../views/LessonPlaceholder";
import Lesson30BodyOverview from "../modules/lesson30/Lesson30BodyOverview";
import Lesson30Overview from "../modules/lesson30/Lesson30Overview";
import Lesson30Quiz from "../modules/lesson30/Lesson30Quiz";
import Lesson30Role from "../modules/lesson30/Lesson30Role";
import Lesson30Shell from "../modules/lesson30/Lesson30Shell";
import Lesson30Summary from "../modules/lesson30/Lesson30Summary";
import Lesson30System from "../modules/lesson30/Lesson30System";
import Lesson31Module from "../modules/lesson31/Lesson31Module";
import Lesson32Diseases from "../modules/lesson32/Lesson32Diseases";
import Lesson32Explorer from "../modules/lesson32/Lesson32Explorer";
import Lesson32FoodSafety from "../modules/lesson32/Lesson32FoodSafety";
import Lesson32Nutrition from "../modules/lesson32/Lesson32Nutrition";
import Lesson32Overview from "../modules/lesson32/Lesson32Overview";
import Lesson32Quiz from "../modules/lesson32/Lesson32Quiz";
import Lesson32Shell from "../modules/lesson32/Lesson32Shell";
import Lesson32Simulation from "../modules/lesson32/Lesson32Simulation";
import Lesson33Blood from "../modules/lesson33/Lesson33Blood";
import Lesson33Diseases from "../modules/lesson33/Lesson33Diseases";
import Lesson33Explorer from "../modules/lesson33/Lesson33Explorer";
import Lesson33Overview from "../modules/lesson33/Lesson33Overview";
import Lesson33Quiz from "../modules/lesson33/Lesson33Quiz";
import Lesson33Shell from "../modules/lesson33/Lesson33Shell";
import Lesson33Simulation from "../modules/lesson33/Lesson33Simulation";

interface AppRoutesProps {
  navigate: (view: View) => void;
  navigateToPath: (path: string) => void;
  goBack: () => void;
  selectedLessonTitle: string;
  setSelectedLessonTitle: (title: string) => void;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
}

export default function AppRoutes({
  navigate,
  navigateToPath,
  goBack,
  selectedLessonTitle,
  setSelectedLessonTitle,
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
            setCurrentView={navigate}
            navigateToPath={navigateToPath}
            setSelectedLessonTitle={setSelectedLessonTitle}
            selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={setSelectedSubjectId}
          />
        }
      />

      {/* Lesson 30 */}
      <Route
        path="/lesson-30"
        element={
          <Lesson30Shell>
            <Lesson30Overview setCurrentView={navigate} />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/khai-quat"
        element={
          <Lesson30Shell>
            <Lesson30BodyOverview setCurrentView={navigate} />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/vai-tro"
        element={
          <Lesson30Shell>
            <Lesson30Role setCurrentView={navigate} />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/he-van-dong"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="van-dong" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/he-tuan-hoan"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="tuan-hoan" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/he-ho-hap"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="ho-hap" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/he-tieu-hoa"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="tieu-hoa" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/he-bai-tiet"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="bai-tiet" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/he-than-kinh"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="than-kinh" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/he-noi-tiet"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="noi-tiet" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/he-sinh-duc"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="sinh-duc" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/giac-quan"
        element={
          <Lesson30Shell>
            <Lesson30System setCurrentView={navigate} systemId="giac-quan" />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/tong-ket"
        element={
          <Lesson30Shell>
            <Lesson30Summary setCurrentView={navigate} />
          </Lesson30Shell>
        }
      />
      <Route
        path="/lesson-30/quiz"
        element={
          <Lesson30Shell>
            <Lesson30Quiz setCurrentView={navigate} />
          </Lesson30Shell>
        }
      />

      <Route path="/lesson-31" element={<Lesson31Module initialTab="overview" />} />
      <Route
        path="/lesson-31/anatomy"
        element={<Lesson31Module initialTab="anatomy" />}
      />
      <Route
        path="/lesson-31/movement-function"
        element={<Lesson31Module initialTab="movement-function" />}
      />
      <Route
        path="/lesson-31/diseases"
        element={<Lesson31Module initialTab="diseases" />}
      />
      <Route
        path="/lesson-31/model3d"
        element={<Lesson31Module initialTab="model3d" />}
      />
      <Route
        path="/lesson-31/quiz"
        element={<Lesson31Module initialTab="quiz" />}
      />
      <Route
        path="/lesson-31/summary"
        element={<Lesson31Module initialTab="summary" />}
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
      <Route
        path="/lesson-33"
        element={
          <Lesson33Shell>
            <Lesson33Overview setCurrentView={navigate} />
          </Lesson33Shell>
        }
      />
      <Route
        path="/lesson-33/explorer"
        element={
          <Lesson33Shell pathname="/lesson-33/explorer">
            <Lesson33Explorer setCurrentView={navigate} />
          </Lesson33Shell>
        }
      />
      <Route
        path="/lesson-33/blood"
        element={
          <Lesson33Shell pathname="/lesson-33/blood">
            <Lesson33Blood setCurrentView={navigate} />
          </Lesson33Shell>
        }
      />
      <Route
        path="/lesson-33/simulation"
        element={
          <Lesson33Shell pathname="/lesson-33/simulation">
            <Lesson33Simulation setCurrentView={navigate} />
          </Lesson33Shell>
        }
      />
      <Route
        path="/lesson-33/diseases"
        element={
          <Lesson33Shell pathname="/lesson-33/diseases">
            <Lesson33Diseases setCurrentView={navigate} />
          </Lesson33Shell>
        }
      />
      <Route
        path="/lesson-33/quiz"
        element={
          <Lesson33Shell pathname="/lesson-33/quiz">
            <Lesson33Quiz setCurrentView={navigate} />
          </Lesson33Shell>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
