# 001 — Funnel de producto con PostHog

## Problema

No tenemos visibilidad de cómo se usa mundo. Sentry reporta errores y
`openaiMetrics` cuenta llamadas, pero no podemos responder: ¿cuántos
usuarios generan una guía? ¿cuántos la guardan? ¿cuántos vuelven?
Sin esto, ningún experimento de adquisición (SEO, campañas, landing)
es interpretable.

## Solución

Instrumentar el funnel core con PostHog (posthog-js, ya instalado):

```
registro → guía generada → guía guardada → cuento escuchado → retorno
```

- Inicialización en `instrumentation-client.ts` (junto a Sentry),
  solo si `NEXT_PUBLIC_POSTHOG_KEY` está definida.
- Wrapper tipado en `src/lib/analytics.ts` — los componentes nunca
  importan posthog directamente.
- `identify(userId)` en login/registro, `reset()` en logout.
- Pageviews automáticos (incluye navegación SPA).

## Eventos

| Evento | Dónde | Propiedades |
|--------|-------|-------------|
| `registro_completado` | `authService.registerUser` | role |
| `login` | `authService.loginUser` | — |
| `guia_generada` | `useAssistant.generateGuide` | emotion, provider, fallback, emotionSource, queryLength |
| `guia_generacion_fallida` | `useAssistant.generateGuide` | errorMessage |
| `guia_guardada` | `useSavedGuides.saveGuide` | emotion, character |
| `cuento_audio_reproducido` | `useJourneyAudio.playAudio` | — |

La retención (retorno a 7 días) la calcula PostHog con identify + pageviews.

## Privacidad (no negociable)

**Nunca enviar el texto de la consulta del padre ni contenido de la guía.**
Solo metadatos (emoción, proveedor, flags, longitud). El producto maneja
datos emocionales de niños; PostHog solo recibe comportamiento.

## Criterios de aceptación

- [ ] Con `NEXT_PUBLIC_POSTHOG_KEY` ausente, la app funciona igual (no-op).
- [ ] Los 6 eventos aparecen en PostHog al ejercitar el flujo.
- [ ] `identify` vincula eventos al userId; logout hace `reset`.
- [ ] Ninguna propiedad contiene texto libre del usuario.
- [ ] Variables documentadas en `.env.example`.

## Fuera de alcance (futuros issues)

- `guia_leida_completa` (scroll/tiempo de lectura) — v1.1.
- Eventos server-side (fallback rate exacto desde la API).
- Dashboards/insights en PostHog (se configuran en la UI, no en código).
