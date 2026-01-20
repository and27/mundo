"use client";

import { useSearchParams } from "next/navigation";
import ProgramMainCard from "../program/ProgramMainCard";
import LessonView from "../program/LessonView";
import ProgramLessonsList from "../program/ProgramLessonList";

export default function ProgramCatalogSection() {
  const params = useSearchParams();

  const view = params.get("view");
  const lessonId = params.get("lesson");
  const goToModules = () => {
    window.location.href = "/parentDashboard?section=program&view=modules";
  };

  if (lessonId) {
    return <LessonView />;
  }

  if (view === "modules") {
    return <ProgramLessonsList />;
  }

  return (
    <div className="px-5 md:px-20 mi-stack-lg">
      <section className="relative overflow-hidden rounded-[32px] border border-neutral-200/60 bg-neutral-50 p-6 md:p-10 shadow-xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="mi-stack-md">
            <div className="bg-primary-200 text-primary-800 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm">
              Programa guiado
            </div>

            <div className="mi-stack-sm">
              <h1 className="text-xl md:text-3xl tracking-tight font-extrabold text-primary-800 mi-section-title">
                Emociones en accion
              </h1>
              <p className="mi-text-body text-neutral-600 max-w-xl leading-relaxed">
                Una ruta paso a paso para que los ninos entiendan lo que
                sienten, lo expresen con claridad y fortalezcan su seguridad
                emocional.
              </p>
            </div>

            <div className="text-sm text-neutral-500">
              6 modulos - 6-8 minutos cada uno
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600">
              <div className="rounded-2xl bg-neutral-50 p-4 shadow-sm">
                Historias guiadas + reflexion
              </div>
              <div className="rounded-2xl bg-neutral-50 p-4 shadow-sm">
                Para familias y acompanamiento
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ProgramMainCard
              title="Aprende el lenguaje de las emociones"
              subtitle="Ruta principal"
              description="Un viaje practico donde los ninos exploran, entienden y aprenden a expresar sus emociones con claridad, seguridad y confianza."
              image="/images/program/cover.png"
              onEnter={goToModules}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
