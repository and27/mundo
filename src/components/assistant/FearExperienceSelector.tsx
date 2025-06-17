import React from "react";
import { Play, Users } from "lucide-react";
import { useRouter } from "next/navigation";

type ExperienceType = "shared" | "digital" | null;

interface FearExperienceSelectorProps {
  onExperienceSelect: (type: ExperienceType) => void;
  selectedExperience: ExperienceType;
}

const FearExperienceSelector: React.FC<FearExperienceSelectorProps> = ({
  onExperienceSelect,
  selectedExperience,
}) => {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
            selectedExperience === "shared"
              ? "border-purple-400 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50"
              : "border-slate-200 bg-white hover:border-purple-200 hover:shadow-lg"
          }`}
          onClick={() => onExperienceSelect("shared")}
        >
          <div className="p-6">
            {/* Icon header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">
                  Experiencia Compartida
                </h4>
                <p className="text-sm text-purple-600 font-medium">
                  Conviértete en el Narrador
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 mb-4 leading-relaxed">
              Te guiamos paso a paso para que <strong>tú le cuentes</strong> la
              aventura de Yachay. Incluye script completo e indicaciones.
            </p>
          </div>
        </div>

        {/* Opción 2: Aventura Digital */}
        <div
          className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
            selectedExperience === "digital"
              ? "border-emerald-400 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50"
              : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-lg"
          }`}
          onClick={() => onExperienceSelect("digital")}
        >
          <div className="p-6">
            {/* Icon header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">
                  Aventura Digital
                </h4>
                <p className="text-sm text-emerald-600 font-medium">
                  Experiencia Interactiva
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 mb-4 leading-relaxed">
              Tu hijo/a experimenta el <strong>journey completo</strong> con
              audio profesional, animaciones y ejercicios guiados.
            </p>
          </div>
        </div>
      </div>

      {/* Footer confirmation */}
      {selectedExperience && (
        <div className="text-center pt-4">
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg font-medium"
            onClick={() => {
              router.push("/cuentos/journey4_yachay_puma");
            }}
          >
            {selectedExperience === "shared"
              ? "Obtener Script de Narración"
              : "Iniciar Aventura Digital"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FearExperienceSelector;
