import { useState } from "react";

interface Emotion {
  emoji: string;
  label: string;
}

interface Props {
  emotions?: Emotion[];
  selected?: string;
  onSelect?: (label: string) => void;
  mode?: "before" | "after"; // 👈 modo visual/emocional
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
  { emoji: "🌀", label: "Reflexivo/a" },
];

export default function SelectableEmotionGrid({
  emotions,
  selected,
  onSelect,
  mode = "after",
  className = "",
}: Props) {
  const [internalSelected, setInternalSelected] = useState<string | null>(
    selected || null
  );

  const handleClick = (label: string) => {
    setInternalSelected(label);
    onSelect?.(label);
  };

  const current = selected ?? internalSelected;
  const emotionSet =
    emotions ?? (mode === "before" ? defaultBefore : defaultAfter);

  const selectedStyle = "border-yellow-500 bg-white/10 ";

  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-5 gap-4 justify-center ${className}`}
    >
      {emotionSet.map((e) => (
        <button
          key={e.label}
          onClick={() => handleClick(e.label)}
          className={`flex flex-col items-center justify-center
             hover:text-white border-2 border-white/20 hover:border-yellow-500 px-4 bg-white/5 hover:bg-white/10 rounded-xl py-3 text-xl transition ${
               current === e.label ? selectedStyle : "text-white/70 "
             }`}
        >
          {e.emoji}
          <span className="block text-xs mt-1">{e.label}</span>
        </button>
      ))}
    </div>
  );
}
