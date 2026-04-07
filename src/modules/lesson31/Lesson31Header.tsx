import React from "react";

interface Lesson31HeaderProps {
  title: string;
  description: string;
}

export default function Lesson31Header({ title, description }: Lesson31HeaderProps) {
  return (
    <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 md:p-8 shadow-sm space-y-3">
      <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">Khoa học tự nhiên 8</p>
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1F2937]">{title}</h1>
      <p className="text-sm md:text-base text-[#556070] leading-relaxed max-w-3xl">{description}</p>
    </section>
  );
}
