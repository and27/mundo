# Handoff · Cuento mágico (rama `feat/cuento-magico`)

Actualizado: 21 nov 2026. Responder en español, conciso, sin relleno. El usuario aprende viendo: mostrar videos o capturas.
Commits como `and27 <andres.banda.sm@gmail.com>`, sin coautor ni trailers. Ramas sin prefijo `claude/`. No abrir PR sin que lo pida.

## Qué existe
- Texto del cuento v3: `docs/cuentos/yachay-sombra-v3.md`. La escena 1 termina en "Pero de noche…" y la 2 empieza con "De noche, a Yachay le daba miedo."
- Fichas de personaje: `docs/personajes/yachay-ficha-v3.webp` (la oficial: acuarela, cría de puma, sin collar ni puntos en la frente). La abuela todavía se ve joven: falta una ficha más mayor, con patas cortas y quizá lentes.
- Prototipos HTML y scripts de render: `docs/prototipos/escena-01`, `escena-02`.
- Reproductor en la app: `/cuento/yachay`
  - Datos: `apps/web/src/lib/cuento/stories/yachay-sombra.ts` (escena = imagen + frases + efectos atados a palabras del guion)
  - Motor: `apps/web/src/lib/cuento/engine.ts` (determinista, `render(t)`)
  - UI: `apps/web/src/components/cuento/CuentoPlayer.tsx`. Con `?render=1` expone `window.__cuento.seek(i,t)` para grabar MP4.
  - Assets: `apps/web/public/cuentos/yachay/`
  - Vista previa: https://mundo-git-feat-cuento-magico-and27s-projects.vercel.app/cuento/yachay

## Decisiones
- Una imagen por escena, con cámara, luz y partículas por código. No son videos. Los MP4 son solo para redes.
- Estilo: acuarela con tinta café, y el tercio de abajo es papel crema para el texto, que siempre va en tinta café. La noche oscurece desde arriba.
- Sin amuleto ni objetos mágicos que quiten el miedo, porque serían un objeto de seguridad. El "truco" es la pata con los dedos.
- Las capas (cola, orejas) quedan para el futuro.

## Pendiente (en orden)
1. **UI centrada en el niño, como Moshi:** portada con título y ▶ solamente; pausa solo con íconos; final de "buenas noches" con el cierre del narrador. La guía para el adulto va detrás de un botón pequeño "Para papás", con puerta para adultos ("mantén presionado 2 s"). Hoy el final le habla al papá: cambiarlo. Bajar el tono explicativo del copy.
2. **Voz: HECHO (provisional).** Fish Audio, voz "Cuento" (119fec1a…), una frase por archivo (`scripts/cuento/voz_fish.py`). Las onomatopeyas son efectos en `public/cuentos/yachay/sfx` (provisionales: reemplazar con ElevenLabs SFX). El audio usa Web Audio y es el reloj de la animación (`lib/cuento/audio.ts`). Faltan: una voz más neutra, mayor y cálida (o clonar una narradora real con permiso) y confirmar la licencia comercial de la voz.
3. Escena 3 "El cuerpo avisa": darle el prompt al usuario (con las fichas como referencia, 9:16, el tercio de abajo en papel crema, sin texto).
4. "Ver la semana 1" enlaza a `/miedos`, que existe solo cuando se mergee el PR #62.
