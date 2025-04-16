"use client";

import Image from "next/image";

type Props = {
  fireflyCount?: number;
};

const ForestWithLights = ({ fireflyCount = 0 }: Props) => {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl">
      {/* Fondo del bosque */}
      <Image
        src="/images/forest-bg.webp"
        alt="Bosque interior"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Luciérnagas dinámicas */}
      {Array.from({ length: fireflyCount }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse opacity-80"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ForestWithLights;
