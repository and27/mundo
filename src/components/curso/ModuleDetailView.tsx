import { ModuleData, ModuleSection } from "@/types/course";
import {
  ChevronLeft,
  BookOpen,
  CheckCircle,
  Play,
  ChevronRight,
  FileText,
  PenTool,
  Video,
} from "lucide-react";

interface ModuleDetailViewProps {
  module: ModuleData;
  onBack: () => void;
  onStartModule: () => void;
  onSectionClick?: (sectionIndex: number) => void; // Cambio: ahora usa el índice
}

export default function ModuleDetailView({
  module,
  onBack,
  onStartModule,
  onSectionClick,
}: ModuleDetailViewProps) {
  const getSectionIcon = (tipo: string) => {
    switch (tipo) {
      case "contenido":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "actividad":
        return <PenTool className="w-4 h-4 text-green-500" />;
      case "video":
        return <Video className="w-4 h-4 text-red-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-500" />;
    }
  };

  const getSectionTypeLabel = (tipo: string) => {
    switch (tipo) {
      case "contenido":
        return "Contenido teórico";
      case "actividad":
        return "Actividad práctica";
      case "video":
        return "Video explicativo";
      default:
        return "Sección especial";
    }
  };

  // Función para manejar click en sección y comenzar el módulo en esa sección específica
  const handleSectionClick = (index: number) => {
    if (onSectionClick) {
      onSectionClick(index);
    } else {
      // Si no hay handler específico, comenzar el módulo
      onStartModule();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con botón de regreso */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-white/50 text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al curso
        </button>
      </div>

      {/* Contenido del módulo */}
      <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-8">
        <div className="flex items-start gap-6 mb-8">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${module.colorPrimario}, ${module.colorSecundario})`,
            }}
          >
            <span className="text-3xl">{module.icono}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {module.titulo}
            </h1>
            <p className="text-xl text-indigo-600 mb-4">{module.subtitulo}</p>
          </div>
        </div>

        {/* Objetivos */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Objetivos de Aprendizaje
          </h3>
          <div className="space-y-3">
            {module.objetivos.map((objetivo: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-slate-600">{objetivo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Secciones clickeables */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Contenido del Módulo
            </h3>
            <p className="text-sm text-slate-500">
              Haz click en cualquier sección para ir directamente
            </p>
          </div>
          <div className="space-y-3">
            {module.secciones.map((seccion: ModuleSection, index: number) => (
              <button
                key={seccion.id}
                onClick={() => handleSectionClick(index)}
                className="w-full bg-white/60 hover:bg-white/80 border border-white/30 hover:border-indigo-200 rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-left group"
                aria-label={`Ir a la sección ${index + 1}: ${seccion.titulo}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-slate-200 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center text-sm font-medium text-slate-600 transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      {getSectionIcon(seccion.tipo)}
                      <h4 className="font-medium text-slate-800 group-hover:text-indigo-700 transition-colors">
                        {seccion.titulo}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {seccion.duracion && (
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        {seccion.duracion}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>
                <p className="text-sm text-slate-500 ml-11 mt-1">
                  {getSectionTypeLabel(seccion.tipo)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="pt-6 border-t border-white/30 space-y-3">
          <button
            onClick={onStartModule}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Play className="w-5 h-5" />
            Comenzar desde el inicio
          </button>
          <p className="text-xs text-slate-500 text-center">
            También puedes hacer click en cualquier sección arriba para ir
            directamente
          </p>
        </div>
      </div>
    </div>
  );
}
