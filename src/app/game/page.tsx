"use client";
import { useGameLogic } from "@/hooks/useGameLogic";
import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { FaStar } from "react-icons/fa";

const GAME_WIDTH = 480;
const GAME_HEIGHT = 640;
const TOTAL_PATH_SEGMENTS = 10;

// --- Componente para dibujar el Camino Iluminado ---
// (Debería estar fuera del canvas principal o dibujado DENTRO del canvas por el hook)
// Opción A: Componente React fuera del canvas (más fácil para empezar)
const IlluminatedPath: React.FC<{
  totalSegments: number;
  litSegments: number;
}> = ({ totalSegments, litSegments }) => {
  return (
    <div
      className="flex justify-center gap-1 my-2"
      aria-label={`Progreso: ${litSegments} de ${totalSegments}`}
    >
      {Array.from({ length: totalSegments }).map((_, index) => (
        <div
          key={index}
          className={`w-4 h-2 rounded transition-colors duration-500 ${
            index < litSegments
              ? "bg-yellow-400 shadow-lg"
              : "bg-gray-600 opacity-50" // Iluminado vs apagado
          }`}
        />
      ))}
    </div>
  );
};

export default function Game() {
  // --- NUEVO Estado para Progreso Visual ---
  const [currentLitSegments, setCurrentLitSegments] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  // --- Estado existente adaptado ---
  const [isInitialMessageVisible, setIsInitialMessageVisible] = useState(true); // Renombrado para claridad
  const [isCharacterImageLoaded, setIsCharacterImageLoaded] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  // --- Refs ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const characterImageRef = useRef<HTMLImageElement | null>(null);
  // Refs de audio para pasar al hook (el hook las usará)
  const flapSoundRef = useRef<Tone.Synth | null>(null);
  const collectSoundRef = useRef<Tone.Synth | null>(null);
  const backgroundLoopRef = useRef<Tone.Player | null>(null);
  const segmentLitSoundRef = useRef<Tone.Synth | null>(null);
  const gameCompleteSoundRef = useRef<Tone.PolySynth | null>(null);
  // const flapSoundIntervalRef = useRef(null); // Ya no se usa para sonido continuo

  // --- Callbacks para el Hook ---
  const handleSegmentLit = useCallback((segmentIndex: number) => {
    console.log("App: Segment Lit:", segmentIndex);
    setCurrentLitSegments(segmentIndex);
    // Aquí podrías disparar alguna animación sutil fuera del canvas si quisieras
  }, []);

  const handleGameComplete = useCallback(() => {
    console.log("App: Game Complete!");
    setIsGameComplete(true);
    // Aquí podrías mostrar un mensaje de felicitación, activar un botón diferente, etc.
    // Por ahora, solo actualizamos el estado.
  }, []);

  // --- Funciones de Dibujo (sin cambios, se pasan al hook) ---
  interface Character {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  const drawCharacter = useCallback(
    (char: Character, img: HTMLImageElement | null) => {
      // Recibe imagen ahora
      const ctx = contextRef.current;
      if (!ctx) return;
      if (img && isCharacterImageLoaded) {
        // Verifica que img exista
        try {
          ctx.drawImage(img, char.x, char.y, char.width, char.height);
        } catch (error) {
          console.error("Error drawing character:", error);
          // Fallback si la imagen falla después de cargar
          ctx.fillStyle = "rgba(200, 0, 0, 0.8)";
          ctx.fillRect(char.x, char.y, char.width, char.height);
        }
      } else {
        // Placeholder mientras carga o si hay error irrecuperable
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Placeholder rojo semi-transparente
        ctx.fillRect(char.x, char.y, char.width, char.height);
      }
    },
    [isCharacterImageLoaded]
  ); // Depende de isCharacterImageLoaded

  interface Cloud {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  const drawCloud = useCallback((c: Cloud) => {
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.fillStyle = `rgba(255,255,255,0.2)`; // Más sutiles?
    ctx.beginPath();
    // Simplificado para ejemplo
    ctx.roundRect(c.x, c.y, c.width, c.height, [c.height / 2]);
    ctx.fill();
  }, []);
  interface Star {
    x: number;
    y: number;
    radius: number;
    alpha: number;
  }

  const drawStar = useCallback((s: Star) => {
    /* ... sin cambios ... */
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.fillStyle = `rgba(255,255,255,${s.alpha * 0.8})`; // Un poco más tenues?
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // --- Usar el Custom Hook Refactorizado ---
  const {
    // gameRunningRef, // No necesitamos exponerlo si App reacciona a isComplete
    startGameLogic,
    stopGameLogic, // Obtener función de parada
    handleFlapStart,
    handleFlapStop,
    handleMoveStart,
    handleMoveStop,
    gameRunningRef,
    isComplete, // Obtener el estado de completitud del hook
  } = useGameLogic(
    contextRef,
    // --- Pasar Nuevos Callbacks ---
    handleSegmentLit,
    handleGameComplete,
    // --- Pasar Funciones de Dibujo ---
    drawCharacter,
    drawCloud,
    drawStar,
    // --- Pasar Ref y Estado de Imagen ---
    characterImageRef,
    isCharacterImageLoaded
    // Ya no pasamos setCalmPoints ni setIsMessageBoxVisible
    // Los refs de audio se configuran abajo y el hook los usa internamente
  );

  // Actualizar estado local cuando el hook indica completitud
  useEffect(() => {
    setIsGameComplete(isComplete);
  }, [isComplete]);

  // --- useEffect para Cargar Imagen (sin cambios) ---
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log("Character image loaded.");
      characterImageRef.current = img;
      setIsCharacterImageLoaded(true);
    };
    img.onerror = (err) => {
      console.error("Failed to load character image:", err);
      setIsCharacterImageLoaded(false); // Marcar como no cargada
    };
    // Asegúrate que la ruta sea correcta y la imagen exista
    img.src = "/guides/amaru-pixel.png"; // O la imagen amigable correspondiente
    return () => {
      /* ... limpieza ... */
    };
  }, []);

  // --- useEffect para Inicializar y Configurar Audio ---
  // (Mantenemos la inicialización aquí para asegurar que Tone.start() se llame
  // por interacción del usuario ANTES de que el hook intente usar Tone)
  const setupAudioNodes = useCallback(() => {
    console.log("App: Setting up Tone.js nodes...");
    try {
      // Configura los Synths/Players y los asigna a las refs
      // (El código es el mismo que tenías en setupAudio, pero lo ponemos aquí
      // para claridad, asegurándonos que se asignen a las refs que el hook usa)
      if (!flapSoundRef.current)
        flapSoundRef.current = new Tone.Synth({
          /* ... config suave ... */ volume: -15,
        }).toDestination();
      if (!collectSoundRef.current)
        collectSoundRef.current = new Tone.Synth({
          oscillator: { type: "triangle" },
          envelope: {
            /* ... */
          },
          volume: -10,
        }).toDestination();
      if (!segmentLitSoundRef.current)
        segmentLitSoundRef.current = new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: {
            /* ... */
          },
          volume: -8,
        }).toDestination();
      if (!gameCompleteSoundRef.current)
        gameCompleteSoundRef.current = new Tone.PolySynth(Tone.Synth, {
          /* ... config acorde ... */ volume: -6,
        }).toDestination();
      if (!backgroundLoopRef.current) {
        // Asegurarse que el archivo exista en public/audio/
        backgroundLoopRef.current = new Tone.Player({
          url: "/audio/ambient-loop-calm.mp3",
          loop: true,
          volume: -18,
          fadeIn: 1,
          fadeOut: 1,
        }).toDestination();
        // Precargar el buffer si es posible
        if (backgroundLoopRef.current) {
          backgroundLoopRef.current?.buffer
            .load("/audio/ambient-loop-calm.mp3")
            .then(() => console.log("Background audio loaded."))
            .catch((e: unknown) =>
              console.error("Error loading background audio:", e)
            );
        }
      }

      // Pasar las refs configuradas al hook (si el hook necesita reconfigurar algo)
      // En este caso, el hook las usa directamente, así que no es necesario pasarlas de nuevo.
    } catch (error) {
      console.error("Error setting up Tone.js nodes:", error);
    }
  }, []); // Sin dependencias, solo configura refs

  const initializeAudio = useCallback(async () => {
    if (!isAudioInitialized && Tone.context.state !== "running") {
      try {
        await Tone.start();
        console.log("Audio Context Started (App).");
        setupAudioNodes(); // Configurar los nodos AHORA que el contexto está listo
        setIsAudioInitialized(true);
      } catch (error) {
        console.error("Error starting audio context (App):", error);
        setIsAudioInitialized(false);
      }
    } else if (isAudioInitialized && !collectSoundRef.current) {
      // Si el audio ya estaba inicializado pero los nodos no (caso raro), configurarlos
      setupAudioNodes();
    }
  }, [isAudioInitialized, setupAudioNodes]); // Dependencia de setupAudioNodes

  // --- useEffect para Configuración Inicial del Canvas (sin cambios) ---
  useEffect(() => {
    console.log("Canvas setup.");
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    contextRef.current = ctx ?? null;
    // ... manejo de error de contexto ...
    return () => {
      /* ... limpieza ... */
    };
  }, []);

  // --- useEffect para Event Listeners (Adaptado) ---
  useEffect(() => {
    const handleInteractionStart = () => {
      initializeAudio(); // Asegurar que el audio esté listo
      if (!isGameComplete && !gameRunningRef?.current) {
        // Usar gameRunningRef del hook si se expone, o manejar estado aquí
        // Si necesitamos saber si el juego *ya* corre para no llamar start de nuevo,
        // el hook podría devolver gameRunningRef.current o un estado derivado.
        // Asumiendo que startGameLogic maneja el caso de ser llamado múltiples veces:
        startGameLogic();
        setIsInitialMessageVisible(false); // Ocultar mensaje inicial
      }
    };

    interface KeyDownEvent extends KeyboardEvent {
      code: string;
      repeat: boolean;
    }

    const handleKeyDown = (e: KeyDownEvent): void => {
      console.log("App: KeyDown Detectado:", e.code); // <-- AÑADE ESTO
      if (e.repeat) return; // Evitar repetición de tecla
      handleInteractionStart(); // Iniciar en cualquier tecla relevante

      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleFlapStart();
        // manageFlapSound(true); // REMOVIDO sonido continuo
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleMoveStart("left");
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleMoveStart("right");
      }
    };
    interface KeyUpEvent extends KeyboardEvent {
      code: string;
    }

    const handleKeyUp = (e: KeyUpEvent): void => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        handleFlapStop();
        // manageFlapSound(false); // REMOVIDO
      } else if (e.code === "ArrowLeft") {
        handleMoveStop("left");
      } else if (e.code === "ArrowRight") {
        handleMoveStop("right");
      }
    };

    // --- Liseners Táctiles y de Mouse (Simplificados para solo "Flap") ---
    const handlePointerDown = (e: TouchEvent | MouseEvent): void => {
      e.preventDefault();
      handleInteractionStart();
      handleFlapStart();
    };
    const handlePointerUpOrLeave = (e: TouchEvent | MouseEvent) => {
      e.preventDefault();
      handleFlapStop();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      canvasElem.addEventListener("touchstart", handlePointerDown, {
        passive: false,
      });
      canvasElem.addEventListener("touchend", handlePointerUpOrLeave);
      canvasElem.addEventListener("mousedown", handlePointerDown);
      // Mouse up/leave en window para capturar si se suelta fuera del canvas
      window.addEventListener("mouseup", handlePointerUpOrLeave);
      canvasElem.addEventListener("mouseleave", handlePointerUpOrLeave);
    }
    return () => {
      // Limpieza
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (canvasElem) {
        canvasElem.removeEventListener("touchstart", handlePointerDown);
        canvasElem.removeEventListener("touchend", handlePointerUpOrLeave);
        canvasElem.removeEventListener("mousedown", handlePointerDown);
      }
      window.removeEventListener("mouseup", handlePointerUpOrLeave);
      // No quitar mouseleave del canvas aquí si stopGameLogic se llama en unmount
    };
  }, [
    initializeAudio,
    startGameLogic,
    handleFlapStart,
    handleFlapStop,
    handleMoveStart,
    handleMoveStop,
    isGameComplete,
    gameRunningRef,
  ]); // Dependencias

  // --- Renderizado del Componente ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      {!isGameComplete &&
        !isInitialMessageVisible && ( // Ocultar si el juego terminó o aún no empieza
          <p className="mb-2 text-center text-xs md:text-sm text-white/80 text-shadow-sm">
            Toca/Mantén para flotar, [←] [→] para mover. Recoge la luz.
          </p>
        )}

      {/* --- NUEVO: Indicador Visual de Progreso --- */}
      {!isInitialMessageVisible && ( // Mostrar solo después de empezar
        <IlluminatedPath
          totalSegments={TOTAL_PATH_SEGMENTS}
          litSegments={currentLitSegments}
        />
      )}

      {/* --- Canvas y Mensaje Inicial --- */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className={`bg-black/20 border-2 border-yellow-300/30 rounded-xl shadow-lg ${
            isInitialMessageVisible ? "" : "cursor-pointer"
          }`} // Cursor solo si se puede interactuar
        />
        {isInitialMessageVisible && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white p-6 rounded-xl text-center z-10">
            <p className="text-lg md:text-xl leading-relaxed mb-5">
              Guía a Amaru en su viaje.
              <br /> Recoge las luces de calma para iluminar el camino.
            </p>
            <button
              onClick={() => {
                initializeAudio(); // Asegurar audio al empezar
                startGameLogic();
                setIsInitialMessageVisible(false);
              }}
              className="font-sans font-semibold px-6 py-3 rounded-lg border-none bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-800 cursor-pointer transition-all duration-200 ease-in-out shadow-md hover:shadow-lg hover:from-amber-500 hover:to-yellow-500 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm text-lg"
            >
              Empezar
            </button>
          </div>
        )}
        {/* --- Mensaje/Botón de Completitud --- */}
        {isGameComplete && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white p-6 rounded-xl text-center z-10 backdrop-blur-sm">
            <p className="text-xl md:text-2xl font-semibold leading-relaxed mb-6">
              ¡Camino Iluminado!
            </p>
            <button
              onClick={() => {
                // Acción al finalizar: Volver al menú, reiniciar, etc.
                stopGameLogic(); // Detener el juego actual
                // router.push('/'); // Ejemplo si usas Next Router
                setIsGameComplete(false); // Resetear estado
                setCurrentLitSegments(0);
                setIsInitialMessageVisible(true); // Mostrar mensaje inicial de nuevo? O navegar?
                console.log("Volver al inicio/menú");
              }}
              className="flex items-center justify-center gap-2 font-sans font-semibold px-5 py-2.5 rounded-lg border border-white/50 hover:border-white hover:bg-white/10 transition-colors text-white/80 hover:text-white text-sm shadow"
            >
              <FaStar className="text-yellow-400" />
              ¡Genial!
            </button>
          </div>
        )}
      </div>
      {/* Footer o espacio adicional si es necesario */}
      <div className="mt-4 text-xs text-white/40">Juego de Calma v1.0</div>
    </div>
  );
}
