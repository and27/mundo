"use client";

import Image from "next/image";
import { HiSparkles } from "react-icons/hi2";

interface ProgramMainCardProps {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  onEnter: () => void;
}

export default function ProgramMainCard({
  title,
  subtitle,
  description,
  image,
  onEnter,
}: ProgramMainCardProps) {
  return (
    <article
      onClick={onEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onEnter();
      }}
      className="
        max-w-2xl cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-primary/40
      "
    >
      <div
        className="
          group
          bg-white border border-neutral-200 rounded-3xl overflow-hidden
          transition-all duration-300
          hover:shadow-xl hover:-translate-y-1
        "
      >
        {image && (
          <div className="relative w-full h-32 md:h-42">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay emocional */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8 space-y-6">
          <header className="space-y-1">
            <h2
              className="
                text-xl md:text-2xl font-bold text-neutral-800
                transition-colors duration-300
                group-hover:text-primary
              "
            >
              {title}
            </h2>

            {subtitle && (
              <p className="text-sm md:text-base text-neutral-500">
                {subtitle}
              </p>
            )}
          </header>

          <p className="text-neutral-600 leading-relaxed max-w-2xl">
            {description}
          </p>

          {/* CTA implícito */}
          <div
            className="
              flex items-center gap-2
              text-primary font-semibold
              transition-opacity duration-300
              opacity-80 group-hover:opacity-100
            "
          >
            <HiSparkles className="text-lg" />
            <span>Entrar al programa</span>
          </div>
        </div>
      </div>
    </article>
  );
}
