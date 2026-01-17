import {
  Emotion,
  Etapa,
  ModuleData,
  ModuleSection,
  SectionContent as SectionContentType,
  SubSection,
} from "@/types/course";
import { BookOpen, Activity, Lightbulb, CheckCircle } from "lucide-react";

interface SectionContentProps {
  module: ModuleData;
  section: ModuleSection;
  isCompleted: boolean;
  onComplete: () => void;
}

export default function SectionContent({
  module,
  section,
  isCompleted,
}: SectionContentProps) {
  const getSectionIcon = (tipo: string) => {
    switch (tipo) {
      case "contenido":
        return BookOpen;
      case "actividad":
        return Activity;
      default:
        return Lightbulb;
    }
  };

  const Icon = getSectionIcon(section.tipo);

  return (
    <div className="space-y-6">
      {/* Header de la sección */}
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${module.colorPrimario}, ${module.colorSecundario})`,
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="mi-text-title md:mi-text-title-lg text-slate-800 mb-2">
            {section.titulo}
          </h2>
          <div className="flex items-center gap-4 mi-text-body-sm text-slate-500">
            <span className="capitalize">{section.tipo}</span>
            {isCompleted && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Completado</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="prose prose-slate max-w-none">
        {section.tipo === "contenido" &&
          renderContent(section.contenido, module)}
        {section.tipo === "actividad" && renderActivity(section.contenido)}
      </div>
    </div>
  );
}

function renderContent(content: SectionContentType, module: ModuleData) {
  return (
    <div className="space-y-8">
      {/* Texto principal */}
      {content.texto && (
        <div className="mi-text-body text-slate-700 leading-relaxed">
          {content.texto}
        </div>
      )}

      {/* Puntos clave */}
      {content.puntosClave && (
        <div className="bg-white/60 border border-white/30 rounded-xl p-6">
          <h4 className="mi-text-subtitle text-slate-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Puntos Clave
          </h4>
          <ul className="space-y-3">
            {content.puntosClave.map((punto: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: module.colorPrimario }}
                />
                <span className="text-slate-700">{punto}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Subsecciones */}
      {content.subsecciones && (
        <div className="space-y-6">
          {content.subsecciones.map((sub: SubSection, index: number) => (
            <div
              key={index}
              className="border-l-4 pl-6"
              style={{ borderColor: module.colorPrimario }}
            >
              <h4 className="mi-text-subtitle text-slate-800 mb-3">
                {sub.subtitulo}
              </h4>
              <p className="text-slate-700 leading-relaxed">{sub.texto}</p>
            </div>
          ))}
        </div>
      )}

      {/* Etapas del desarrollo */}
      {content.etapas && (
        <div className="space-y-6">
          {content.etapas.map((etapa: Etapa, index: number) => (
            <div
              key={index}
              className="bg-white/60 border border-white/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: module.colorPrimario }}
                >
                  {etapa.rango}
                </div>
                <h4 className="mi-text-subtitle text-slate-800">
                  {etapa.titulo}
                </h4>
              </div>
              <p className="text-slate-700 mb-4">{etapa.descripcion}</p>

              {etapa.hitos && (
                <div className="mb-4">
                  <h5 className="font-medium text-slate-800 mb-2">
                    Hitos importantes:
                  </h5>
                  <ul className="space-y-2">
                    {etapa.hitos.map((hito: string, hitoIndex: number) => (
                      <li
                        key={hitoIndex}
                        className="flex items-start gap-2 mi-text-body-sm text-slate-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {hito}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {etapa.desafios && (
                <div>
                  <h5 className="font-medium text-slate-800 mb-2">
                    Desafíos comunes:
                  </h5>
                  <ul className="space-y-2">
                    {etapa.desafios.map(
                      (desafio: string, desafioIndex: number) => (
                        <li
                          key={desafioIndex}
                          className="flex items-start gap-2 mi-text-body-sm text-slate-700"
                        >
                          <div className="w-4 h-4 bg-amber-100 rounded-full flex-shrink-0 mt-0.5"></div>
                          {desafio}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Emociones */}
      {content.emociones && (
        <div className="space-y-6">
          {content.emociones.map((emocion: Emotion, index: number) => (
            <div
              key={index}
              className="bg-white/60 border border-white/30 rounded-xl p-6"
            >
              <h4 className="mi-text-subtitle text-slate-800 mb-3">
                {emocion.emocion}
              </h4>
              <p className="text-slate-700 mb-4">{emocion.funcion}</p>

              {emocion.manifestaciones_por_edad && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {Object.entries(emocion.manifestaciones_por_edad).map(
                    ([edad, manifestacion]) => (
                      <div key={edad} className="bg-white/40 rounded-lg p-4">
                        <h6 className="font-medium text-slate-800 mb-2">
                          {edad.replace("_", "-")} años
                        </h6>
                        <p className="mi-text-body-sm text-slate-700">
                          {manifestacion as string}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}

              {emocion.cuando_preocuparse && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h6 className="font-medium text-red-800 mb-2">
                    Cuándo buscar ayuda:
                  </h6>
                  <ul className="space-y-1">
                    {emocion.cuando_preocuparse.map(
                      (señal: string, señalIndex: number) => (
                        <li
                          key={señalIndex}
                          className="mi-text-body-sm text-red-700 flex items-start gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          {señal}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function renderActivity(content: SectionContentType) {
  return (
    <div className="space-y-8">
      {/* Instrucciones */}
      {content.instrucciones && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="mi-text-subtitle text-slate-800 mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Instrucciones
          </h4>
          <p className="text-slate-700">{content.instrucciones}</p>
        </div>
      )}

      {/* Preguntas de reflexión */}
      {content.preguntas && (
        <div className="space-y-4">
          <h4 className="mi-text-subtitle text-slate-800">
            Preguntas de Reflexión
          </h4>
          <div className="space-y-4">
            {content.preguntas.map((pregunta: string, index: number) => (
              <div
                key={index}
                className="bg-white/60 border border-white/30 rounded-xl p-4"
              >
                <p className="text-slate-700 mb-3">{pregunta}</p>
                <textarea
                  placeholder="Escribe tu reflexión aquí..."
                  className="w-full bg-white/40 border border-white/50 rounded-lg p-3 text-slate-800 placeholder-slate-500 focus:border-indigo-300 focus:outline-none resize-none"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ejercicio práctico */}
      {content.ejercicio_practico && (
        <div className="bg-white/60 border border-white/30 rounded-xl p-6">
          <h4 className="mi-text-subtitle text-slate-800 mb-4">
            {content.ejercicio_practico.titulo}
          </h4>
          <p className="text-slate-700 mb-4">
            {content.ejercicio_practico.instrucciones}
          </p>

          {content.ejercicio_practico.pasos && (
            <div className="space-y-3">
              <h5 className="font-medium text-slate-800">Pasos a seguir:</h5>
              <ol className="space-y-2">
                {content.ejercicio_practico.pasos.map(
                  (paso: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-slate-700">{paso}</span>
                    </li>
                  )
                )}
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Objetivo */}
      {content.objetivo && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h5 className="font-medium text-green-800 mb-2">
            Objetivo de esta actividad:
          </h5>
          <p className="text-green-700">{content.objetivo}</p>
        </div>
      )}
    </div>
  );
}

