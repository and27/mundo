"use client";

import type { StoryJob } from "@/types/storyJob";

type Props = {
  job: StoryJob | null;
  jobError: string | null;
  progress: number;
  needsEmotionSelection: boolean;
  selectedEmotion: string | null;
  showSpinner: boolean;
  estimateMinutes: string;
  onSelectEmotion: (emotion: string) => void;
  onCancel: () => void;
  onPlay: () => void;
  onBack: () => void;
  formatEmotionLabel: (emotion?: string) => string;
};

export default function StoryCookingCard({
  job,
  jobError,
  progress,
  needsEmotionSelection,
  selectedEmotion,
  showSpinner,
  estimateMinutes,
  onSelectEmotion,
  onCancel,
  onPlay,
  onBack,
  formatEmotionLabel,
}: Props) {
  return (
    <div className="border border-neutral-200 rounded-2xl p-5 mi-stack-md bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            Nuevo cuento en preparación
          </p>
          <h3 className="text-lg font-semibold text-neutral-800">
            Cocinando tu cuento personalizado
          </h3>
          <p className="text-sm text-neutral-600">
            Tiempo estimado: {estimateMinutes}
          </p>
        </div>
        {showSpinner && (
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
        )}
      </div>

      <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className="h-full bg-neutral-900 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {needsEmotionSelection ? (
        <div className="mi-stack-sm">
          <p className="text-sm text-neutral-600">
            {jobError ??
              "No pudimos inferir la emoción. Elige la emoción que más representa lo que nos cuentas."}
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "miedo",
              "ira",
              "tristeza",
              "verguenza",
              "celos",
              "alegria",
              "calma",
            ].map((emotion) => (
              <button
                key={emotion}
                onClick={() => onSelectEmotion(emotion)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  selectedEmotion === emotion
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
                }`}
              >
                {formatEmotionLabel(emotion)}
              </button>
            ))}
          </div>
        </div>
      ) : job?.status === "succeeded" && job.result?.storyId ? (
        <button
          onClick={onPlay}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 bg-primary-600 hover:bg-primary-700"
        >
          Escuchar cuento
        </button>
      ) : jobError && !job ? (
        <div className="mi-stack-sm">
          <p className="text-sm text-red-500">{jobError}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition"
          >
            Volver
          </button>
        </div>
      ) : job?.status === "failed" ? (
        <p className="text-sm text-red-500">
          {job.error ?? jobError ?? "No se pudo generar el cuento."}
        </p>
      ) : job?.status === "cancelled" ? (
        <p className="text-sm text-neutral-500">
          Creación cancelada. Puedes iniciar un nuevo cuento cuando quieras.
        </p>
      ) : (
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-sm font-semibold border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
