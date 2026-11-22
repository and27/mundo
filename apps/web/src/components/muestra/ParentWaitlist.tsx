"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { LEAD_CITIES } from "@/lib/leads";

// Lista de espera de la semana 2 para familias que llegan sin psicologa.
// Reusa /api/leads con el rol fijo de cuidador: solo nombre, correo y ciudad,
// nada sobre la nina o el nino.
const PARENT_ROLE = "Madre, padre o cuidador";

type Status = "idle" | "sending" | "done";

const fieldClass =
  "w-full py-3 px-4 text-white rounded-[var(--radius-control)] mi-surface-1 border border-white/15 focus:border-white/40 transition-colors";

export function ParentWaitlist() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  // Igual que en LeadForm: sin JS, un envio nativo pondria los datos en la URL.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const ref = new URLSearchParams(window.location.search).get("ref");
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          city: form.get("city"),
          role: PARENT_ROLE,
          consent: form.get("consent") === "on",
          website: form.get("website"),
          source: ref ? `familias:${ref}` : "familias",
        }),
      });
      if (res.ok || res.status >= 500) {
        // Si el fallo es nuestro, no se lo hacemos sentir a la familia.
        setStatus("done");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Algo salió mal. Revisa los campos.");
      setStatus("idle");
    } catch {
      setStatus("done");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[var(--radius-card)] mi-surface-2 p-6">
        <h3 className="mi-text-subtitle">Listo, te avisamos</h3>
        <p className="mt-1 text-white/70">
          Te escribiremos cuando la semana 2 esté lista. Mientras tanto, con la
          semana 1 tienen para toda esta semana.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-card)] mi-surface-2 p-6 flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="mi-text-label text-white/80">Tu nombre</span>
          <input name="name" required minLength={2} maxLength={100} autoComplete="given-name" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="mi-text-label text-white/80">Correo</span>
          <input name="email" type="email" required autoComplete="email" inputMode="email" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="mi-text-label text-white/80">Ciudad</span>
          <select name="city" required defaultValue="" className={fieldClass}>
            <option value="" disabled className="text-neutral-800">Elige una</option>
            {LEAD_CITIES.map((c) => (
              <option key={c} value={c} className="text-neutral-800">{c}</option>
            ))}
          </select>
        </label>
      </div>

      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <label className="flex items-start gap-3 text-sm text-white/75">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--color-action-500)]" />
        <span>
          Acepto que Mundo Interior me escriba sobre el programa. Solo guardamos
          tu nombre, correo y ciudad, nada sobre tu hija o hijo. Puedes darte de
          baja cuando quieras.{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacidad
          </Link>
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-[var(--color-error-500)]">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth disabled={!ready || status === "sending"}>
        {status === "sending" ? "Enviando..." : "Avísame cuando esté la semana 2"}
      </Button>
    </form>
  );
}
