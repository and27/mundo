"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { LEAD_CITIES, LEAD_RESOURCES, LEAD_ROLES } from "@/lib/leads";

type Status = "idle" | "sending" | "done";

const fieldClass =
  "w-full py-3 px-4 text-white rounded-[var(--radius-control)] mi-surface-1 border border-white/15 focus:border-white/40 transition-colors";

export function LeadForm({ source }: { source: string | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  // Hasta hidratar, el boton queda desactivado: un envio nativo antes de que
  // cargue el JS mandaria nombre y correo en la URL como GET.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
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
          role: form.get("role"),
          consent: form.get("consent") === "on",
          website: form.get("website"),
          source,
        }),
      });

      if (res.ok) {
        setStatus("done");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status >= 500) {
        // El fallo es nuestro: no se castiga a quien pidio el material.
        setSaveFailed(true);
        setStatus("done");
        return;
      }
      setError(data.error ?? "Algo salió mal. Revisa los campos.");
      setStatus("idle");
    } catch {
      setSaveFailed(true);
      setStatus("done");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[var(--radius-card)] mi-surface-2 p-6">
        <h3 className="mi-text-subtitle">Aquí tienes los dos materiales</h3>
        <p className="mt-1 text-white/65">
          {saveFailed
            ? "No pudimos guardar tus datos, pero puedes descargarlos igual."
            : "Gracias. Te escribiremos solo sobre estos materiales y el programa."}
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          {LEAD_RESOURCES.map((r) => (
            <Button key={r.href} asChild size="md">
              <a href={r.href} download>
                Descargar {r.title}
              </a>
            </Button>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/65">
          ¿Quieres ver cómo continúa en casa?{" "}
          <Link href="/muestra/miedos" className="underline underline-offset-4 text-white">
            Mira la semana 1 del programa para miedos
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-card)] mi-surface-2 p-6 flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="mi-text-label text-white/80">Nombre</span>
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} />
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
        <label className="flex flex-col gap-1.5">
          <span className="mi-text-label text-white/80">A qué te dedicas</span>
          <select name="role" required defaultValue="" className={fieldClass}>
            <option value="" disabled className="text-neutral-800">Elige una</option>
            {LEAD_ROLES.map((r) => (
              <option key={r} value={r} className="text-neutral-800">{r}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Campo trampa para bots: oculto a personas y lectores de pantalla. */}
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
          Acepto que Mundo Interior me escriba sobre estos materiales y el
          programa. Puedo darme de baja cuando quiera.{" "}
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
        {status === "sending" ? "Enviando..." : "Quiero los dos materiales"}
      </Button>
    </form>
  );
}
