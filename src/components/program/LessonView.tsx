"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import ChipTabs from "@/components/ui/ChipTabs";
import { program } from "@/data/program";
import { guides } from "@/lib/guides";
import { getGuideSections } from "@/lib/guideSections";
import type { ActionableGuide, ParentGuideSection } from "@/types/ai";

type TabId = "cuento" | "acompanamiento";

type GuideDetails = ActionableGuide;
type CompanionTab = {
  id: string;
  label: string;
  description?: string;
  count?: number;
  content: ReactNode;
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

function collectStrategyItems(
  strategies: ParentGuideSection[],
  keywords: string[],
) {
  if (keywords.length === 0) return [];
  return strategies.flatMap((strategy) => {
    if (!("items" in strategy)) return [];
    const title = (strategy.title ?? "").toLowerCase();
    if (!title) return [];
    const hasKeyword = keywords.some((keyword) => title.includes(keyword));
    return hasKeyword ? strategy.items : [];
  });
}

function collectAllStrategyItems(strategies: ParentGuideSection[]) {
  return strategies.flatMap((strategy) => {
    if (!("items" in strategy)) return [];
    return strategy.items;
  });
}

function uniqueStrings(items: string[]) {
  return Array.from(new Set(items));
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
    (section) => section.kind === "strategies",
  ) as ParentGuideSection[];

  const metaphorContent =
    metaphor && "content" in metaphor ? metaphor.content : undefined;
  const languagePhrases =
    language && "phrases" in language ? language.phrases : [];
  const languageQuestions =
    language && "questions" in language ? (language.questions ?? []) : [];
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
  const [activeCompanionTab, setActiveCompanionTab] =
    useState<string>("metaphor");

  const allStrategyItems = uniqueStrings(collectAllStrategyItems(strategies));
  const momentItems = uniqueStrings(
    collectStrategyItems(strategies, [
      "momento",
      "pico",
      "durante",
      "en el momento",
      "en momento",
    ]),
  );
  const afterItems = uniqueStrings(
    collectStrategyItems(strategies, ["despues", "cuando ya bajo", "post"]),
  );
  const trainingItems = uniqueStrings(
    collectStrategyItems(strategies, [
      "entrenamiento",
      "calma",
      "preparacion",
      "previo",
      "antes",
    ]),
  );
  const matchedStrategyItems = new Set([
    ...momentItems,
    ...afterItems,
    ...trainingItems,
  ]);
  const otherStrategyItems = allStrategyItems.filter(
    (item) => !matchedStrategyItems.has(item),
  );

  const companionTabs: CompanionTab[] = [];
  if (metaphorContent) {
    companionTabs.push({
      id: "metaphor",
      label: "Lectura simbolica",
      description: "Idea central para acompanar.",
      content: (
        <p className="text-sm text-neutral-600 leading-relaxed">
          {metaphorContent}
        </p>
      ),
    });
  }
  if (languagePhrases.length > 0) {
    companionTabs.push({
      id: "phrases",
      label: "Frases para validar",
      description: "Lenguaje breve y contenedor.",
      count: languagePhrases.length,
      content: <BulletList items={languagePhrases} />,
    });
  }
  if (languageQuestions.length > 0) {
    companionTabs.push({
      id: "questions",
      label: "Preguntas para explorar",
      description: "Abren conversacion sin presionar.",
      count: languageQuestions.length,
      content: <BulletList items={languageQuestions} />,
    });
  }
  if (momentItems.length > 0) {
    companionTabs.push({
      id: "moment",
      label: "En el momento",
      description: "Cuando la emocion esta alta.",
      count: momentItems.length,
      content: <BulletList items={momentItems} />,
    });
  }
  if (afterItems.length > 0) {
    companionTabs.push({
      id: "after",
      label: "Despues",
      description: "Cuando ya bajo la intensidad.",
      count: afterItems.length,
      content: <BulletList items={afterItems} />,
    });
  }
  if (trainingItems.length > 0) {
    companionTabs.push({
      id: "training",
      label: "Entrenamiento en calma",
      description: "Practica corta fuera del pico emocional.",
      count: trainingItems.length,
      content: <BulletList items={trainingItems} />,
    });
  }
  if (otherStrategyItems.length > 0) {
    companionTabs.push({
      id: "extra",
      label: "Estrategias extra",
      description: "Apoyos adicionales cuando lo necesites.",
      count: otherStrategyItems.length,
      content: <BulletList items={otherStrategyItems} />,
    });
  }
  if (practiceTitle || practiceDescription) {
    companionTabs.push({
      id: "practice",
      label: practiceTitle ?? "Practica sugerida",
      description: "Actividad breve para regular.",
      content: (
        <div className="space-y-2 text-sm text-neutral-600">
          {practiceDescription && <p>{practiceDescription}</p>}
          {practiceMaterials && (
            <p className="text-xs text-neutral-500">
              Materiales: {practiceMaterials}
            </p>
          )}
        </div>
      ),
    });
  }
  if (reflectionItems.length > 0) {
    companionTabs.push({
      id: "reflection",
      label: "Reflexion adulta",
      description: "Autoobservacion del adulto.",
      count: reflectionItems.length,
      content: <BulletList items={reflectionItems} />,
    });
  }
  if (notesItems.length > 0) {
    companionTabs.push({
      id: "notes",
      label: "Notas",
      description: "Recordatorios clave.",
      count: notesItems.length,
      content: <BulletList items={notesItems} />,
    });
  }

  const resolvedCompanionTabId =
    companionTabs.find((tab) => tab.id === activeCompanionTab)?.id ??
    companionTabs[0]?.id;
  const activeCompanionTabData = companionTabs.find(
    (tab) => tab.id === resolvedCompanionTabId,
  );

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
              {companionTabs.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  No hay informacion de acompanamiento disponible.
                </p>
              ) : (
                <div className="grid md:grid-cols-[220px_1fr] gap-4">
                  <aside className="bg-neutral-50 border border-neutral-200 rounded-2xl p-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-neutral-400 px-2">
                      Secciones
                    </p>
                    <div
                      className="mt-3 space-y-1"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {companionTabs.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={tab.id === resolvedCompanionTabId}
                          onClick={() => setActiveCompanionTab(tab.id)}
                          className={`w-full rounded-xl px-3 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 ${
                            tab.id === resolvedCompanionTabId
                              ? "bg-white text-neutral-900 shadow-sm border border-neutral-300"
                              : "text-neutral-600 hover:text-neutral-800 hover:bg-white/70 border-neutral-200"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">{tab.label}</span>
                            {typeof tab.count === "number" && (
                              <span className="text-xs text-neutral-400">
                                {tab.count}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </aside>

                  <section
                    className="bg-white border border-neutral-200 rounded-2xl p-5"
                    role="tabpanel"
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-neutral-800">
                        {activeCompanionTabData?.label}
                      </h3>
                      {activeCompanionTabData?.description && (
                        <p className="text-sm text-neutral-500">
                          {activeCompanionTabData.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      {activeCompanionTabData?.content}
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
