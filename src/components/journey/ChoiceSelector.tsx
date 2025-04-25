import Image from "next/image";
import React from "react";
import clsx from "clsx";

interface Choice {
  id: string;
  icon: string;
  label: string;
}

interface ChoiceSelectorProps {
  choices: Choice[];
  onSelect: (choiceId: string) => void;
  selectedChoiceId?: string | null;
}

const ChoiceSelector: React.FC<ChoiceSelectorProps> = ({
  choices,
  onSelect,
  selectedChoiceId = null,
}) => {
  if (!choices || choices.length === 0) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 p-4">
      {choices.map((choice) => {
        const isSelected = selectedChoiceId === choice.id;

        return (
          <button
            key={choice.id}
            onClick={() => onSelect(choice.id)}
            className={clsx(
              "p-4 md:p-5 w-full flex flex-col items-center justify-center",
              "rounded-2xl",
              "border",
              "bg-gradient-to-br from-white/25 via-white/15 to-white/10",
              "backdrop-blur-sm",
              "shadow-lg",
              "text-white text-center",
              "transition-all duration-300 ease-in-out",
              !isSelected && [
                "hover:brightness-110",
                "hover:-translate-y-1",
                "hover:shadow-xl",
                "border-white/20 hover:border-white/40",
              ],
              isSelected && [
                "border-yellow-400 border-2",
                "scale-105",
                "shadow-[0_0_18px_rgba(255,217,102,0.45)]",
                "brightness-105",
              ]
            )}
          >
            <div
              className={`relative w-12 h-12 md:w-14 md:h-14 mb-2 transition-transform duration-200 ${
                isSelected ? "scale-110" : ""
              }`}
            >
              <Image
                src={choice.icon}
                alt={choice.label}
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
            <span className="text-condor font-bold text-base md:text-lg">
              {choice.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ChoiceSelector;
