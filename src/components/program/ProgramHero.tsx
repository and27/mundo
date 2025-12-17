import React from "react";

export default function ProgramHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-700 mb-3 drop-shadow-xl">
        {title}
      </h1>

      {subtitle && (
        <p className="text-neutral-600 text-base md:text-lg max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
