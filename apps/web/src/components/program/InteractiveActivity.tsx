"use client";

import { useState } from "react";

type InteractiveActivityProps = {
  activity: {
    question: string;
    options: string[];
  };
};

export default function InteractiveActivity({
  activity,
}: InteractiveActivityProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800">
        {activity.question}
      </h3>

      <div className="space-y-3">
        {activity.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition ${
              selected === option
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
