//legacy
"use client";
import React, { useState } from "react";
import { Play, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { GuideWithCharacter } from "@/types/ai";

type ExperienceType = "shared" | "digital" | null;

interface FearExperienceSelectorProps {
  onExperienceSelect: (type: ExperienceType) => void;
  selectedExperience: ExperienceType;
  guide: GuideWithCharacter;
}

const FearExperienceSelector: React.FC<FearExperienceSelectorProps> = ({
  onExperienceSelect,
  selectedExperience,
  guide,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartExperience = async () => {
    if (selectedExperience === "shared") {
      router.push("/cuentos/journey4_yachay_puma");
      return;
    }

    if (selectedExperience === "digital") {
      try {
        setLoading(true);
        const res = await fetch("/api/story/export", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emotion: guide.emotion,
            character: guide.character,
          }),
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(err);
        }

        const data = await res.json();
        router.push(`/cuentos/${data.story.id}`);
      } catch (err) {
        console.error("Error generando experiencia digital", err);
        alert("Ocurrió un error generando la historia.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Experiencia Compartida */}
        <div
          className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
            selectedExperience === "shared"
              ? "border-purple-400 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50"
              : "border-slate-200 bg-white hover:border-purple-200 hover:shadow-lg"
          }`}
          onClick={() => onExperienceSelect("shared")}
        >
          <div className="p-6">
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
            <p className="text-slate-700 mb-4 leading-relaxed">
              Te guiamos paso a paso para que <strong>tú le cuentes</strong> la
              aventura de Yachay. Incluye script completo e indicaciones.
            </p>
          </div>
        </div>

        {/* Aventura Digital */}
        <div
          className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
            selectedExperience === "digital"
              ? "border-emerald-400 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50"
              : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-lg"
          }`}
          onClick={() => onExperienceSelect("digital")}
        >
          <div className="p-6">
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
            <p className="text-slate-700 mb-4 leading-relaxed">
              Tu hijo/a experimenta el <strong>journey completo</strong> con
              audio profesional, animaciones y ejercicios guiados.
            </p>
          </div>
        </div>
      </div>

      {selectedExperience && (
        <div className="text-center pt-4">
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg font-medium"
            onClick={handleStartExperience}
            disabled={loading}
          >
            {loading
              ? "Generando historia..."
              : selectedExperience === "shared"
              ? "Obtener Script de Narración"
              : "Iniciar Aventura Digital"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FearExperienceSelector;
