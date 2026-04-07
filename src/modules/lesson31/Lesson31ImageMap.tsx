import React from "react";

interface Lesson31ImageMapProps {
  imageSrc: string;
  imageAlt: string;
}

export default function Lesson31ImageMap({
  imageSrc,
  imageAlt,
}: Lesson31ImageMapProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#DDEBFF] bg-[#F8FBFF]">
      <img src={imageSrc} alt={imageAlt} className="w-full h-auto block select-none" />
    </div>
  );
}
