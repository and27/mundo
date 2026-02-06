import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";

interface UseJourneyAudioProps {
  onStepComplete: () => void;
  initialVolume?: number;
}

export function useJourneyAudio({
  onStepComplete,
  initialVolume = 1.0,
}: UseJourneyAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  // Ref para mantener la instancia actual de Howl entre renders
  const currentSoundRef = useRef<Howl | null>(null);
  // Ref para evitar llamadas múltiples a onStepComplete si el evento 'end' se dispara rápido
  const completeCallbackCalledRef = useRef<boolean>(false);

  const playAudio = useCallback(
    (src: string) => {
      console.log(currentSoundRef);

      // Detener y descargar cualquier sonido anterior para liberar memoria
      if (currentSoundRef.current) {
        currentSoundRef.current.stop();
        currentSoundRef.current.unload();
        // console.log('Previous sound unloaded');
      }
      // Resetea el flag de callback para el nuevo sonido
      completeCallbackCalledRef.current = false;

      const sound = new Howl({
        src: [src], // Howler espera un array de fuentes
        volume: initialVolume,
        html5: true, // Usar audio HTML5 (importante para PWA/Service Workers/Caching)
        onplay: () => {
          setIsPlaying(true);
          // console.log(`Audio playing: ${src}`);
        },
        onend: () => {
          // Asegurarse de que onStepComplete se llame solo una vez por reproducción
          if (!completeCallbackCalledRef.current) {
            setIsPlaying(false);
            // console.log(`Audio ended: ${src}`);
            onStepComplete(); // Notifica al componente padre que el audio terminó
            completeCallbackCalledRef.current = true; // Marca que ya se llamó
          }
          // Considera si descargar ('unload') el sonido aquí o esperar a que se cargue el siguiente
          // Descargar aquí puede ser más seguro para la memoria si hay muchos pasos
          // sound.unload();
        },
        onpause: () => {
          setIsPlaying(false);
          // console.log(`Audio paused: ${src}`);
        },
        onstop: () => {
          setIsPlaying(false);
          // console.log(`Audio stopped: ${src}`);
        },
        onloaderror: (id, err) => {
          console.error(`Audio load error: ${src}`, err);
          setIsPlaying(false);
          // Considera qué hacer en caso de error: ¿avanzar igualmente?
          if (!completeCallbackCalledRef.current) {
            onStepComplete(); // Llama al callback para no bloquear el flujo
            completeCallbackCalledRef.current = true;
          }
        },
        onplayerror: (id, err) => {
          console.error(`Audio play error: ${src}`, err);
          setIsPlaying(false);
          // Considera qué hacer en caso de error: ¿avanzar igualmente?
          if (!completeCallbackCalledRef.current) {
            onStepComplete(); // Llama al callback para no bloquear el flujo
            completeCallbackCalledRef.current = true;
          }
        },
      });

      currentSoundRef.current = sound; // Guarda la nueva instancia
      sound.play(); // Intenta reproducir (se reproducirá cuando cargue)
    },
    [onStepComplete, initialVolume]
  );

  // Función para detener manualmente el audio si es necesario
  const stopAudio = useCallback(() => {
    if (currentSoundRef.current?.playing()) {
      currentSoundRef.current.stop();
      // console.log('Audio stopped manually');
    }
    // No llamamos a onStepComplete aquí, porque es una detención manual/interrupción
  }, []);

  // Hook de efecto para limpieza al desmontar el componente que usa el hook
  useEffect(() => {
    // La función retornada por useEffect se ejecuta al desmontar
    return () => {
      if (currentSoundRef.current) {
        // console.log('Unloading audio on unmount');
        currentSoundRef.current.stop(); // Detiene por si acaso
        currentSoundRef.current.unload(); // Descarga para liberar memoria
        currentSoundRef.current = null;
      }
    };
  }, []); // El array vacío asegura que solo se ejecute al montar y desmontar

  // Retorna las funciones y el estado para ser usados por el componente
  return { playAudio, stopAudio, isPlaying };
}
