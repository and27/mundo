//legacy
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { guides } from "@/lib/guides"; // Asegúrate que la ruta sea correcta
import CustomAudioPlayer from "@/components/AudioPlayer"; // Asegúrate que la ruta sea correcta
import Link from "next/link";
import Image from "next/image";

// LoadingIndicator y ErrorMessage pueden quedarse aquí o moverse a un archivo
// de componentes compartidos si los usas en otros lugares.
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

// Este BreathingCircle es el del fondo, quizás lo quieras mantener o quitar
// en este modo si ya no es necesario.
export const BackgroundBreathingCircle = ({
  isPlaying,
}: {
  isPlaying: boolean;
}) => (
  <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-50 pointer-events-none">
    {/* Hice los círculos un poco más grandes y les añadí opacidad */}
    <div
      className={`bg-white/5 rounded-full transition-transform duration-5000 ease-in-out ${
        isPlaying ? "animate-breathe-outer" : "scale-100"
      }`}
      style={{ width: "350px", height: "350px" }}
    />
    <div
      className={`absolute bg-white/5 rounded-full transition-transform duration-5000 ease-in-out ${
        isPlaying ? "animate-breathe-inner" : "scale-100"
      }`}
      style={{ width: "300px", height: "300px" }}
    />
  </div>
);

export interface Guide {
  id: string;
  name: string;
  subtitle: string;
  phrase: string;
  description: string;
  image: string;
  imageTransparent: string;
  audioSrc?: string;
  refinedImage?: string;
}

// *** RENOMBRADO ***
const AudioGuidePage = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //eslint-disable-next-line
  const [isPlaying, setIsPlaying] = useState(false); // Inicia en false

  useEffect(() => {
    // ... (lógica de carga igual que antes)
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      const foundGuide = guides.find((g) => g.id === id);
      if (foundGuide) {
        setGuide(foundGuide);
      } else {
        setError("Guía no encontrada");
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  // --- Conectar estos al CustomAudioPlayer ---
  // const handlePlay = () => setIsPlaying(true);
  // const handlePauseOrEnd = () => setIsPlaying(false); // Se llama en pausa o al terminar

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} />;
  if (!guide) return <ErrorMessage message="Guía no encontrada" />;

  const audioSrc = guide.audioSrc || `/audio/default-meditation.mp3`; // Usar un default claro

  return (
    // Aplicamos el fondo oscuro aquí directamente si es consistente
    <section className="text-center flex flex-col justify-start min-h-screen mx-auto p-4 overflow-hidden bg-gradient-to-b from-[#1B1F3B] to-[#1A2E2A] text-white relative">
      {/* Renderiza el círculo de fondo solo si quieres ese efecto visual aquí */}
      {/* <BackgroundBreathingCircle isPlaying={isPlaying} /> */}

      {/* Contenido principal con z-index mayor para estar sobre el fondo animado si existe */}
      <div className="relative max-w-3xl mx-auto z-10 flex flex-col items-center pt-10">
        <div
          className={`mb-4 relative w-36 h-36 mx-auto rounded-full overflow-hidden border-2 border-white/50 shadow-lg transition-transform duration-300 ${
            // Puedes mantener o quitar la animación de pulso
            isPlaying ? "animate-pulse-custom2" : ""
          }`}
        >
          <Image
            src={
              guide.imageTransparent ||
              "https://placehold.co/144x144/1B1F3B/FFFFFF?text=Guia"
            } // Placeholder mejorado
            alt={guide.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover object-top"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/144x144/1B1F3B/FFFFFF?text=Error";
            }}
          />
        </div>

        <h1 className="text-2xl font-bold mb-1">{guide.name}</h1>
        <p className="italic text-white/80 text-center px-4 mb-6 max-w-md">
          “{guide.phrase}”
        </p>

        <div className="w-full max-w-md mb-6">
          <CustomAudioPlayer src={audioSrc} />
        </div>

        <p className="text-sm text-white/70 text-center max-w-sm mb-8 px-4">
          {guide.description}
        </p>

        <Link
          // Ajusta la ruta final según tu estructura
          href={`/`} // Quizás volver al inicio o a la selección
          className="border border-white/50 hover:border-white hover:bg-white/10 transition-colors text-white/80 hover:text-white py-2 px-5 rounded-full text-sm shadow"
        >
          {/* Cambiar texto según corresponda */}
          Volver a Guías
        </Link>
      </div>
    </section>
  );
};

export default AudioGuidePage;
