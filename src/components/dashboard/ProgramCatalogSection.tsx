"use client";

import { useSearchParams } from "next/navigation";
import ProgramHero from "../program/ProgramHero";
import ProgramMainCard from "../program/ProgramMainCard";
import LessonView from "../program/LessonView";
import ProgramLessonsList from "../program/ProgramLessonList";

export default function ProgramCatalogSection() {
  const params = useSearchParams();

  const view = params.get("view");
  const lessonId = params.get("lesson");

  if (lessonId) {
    return <LessonView />;
  }

  if (view === "modules") {
    return <ProgramLessonsList />;
  }

  return (
    <div className="px-20 mi-stack-lg">
      <ProgramHero
        title="Emociones en Acción"
        subtitle="Desarrolla el idioma de las emociones · 8 a 12 años"
      />

      <ProgramMainCard
        title="Emotional Literacy"
        subtitle="Programa Central"
        description="Un viaje práctico donde los niños exploran, entienden y aprenden a expresar sus emociones con claridad, seguridad y confianza."
        image="/images/all.webp"
        onEnter={() =>
          (window.location.href =
            "/parentDashboard?section=program&view=modules")
        }
      />
    </div>
  );
}
