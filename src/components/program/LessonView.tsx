"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ModuleHero from "@/components/program/ModuleHero";
import StoryBlock from "@/components/program/StoryBlock";
import { lessons } from "@/data/lessons";
import ParentResources from "./ParentResources";
import CompleteButton from "./CompleteButton";
import SelTechniqueBlock from "./SelTechniqueBlock";
import InteractiveActivity from "./InteractiveActivity";
import LessonJourneyPlayer from "./ProgramLessonJourney";
import { rioEmocionesAmaruStory } from "@/lib/stories/definitions/rio-emociones-amaru.story";

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

  const nextLessonId = String(Number(id) + 1);
  const hasNext = Boolean(lessons[nextLessonId]);
  const story = rioEmocionesAmaruStory;

  return (
    <section className="mi-section">
      <div className="max-w-3xl mx-auto px-4 mi-stack-lg">
        <button
          onClick={() => router.push("/parentDashboard?section=program")}
          className="text-neutral-500 hover:text-neutral-700 text-sm font-medium w-fit"
        >
          ← Volver al Programa
        </button>

        <LessonJourneyPlayer story={story} guideId="yachay" />
        {lesson.story.length > 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <StoryBlock story={lesson.story} />
          </div>
        ) : (
          <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 text-center">
            <p className="text-neutral-600">
              Esta emoción estará disponible pronto.
            </p>
          </div>
        )}

        {lesson.technique && <SelTechniqueBlock technique={lesson.technique} />}

        {lesson.activity && <InteractiveActivity activity={lesson.activity} />}

        {lesson.resources.length > 0 && (
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <ParentResources resources={lesson.resources} />
          </div>
        )}

        <div className="pt-4">
          <CompleteButton
            label={hasNext ? "Siguiente" : "Finalizar Programa"}
            onClick={() =>
              hasNext
                ? router.push(
                    `/parentDashboard?section=program&lesson=${nextLessonId}`
                  )
                : router.push("/parentDashboard?section=program")
            }
          />
        </div>
      </div>
    </section>
  );
}
