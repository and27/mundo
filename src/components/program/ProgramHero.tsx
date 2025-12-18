import React from "react";

export default function ProgramHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mi-section-header">
      <h1 className="text-xl md:text-3xl font-bold text-neutral-800 mi-section-title">
        {title.toUpperCase()}
      </h1>

      {subtitle && <p className="text-neutral-600">{subtitle}</p>}
    </div>
  );
}
