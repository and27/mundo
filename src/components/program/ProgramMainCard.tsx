"use client";

import React from "react";
import Image from "next/image";
import { HiSparkles } from "react-icons/hi2";

export default function ProgramMainCard({
  title,
  subtitle,
  description,
  image,
  onEnter,
}: {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  onEnter: () => void;
}) {
  return (
    <section className="mi-section">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mi-stack-lg">
            {image && (
              <div className="w-full h-40 md:h-52 relative rounded-2xl overflow-hidden">
                <Image
                  src={image}
                  alt="Program cover"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="mi-stack-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
                {title}
              </h2>

              {subtitle && (
                <p className="text-sm md:text-base text-neutral-500">
                  {subtitle}
                </p>
              )}
            </div>

            <p className="text-neutral-600 leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="pt-2">
              <button
                onClick={onEnter}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold mi-cta-primary transition hover:shadow-md"
              >
                <HiSparkles className="w-5 h-5" />
                Empezar el programa
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
