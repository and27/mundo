"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { guides } from "@/lib/guides";
import { Guide } from "@/types/guides";
import SelectableEmotionGrid from "@/components/SelectableEmotion";
import Button from "@/components/ui/Button";
import { emotionsAfterJourney_9_11 } from "@/lib/emotionsData";

const LoadingIndicator = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white/50"></div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center text-red-400 p-10 min-h-screen flex justify-center items-center">
    <p>Error: {message}</p>
  </div>
);

const EndPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [selectedEmotionId, setSelectedEmotionId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      const foundGuide = guides.find((g) => g.id === id);
      if (foundGuide) {
        setGuide(foundGuide);
      } else {
        setError("Guía no encontrada para finalizar");
      }
      setIsLoading(false);
    }, 300);
  }, [id]);

  const handleEmotionSelect = (label: string) => {
    if (isSaving) return;
    const selectedOption = emotionsAfterJourney_9_11.find(
      (e) => e.label === label
    );
    setSelectedEmotionId(selectedOption?.id || null);
  };

  const handleFinish = () => {
    if (!selectedEmotionId || isSaving) return;

    setIsSaving(true);
    const selectedEmotionObject = emotionsAfterJourney_9_11.find(
      (opt) => opt.id === selectedEmotionId
    );
    const emotionLabelForEvent =
      selectedEmotionObject?.label || selectedEmotionId;

    console.log(
      "Guardando emoción (ID):",
      selectedEmotionId,
      "para guía:",
      guide?.id
    );

    if (window.umami) {
      window.umami.track("emotion_selected_post_journey", {
        guideId: guide?.id || "unknown",
        emotion: emotionLabelForEvent,
      });
    }

    setTimeout(() => {
      setIsSaving(false);
      router.push("/dashboard");
    }, 700);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!guide) {
    return <ErrorMessage message="Guía no encontrada" />;
  }

  const initialSelectedLabel = emotionsAfterJourney_9_11.find(
    (e) => e.id === selectedEmotionId
  )?.label;

  return (
    <section className="bg-black/30 backdrop-blur-md text-center flex flex-col gap-4 justify-start items-center min-h-screen mx-auto p-4">
      <div className="w-full max-w-xl flex flex-col items-center">
        <div className="mb-4 relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-white/30 shadow-md">
          <Image
            src={guide.imageTransparent || "/placeholder-image.png"}
            alt={guide.name}
            fill
            sizes="112px"
            priority
            className="object-cover object-top"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/112x112/333333/FFFFFF?text=Guia";
            }}
          />
        </div>

        <h2 className="text-lg font-semibold text-white/90 mb-2">
          {guide.name} te deja una última enseñanza:
        </h2>
        <p className="italic text-white/70 text-center px-4 mb-8 max-w-md bg-white/5 py-3 rounded-lg shadow">
          “{guide.phrase}”
        </p>

        <h3 className="text-md font-medium text-white/90 mb-4">
          ¿Cómo te sientes ahora?
        </h3>

        <SelectableEmotionGrid
          emotions={emotionsAfterJourney_9_11}
          mode="after"
          onSelect={handleEmotionSelect}
          initialSelected={initialSelectedLabel}
          className="w-full mb-10 "
        />

        <Button
          onClick={handleFinish}
          disabled={!selectedEmotionId || isSaving}
          className={`
             bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold
             py-3 px-8 rounded-full text-md shadow-lg transition-all duration-200 ease-in-out
             disabled:opacity-50 disabled:cursor-not-allowed
             ${isSaving ? "opacity-75 cursor-wait" : ""}
           `}
        >
          {isSaving ? "Guardando..." : "Volver al bosque"}
        </Button>
      </div>
    </section>
  );
};

export default EndPage;
