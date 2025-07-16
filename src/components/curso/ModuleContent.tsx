"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import SectionNavigation from "./SectionNavigation";
import ModuleHeader from "./ModuleHeader";
import SectionContent from "./SectionContent";

interface ModuleContentProps {
  moduleId: string;
  onBack: () => void;
}

export default function ModuleContent({
  moduleId,
  onBack,
}: ModuleContentProps) {
  const { modules, isSectionCompleted, markSectionCompleted } =
    useCourseProgress();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const mod = modules.find((m) => m.id === moduleId);

  if (!mod) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-8 text-center">
        <p className="text-slate-600">Módulo no encontrado</p>
      </div>
    );
  }

  const currentSection = mod.secciones[currentSectionIndex];

  const handleSectionComplete = (sectionId: string) => {
    markSectionCompleted(moduleId, sectionId);
  };

  return (
    <div className="py-3 space-y-6">
      {/* Header con botón de regreso */}
      <div className="px-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-white/50 text-slate-600 hover:text-slate-800 rounded-lg transition-all duration-300 hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al curso
        </button>

        <div className="text-sm text-slate-500">
          Sección {currentSectionIndex + 1} de {mod.secciones.length}
        </div>
      </div>

      {/* Header del módulo con progreso */}
      <ModuleHeader module={mod} current={currentSectionIndex} />

      {/* Contenido de la sección actual */}
      <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-8">
        <SectionContent
          module={mod}
          section={currentSection}
          isCompleted={isSectionCompleted(moduleId, currentSection.id)}
          onComplete={() => handleSectionComplete(currentSection.id)}
        />
      </div>

      {/* Navegación entre secciones */}
      <SectionNavigation
        total={mod.secciones.length}
        current={currentSectionIndex}
        onNavigate={setCurrentSectionIndex}
      />
    </div>
  );
}
