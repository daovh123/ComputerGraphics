import React, { useRef, useState } from "react";
import { Play, Clock, Star, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SUBJECTS } from "../constants/subjects";
import { SUBJECT_LESSONS } from "../data/catalog/subjectLessons";
import { cn } from "../lib/utils";
import { type View } from "../router/views";

interface DashboardProps {
  setCurrentView: (view: View) => void;
  navigateToPath?: (path: string) => void;
  setSelectedLessonTitle: (title: string) => void;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
}

export default function Dashboard({
  setCurrentView,
  navigateToPath,
  setSelectedLessonTitle,
  selectedSubjectId,
  setSelectedSubjectId,
}: DashboardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const selectedSubject = SUBJECTS.find((subject) => subject.id === selectedSubjectId);
  const currentLessons = selectedSubjectId
    ? SUBJECT_LESSONS[selectedSubjectId] || []
    : [
        SUBJECT_LESSONS.khtn[0],
        SUBJECT_LESSONS.toan[0],
        SUBJECT_LESSONS["ngu-van"][0],
      ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-4 space-y-10">
      <section
        className={cn(
          "relative min-h-[320px] bg-gradient-to-br from-[#00BFFF] via-[#00CED1] to-[#00BFFF] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#00BFFF]/20 flex items-center transition-all duration-500",
          selectedSubjectId
            ? "px-16 py-12 justify-start text-left"
            : "px-12 py-12 justify-center text-center",
        )}
      >
        <div
          className={cn(
            "relative z-10 space-y-6 transition-all duration-500",
            selectedSubjectId
              ? "max-w-xl"
              : "max-w-2xl flex flex-col items-center",
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedSubjectId ? "subject-tag" : "welcome-tag"}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-bold text-white border border-white/10"
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>
              {selectedSubjectId
                ? "Khóa học nổi bật"
                : "Chào mừng bạn đến với Dimensional"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedSubjectId ? `title-${selectedSubjectId}` : "welcome-title"}
            className={cn(
              "font-extrabold tracking-tight text-white leading-[1.1]",
              selectedSubjectId ? "text-5xl" : "text-6xl",
            )}
          >
            {selectedSubjectId ? selectedSubject?.name : "Học tập không giới hạn"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={selectedSubjectId ? `desc-${selectedSubjectId}` : "welcome-desc"}
            className={cn(
              "text-white/90 font-medium",
              selectedSubjectId ? "text-lg" : "text-xl max-w-xl",
            )}
          >
            {selectedSubjectId
              ? `Khám phá thế giới ${selectedSubject?.name.toLowerCase()} kỳ thú qua các mô hình 3D tương tác và bài học sinh động.`
              : "Nền tảng học tập 3D tương tác thế hệ mới. Hãy chọn một môn học bên dưới để bắt đầu hành trình khám phá kiến thức sinh động."}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (selectedSubjectId && currentLessons.length > 0) {
                const firstLesson = currentLessons[0];
                setSelectedLessonTitle(firstLesson.title);
                if (firstLesson.routePath && navigateToPath) {
                  navigateToPath(firstLesson.routePath);
                  return;
                }
                if (firstLesson.fallbackView) {
                  setCurrentView(firstLesson.fallbackView);
                }
              } else {
                document
                  .getElementById("my-subjects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-white text-[#00BFFF] px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#F0F8FF] transition-all shadow-xl shadow-black/10"
          >
            {selectedSubjectId ? "Tiếp tục học" : "Khám phá ngay"}
          </motion.button>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>

          <AnimatePresence>
            <motion.div
              key={selectedSubjectId || "welcome"}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: selectedSubjectId ? 0.3 : 0.15, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute right-0 top-0 h-full w-full md:w-1/2"
            >
              <img
                src={
                  selectedSubjectId
                    ? currentLessons[0]?.image || "https://picsum.photos/seed/dna/800/600"
                    : "https://picsum.photos/seed/education/800/600"
                }
                alt="Subject Hero"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#00BFFF]/50"></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="my-subjects" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#333]">Môn học của tôi</h2>
          <button
            onClick={() => setCurrentView("library")}
            className="text-[#00BFFF] font-bold flex items-center gap-1 hover:underline"
          >
            Tất cả môn học <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={cn(
            "flex overflow-x-auto pb-6 gap-6 snap-x custom-scrollbar cursor-grab active:cursor-grabbing select-none",
            isDragging && "cursor-grabbing",
          )}
        >
          {SUBJECTS.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                if (!isDragging) {
                  setSelectedSubjectId(subject.id);
                }
              }}
              className={cn(
                "min-w-[240px] bg-white p-6 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden snap-start",
                selectedSubjectId === subject.id
                  ? "border-[#00BFFF] shadow-md ring-2 ring-[#00BFFF]/10"
                  : "border-[#E0F0FF] shadow-sm hover:shadow-md",
              )}
            >
              {selectedSubjectId === subject.id && (
                <motion.div
                  layoutId="active-subject"
                  className="absolute inset-0 bg-[#00BFFF]/5 pointer-events-none"
                />
              )}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg relative z-10"
                style={{ backgroundColor: subject.color }}
              >
                <subject.icon className="w-6 h-6" />
              </div>
              <h3
                className={cn(
                  "font-bold transition-colors relative z-10",
                  selectedSubjectId === subject.id
                    ? "text-[#00BFFF]"
                    : "text-[#333] group-hover:text-[#00BFFF]",
                )}
              >
                {subject.name} {subject.name.includes("8") ? "" : "8"}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#333]">
            {selectedSubjectId
              ? `Bài học tiếp theo: ${selectedSubject?.name}`
              : "Bài học gợi ý cho bạn"}
          </h2>
          <button className="text-[#00BFFF] font-bold flex items-center gap-1 hover:underline">
            Xem lộ trình <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {currentLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  if (lesson.routePath && navigateToPath) {
                    navigateToPath(lesson.routePath);
                  } else if (lesson.fallbackView) {
                    setCurrentView(lesson.fallbackView);
                  } else {
                    setSelectedLessonTitle(lesson.title);
                    setCurrentView("lesson-placeholder");
                  }
                }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E0F0FF] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00BFFF] shadow-lg">
                      <Play className="w-6 h-6 fill-current" />
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-[#999] uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#333] leading-tight group-hover:text-[#00BFFF] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-[#666] line-clamp-2">
                    {lesson.description}
                  </p>
                  <div className="pt-4 flex items-center justify-end">
                    <button className="text-sm font-bold text-[#00BFFF] hover:underline">
                      Khám phá
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
