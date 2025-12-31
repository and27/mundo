"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import ChipTabs from "@/components/ui/ChipTabs";
import ParentResources from "@/components/program/ParentResources";
import { program } from "@/data/program";
import { guides } from "@/lib/guides";

type TabId = "cuento" | "Acompañamiento";

type GuideDetails = {
  guideTitle: string;
  emotionId?: string;
  tags?: string[];
  understanding?: { title: string; content: string };
  normalization?: string[];
  metaphorStory?: string;
  conversationPlan?: {
    phrasesToValidate: string[];
    questionsToExplore: string[];
  };
  strategies?: { title: string; items: string[] }[];
  suggestedActivity?: {
    title: string;
    description: string;
    materials: string;
  };
  reflectionPrompts?: string[];
  resources?: string[];
};

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-neutral-700">{title}</h3>
        {description && (
          <p className="text-xs text-neutral-500">{description}</p>
        )}
      </div>
      {children && <div className="text-sm text-neutral-600">{children}</div>}
    </div>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-200/70 text-neutral-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ProgramLessonView() {
  const params = useSearchParams();
  const router = useRouter();

  const lessonId = params.get("lesson");
  const programLesson = program.lessons.find((l) => l.id === lessonId);

  if (!programLesson) {
    return (
      <section className="mi-section">
        <div className="max-w-3xl mx-auto px-4 text-center mi-stack-md">
          <p className="text-neutral-600 text-lg">
            Este módulo no existe o no se pudo cargar.
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

  const guide = guides[programLesson.guideId] as GuideDetails | undefined;
  const [activeTab, setActiveTab] = useState<TabId>("cuento");

  const emotionLabel = useMemo(() => {
    if (!guide?.emotionId) return "—";
    return guide.emotionId;
  }, [guide?.emotionId]);

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
          Módulo {programLesson.order}
        </span>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
          {programLesson.title}
        </h1>
        <p className="text-neutral-600">
          {guide?.guideTitle || "Guía de Acompanamiento emocional"}
        </p>
        {guide?.tags?.length ? <PillList items={guide.tags} /> : null}
      </div>

      <section className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
        <ChipTabs
          tabs={[
            { id: "cuento", label: "Cuento" },
            { id: "Acompañamiento", label: "Acompañamiento" },
          ]}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as TabId)}
          className="mb-6"
        />

        <div className="mt-6 space-y-6">
          {activeTab === "cuento" && (
            <div className="grid md:grid-cols-2 gap-4">
              <SectionCard title="Enfoque emocional">
                <span className="capitalize">{emotionLabel}</span>
              </SectionCard>

              <SectionCard title="Práctica sugerida">
                {guide?.suggestedActivity ? (
                  guide.suggestedActivity.title
                ) : (
                  <span className="text-neutral-500">
                    Práctica en preparación.
                  </span>
                )}
              </SectionCard>

              {guide?.understanding && (
                <SectionCard title={guide.understanding.title}>
                  {guide.understanding.content}
                </SectionCard>
              )}

              {guide?.normalization?.length ? (
                <SectionCard title="Normalizar">
                  <BulletList items={guide.normalization} />
                </SectionCard>
              ) : null}
            </div>
          )}

          {activeTab === "cuento" && (
            <div className="grid md:grid-cols-2 gap-4">
              <SectionCard
                title="Experiencia vivencial"
                description="Para el niño"
              >
                <p>
                  El niño vive esta experiencia directamente a través del cuento
                  interactivo.
                </p>
                <p className="mt-2 text-neutral-500">
                  No es necesario explicar ni corregir durante el proceso.
                </p>
              </SectionCard>
              <SectionCard
                title="Tiempo sugerido"
                description="Sesiones breves"
              >
                8-12 minutos en un espacio tranquilo.
              </SectionCard>
            </div>
          )}

          {activeTab === "Acompañamiento" && guide && (
            <div className="mi-stack-lg">
              {guide.metaphorStory && (
                <SectionCard title="Lectura simbólica">
                  {guide.metaphorStory}
                </SectionCard>
              )}

              {guide.conversationPlan?.phrasesToValidate?.length ? (
                <SectionCard title="Lenguaje para acompañar">
                  <BulletList
                    items={guide.conversationPlan.phrasesToValidate}
                  />
                </SectionCard>
              ) : null}

              {guide.conversationPlan?.questionsToExplore?.length ? (
                <SectionCard title="Preguntas para explorar">
                  <BulletList
                    items={guide.conversationPlan.questionsToExplore}
                  />
                </SectionCard>
              ) : null}

              {guide.strategies?.length ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {guide.strategies.map((strategy) => (
                    <SectionCard key={strategy.title} title={strategy.title}>
                      <BulletList items={strategy.items} />
                    </SectionCard>
                  ))}
                </div>
              ) : null}

              {guide.suggestedActivity && (
                <SectionCard title={guide.suggestedActivity.title}>
                  <p>{guide.suggestedActivity.description}</p>
                  <p className="mt-2 text-xs text-neutral-500">
                    Materiales: {guide.suggestedActivity.materials}
                  </p>
                </SectionCard>
              )}

              {guide.reflectionPrompts?.length ? (
                <SectionCard title="Reflexión adulta">
                  <BulletList items={guide.reflectionPrompts} />
                </SectionCard>
              ) : null}

              {guide.resources?.length ? (
                <ParentResources resources={guide.resources} />
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

