"use client";

import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsBadgeCcFill, BsBadgeCc } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5"; // Ejemplo de icono
import clsx from "clsx";

interface JourneyControlsBarProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  subtitlesEnabled: boolean;
  onToggleSubtitles: () => void;
  onExitJourney: () => void;
  className?: string;
}

const JourneyControlsBar: React.FC<JourneyControlsBarProps> = ({
  isPlaying,
  onTogglePlayPause,
  subtitlesEnabled,
  onToggleSubtitles,
  onExitJourney,
  className,
}) => {
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-black/50 backdrop-blur-md",
        "px-4 py-3 sm:px-6",
        className
      )}
    >
      <div className="max-w-screen-md mx-auto flex justify-between items-center gap-4">
        {/* Botón de Salir a la Izquierda */}
        <button
          onClick={onExitJourney}
          className="text-white p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black/50 transition-all duration-200"
          aria-label="Salir del Viaje"
        >
          <IoArrowBack className="w-6 h-6" />
        </button>

        {/* Botón de Play/Pausa en el Centro */}
        <button
          onClick={onTogglePlayPause}
          className="text-white p-3 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black/50 transition-all duration-200"
          aria-label={isPlaying ? "Pausar Viaje" : "Continuar Viaje"}
        >
          {isPlaying ? (
            <FaPause className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <FaPlay className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </button>

        {/* Botón de Subtítulos a la Derecha */}
        <button
          onClick={onToggleSubtitles}
          className={clsx(
            "text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-200",
            !subtitlesEnabled && "opacity-50" // Se mantiene la opacidad si están deshabilitados
          )}
          aria-label={
            subtitlesEnabled ? "Ocultar Subtítulos" : "Mostrar Subtítulos"
          }
        >
          {subtitlesEnabled ? (
            <BsBadgeCcFill className="w-6 h-6" />
          ) : (
            <BsBadgeCc className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default JourneyControlsBar;
