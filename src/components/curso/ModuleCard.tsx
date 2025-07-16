import { ModuleData } from "@/types/course";
import { CheckCircle, Play, ChevronRight } from "lucide-react";

interface ModuleCardProps {
  module: ModuleData;
  moduleNumber: number;
  isUnlocked: boolean;
  moduleProgress: number;
  isCurrent: boolean;
  onClick: () => void;
}

export default function ModuleCard({
  module,
  moduleNumber,
  moduleProgress,
  isCurrent,
  onClick,
}: ModuleCardProps) {
  const isCompleted = moduleProgress >= 100;

  return (
    <div
      className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:border-indigo-200 hover:shadow-lg hover:scale-[1.01] relative"
      onClick={onClick}
    >
      {/* Badge de Estado */}
      <div className="absolute top-4 right-4 z-10">
        <StatusBadge
          isUnlocked={true} // Siempre desbloqueado
          isCompleted={isCompleted}
          isCurrent={isCurrent}
        />
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icono del Módulo */}
          <div
            className="hidden md:flex w-12 h-12 rounded-xl items-center justify-center shadow-lg flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${module.colorPrimario}, ${module.colorSecundario})`,
            }}
          >
            <span className="text-2xl">{module.icono}</span>
          </div>

          {/* Contenido del Módulo */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-lg font-semibold text-slate-800 mb-1">
              Módulo {moduleNumber}: {module.titulo}
            </h3>

            <p className="hidden md:flex text-indigo-600 text-sm font-medium mb-2">
              {module.subtitulo}
            </p>

            <p className="hidden md:flex text-slate-600 text-sm mb-4 line-clamp-2">
              {module.descripcion}
            </p>

            {/* Barra de Progreso */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Progreso</span>
                <span className="text-slate-700">
                  {Math.round(moduleProgress)}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${moduleProgress}%`,
                    background: `linear-gradient(90deg, ${module.colorPrimario}, ${module.colorSecundario})`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  isCompleted,
  isCurrent,
}: {
  isUnlocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
}) {
  if (isCompleted) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
        <CheckCircle className="w-3 h-3 text-green-600" />
        <span className="text-xs text-green-600">Completado</span>
      </div>
    );
  }

  if (isCurrent) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 rounded-full">
        <Play className="w-3 h-3 text-indigo-600" />
        <span className="text-xs text-indigo-600">Actual</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
      <span className="text-xs text-blue-600">Disponible</span>
    </div>
  );
}
