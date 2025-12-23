"use client";

import React from "react";
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
    <article className="max-w-3xl">
      <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden transition hover:shadow-md">
        {image && (
          <div className="relative w-full h-44 md:h-56">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8 space-y-5">
          <header className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
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

          <div className="pt-2">
            <button
              onClick={onEnter}
              className="
                inline-flex items-center gap-2
                px-8 py-3 rounded-xl
                font-semibold
                mi-cta-primary
                transition
                hover:shadow-md
              "
            >
              Empezar ahora
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
