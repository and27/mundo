"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { guides } from "@/lib/guides";
import Image from "next/image";
import { Guide } from "@/types/guides";

const emotionOptions = [
  { id: "tranquilo", name: "Tranquilo/a", icon: "😊" },
  { id: "conectado", name: "Conectado/a", icon: "✨" },
  { id: "feliz", name: "Feliz", icon: "💛" }, // Usando corazón como en la imagen
  { id: "relajado", name: "Relajado/a", icon: "😌" },
  { id: "reflexivo", name: "Reflexivo/a", icon: "🤔" }, // Ícono placeholder
];

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
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
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

  const handleEmotionSelect = (emotionId: string) => {
    if (isSaving) return;
    setSelectedEmotion(emotionId);
  };

  const handleFinish = () => {
    if (!selectedEmotion || isSaving) return;

    setIsSaving(true);
    console.log("Guardando emoción:", selectedEmotion, "para guía:", guide?.id);

    // Simulación de guardado en backend
    setTimeout(() => {
      setIsSaving(false);
      // Navegar a la página principal o 'bosque'
      router.push("/dashboard"); // Ajusta esta ruta según tu estructura
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

  return (
    <section className="bg-black/30 backdrop-blur-md text-center flex flex-col gap-4 justify-start items-center min-h-screen mx-auto p-4">
      <div className="max-w-3xl mx-auto z-10 flex flex-col items-center">
        <div className="mb-4 relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-white/30 shadow-md">
          <Image
            src={guide.imageTransparent || "/placeholder-image.png"}
            alt={guide.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

        <div className="flex flex-wrap justify-center gap-3 mb-8 px-2">
          {emotionOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleEmotionSelect(option.id)}
              disabled={isSaving}
              className={`
                flex flex-col items-center justify-center p-3 min-w-[80px] h-[80px]
                border rounded-lg shadow transition-all duration-200 ease-in-out
                ${
                  selectedEmotion === option.id
                    ? "bg-yellow-500/30 border-yellow-400 scale-105 shadow-yellow-500/30"
                    : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                }
                ${isSaving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="text-xs font-medium text-white/80">
                {option.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={handleFinish}
          disabled={!selectedEmotion || isSaving}
          className={`
            bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold
            py-3 px-8 rounded-full text-md shadow-lg transition-all duration-200 ease-in-out
            ${!selectedEmotion ? "opacity-50 cursor-not-allowed" : ""}
            ${isSaving ? "opacity-75 cursor-wait" : ""}
          `}
        >
          {isSaving ? "Guardando..." : "Volver al bosque"}
        </button>
      </div>
    </section>
  );
};

export default EndPage;
