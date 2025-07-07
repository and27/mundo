import { Heart } from "lucide-react";
import ModuleCard from "./ModuleCard";
import { CourseProgress, ModuleData } from "@/types/course";

interface ModuleListProps {
  modules: ModuleData[];
  progress: CourseProgress;
  isModuleUnlocked: (n: number) => boolean;
  onClick: (moduleId: string, moduleNumber: number) => void;
}

export default function ModuleList({
  modules,
  progress,
  onClick,
}: ModuleListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Módulos del Curso</h2>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Heart className="w-4 h-4 text-purple-500" />
          <span>{modules.length} módulos</span>
        </div>
      </div>
      <div className="space-y-4">
        {modules.map((module, index) => {
          const moduleNumber = index + 1;
          const isUnlocked = true; // Todos desbloqueados
          const moduleProgress = progress.moduleProgress[module.id] || 0;
          const isCurrent = progress.currentModule === moduleNumber;
          return (
            <ModuleCard
              key={module.id}
              module={module}
              moduleNumber={moduleNumber}
              isUnlocked={isUnlocked}
              moduleProgress={moduleProgress}
              isCurrent={isCurrent}
              onClick={() => onClick(module.id, moduleNumber)}
            />
          );
        })}
      </div>
    </div>
  );
}
