"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { characters } from "@/lib/characters";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Character } from "@/types/characters";

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

const InteractiveBreathingVisual = ({ phase }: { phase: BreathingPhase }) => {
  // Determina el estilo basado en la fase actual (inhale, hold, exhale)
  // Usaremos clases de Tailwind y quizás alguna variable de estilo inline para la animación
  let scale = 1;
  let color = "var(--color-breath-warm)"; // Dorado base cálido
  let glow = "var(--color-breath-glow-warm)";
  let opacity = 0.8;
  const internalPatternClass = "pattern-water-subtle"; // Clase CSS para el patrón

  switch (phase) {
    case "inhale":
      scale = 1.25;
      color = "var(--color-breath-warm-strong)";
      glow = "var(--color-breath-glow-warm-strong)";
      opacity = 1;
      break;
    case "hold":
      scale = 1.25;
      color = "var(--color-breath-warm-strong)";
      glow = "var(--color-breath-glow-warm-soft)";
      opacity = 0.9;
      break;
    case "exhale":
      scale = 1;
      color = "var(--color-breath-cool)";
      glow = "var(--color-breath-glow-cool)";
      opacity = 0.7;
      break;
    // case "pause": // Si tienes una pausa entre ciclos
    //   scale = 1;
    //   color = "#FFDA63";
    //   opacity = 0.8;
    //   break;
  }

  return (
    <div
      className={`w-42 relative rounded-full transition-all duration-3000 ease-in-out`} // Duración larga para suavidad
      style={{
        maxWidth: "300px",
        aspectRatio: "1 / 1",
        transform: `scale(${scale})`,
        backgroundColor: color,
        opacity: opacity,
        boxShadow: `0 0 30px 10px ${glow}`,
      }}
    >
      <div
        className={`absolute inset-0 rounded-full ${internalPatternClass} opacity-50`}
        // Añade aquí estilos CSS para el patrón de ondas de agua sutil
      ></div>
    </div>
  );
};

const ProgressDots = ({
  total,
  completed,
}: {
  total: number;
  completed: number;
}) => {
  return (
    <div className="flex justify-center gap-2 my-4">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            index <= completed
              ? "bg-breath-warm"
              : "bg-neutral-600" // Dorado si completado, gris si no
          }`}
        />
      ))}
    </div>
  );
};

type BreathingPhase = "idle" | "inhale" | "hold" | "exhale"; // Añadir 'pause' si es necesario

const InteractiveGuidePage = () => {
  const { id } = useParams();
  const router = useRouter(); // Para navegar al final
  const [guide, setGuide] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para el ejercicio interactivo
  const [breathCycle, setBreathCycle] = useState(0); // Contador de ciclos
  const [phase, setPhase] = useState<BreathingPhase>("idle"); // Fase actual
  const [isComplete, setIsComplete] = useState(false); // Si el ejercicio terminó

  const TOTAL_CYCLES = 5;
  const INHALE_DURATION = 3000; // 3 segundos
  const HOLD_DURATION = 1000; // 1 segundo
  const EXHALE_DURATION = 4000; // 4 segundos
  // const PAUSE_DURATION = 1000; // 1 segundo (si se usa)

  // Efecto para manejar el ciclo de respiración
  useEffect(() => {
    if (!guide || isComplete) return; // No hacer nada si no hay guía o ya terminó

    if (phase === "idle" && breathCycle === 0) {
      // Simular voz inicial: "Hola, soy Yachay..."
      console.log("VOZ: Iniciando ejercicio con Yachay");
      // (Aquí llamarías a tu función de audio para la intro)
      setPhase("inhale");
      return; // Salir para que el siguiente useEffect maneje la fase
    }

    let timerId: NodeJS.Timeout;

    if (phase === "inhale") {
      // Simular voz: "Toma aire..."
      console.log("VOZ: Inhala...");
      timerId = setTimeout(() => setPhase("hold"), INHALE_DURATION);
    } else if (phase === "hold") {
      // Simular voz: "Sostén..." (opcional)
      console.log("VOZ: Sostén...");
      timerId = setTimeout(() => setPhase("exhale"), HOLD_DURATION);
    } else if (phase === "exhale") {
      // Simular voz: "Suéltalo despacio..."
      console.log("VOZ: Exhala...");
      timerId = setTimeout(() => {
        const nextCycle = breathCycle + 1;
        if (nextCycle >= TOTAL_CYCLES) {
          // Simular voz final: "¡Terminamos!..."
          console.log("VOZ: ¡Terminamos! Buen trabajo.");
          setIsComplete(true);
          setPhase("idle");
        } else {
          // Simular voz feedback positivo: "¡Muy bien!..."
          console.log("VOZ: ¡Muy bien! Prepárate para la siguiente...");
          setBreathCycle(nextCycle);
          // Podrías ir a una fase 'pause' o directamente a 'inhale'
          setPhase("inhale"); // Inicia siguiente ciclo
        }
      }, EXHALE_DURATION);
    }

    // Limpieza del temporizador
    return () => clearTimeout(timerId);
  }, [phase, breathCycle, guide, isComplete]);

  // Efecto para cargar los datos de la guía (similar al anterior)
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setBreathCycle(0); // Reiniciar estado del ejercicio
    setPhase("idle");
    setIsComplete(false);

    setTimeout(() => {
      const foundGuide = characters.find((g) => g.id === id);
      if (foundGuide) {
        setGuide(foundGuide);
        // Iniciar automáticamente la respiración al cargar la guía
        // Se podría retrasar un poco o requerir un botón de "Empezar"
        setPhase("inhale"); // O iniciarla desde el useEffect anterior cuando guide cargue
      } else {
        setError("Guía no encontrada");
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleFinish = () => {
    router.push(`/`);
    console.log("Ejercicio finalizado por el usuario.");
  };

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} />;
  if (!guide) return <ErrorMessage message="Guía no encontrada" />;

  const guideImage =
    guide.refinedImage ||
    guide.imageTransparent ||
    "https://placehold.co/144x144/1B1F3B/FFFFFF?text=Guia";

  return (
    <section className="text-center flex flex-col justify-start items-center min-h-screen mx-auto p-4 overflow-hidden text-white relative">
      <div className="relative max-w-3xl w-full flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="relative w-28 h-28 mb-2">
            <Image
              src={guideImage}
              alt={guide.name}
              width={90}
              height={90}
              priority
              className="rounded-full w-full h-full border-2 border-white object-top object-cover" // Añadir borde dorado
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/112x112/1B1F3B/FFFFFF?text=Error";
              }}
            />
            {/* Indicador de Audio - Podría ser condicional basado en si hay voz activa */}
            {phase !== "idle" &&
              !isComplete && ( // Mostrar solo durante el ejercicio activo
                <span className="absolute top-1 right-1 text-yellow-300 text-lg animate-pulse">
                  {/* Icono simple de ondas o punto brillante */}
                </span>
              )}
          </div>
          <h1 className="text-2xl font-bold text-white">{guide.name}</h1>
          <p className="text-sm text-white/80">Respira conmigo</p>
        </div>

        {/* --- Área Central: Visual de Respiración --- */}
        <div className="flex justify-center items-center h-10 m-20">
          <InteractiveBreathingVisual phase={phase} />
        </div>

        {/* --- Área Inferior: Progreso, Texto y Botón --- */}
        <ProgressDots total={TOTAL_CYCLES} completed={breathCycle} />
        <p className="text-sm text-white/70 text-center max-w-xs mb-8">
          {/* El texto podría cambiar según la fase o quedarse fijo */}
          {phase === "inhale" && "Inhala suavemente..."}
          {phase === "hold" && "Sostén un momento..."}
          {phase === "exhale" && "Suelta el aire despacio..."}
          {phase === "idle" && !isComplete && "Prepárate..."}
          {isComplete && "¡Lo hiciste muy bien!"}
        </p>

        <button
          onClick={handleFinish}
          disabled={!isComplete} // Deshabilitado hasta completar
          className={`flex items-center justify-center gap-2 border border-white/50 hover:border-white hover:bg-white/10 transition-all text-white/80 hover:text-white py-2 px-5 rounded-full text-sm shadow ${
            isComplete
              ? "opacity-100 cursor-pointer"
              : "opacity-50 cursor-not-allowed" // Estilos cuando está deshabilitado
          }`}
        >
          <FaStar
            className={`${isComplete ? "text-yellow-400" : "text-gray-500"}`}
          />{" "}
          ¡Listo!
        </button>
      </div>
    </section>
  );
};

export default InteractiveGuidePage;
