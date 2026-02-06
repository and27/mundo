import { ChevronLeft, ChevronRight } from "lucide-react";

interface JourneyNavigationProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  isVisible: boolean;
}

const JourneyNavigation = ({
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  isVisible,
}: JourneyNavigationProps) => {
  if (!isVisible) return null;

  return (
    <>
      {/* Botón Atrás - Lado Izquierdo */}
      <button
        onClick={onGoBack}
        disabled={!canGoBack}
        className={`
          fixed left-0 top-1/2 -translate-y-1/2 z-20
          h-32 w-16 flex items-center justify-center
          bg-gradient-to-r from-black/80 via-black/40 to-transparent
          text-white/70 hover:text-white
          transition-all duration-300
          ${
            canGoBack
              ? "opacity-100 hover:bg-gradient-to-r hover:from-black/90 hover:via-black/60 hover:to-transparent"
              : "opacity-30 cursor-not-allowed"
          }
        `}
        aria-label="Paso anterior"
      >
        <ChevronLeft size={32} strokeWidth={2.5} />
      </button>

      {/* Botón Adelante - Lado Derecho */}
      <button
        onClick={onGoForward}
        disabled={!canGoForward}
        className={`
          fixed right-0 top-1/2 -translate-y-1/2 z-20
          h-32 w-16 flex items-center justify-center
              bg-gradient-to-br from-indigo-600/90 via-purple-700/90 to-transparent
          text-white/70 hover:text-white
          transition-all duration-300
          ${
            canGoForward
              ? "opacity-100 hover:bg-gradient-to-l hover:from-black/90 hover:via-black/60 hover:to-transparent"
              : "opacity-30 cursor-not-allowed"
          }
        `}
        aria-label="Siguiente paso"
      >
        <ChevronRight size={32} strokeWidth={2.5} />
      </button>
    </>
  );
};

export default JourneyNavigation;
