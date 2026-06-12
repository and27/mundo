import posthog from "posthog-js";

// Privacidad: nunca enviar texto libre del usuario (consultas, contenido
// de guías). Solo metadatos de comportamiento. Ver docs/specs/001.

const isEnabled = () =>
  typeof window !== "undefined" &&
  Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

export function initAnalytics() {
  if (!isEnabled()) return;
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    defaults: "2025-05-24",
  });
}

export function identifyUser(userId: string, props?: { role?: string }) {
  if (!isEnabled()) return;
  posthog.identify(userId, props);
}

export function resetAnalytics() {
  if (!isEnabled()) return;
  posthog.reset();
}

type GuiaGeneradaProps = {
  emotion?: string;
  provider?: string;
  fallback?: boolean;
  emotionSource?: string;
  queryLength: number;
};

export function trackRegistroCompletado(props?: { role?: string }) {
  if (!isEnabled()) return;
  posthog.capture("registro_completado", props);
}

export function trackLogin() {
  if (!isEnabled()) return;
  posthog.capture("login");
}

export function trackGuiaGenerada(props: GuiaGeneradaProps) {
  if (!isEnabled()) return;
  posthog.capture("guia_generada", props);
}

export function trackGuiaGeneracionFallida(props: {
  errorMessage: string;
  queryLength: number;
}) {
  if (!isEnabled()) return;
  posthog.capture("guia_generacion_fallida", props);
}

export function trackGuiaGuardada(props: {
  emotion?: string;
  character?: string;
}) {
  if (!isEnabled()) return;
  posthog.capture("guia_guardada", props);
}

export function trackCuentoAudioReproducido() {
  if (!isEnabled()) return;
  posthog.capture("cuento_audio_reproducido");
}
