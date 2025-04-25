"use client";

import { useState } from "react";

interface Emotion {
  emoji: string;
  label: string;
}

interface GridProps {
  emotions?: Emotion[];
  initialSelected?: string; // Renombrado para claridad
  onSelect?: (label: string) => void;
  mode?: "before" | "after";
  className?: string;
}

const defaultBefore: Emotion[] = [
  { emoji: "😣", label: "Ansioso/a" },
  { emoji: "😔", label: "Triste" },
  { emoji: "😡", label: "Frustrado/a" },
  { emoji: "😵", label: "Abrumado/a" },
  { emoji: "❓", label: "No sé" },
];

const defaultAfter: Emotion[] = [
  { emoji: "😊", label: "Tranquilo/a" },
  { emoji: "✨", label: "Conectado/a" },
  { emoji: "💛", label: "Feliz" },
  { emoji: "😌", label: "Relajado/a" },
  { emoji: "🌀", label: "Reflexivo/a" }, // Ícono actualizado
];

function SelectableEmotionGrid({
  emotions,
  initialSelected,
  onSelect,
  mode = "after",
  className = "",
}: GridProps) {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    initialSelected || null
  );

  const handleClick = (label: string) => {
    setSelectedLabel(label);
    onSelect?.(label);
  };

  const emotionSet =
    emotions ?? (mode === "before" ? defaultBefore : defaultAfter);

  const selectedStyle =
    "border-yellow-400 bg-black/30  ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900 scale-105";
  const baseStyle = " border-transparent bg-black/30 text-white";
  const hoverStyle =
    "hover:border-yellow-500 hover:bg-black/10 hover:text-white";
  const focusStyle =
    "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900";
  const transitionStyle = "transition-all duration-200 ease-in-out";

  return (
    <div
      role="radiogroup"
      aria-label={`Selecciona cómo te sientes ${
        mode === "before" ? "hoy" : "ahora"
      }`}
      className={`grid grid-cols-2 sm:grid-cols-5 gap-4 justify-center ${className}`}
    >
      {emotionSet.map((e) => (
        <button
          key={e.label}
          role="radio"
          aria-checked={selectedLabel === e.label}
          onClick={() => handleClick(e.label)}
          className={`backdrop-blur-md  flex flex-col items-center justify-center p-3 border-2 rounded-xl text-xl ${transitionStyle} ${focusStyle} ${hoverStyle} ${
            selectedLabel === e.label ? selectedStyle : baseStyle
          }`}
        >
          <span aria-hidden="true">{e.emoji}</span>
          <span className="block text-sm mt-1 font-bold">{e.label}</span>
        </button>
      ))}
    </div>
  );
}

export default SelectableEmotionGrid;
