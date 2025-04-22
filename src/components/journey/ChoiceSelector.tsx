import Image from "next/image";
import React from "react";

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
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice.id)}
          className="p-3 md:p-5 w-full flex gap-3 md:gap-1 md:flex-col items-center justify-start md:justify-center bg-white/20 hover:bg-white/30 rounded-lg shadow-md transition-colors duration-200 ease-in-out border border-white/30 text-white min-w-[100px]"
          style={
            selectedChoiceId === choice.id ? { border: "2px solid yellow" } : {}
          }
        >
          <Image
            src={choice.icon}
            alt={choice.label}
            className="w-12 h-12 object-contain"
          />
          <span className="text-center">{choice.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChoiceSelector;
