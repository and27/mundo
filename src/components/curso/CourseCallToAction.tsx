import { CourseProgress, ModuleData } from "@/types/course";
import { Award, Play } from "lucide-react";

interface CourseCallToActionProps {
  modules: ModuleData[];
  progress: CourseProgress;
  stats: {
    progressPercentage: number;
  };
  onClick: (moduleId: string, moduleNumber: number) => void;
}

export default function CourseCallToAction({
  modules,
  progress,
  stats,
  onClick,
}: CourseCallToActionProps) {
  const handleContinue = () => {
    const currentModule = modules.find(
      (m) => m.id === `modulo${progress.currentModule}`
    );
    if (currentModule) {
      onClick(currentModule.id, progress.currentModule);
    }
  };

  if (stats.progressPercentage < 100) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              ¿Listo para continuar tu formación?
            </h3>
            <p className="text-slate-600">
              {progress.currentModule <= 5
                ? `Continúa con el Módulo ${progress.currentModule}`
                : "Completa los módulos restantes para obtener tu certificación"}
            </p>
          </div>
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4" />
            Continuar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              ¡Felicitaciones! Has completado el curso
            </h3>
            <p className="text-slate-600">
              Descarga tu certificado como Guía Consciente certificado
            </p>
          </div>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
          <Award className="w-4 h-4" />
          Descargar Certificado
        </button>
      </div>
    </div>
  );
}
