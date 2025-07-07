"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Clock, Calendar, Trash2 } from "lucide-react";
import { useSavedGuides } from "@/hooks/useSavedGuides";
import GuideDisplay from "../assistant/GuideDisplay";

export default function GeneratedStories() {
  const searchParams = useSearchParams();
  const guideIdFromUrl = searchParams.get("guideId");

  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(
    guideIdFromUrl
  );
  const { savedGuides, isLoaded, deleteGuide, getGuide } = useSavedGuides();

  // Si llega un guideId por URL, seleccionarlo automáticamente
  useEffect(() => {
    if (guideIdFromUrl && guideIdFromUrl !== selectedGuideId) {
      setSelectedGuideId(guideIdFromUrl);
    }
  }, [guideIdFromUrl, selectedGuideId]);

  // Si hay una guía seleccionada, mostrar vista detalle
  if (selectedGuideId) {
    const currentGuide = getGuide(selectedGuideId);

    if (!currentGuide) {
      setSelectedGuideId(null);
      return null;
    }

    return (
      <div className="space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-slate-600">
          <button
            onClick={() => setSelectedGuideId(null)}
            className="hover:text-slate-800 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Guías
          </button>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-800 font-medium">
            {currentGuide.title}
          </span>
        </nav>

        {/* Vista detalle */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-6 flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {currentGuide.title}
              </h1>
              <p className="text-slate-600 mb-4">{currentGuide.summary}</p>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {currentGuide.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentGuide.duration}
                </span>
              </div>
            </div>

            {/* Botón eliminar */}
            <button
              onClick={() => {
                if (window.confirm("¿Estás seguro de eliminar esta guía?")) {
                  deleteGuide(selectedGuideId);
                  setSelectedGuideId(null);
                }
              }}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar guía"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Contenido de la guía */}
          <GuideDisplay guide={currentGuide} />
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Vista lista de guías
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          📚 Tus Guías Generadas
        </h1>
        <p className="text-slate-600">
          Accede a todas las guías emocionales que has creado (
          {savedGuides.length} guías)
        </p>
      </div>

      {/* Lista de guías */}
      {savedGuides.length > 0 ? (
        <div className="grid gap-4">
          {savedGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer p-6 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {guide.summary}
                  </p>

                  {/* Pillars preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.metaphor?.title && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        📖 {guide.metaphor.title}
                      </span>
                    )}
                    {guide.conversation?.phrases && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        💬 {guide.conversation.phrases.length} frases
                      </span>
                    )}
                    {guide.activity?.title && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        🎯 {guide.activity.title}
                      </span>
                    )}
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {guide.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {guide.duration}
                    </span>
                  </div>
                </div>

                {/* Arrow indicator */}
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors ml-4 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Aún no tienes guías guardadas
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Cuando generes tu primera guía emocional, se guardará
            automáticamente aquí para que puedas acceder a ella cuando la
            necesites.
          </p>
        </div>
      )}
    </div>
  );
}
