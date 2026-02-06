"use client";

type SelTechniqueBlockProps = {
  technique: {
    title: string;
    steps: string[];
  };
};

export default function SelTechniqueBlock({
  technique,
}: SelTechniqueBlockProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="mi-text-subtitle text-neutral-800">
        {technique.title}
      </h3>

      <ol className="space-y-3 list-decimal list-inside mi-text-body-sm text-neutral-700">
        {technique.steps.map((step, index) => (
          <li key={index} className="leading-relaxed">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
