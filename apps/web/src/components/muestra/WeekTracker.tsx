"use client";

import { useEffect, useState } from "react";

// Registro de la accion del adulto, noche por noche. Vive solo en este
// navegador: sirve para que la familia lo muestre en la proxima sesion.
const STORAGE_KEY = "mi:muestra-miedos:semana1";
const NIGHTS = 7;

export function WeekTracker() {
  const [done, setDone] = useState<boolean[]>(() => Array(NIGHTS).fill(false));

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (Array.isArray(saved) && saved.length === NIGHTS) setDone(saved.map(Boolean));
    } catch {
      // Sin almacenamiento (modo privado): el registro funciona igual, sin guardar.
    }
  }, []);

  function toggle(i: number) {
    const next = done.map((d, j) => (j === i ? !d : d));
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  const count = done.filter(Boolean).length;

  return (
    <div>
      <div className="grid grid-cols-7 gap-2">
        {done.map((d, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={d}
            aria-label={`Noche ${i + 1}${d ? ": hecha" : ""}`}
            onClick={() => toggle(i)}
            className={`aspect-square rounded-[var(--radius-control)] flex items-center justify-center transition-colors ${
              d
                ? "bg-[var(--color-success-500)] text-[#0f2a22]"
                : "mi-surface-1 text-white/60 hover:text-white"
            }`}
          >
            <span className="mi-voice-kid text-xl font-extrabold leading-none">
              {d ? "✓" : i + 1}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-white/65" aria-live="polite">
        {count === 0
          ? "Una casilla por noche: tócala cuando uses la frase. Se guarda solo en este teléfono."
          : `${count} de ${NIGHTS} noches. ${
              count >= 4 ? "Muy bien: eso ya es un hábito." : "Casi todas las noches es suficiente."
            }`}
      </p>
    </div>
  );
}
