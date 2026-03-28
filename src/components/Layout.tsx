import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  BookOpen,
  Library,
  FileText,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Home,
  Layers,
  Activity,
  Clock,
  CheckSquare,
  Gamepad2,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { View } from "../types";
import { SUBJECTS } from "../constants/subjects";
import { khtnLessonNavItems } from "../features/lessons/lessonCatalog";

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  currentPath: string;
  setCurrentView: (view: View) => void;
  navigateToPath: (path: string) => void;
  setSelectedLessonTitle: (title: string) => void;
  selectedLessonTitle: string;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
}

export default function Layout({
  children,
  currentView,
  currentPath,
  setCurrentView,
  navigateToPath,
  setSelectedLessonTitle,
  selectedLessonTitle,
  selectedSubjectId,
  setSelectedSubjectId,
}: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSubjectsExpanded, setIsSubjectsExpanded] = useState(true);
  const [isKHTNExpanded, setIsKHTNExpanded] = useState(true);
  const [expandedLesson, setExpandedLesson] = useState<string | null>("30");

  const sectionIconMap = {
    book: BookOpen,
    layers: Layers,
    activity: Activity,
    clock: Clock,
    check: CheckSquare,
    game: Gamepad2,
    user: User,
  };

  const lessons = khtnLessonNavItems.map((lesson) => ({
    id: lesson.id,
    label: lesson.label,
    fullName: lesson.fullName,
    path: lesson.routePath,
    fallbackView: lesson.fallbackView,
    sections: lesson.sections.map((section) => ({
      id: section.id,
      label: section.label,
      icon: sectionIconMap[section.iconKey],
    })),
  }));

  const isSectionActive = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    return lesson?.sections.some((s) => s.id === currentView) || false;
  };

  return (
    <div className="flex h-screen bg-[#F0F8FF] font-sans text-[#333]">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarCollapsed ? 80 : 288 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white border-r border-[#E0F0FF] flex flex-col shadow-sm overflow-hidden"
      >
        <div
          className={cn(
            "py-3 px-6 flex items-center justify-between",
            isSidebarCollapsed && "px-4",
          )}
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setSelectedSubjectId("");
              navigateToPath("/dashboard");
            }}
          >
            <div className="w-10 h-10 min-w-[40px] bg-[#00BFFF] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-[#00BFFF]/30">
              D
            </div>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl tracking-tight text-[#005F8F] whitespace-nowrap"
              >
                Dimensional
              </motion.span>
            )}
          </div>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 hover:bg-[#F0F8FF] rounded-lg transition-colors text-[#005F8F]"
          >
            <ChevronLeft
              className={cn(
                "w-5 h-5 transition-transform",
                isSidebarCollapsed && "rotate-180",
              )}
            />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {/* Trang chủ */}
          <button
            onClick={() => {
              setSelectedSubjectId("");
              navigateToPath("/dashboard");
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-1",
              currentView === "dashboard" && selectedSubjectId === ""
                ? "bg-[#F0F8FF] text-[#00BFFF] shadow-sm"
                : "text-[#666] hover:bg-[#F0F8FF] hover:text-[#00BFFF]",
              isSidebarCollapsed && "px-0 justify-center",
            )}
          >
            <Home
              className={cn(
                "w-5 h-5 min-w-[20px]",
                currentView === "dashboard" && selectedSubjectId === ""
                  ? "text-[#00BFFF]"
                  : "text-[#BBB]",
              )}
            />
            {!isSidebarCollapsed && (
              <span className="font-bold text-sm whitespace-nowrap">
                Trang chủ
              </span>
            )}
          </button>

          {/* Môn học */}
          <button
            onClick={() => {
              if (isSidebarCollapsed) setIsSidebarCollapsed(false);
              setIsSubjectsExpanded(!isSubjectsExpanded);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-1",
              selectedSubjectId !== ""
                ? "text-[#00BFFF] bg-[#F0F8FF]/50"
                : "text-[#666] hover:bg-[#F0F8FF] hover:text-[#00BFFF]",
              isSidebarCollapsed && "px-0 justify-center",
            )}
          >
            <Library
              className={cn(
                "w-5 h-5 min-w-[20px]",
                selectedSubjectId !== "" ? "text-[#00BFFF]" : "text-[#BBB]",
              )}
            />
            {!isSidebarCollapsed && (
              <span className="font-bold text-sm whitespace-nowrap">
                Môn học
              </span>
            )}
            {!isSidebarCollapsed && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 ml-auto transition-transform",
                  !isSubjectsExpanded ? "-rotate-90" : "",
                )}
              />
            )}
          </button>

          <AnimatePresence>
            {isSubjectsExpanded && !isSidebarCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 ml-2"
              >
                {SUBJECTS.map((subject) => (
                  <div key={subject.id} className="space-y-1">
                    <button
                      onClick={() => {
                        setSelectedSubjectId(subject.id);
                        if (subject.id === "khtn") {
                          setIsKHTNExpanded(!isKHTNExpanded);
                        }
                        if (currentView !== "dashboard") {
                          setCurrentView("dashboard");
                        }
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                        selectedSubjectId === subject.id
                          ? "text-[#00BFFF] bg-[#F5F9FF] font-bold"
                          : "text-[#666] hover:text-[#00BFFF]",
                      )}
                    >
                      <subject.icon
                        className={cn(
                          "w-4 h-4",
                          selectedSubjectId === subject.id
                            ? "text-[#00BFFF]"
                            : "text-[#BBB]",
                        )}
                      />
                      <span className="text-sm">{subject.name}</span>
                      {subject.id === "khtn" && (
                        <ChevronRight
                          className={cn(
                            "w-3 h-3 ml-auto transition-transform",
                            isKHTNExpanded ? "rotate-90" : "",
                          )}
                        />
                      )}
                    </button>

                    {/* KHTN Lessons Level */}
                    {subject.id === "khtn" && (
                      <AnimatePresence>
                        {isKHTNExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-1 ml-4 border-l-2 border-[#F0F8FF] pl-2"
                          >
                            {lessons.map((lesson) => {
                              const isLessonActive =
                                isSectionActive(lesson.id) ||
                                (currentView === "lesson-placeholder" &&
                                  selectedLessonTitle === lesson.fullName) ||
                                (lesson.path
                                  ? currentPath.startsWith(lesson.path)
                                  : false);
                              return (
                                <div key={lesson.id} className="space-y-1">
                                  <button
                                    onClick={() => {
                                      if (lesson.path) {
                                        setExpandedLesson(lesson.id);
                                        navigateToPath(lesson.path);
                                      } else if (lesson.sections.length > 0) {
                                        setExpandedLesson(lesson.id);
                                        setCurrentView(
                                          lesson.sections[0].id as View,
                                        );
                                      } else {
                                        setSelectedLessonTitle(lesson.fullName);
                                        setCurrentView(
                                          (lesson.fallbackView as View) ||
                                            "lesson-placeholder",
                                        );
                                        setExpandedLesson(lesson.id);
                                      }
                                    }}
                                    className={cn(
                                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                                      isLessonActive
                                        ? "text-[#00BFFF] bg-[#F5F9FF] font-bold"
                                        : "text-[#666] hover:bg-[#F0F8FF] hover:text-[#00BFFF]",
                                    )}
                                  >
                                    <FileText
                                      className={cn(
                                        "w-4 h-4",
                                        isLessonActive
                                          ? "text-[#00BFFF]"
                                          : "text-[#BBB]",
                                      )}
                                    />
                                    <span className="text-sm">
                                      {lesson.label}
                                    </span>
                                    {lesson.sections.length > 0 && (
                                      <ChevronRight
                                        className={cn(
                                          "w-3 h-3 ml-auto transition-transform",
                                          expandedLesson === lesson.id
                                            ? "rotate-90"
                                            : "",
                                        )}
                                      />
                                    )}
                                  </button>

                                  {/* Sections Level */}
                                  <AnimatePresence>
                                    {expandedLesson === lesson.id &&
                                      lesson.sections.length > 0 && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{
                                            height: "auto",
                                            opacity: 1,
                                          }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden space-y-1 ml-4 border-l-2 border-[#F0F8FF] pl-2"
                                        >
                                          {lesson.sections.map((section) => (
                                            <button
                                              key={section.id}
                                              onClick={() =>
                                                setCurrentView(
                                                  section.id as View,
                                                )
                                              }
                                              className={cn(
                                                "w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group",
                                                currentView === section.id
                                                  ? "text-[#00BFFF] bg-[#F0F8FF] font-bold"
                                                  : "text-[#888] hover:text-[#00BFFF] hover:bg-[#F5F9FF]",
                                              )}
                                            >
                                              <section.icon
                                                className={cn(
                                                  "w-3.5 h-3.5",
                                                  currentView === section.id
                                                    ? "text-[#00BFFF]"
                                                    : "text-[#CCC] group-hover:text-[#00BFFF]",
                                                )}
                                              />
                                              <span className="text-[11px]">
                                                {section.label}
                                              </span>
                                            </button>
                                          ))}
                                        </motion.div>
                                      )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div
          className={cn(
            "p-6 border-t border-[#E0F0FF]",
            isSidebarCollapsed && "px-4",
          )}
        >
          <button
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-[#666] hover:text-[#00BFFF] transition-colors",
              isSidebarCollapsed && "px-0 justify-center",
            )}
          >
            <Settings className="w-5 h-5 min-w-[20px]" />
            {!isSidebarCollapsed && (
              <span className="font-medium text-sm">Cài đặt</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#E0F0FF] flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <button
                onClick={() => {
                  setSelectedSubjectId("");
                  navigateToPath("/dashboard");
                }}
                className={cn(
                  "font-medium transition-colors",
                  currentPath === "/dashboard" ||
                    currentPath.startsWith("/lesson-")
                    ? "text-[#00BFFF] font-bold border-b-2 border-[#00BFFF] pb-1"
                    : "text-[#666] hover:text-[#00BFFF]",
                )}
              >
                Học liệu
              </button>
              <button
                onClick={() => navigateToPath("/library")}
                className={cn(
                  "font-medium transition-colors",
                  currentPath === "/library"
                    ? "text-[#00BFFF] font-bold border-b-2 border-[#00BFFF] pb-1"
                    : "text-[#666] hover:text-[#00BFFF]",
                )}
              >
                Thư viện
              </button>
              <button className="text-[#666] font-medium hover:text-[#00BFFF] transition-colors">
                Tài nguyên
              </button>
            </nav>

            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="Tìm kiếm bài học, tài liệu..."
                className="w-full bg-[#F5F9FF] border border-[#E0F0FF] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00BFFF] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-[#666] hover:bg-[#F0F8FF] rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
