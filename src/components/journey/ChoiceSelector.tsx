import { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import clsx from "clsx";

interface Choice {
  id: string;
  icon: string;
  label: string;
}

interface ChoiceSelectorProps {
  choices: Choice[];
  onSelect: (choiceId: string) => void;
  selectedChoiceId?: string | null;
}

const ChoiceButton = memo(
  ({
    choice,
    isSelected,
    onSelect,
  }: {
    choice: Choice;
    isSelected: boolean;
    onSelect: (id: string) => void;
  }) => {
    const handleClick = useCallback(() => {
      onSelect(choice.id);
    }, [choice.id, onSelect]);

    const buttonClasses = useMemo(
      () =>
        clsx(
          "group relative p-4 md:p-5 w-full flex flex-col items-center justify-center",
          "rounded-2xl border backdrop-blur-sm shadow-lg text-white text-center",
          "transition-all duration-300 ease-out transform-gpu",
          "focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-offset-2 focus:ring-offset-transparent",
          "bg-black/30 hover:bg-black/40",
          isSelected
            ? [
                "border-yellow-400 border-2 scale-105 brightness-110",
                "shadow-[0_0_20px_rgba(255,217,102,0.4)]",
                "bg-yellow-400/10",
              ]
            : [
                "border-white/20 hover:border-white/40",
                "hover:brightness-110 hover:-translate-y-1 hover:shadow-xl",
                "hover:scale-[1.02] active:scale-[0.98]",
              ]
        ),
      [isSelected]
    );

    const iconClasses = useMemo(
      () =>
        clsx(
          "relative w-12 h-12 md:w-14 md:h-14 mb-3 transition-all duration-200",
          "group-hover:scale-110",
          isSelected && "scale-110 drop-shadow-lg"
        ),
      [isSelected]
    );

    return (
      <button
        onClick={handleClick}
        className={buttonClasses}
        aria-pressed={isSelected}
        aria-describedby={`choice-${choice.id}-desc`}
      >
        {isSelected && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 animate-pulse" />
        )}
        <div className="relative z-10 flex flex-col items-center">
          <div className={iconClasses}>
            <Image
              src={choice.icon}
              alt=""
              fill
              sizes="(max-width: 768px) 48px, 56px"
              className="object-contain drop-shadow-md"
              priority={false}
            />
          </div>
          <span
            className="font-semibold text-sm md:text-base leading-tight"
            id={`choice-${choice.id}-desc`}
          >
            {choice.label}
          </span>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </button>
    );
  }
);
ChoiceButton.displayName = "ChoiceButton";

const ChoiceSelector: React.FC<ChoiceSelectorProps> = ({
  choices,
  onSelect,
  selectedChoiceId = null,
}) => {
  const handleSelect = useCallback(
    (choiceId: string) => {
      onSelect(choiceId);
    },
    [onSelect]
  );

  const gridClasses = useMemo(() => {
    const baseClasses = "w-full gap-4 md:gap-6 p-4";

    if (!choices || choices.length === 0) {
      return `${baseClasses} grid grid-cols-1 max-w-sm mx-auto`;
    }
    if (choices.length === 1)
      return `${baseClasses} grid grid-cols-1 max-w-sm mx-auto`;
    if (choices.length === 2)
      return `${baseClasses} grid grid-cols-1 sm:grid-cols-2 max-w-md mx-auto`;
    if (choices.length === 3)
      return `${baseClasses} grid grid-cols-1 sm:grid-cols-3`;
    if (choices.length === 4)
      return `${baseClasses} grid grid-cols-2 sm:grid-cols-4`;

    return `${baseClasses} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`;
  }, [choices]); // Usar `choices` en lugar de `choices.length` es más seguro si `choices` puede ser null/undefined

  // Ahora sí, el return temprano
  if (!choices || choices.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <div className="text-white/60">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-2xl opacity-50">🤔</span>
          </div>
          <p>No hay opciones disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          Elige tu camino
        </h3>
        <p className="text-white/70 text-sm">
          Selecciona una opción para continuar tu aventura
        </p>
      </div>
      <div
        className={gridClasses}
        role="group"
        aria-labelledby="choices-heading"
      >
        {choices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            isSelected={selectedChoiceId === choice.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
      {selectedChoiceId && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 text-xs text-white/60">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Opción seleccionada - La historia continuará</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoiceSelector;
