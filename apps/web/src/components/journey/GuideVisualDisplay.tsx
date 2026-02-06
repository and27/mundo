"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface GuideVisualDisplayProps {
  guideImageSrc: string;
  isBreathing?: boolean;
}

const GuideVisualDisplay: React.FC<GuideVisualDisplayProps> = ({
  guideImageSrc,
  isBreathing = false,
}) => {
  return (
    <div
      className="flex justify-center items-center"
      aria-label="Visualización de guía"
    >
      <div className="relative w-40 h-40 md:w-48 md:h-48 flex justify-center items-center">
        {isBreathing && (
          <>
            <div
              className="absolute inset-[-8px] rounded-full bg-magic opacity-20 blur-2xl animate-breathe-glow z-0"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 rounded-full border-2 border-magic opacity-30 animate-breathe-ring-outer z-10"
              aria-hidden="true"
            />
            <div
              className="absolute inset-2 rounded-full border border-magic opacity-50 animate-breathe-ring-inner z-20"
              aria-hidden="true"
            />
            <div
              className="absolute w-4/5 h-4/5 rounded-full bg-gradient-radial from-gold via-magic to-magic/50 shadow-lg animate-breathe-core z-30"
              aria-hidden="true"
            >
              <div className="absolute inset-[40%] rounded-full bg-white/40 blur-sm" />
            </div>
          </>
        )}

        <div
          className={clsx(
            "flex items-center justify-center ratio-1/1 relative rounded-full transition-all duration-300 ease-in-out z-40",
            isBreathing ? "w-[70%] h-[70%]" : "w-[65%] h-[65%]",
            "bg-white/10 border border-white/20",
            !isBreathing && "animate-fade-in"
          )}
        >
          <Image
            src={guideImageSrc}
            alt="Guía espiritual"
            fill
            className="rounded-full object-contain shadow-md"
            priority={!isBreathing}
          />
        </div>
      </div>
    </div>
  );
};

export default GuideVisualDisplay;
