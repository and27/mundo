"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import ChipTabs from "@/components/ui/ChipTabs";
import ParentResources from "@/components/program/ParentResources";
import { program } from "@/data/program";
import { guides } from "@/lib/guides";
import { getGuideSections } from "@/lib/guideSections";
import type { ActionableGuide, ParentGuideSection } from "@/types/ai";

type TabId = "cuento" | "acompanamiento";

type GuideDetails = ActionableGuide;

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
            Este modulo no existe o no se pudo cargar.
          </p>
          <button
            onClick={() => router.push("/parentDashboard?section=program")}
            className="text-primary-600 hover:text-primary-700 underline font-medium"
          >
            Regresar al programa
          </button>
        </div>
      </section>
    );
  }

  const guide = guides[programLesson.guideId] as GuideDetails | undefined;
  const [activeTab, setActiveTab] = useState<TabId>("cuento");
  const sections = guide ? getGuideSections(guide) : [];

  const emotionLabel = useMemo(() => {
    if (!guide?.emotionId) return "-";
    return guide.emotionId;
  }, [guide?.emotionId]);

  const getSection = (kind: ParentGuideSection["kind"]) =>
    sections.find((section) => section.kind === kind) as
      | ParentGuideSection
      | undefined;

  const metaphor = getSection("metaphor");
  const language = getSection("language");
  const practice = getSection("practice");
  const understanding = getSection("understanding");
  const normalization = getSection("normalization");
  const reflection = getSection("reflection");
  const notes = getSection("notes");
  const strategies = sections.filter(
    (section) => section.kind === "strategies"
  ) as ParentGuideSection[];

  const metaphorContent =
    metaphor && "content" in metaphor ? metaphor.content : undefined;
  const languagePhrases =
    language && "phrases" in language ? language.phrases : [];
  const languageQuestions =
    language && "questions" in language ? language.questions ?? [] : [];
  const practiceTitle =
    practice && "title" in practice ? practice.title : undefined;
  const practiceDescription =
    practice && "description" in practice ? practice.description : undefined;
  const practiceMaterials =
    practice && "materials" in practice ? practice.materials : undefined;
  const understandingContent =
    understanding && "content" in understanding
      ? understanding.content
      : undefined;
  const normalizationItems =
    normalization && "bullets" in normalization ? normalization.bullets : [];
  const reflectionItems =
    reflection && "prompts" in reflection ? reflection.prompts : [];
  const notesItems = notes && "items" in notes ? notes.items : [];

  return (
    <div className="max-w-5xl px-5 md:px-10 mi-stack-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() =>
            router.push("/parentDashboard?section=program&view=modules")
          }
          className="text-neutral-500 text-sm font-medium w-fit"
        >
           Volver al programa
        </button>

        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          Modulo {programLesson.order}
        </span>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
          {programLesson.title}
        </h1>
        <p className="text-neutral-600">
          {guide?.guideTitle || "Guia de acompanamiento emocional"}
        </p>
        {guide?.tags?.length ? <PillList items={guide.tags} /> : null}
      </div>

      <section className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
        <ChipTabs
          tabs={[
            { id: "cuento", label: "Cuento" },
            { id: "acompanamiento", label: "Acompanamiento" },
          ]}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as TabId)}
          className="mb-6"
        />

        <div className="mt-6 space-y-6">
          {activeTab === "cuento" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <SectionCard title="Enfoque emocional">
                  <span className="capitalize">{emotionLabel}</span>
                </SectionCard>

                <SectionCard title="Practica sugerida">
                  {practiceTitle ? (
                    practiceTitle
                  ) : (
                    <span className="text-neutral-500">
                      Practica en preparacion.
                    </span>
                  )}
                </SectionCard>

                {understandingContent && (
                  <SectionCard title="Comprender">
                    {understandingContent}
                  </SectionCard>
                )}

                {normalizationItems.length > 0 ? (
                  <SectionCard title="Normalizar">
                    <BulletList items={normalizationItems} />
                  </SectionCard>
                ) : null}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <SectionCard
                  title="Experiencia vivencial"
                  description="Para el nino"
                >
                  <p>
                    El nino vive esta experiencia directamente a traves del
                    cuento interactivo.
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
            </div>
          )}
          {activeTab === "acompanamiento" && guide && (
            <div className="mi-stack-lg">
              {metaphorContent && (
                <SectionCard title="Lectura simbolica">
                  {metaphorContent}
                </SectionCard>
              )}

              {languagePhrases.length > 0 ? (
                <SectionCard title="Lenguaje para acompanar">
                  <BulletList items={languagePhrases} />
                </SectionCard>
              ) : null}

              {languageQuestions.length > 0 ? (
                <SectionCard title="Preguntas para explorar">
                  <BulletList items={languageQuestions} />
                </SectionCard>
              ) : null}

              {strategies.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {strategies.map((strategy) => (
                    <SectionCard
                      key={strategy.title}
                      title={strategy.title || ""}
                    >
                      {"items" in strategy ? (
                        <BulletList items={strategy.items} />
                      ) : null}
                    </SectionCard>
                  ))}
                </div>
              ) : null}

              {practiceTitle && practiceDescription && (
                <SectionCard title={practiceTitle}>
                  <p>{practiceDescription}</p>
                  {practiceMaterials && (
                    <p className="mt-2 text-xs text-neutral-500">
                      Materiales: {practiceMaterials}
                    </p>
                  )}
                </SectionCard>
              )}

              {reflectionItems.length > 0 ? (
                <SectionCard title="Reflexion adulta">
                  <BulletList items={reflectionItems} />
                </SectionCard>
              ) : null}

              {notesItems.length > 0 ? (
                <ParentResources resources={notesItems} />
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
