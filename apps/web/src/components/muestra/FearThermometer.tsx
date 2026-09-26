"use client";

import { useState } from "react";

type Level = {
  value: number;
  label: string;
  color: string;
  tip: string;
};

// Cinco niveles, de menos a mas. El consejo es para el adulto, no para el nino.
const LEVELS: Level[] = [
  {
    value: 1,
    label: "Tranquilo",
    color: "#4cc4a0",
    tip: "Celébralo en voz alta: «Hoy tu cuerpo está tranquilo». Así también aprende a reconocer la calma.",
  },
  {
    value: 2,
    label: "Un poquito",
    color: "#a6c95a",
    tip: "Nómbralo sin agrandarlo: «Un poquito de miedo es normal. Estoy aquí».",
  },
  {
    value: 3,
    label: "Bastante",
    color: "#f5c518",
    tip: "Pregunta dónde lo siente en el cuerpo. Ponerle lugar ya le quita fuerza.",
  },
  {
    value: 4,
    label: "Mucho",
    color: "#f09a3a",
    tip: "Primero calma, después palabras: respiren juntos despacio, y solo luego conversen.",
  },
  {
    value: 5,
    label: "Muchísimo",
    color: "#e0603a",
    tip: "Quédate cerca y no intentes razonar todavía. Si pasa muchas noches seguidas, cuéntaselo a su psicóloga.",
  },
];

export function FearThermometer() {
  const [selected, setSelected] = useState<number | null>(null);
  const level = LEVELS.find((l) => l.value === selected);

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="¿Cuánto miedo sientes?"
        className="grid grid-cols-5 gap-2 sm:gap-3"
      >
        {LEVELS.map((l) => {
          const isActive = selected === l.value;
          return (
            <button
              key={l.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setSelected(l.value)}
              className="mi-voice-kid flex flex-col items-center justify-end gap-2 rounded-[var(--radius-kid)] p-2 pt-3 min-h-[120px] transition-transform duration-150 hover:-translate-y-1"
              style={{
                backgroundColor: isActive ? l.color : "rgba(255,255,255,0.05)",
                border: `2px solid ${isActive ? l.color : "rgba(255,255,255,0.12)"}`,
                color: isActive ? "#1d1405" : "white",
              }}
            >
              {/* La columna crece con el nivel: se lee sin saber leer. */}
              <span
                aria-hidden
                className="w-4 rounded-full"
                style={{
                  height: `${14 + l.value * 11}px`,
                  backgroundColor: isActive ? "rgba(0,0,0,0.25)" : l.color,
                }}
              />
              <span className="text-2xl font-extrabold leading-none">
                {l.value}
              </span>
              <span className="text-[11px] sm:text-xs font-bold leading-tight text-center">
                {l.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="mt-5 min-h-[72px] rounded-[var(--radius-card)] mi-surface-1 p-4"
      >
        {level ? (
          <p className="mi-text-body text-white/90">
            <span className="font-bold" style={{ color: level.color }}>
              {level.label}.
            </span>{" "}
            {level.tip}
          </p>
        ) : (
          <p className="mi-text-body text-white/60">
            Toca un número para ver qué hacer como adulto en ese momento.
          </p>
        )}
      </div>
    </div>
  );
}
