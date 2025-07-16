"use client";

import { useState } from "react";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { BookOpen } from "lucide-react";
import { HiSparkles } from "react-icons/hi2";
import CourseHeader from "./CourseHeader";
import ModuleList from "./ModuleList";
import CourseCallToAction from "./CourseCallToAction";
import ModuleDetailView from "./ModuleDetailView";
import ModuleContent from "./ModuleContent";

export default function CursoSection() {
  const {
    modules,
    isLoading,
    error,
    progress,
    isModuleUnlocked,
    getCourseStats,
    advanceToModule,
  } = useCourseProgress();

  const [selectedView, setSelectedView] = useState<
    "overview" | "module" | "content"
  >("overview");
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const stats = getCourseStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-8">
          <div className="flex items-center gap-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <HiSparkles className="w-6 h-6 text-white animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Cargando contenido del curso...
              </h3>
              <p className="text-slate-600">
                Preparando tu experiencia de aprendizaje
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white/90 backdrop-blur-sm border border-red-200 rounded-xl p-8 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Error al cargar el curso
          </h3>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  const handleModuleClick = (moduleId: string, moduleNumber: number) => {
    if (isModuleUnlocked(moduleNumber)) {
      setSelectedModuleId(moduleId);
      setSelectedView("module");
      advanceToModule(moduleNumber);
    }
  };

  const handleStartModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setSelectedView("content");
  };

  // Vista de contenido del módulo
  if (selectedView === "content" && selectedModuleId) {
    return (
      <ModuleContent
        moduleId={selectedModuleId}
        onBack={() => setSelectedView("overview")}
      />
    );
  }

  // Vista detallada del módulo
  if (selectedView === "module" && selectedModuleId) {
    const selectedModule = modules.find((m) => m.id === selectedModuleId);
    if (selectedModule) {
      return (
        <ModuleDetailView
          module={selectedModule}
          onBack={() => setSelectedView("overview")}
          onStartModule={() => handleStartModule(selectedModuleId)}
        />
      );
    }
  }

  // Vista principal del curso
  return (
    <div className="space-y-8">
      <CourseHeader stats={stats} />
      <ModuleList
        modules={modules}
        progress={progress}
        isModuleUnlocked={isModuleUnlocked}
        onClick={handleModuleClick}
      />
    </div>
  );
}
