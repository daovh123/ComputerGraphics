import React from "react";
import { motion } from "motion/react";
import AngiologyViewer from "./AngiologyViewer";

export default function Lesson33LearnCover() {
  return (
    <section className="grid min-h-[calc(100vh-12rem)] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.36em] text-[#0EA5E9]">
          Bài 33 • Khoa học tự nhiên 8
        </p>
        <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-[#020617] md:text-7xl">
          Máu và hệ tuần hoàn
          <br />
          của cơ thể người
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#334155] md:text-xl">
          Khi cơ thể mất máu liên tục, năng lượng suy giảm rất nhanh. Trong bài
          học này, em sẽ theo dõi vai trò của máu, cách tim bơm máu và vì sao hệ
          tuần hoàn quyết định sự sống của toàn cơ thể.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        className="min-w-0"
      >
        <div className="grid gap-8 text-[#0F172A]">
          <AngiologyViewer />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#94A3B8]">
              Bắt đầu từ câu hỏi
            </p>
            <p className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Vì sao máu không chỉ là một chất lỏng đỏ trong cơ thể?
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
