import { SectionContent } from "@/types/course";
import { useState, useEffect } from "react";

export interface ModuleData {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  duracion: string;
  objetivos: string[];
  colorPrimario: string;
  colorSecundario: string;
  icono: string;
  secciones: SectionContent[];
}

export interface CourseProgress {
  currentModule: number;
  completedSections: string[];
  moduleProgress: Record<string, number>;
  totalProgress: number;
  startedDate?: string;
  lastActivityDate?: string;
}

const defaultProgress: CourseProgress = {
  currentModule: 1,
  completedSections: [],
  moduleProgress: {},
  totalProgress: 0,
  startedDate: new Date().toISOString(),
  lastActivityDate: new Date().toISOString(),
};

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>(defaultProgress);
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar módulos desde JSON
  useEffect(() => {
    const loadModules = async () => {
      setIsLoading(true);
      try {
        const modulePromises = [1, 2, 3, 4, 5].map(async (num) => {
          const response = await fetch(`/course/module${num}.json`);
          if (!response.ok) throw new Error(`Error loading module ${num}`);
          return await response.json();
        });

        const loadedModules = await Promise.all(modulePromises);
        setModules(loadedModules);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error loading course data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadModules();
  }, []);

  // Cargar progreso desde localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("curso-guias-progress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress({ ...defaultProgress, ...parsed });
      } catch (err) {
        console.error("Error parsing saved progress:", err);
      }
    }
  }, []);

  // Guardar progreso en localStorage
  const saveProgress = (newProgress: Partial<CourseProgress>) => {
    const updatedProgress = {
      ...progress,
      ...newProgress,
      lastActivityDate: new Date().toISOString(),
    };
    setProgress(updatedProgress);
    localStorage.setItem(
      "curso-guias-progress",
      JSON.stringify(updatedProgress)
    );
  };

  // Marcar sección como completada
  const markSectionCompleted = (moduleId: string, sectionId: string) => {
    const sectionKey = `${moduleId}-${sectionId}`;
    if (!progress.completedSections.includes(sectionKey)) {
      const newCompletedSections = [...progress.completedSections, sectionKey];

      // Calcular progreso del módulo
      const mod = modules.find((m) => m.id === moduleId);
      if (module) {
        const moduleSections = mod?.secciones.length;
        const completedInModule = newCompletedSections.filter((s) =>
          s.startsWith(moduleId)
        ).length;
        const moduleProgressPercent =
          (completedInModule / (moduleSections || 1)) * 100;

        const newModuleProgress = {
          ...progress.moduleProgress,
          [moduleId]: moduleProgressPercent,
        };

        // Calcular progreso total
        const totalSections = modules.reduce(
          (sum, m) => sum + m.secciones.length,
          0
        );
        const totalProgress =
          (newCompletedSections.length / totalSections) * 100;

        saveProgress({
          completedSections: newCompletedSections,
          moduleProgress: newModuleProgress,
          totalProgress,
        });
      }
    }
  };

  // Avanzar al siguiente módulo
  const advanceToModule = (moduleNumber: number) => {
    if (moduleNumber >= 1 && moduleNumber <= 5) {
      saveProgress({ currentModule: moduleNumber });
    }
  };

  // Obtener módulo actual
  const getCurrentModule = (): ModuleData | null => {
    return (
      modules.find((m) => m.id === `modulo${progress.currentModule}`) || null
    );
  };

  // Verificar si una sección está completada
  const isSectionCompleted = (moduleId: string, sectionId: string): boolean => {
    return progress.completedSections.includes(`${moduleId}-${sectionId}`);
  };

  // Verificar si un módulo está desbloqueado
  const isModuleUnlocked = (moduleNumber: number): boolean => {
    if (moduleNumber === 1) return true;

    const previousModuleId = `modulo${moduleNumber - 1}`;
    const previousModuleProgress =
      progress.moduleProgress[previousModuleId] || 0;

    // Desbloquear si el módulo anterior está al menos 80% completo
    return previousModuleProgress >= 80;
  };

  // Reset del progreso (para testing o reiniciar)
  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem("curso-guias-progress");
  };

  // Obtener estadísticas del curso
  const getCourseStats = () => {
    const completedModules = Object.values(progress.moduleProgress).filter(
      (p) => p >= 100
    ).length;
    const totalTimeEstimate = modules.reduce((sum, m) => {
      const hours = parseFloat(m.duracion.split("-")[0]) || 2;
      return sum + hours;
    }, 0);

    return {
      completedModules,
      totalModules: modules.length,
      completedSections: progress.completedSections.length,
      totalSections: modules.reduce((sum, m) => sum + m.secciones.length, 0),
      estimatedTimeHours: totalTimeEstimate,
      progressPercentage: progress.totalProgress,
    };
  };

  return {
    // State
    progress,
    modules,
    isLoading,
    error,

    // Actions
    markSectionCompleted,
    advanceToModule,
    resetProgress,

    // Computed
    getCurrentModule,
    isSectionCompleted,
    isModuleUnlocked,
    getCourseStats,
  };
}
