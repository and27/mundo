/* eslint-disable */
// @ts-nocheck

"use client";
import { useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

// --- Game Constants ---
const GAME_WIDTH = 480;
const GAME_HEIGHT = 640;
const GAME_SPEED = 1.2; // Reducido ligeramente para más calma
const GRAVITY = 0.1; // Reducido ligeramente
const INITIAL_BOOST_LIFT = -3.0; // Ajustado
const UPWARD_FORCE = 0.15; // Ajustado
const MOVE_SPEED = 2.2; // Ajustado
const ELEMENT_FREQUENCY = 35; // Ligeramente menos frecuente
const ELEMENT_RADIUS = 16; // Ligeramente más grande para visibilidad
const ORB_SPACING = ELEMENT_RADIUS * 3; // Más espacio
const NUM_STARS = 50;
const NUM_CLOUDS = 0;
const BOUNCE_FACTOR = -0.5; // Rebote más suave
const CHARACTER_WIDTH = 57;
const CHARACTER_HEIGHT = 82;

// --- NUEVO: Constantes para el Objetivo Visual ---
const TOTAL_PATH_SEGMENTS = 10; // Ejemplo: El camino tiene 10 partes a iluminar
const ORBS_PER_SEGMENT = 5; // Ejemplo: Se necesitan 5 luces para iluminar una parte

// --- Notas para Sonido de Colección ---
const COLLECT_SOUND_NOTES = ["C5", "E5", "G5", "A5"]; // Variedad de notas

// --- Custom Hook: useGameLogic (Refactorizado) ---
export function useGameLogic(
  contextRef: unknown, // Ref del canvas context
  // --- NUEVO: Callbacks en lugar de setters directos ---
  onSegmentLit: unknown, // Función a llamar cuando un segmento se ilumina: onSegmentLit(segmentIndex)
  onGameComplete: unknown, // Función a llamar cuando se completa el juego: onGameComplete()
  // --- Funciones de Dibujo y Refs de Imagen ---
  drawCharacter: unknown,
  drawCloud: unknown,
  drawStar: unknown,
  characterImageRef: unknown,
  isCharacterImageLoaded: unknown
) {
  // --- Refs internas del Hook ---
  const gameRunningRef = useRef(false);
  const animationFrameIdRef = useRef(null);
  const frameCountRef = useRef(0);
  const isLeftPressedRef = useRef(false);
  const isRightPressedRef = useRef(false);
  const isFlappingRef = useRef(false); // Para mantener presionado y flotar/subir
  const characterRef = useRef({
    x: 80,
    y: GAME_HEIGHT / 2,
    width: CHARACTER_WIDTH,
    height: CHARACTER_HEIGHT,
    velocityY: 0,
    velocityX: 0,
  });
  const elementsRef = useRef([]); // Las "luces de calma" / orbes
  const particlesRef = useRef([]);
  const cloudsRef = useRef([]);
  const starsRef = useRef([]);

  // --- NUEVO: Refs para el estado del objetivo visual y completitud ---
  const litPathSegmentsRef = useRef(0); // Cuántos segmentos están iluminados
  const collectedForSegmentRef = useRef(0); // Cuántas luces se han recogido para el segmento actual
  const isCompleteRef = useRef(false); // Si el juego ha terminado

  // --- Refs de Audio (Tone.js) ---
  const flapSoundIntervalRef = useRef(null);
  const flapSoundRef = useRef(null);
  const collectSoundRef = useRef(null);
  const backgroundLoopRef = useRef(null);
  const segmentLitSoundRef = useRef(null); // Sonido para segmento iluminado
  const gameCompleteSoundRef = useRef(null); // Sonido para juego completado

  // --- Lógica del Juego (Callbacks internos del Hook) ---

  const initBackground = useCallback(() => {
    starsRef.current = [];
    cloudsRef.current = [];
    for (let i = 0; i < NUM_STARS; i++) {
      starsRef.current.push({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.08 + 0.03, // Más lentas
      });
    }
    // Nubes (si se reactivan)
    // for (let i = 0; i < NUM_CLOUDS; i++) {
    //   cloudsRef.current.push({});
    // }
  }, []);

  const updateAndDrawBackground = useCallback(() => {
    // Estrellas
    starsRef.current.forEach((s) => {
      s.x -= s.speed * GAME_SPEED; // Ajustar velocidad base con GAME_SPEED
      if (s.x + s.radius < 0) {
        s.x = GAME_WIDTH + s.radius;
        s.y = Math.random() * GAME_HEIGHT;
      }
      if (drawStar) drawStar(s); // Usar función de dibujo externa
    });
    // Nubes (si se reactivan)
    cloudsRef.current.forEach((c) => {
      c.x -= c.speed * GAME_SPEED;
      if (c.x + c.width < 0) {
        c.x = GAME_WIDTH;
        c.y = Math.random() * GAME_HEIGHT * 0.6; // Mantener en parte superior
      }
      if (drawCloud) drawCloud(c); // Usar función de dibujo externa
    });
  }, [drawStar, drawCloud]); // Depende de las funciones de dibujo pasadas

  // --- Feedback Visual Mejorado: Partículas ---
  const createParticles = useCallback(
    (
      x,
      y,
      count = 10,
      color = "rgba(255, 219, 108, 0.9)", // Color dorado más cálido y opaco
      spread = 2.0, // Mayor dispersión inicial
      decay = 0.02, // Decaen un poco más lento
      radiusRange = [1, 3] // Rango de tamaño
    ) => {
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * spread,
          vy: (Math.random() - 0.5) * spread,
          radius:
            Math.random() * (radiusRange[1] - radiusRange[0]) + radiusRange[0],
          alpha: 1,
          decay: Math.random() * 0.01 + decay, // Variación en decaimiento
          color: color,
        });
      }
    },
    []
  );

  const updateAndDrawParticles = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        particlesRef.current.splice(i, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Extraer componentes RGBA de forma segura
        const rgbaMatch = p.color.match(/(\d+(\.\d+)?)/g);
        if (rgbaMatch && rgbaMatch.length >= 3) {
          const [r, g, b] = rgbaMatch;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
          ctx.fill();
        }
      }
    }
  }, [contextRef]);

  const checkCollision = useCallback((rect, circle) => {
    // Misma lógica de colisión que antes
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    return distanceSquared < circle.radius * circle.radius;
  }, []);

  // --- Añadir Elementos (Luces de Calma) ---
  const addElement = useCallback(() => {
    // *** NUEVO: No añadir si el juego está completo ***
    if (isCompleteRef.current) return;

    const startY =
      Math.random() * (GAME_HEIGHT - ELEMENT_RADIUS * 6) + ELEMENT_RADIUS * 3; // Más margen
    const startX = GAME_WIDTH + ELEMENT_RADIUS;

    // Generar elementos (lógica similar, ajusta probabilidad/patrones si quieres)
    if (Math.random() < 0.2) {
      // Menos probable que salgan grupos
      for (let i = 0; i < 3; i++) {
        elementsRef.current.push({
          x: startX + i * ORB_SPACING,
          y: startY + (Math.random() - 0.5) * ORB_SPACING * 0.5, // Ligera variación vertical
          radius: ELEMENT_RADIUS,
        });
      }
    } else {
      elementsRef.current.push({
        x: startX,
        y: startY,
        radius: ELEMENT_RADIUS,
      });
    }
  }, []); // Depende de isCompleteRef.current implícitamente

  // --- Actualizar Personaje (Movimiento y Físicas) ---
  const updateCharacter = useCallback(() => {
    const char = characterRef.current;
    if (!gameRunningRef.current) {
      char.velocityY = 0; // Asegurar que no caiga si el juego no corre
      return;
    }

    // Movimiento Horizontal
    if (isLeftPressedRef.current && !isRightPressedRef.current) {
      char.velocityX = -MOVE_SPEED;
    } else if (isRightPressedRef.current && !isLeftPressedRef.current) {
      char.velocityX = MOVE_SPEED;
    } else {
      char.velocityX = 0;
    }
    char.x += char.velocityX;

    // Movimiento Vertical (Flap/Float + Gravedad)
    if (isFlappingRef.current) {
      // Aplicar fuerza hacia arriba mientras se mantiene presionado
      char.velocityY -= UPWARD_FORCE;
    }
    char.velocityY += GRAVITY; // Aplicar gravedad siempre
    char.y += char.velocityY;

    // Colisiones con Bordes (con rebote suave)
    if (char.y < 0) {
      char.y = 0;
      if (char.velocityY < -0.1) char.velocityY *= BOUNCE_FACTOR;
      else char.velocityY = 0;
    } else if (char.y + char.height > GAME_HEIGHT) {
      char.y = GAME_HEIGHT - char.height;
      if (char.velocityY > 0.5) char.velocityY *= BOUNCE_FACTOR;
      else char.velocityY = 0;
    }
    // Límites Horizontales
    if (char.x < 0) char.x = 0;
    if (char.x + char.width > GAME_WIDTH) char.x = GAME_WIDTH - char.width;
  }, []); // Depende de refs internas

  const applyInitialBoost = useCallback(() => {
    if (gameRunningRef.current) {
      characterRef.current.velocityY = INITIAL_BOOST_LIFT;
      // Tocar sonido de "flap" inicial (si se mantiene el concepto de impulso)
      if (flapSoundRef.current && Tone.context.state === "running") {
        try {
          // Tocar un sonido corto y suave
          flapSoundRef.current.triggerAttackRelease(
            "A4",
            "16n",
            Tone.now(),
            0.5
          );
        } catch (error) {
          console.error("Error playing flap sound:", error);
        }
      }
    }
  }, []);

  // --- Actualizar y Dibujar Elementos (Luces de Calma) ---
  const updateElements = useCallback(() => {
    const ctx = contextRef.current;
    if (!gameRunningRef.current || !ctx) return;

    frameCountRef.current++;
    if (frameCountRef.current % ELEMENT_FREQUENCY === 0) {
      addElement();
    }

    for (let i = elementsRef.current.length - 1; i >= 0; i--) {
      const elem = elementsRef.current[i];
      elem.x -= GAME_SPEED;

      // Dibujo del elemento (orbe brillante)
      const pulseFactor = 1 + Math.sin(Date.now() * 0.005 + i * 0.5) * 0.1; // Pulso más suave y variado
      const currentRadius = elem.radius * pulseFactor;
      const gradient = ctx.createRadialGradient(
        elem.x,
        elem.y,
        currentRadius * 0.1,
        elem.x,
        elem.y,
        currentRadius
      );
      gradient.addColorStop(0, `rgba(255, 238, 186, ${0.9 * pulseFactor})`); // Centro más brillante (#FFEEBA)
      gradient.addColorStop(0.7, `rgba(255, 219, 108, ${0.7 * pulseFactor})`); // Dorado cálido (#FFDB6C)
      gradient.addColorStop(1, `rgba(255, 219, 108, 0)`); // Borde difuminado

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(elem.x, elem.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Comprobar Colisión
      if (checkCollision(characterRef.current, elem)) {
        // 1. Feedback Visual Mejorado
        createParticles(
          elem.x,
          elem.y,
          12,
          "rgba(255, 219, 108, 0.9)",
          2.5,
          0.015,
          [1, 3.5]
        );

        elementsRef.current.splice(i, 1); // Eliminar orbe

        // 2. Feedback Auditivo Mejorado
        if (collectSoundRef.current && Tone.context.state === "running") {
          try {
            const randomNote =
              COLLECT_SOUND_NOTES[
                Math.floor(Math.random() * COLLECT_SOUND_NOTES.length)
              ];
            collectSoundRef.current.triggerAttackRelease(
              randomNote,
              "16n",
              Tone.now(),
              0.7
            ); // Sonido corto y claro
          } catch (error) {
            console.error("Error playing collect sound:", error);
          }
        }

        // 3. Feedback Háptico (Opcional)
        if (navigator.vibrate) {
          navigator.vibrate(30);
        }

        // 4. Lógica del Objetivo Visual (si el juego no está completo)
        if (!isCompleteRef.current) {
          collectedForSegmentRef.current++;

          if (collectedForSegmentRef.current >= ORBS_PER_SEGMENT) {
            if (litPathSegmentsRef.current < TOTAL_PATH_SEGMENTS) {
              litPathSegmentsRef.current++;
              collectedForSegmentRef.current = 0; // Resetear para el siguiente segmento

              // Notificar al componente padre para que actualice el visual del camino
              if (onSegmentLit) {
                onSegmentLit(litPathSegmentsRef.current);
              }
              // Tocar sonido específico para segmento iluminado
              if (
                segmentLitSoundRef.current &&
                Tone.context.state === "running"
              ) {
                segmentLitSoundRef.current.triggerAttackRelease(
                  "C6",
                  "8n",
                  Tone.now(),
                  0.9
                ); // Sonido brillante
              }

              // Comprobar si se completó el juego
              if (litPathSegmentsRef.current >= TOTAL_PATH_SEGMENTS) {
                isCompleteRef.current = true;
                // Tocar sonido de completitud
                if (
                  gameCompleteSoundRef.current &&
                  Tone.context.state === "running"
                ) {
                  gameCompleteSoundRef.current.triggerAttackRelease(
                    "C4 G4 C5 E5",
                    "1n",
                    Tone.now(),
                    1.0
                  ); // Acorde final
                }
                // Notificar al componente padre
                if (onGameComplete) {
                  onGameComplete();
                }
                console.log("¡Objetivo Visual Completado!");
              }
            }
          }
        }
        continue; // Saltar al siguiente elemento tras colisión
      }

      // Eliminar si sale de pantalla (sin penalización)
      if (elem.x + elem.radius < 0) {
        elementsRef.current.splice(i, 1);
      }
    }
  }, [
    contextRef,
    addElement,
    checkCollision,
    createParticles,
    onSegmentLit,
    onGameComplete,
  ]); // Dependencias actualizadas

  // --- Game Loop Principal ---
  const gameLoop = useCallback(() => {
    const ctx = contextRef.current;
    // Detener si el juego no está corriendo o no hay contexto
    if (!gameRunningRef.current || !ctx) {
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
      return;
    }

    // Limpiar Canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Dibujar Fondo (Estrellas, Nubes si hay)
    updateAndDrawBackground();

    // Dibujar y Actualizar Elementos (Luces de Calma)
    updateElements();

    // Actualizar Lógica del Personaje
    updateCharacter();

    // Dibujar Personaje (Usando la imagen cargada)
    if (drawCharacter && isCharacterImageLoaded) {
      // Dibujar solo si la imagen está lista
      drawCharacter(characterRef.current, characterImageRef.current);
    } else if (drawCharacter) {
      // Dibujar un placeholder mientras carga la imagen
      // drawCharacter(characterRef.current, null); // O pasa null para que dibuje un rect
    }

    // Dibujar Partículas
    updateAndDrawParticles();

    // Solicitar Siguiente Frame (si el juego no ha terminado o queremos que siga animando)
    // Podríamos detener el loop aquí si isCompleteRef es true y no hay más animaciones pendientes
    if (gameRunningRef.current) {
      // Mantener loop mientras gameRunning sea true
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    }
  }, [
    contextRef,
    updateAndDrawBackground,
    updateElements,
    updateCharacter,
    drawCharacter,
    updateAndDrawParticles,
    isCharacterImageLoaded, // Añadir dependencia
    characterImageRef, // Añadir dependencia
  ]);

  // --- Función para Iniciar/Reiniciar el Juego ---
  const startGameLogic = useCallback(() => {
    console.log("Hook: Iniciando lógica del juego...");
    // Resets
    characterRef.current = {
      ...characterRef.current,
      x: 80,
      y: GAME_HEIGHT / 2,
      velocityY: 0,
      velocityX: 0,
    };
    elementsRef.current = [];
    particlesRef.current = [];
    frameCountRef.current = 0;
    litPathSegmentsRef.current = 0; // Resetear progreso visual
    collectedForSegmentRef.current = 0;
    isCompleteRef.current = false;
    isLeftPressedRef.current = false; // Asegurar reseteo de input
    isRightPressedRef.current = false;
    isFlappingRef.current = false;

    // (Opcional) Notificar al padre sobre el reset del progreso si es necesario
    if (onSegmentLit) {
      onSegmentLit(0);
    }

    gameRunningRef.current = true;

    // Iniciar audio de fondo
    if (backgroundLoopRef.current && Tone.Transport.state !== "started") {
      try {
        Tone.Transport.start();
        backgroundLoopRef.current.start(0);
        console.log("Audio transport started.");
      } catch (e) {
        console.error("Error starting audio transport:", e);
      }
    } else if (
      backgroundLoopRef.current &&
      Tone.Transport.state === "started"
    ) {
      // Asegurar que el loop esté sonando si el transporte ya estaba iniciado
      if (
        !backgroundLoopRef.current.state ||
        backgroundLoopRef.current.state !== "started"
      ) {
        backgroundLoopRef.current.start(0);
      }
    }

    // Limpiar frame anterior y empezar nuevo loop
    if (animationFrameIdRef.current)
      cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop, onSegmentLit]); // Dependencia actualizada

  // --- Función para Detener el Juego ---
  const stopGameLogic = useCallback(() => {
    console.log("Hook: Deteniendo lógica del juego...");
    gameRunningRef.current = false;
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    // Detener audio de fondo si es necesario (o dejarlo seguir si es música ambiental)
    // if (backgroundLoopRef.current && backgroundLoopRef.current.state === "started") {
    //     backgroundLoopRef.current.stop();
    // }
    // Detener sonidos activos (flap, etc.)
    if (flapSoundIntervalRef.current)
      clearInterval(flapSoundIntervalRef.current);
    // Resetear refs de input
    isLeftPressedRef.current = false;
    isRightPressedRef.current = false;
    isFlappingRef.current = false;
  }, []); // Sin dependencias externas directas

  // --- Funciones de Control (Expuestas por el Hook) ---
  const handleFlapStart = useCallback(() => {
    if (gameRunningRef.current && !isFlappingRef.current) {
      applyInitialBoost(); // Aplicar impulso inicial solo al empezar a presionar
      isFlappingRef.current = true;
      // NO iniciar sonido repetitivo aquí para "solo siendo"
    }
  }, [applyInitialBoost]);

  const handleFlapStop = useCallback(() => {
    if (isFlappingRef.current) {
      isFlappingRef.current = false;
      // NO detener sonido repetitivo aquí
    }
  }, []);

  const handleMoveStart = useCallback((direction) => {
    if (!gameRunningRef.current) return;
    if (direction === "left") isLeftPressedRef.current = true;
    else if (direction === "right") isRightPressedRef.current = true;
    // La velocidad se aplica en updateCharacter basado en estas refs
  }, []);

  const handleMoveStop = useCallback((direction) => {
    if (direction === "left") isLeftPressedRef.current = false;
    else if (direction === "right") isRightPressedRef.current = false;
    // La velocidad se aplica en updateCharacter basado en estas refs
  }, []);

  // --- Efecto Inicial y de Limpieza ---
  useEffect(() => {
    // Configurar sonidos de Tone.js una vez al montar
    // IMPORTANTE: Asegúrate que Tone.start() haya sido llamado por interacción del usuario
    // en el componente principal ANTES de que este hook intente usarlo.
    try {
      if (!flapSoundRef.current) {
        flapSoundRef.current = new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.01, decay: 0.1, sustain: 0.05, release: 0.2 },
          volume: -15, // Más suave
        }).toDestination();
      }
      if (!collectSoundRef.current) {
        collectSoundRef.current = new Tone.Synth({
          oscillator: { type: "triangle" }, // Sonido más suave 'plink'
          envelope: { attack: 0.005, decay: 0.1, sustain: 0.03, release: 0.1 },
          volume: -10, // Volumen moderado
        }).toDestination();
      }
      if (!segmentLitSoundRef.current) {
        segmentLitSoundRef.current = new Tone.Synth({
          oscillator: { type: "sine" }, // Sonido puro
          envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 },
          volume: -8, // Un poco más prominente
        }).toDestination();
      }
      if (!gameCompleteSoundRef.current) {
        // Usar PolySynth para acorde simple
        gameCompleteSoundRef.current = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "sine" },
          envelope: { attack: 0.05, decay: 0.5, sustain: 0.3, release: 1.0 },
          volume: -6, // Más volumen para finalización
        }).toDestination();
      }
      // Configurar loop de fondo si no existe
      if (!backgroundLoopRef.current && Tone.loaded()) {
        backgroundLoopRef.current = new Tone.Player({
          url: "/audio/ambient-loop-calm.mp3", // Cambia a tu archivo de loop
          loop: true,
          volume: -18, // Volumen bajo para ambiente
          fadeIn: 1,
          fadeOut: 1,
        }).toDestination();
        console.log("Background loop player created.");
      }
    } catch (error) {
      console.error("Error initializing Tone.js synths:", error);
    }

    initBackground();

    // --- Limpieza al Desmontar ---
    return () => {
      console.log("Hook: Desmontando y limpiando...");
      stopGameLogic(); // Detener el juego y limpiar timers/animaciones

      // Limpiar referencias de Tone.js (opcional, pero buena práctica)
      // No usar dispose() si se reutilizan entre montajes rápidos
      // flapSoundRef.current?.dispose();
      // collectSoundRef.current?.dispose();
      // segmentLitSoundRef.current?.dispose();
      // gameCompleteSoundRef.current?.dispose();
      // backgroundLoopRef.current?.dispose();
      // flapSoundRef.current = null; // Resetear refs
      // etc...

      // Detener y cancelar transporte si es la última instancia del juego
      // Cuidado si tienes otras partes de la app usando Tone.Transport
      // if (Tone.Transport.state === "started") {
      //     Tone.Transport.stop();
      //     Tone.Transport.cancel();
      //     console.log("Audio transport stopped on unmount.");
      // }
    };
  }, [initBackground, stopGameLogic]); // stopGameLogic añadido como dependencia

  // --- Devolver API del Hook ---
  return {
    startGameLogic,
    stopGameLogic, // Exponer función para detener desde fuera si es necesario
    handleFlapStart,
    handleFlapStop,
    handleMoveStart,
    handleMoveStop,
    gameRunningRef,
    // No exponer refs internas directamente a menos que sea necesario
    // Exponer estado de completitud
    isComplete: isCompleteRef.current as boolean, // Devuelve el valor actual de la ref
    // El componente padre sabrá el progreso a través de onSegmentLit
  };
}
