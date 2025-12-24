"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import StoryBlock from "@/components/program/StoryBlock";
import { lessons } from "@/data/lessons";
import ParentResources from "./ParentResources";
import SelTechniqueBlock from "./SelTechniqueBlock";
import InteractiveActivity from "./InteractiveActivity";
import LessonJourneyPlayer from "./ProgramLessonJourney";
import { rioEmocionesAmaruStory } from "@/lib/stories/definitions/rio-emociones-amaru.story";
import TabNavigation from "@/components/ui/TabNavigation";

export default function LessonView() {
  const params = useSearchParams();
  const router = useRouter();

  const id = params.get("lesson");
  const lesson = id && lessons[id] ? lessons[id] : null;

  if (!lesson) {
    return (
      <section className="mi-section">
        <div className="max-w-3xl mx-auto px-4 text-center mi-stack-md">
          <p className="text-neutral-600 text-lg">
            Esta lección no existe o no se pudo cargar.
          </p>
          <button
            onClick={() => router.push("/parentDashboard?section=program")}
            className="text-primary-600 hover:text-primary-700 underline font-medium"
          >
            Regresar al Programa
          </button>
        </div>
      </section>
    );
  }

  const story = rioEmocionesAmaruStory;
  const [activeTab, setActiveTab] = useState<
    "resumen" | "historia" | "técnica" | "actividad" | "recursos"
  >("resumen");

  return (
    <div className="max-w-5xl px-5 md:px-10 mi-stack-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() =>
            router.push("/parentDashboard?section=program&view=modules")
          }
          className="text-neutral-500 text-sm font-medium w-fit"
        >
          ← Volver al Programa
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          Lección {lesson.id}
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
        {lesson.title}
      </h1>

      <div className="max-h-[50vh] overflow-hidden bg-neutral-900 rounded-3xl p-4 md:p-6 shadow-xl">
        <LessonJourneyPlayer story={story} guideId="yachay" />
      </div>

      <section className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
        <TabNavigation
          tabs={[
            { id: "resumen", label: "Resumen" },
            { id: "historia", label: "Historia" },
            { id: "tecnica", label: "Técnica" },
            { id: "actividad", label: "Actividad" },
            { id: "recursos", label: "Recursos" },
          ]}
          activeTab={activeTab}
          onTabChange={(tabId) =>
            setActiveTab(
              tabId as
                | "resumen"
                | "historia"
                | "técnica"
                | "actividad"
                | "recursos"
            )
          }
          className="border-neutral-200"
        />

        <div className="mt-6">
          {activeTab === "resumen" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2">
                <h3 className="text-sm font-semibold text-neutral-700">
                  Historia principal
                </h3>
                {lesson.story.length > 0 ? (
                  <p className="text-sm text-neutral-600 line-clamp-3">
                    {lesson.story[0]}
                  </p>
                ) : (
                  <p className="text-sm text-neutral-500">
                    Contenido en preparaci¢n.
                  </p>
                )}
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2">
                <h3 className="text-sm font-semibold text-neutral-700">
                  Práctica guiada
                </h3>
                {lesson.technique ? (
                  <p className="text-sm text-neutral-600">
                    {lesson.technique.title} · {lesson.technique.steps.length}{" "}
                    pasos
                  </p>
                ) : (
                  <p className="text-sm text-neutral-500">
                    T‚cnica en desarrollo.
                  </p>
                )}
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2">
                <h3 className="text-sm font-semibold text-neutral-700">
                  Actividad interactiva
                </h3>
                {lesson.activity ? (
                  <p className="text-sm text-neutral-600">
                    {lesson.activity.question}
                  </p>
                ) : (
                  <p className="text-sm text-neutral-500">
                    Actividad en camino.
                  </p>
                )}
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2">
                <h3 className="text-sm font-semibold text-neutral-700">
                  Recursos para padres
                </h3>
                {lesson.resources.length > 0 ? (
                  <p className="text-sm text-neutral-600">
                    {lesson.resources.length} recomendaciones clave.
                  </p>
                ) : (
                  <p className="text-sm text-neutral-500">
                    Recursos pr¢ximamente.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "historia" && (
            <>
              {lesson.story.length > 0 ? (
                <StoryBlock story={lesson.story} />
              ) : (
                <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 text-center">
                  <p className="text-neutral-600">
                    Esta emoci¢n estar  disponible pronto.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "técnica" && (
            <>
              {lesson.technique ? (
                <SelTechniqueBlock technique={lesson.technique} />
              ) : (
                <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 text-center">
                  <p className="text-neutral-600">T‚cnica en preparaci¢n.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "actividad" && (
            <>
              {lesson.activity ? (
                <InteractiveActivity activity={lesson.activity} />
              ) : (
                <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 text-center">
                  <p className="text-neutral-600">Actividad en camino.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "recursos" && (
            <>
              {lesson.resources.length > 0 ? (
                <ParentResources resources={lesson.resources} />
              ) : (
                <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 text-center">
                  <p className="text-neutral-600">Recursos pr¢ximamente.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
