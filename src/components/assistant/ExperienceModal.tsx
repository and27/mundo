import React, { useState } from "react";
import { ActionableGuide, GuideWithCharacter } from "@/types/ai";
import { X } from "lucide-react";
import FearExperienceSelector from "./FearExperienceSelector";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: GuideWithCharacter;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  guide,
}) => {
  const [selectedExperience, setSelectedExperience] = useState<
    "shared" | "digital" | null
  >(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex flex-col items-start ">
            <h3 className="text-xl font-bold text-slate-800">
              Versión Completa con Yachay
            </h3>
            <p className="text-sm text-slate-600">
              Elige cómo acompañar este momento especial
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="p-6">
          <FearExperienceSelector
            onExperienceSelect={setSelectedExperience}
            selectedExperience={selectedExperience}
            guide={guide}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
