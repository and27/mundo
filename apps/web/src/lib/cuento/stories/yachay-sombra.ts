import type { CuentoStory } from "../types";

// Cuento v3 · Semana 1 · Miedos de la noche. Texto: docs/cuentos/yachay-sombra-v3.md
// Voz provisional: Fish Audio, voz "Cuento" (generada con scripts/cuento/voz_fish.py).
// Las onomatopeyas no las dice la voz: son efectos de sonido (provisionales; luego ElevenLabs SFX).

const IMG = "/cuentos/yachay";
const VOZ = `${IMG}/voz`;
const SFX = `${IMG}/sfx`;

export const yachaySombra: CuentoStory = {
  slug: "yachay",
  title: "Yachay y la sombra que se movía",
  subtitle: "Un cuento para la hora de dormir",
  minutes: 4,
  cover: `${IMG}/escena-01.webp`,
  plannedScenes: 10,
  scenes: [
    {
      id: "escena-01",
      image: `${IMG}/escena-01.webp`,
      width: 768,
      height: 1376,
      alt: "Yachay salta entre piedras en el páramo, junto a su cueva",
      bed: `${SFX}/brisa-dia.m4a`,
      lead: 1.0,
      tail: 1.6,
      camera: { focal: [330, 640], zoom: [1, 1.075] },
      lines: [
        { text: "Al pie de una montaña muy alta, en una cueva calentita, vivía Yachay,", audio: `${VOZ}/e1-0.mp3`, voice: 6.03, dur: 6.4, gap: 0 },
        { text: "un puma joven con bigotes largos y una cola que nunca se quedaba quieta.", audio: `${VOZ}/e1-1.mp3`, voice: 6.4, dur: 6.75, gap: 0.6 },
        { text: "Su mejor amigo era Kuntur, un cóndor que volaba alto.", audio: `${VOZ}/e1-2.mp3`, voice: 4.36, dur: 4.7, gap: 0.8 },
        { text: "De día, Yachay era rapidísimo: saltaba piedras, perseguía mariposas", audio: `${VOZ}/e1-3.mp3`, voice: 6.19, dur: 6.5, gap: 0.6 },
        { text: "y rugía para practicar: *¡grrr!*", say: "y rugía para practicar…", audio: `${VOZ}/e1-4.mp3`, voice: 1.93, dur: 3.3, gap: 0.4 },
        { text: "Pero de noche…", audio: `${VOZ}/e1-5.mp3`, voice: 1.02, dur: 2.8, gap: 1.2 },
      ],
      sounds: [
        { src: `${SFX}/pajaritos.m4a`, at: { line: 0, word: 3 } },
        { src: `${SFX}/pajaritos.m4a`, at: { line: 1, word: 6 } },
        { src: `${SFX}/pajaritos.m4a`, at: { line: 3, word: 8 } },
        { src: `${SFX}/grrr.m4a`, at: { line: 4, word: 4 } },
        { src: `${SFX}/grillos.m4a`, at: { line: 5, offset: 1.2 } },
      ],
      effects: [
        { type: "sun", at: [690, 120], radius: [420, 380], until: { line: 5, offset: -0.1 } },
        { type: "pollen", area: [0, 280, 768, 720], count: 80, until: { line: 5, offset: -0.1 } },
        { type: "glow", at: [680, 540], radius: [120, 110], pulse: { line: 0, word: 9 }, on: { line: 5, offset: -0.1 } },
        { type: "butterfly", home: [128, 612], leave: { line: 5, offset: -0.7 } },
        {
          type: "sprite",
          src: `${IMG}/condor.png`,
          size: [96, 52],
          from: [-110, 232],
          to: [820, 172],
          start: { line: 2, offset: -0.3 },
          dur: 8.1,
        },
        { type: "punch", at: { line: 4, word: 4, offset: 0.05 } },
        { type: "dusk", at: { line: 5, offset: -0.1 }, ramp: 2.5 },
        { type: "stars", area: [0, 20, 768, 360], count: 46, at: { line: 5, offset: 0.9 } },
      ],
    },
    {
      id: "escena-02",
      image: `${IMG}/escena-02.webp`,
      width: 768,
      height: 1376,
      alt: "Yachay en su cesta mira una sombra en la pared; la abuela está a su lado junto a una vela",
      bed: `${SFX}/viento-noche.m4a`,
      lead: 1.0,
      tail: 1.8,
      camera: { focal: [330, 600], zoom: [1, 1.1] },
      lines: [
        { text: "De noche, a Yachay le daba miedo.", audio: `${VOZ}/e2-0.mp3`, voice: 2.82, dur: 3.2, gap: 0 },
        { text: "Y esa noche, la abuela sopló la velita. *Fffu.*", say: "Y esa noche, la abuela sopló la velita.", audio: `${VOZ}/e2-1.mp3`, voice: 3.6, dur: 4.6, gap: 0.7 },
        { text: "La cueva se puso oscura.", audio: `${VOZ}/e2-2.mp3`, voice: 3.06, dur: 3.4, gap: 0.7 },
        { text: "Solo entraba un rayito de luna por la puerta.", audio: `${VOZ}/e2-3.mp3`, voice: 2.93, dur: 3.3, gap: 0.6 },
        { text: "Afuera, el viento hacía *fiuuu… fiuuu.*", say: "Afuera, el viento hacía…", audio: `${VOZ}/e2-4.mp3`, voice: 2.46, dur: 4.2, gap: 0.6 },
        { text: "Y en la pared, con la luz de la luna, apareció una sombra larga, larga…", audio: `${VOZ}/e2-5.mp3`, voice: 6.5, dur: 6.85, gap: 0.7 },
        { text: "…que se movía.", audio: `${VOZ}/e2-6.mp3`, voice: 0.94, dur: 2.4, gap: 0.5 },
      ],
      sounds: [
        { src: `${SFX}/soplido.m4a`, at: { line: 1, word: 8, offset: -0.05 } },
        { src: `${SFX}/rafaga.m4a`, at: { line: 4, word: 4, offset: -0.3 } },
      ],
      effects: [
        { type: "candle", flame: [647, 832], cover: "rgb(196,154,108)", out: { line: 1, word: 8 } },
        { type: "darken", at: { line: 2 }, amount: 0.55, ramp: 1.6 },
        {
          type: "beam",
          from: [140, 200],
          to: [355, 600],
          widthFrom: 34,
          widthTo: 130,
          color: "#fff4c8",
          count: 230,
          boost: { line: 3 },
          gust: { line: 4, word: 4, offset: -0.3 },
        },
        { type: "creep", at: [252, 520], radius: [55, 130], start: { line: 6, offset: -0.4 } },
      ],
    },
  ],
  activity: {
    title: "Esta noche, el truco de Yachay",
    intro: "Para ti, que acompañas a dormir. Unos 5 minutos, con la luz baja.",
    steps: [
      "Pregúntale: «¿Tienes miedo? ¿Cuánto?». Que lo muestre con la mano: la mano cerrada es nada de miedo; cuatro dedos, muchísimo.",
      "Escucha sin corregir. No le digas que no pasa nada.",
      "Dile la frase de la semana, una sola vez y con calma.",
      "Quédate un ratito cerca y luego ve a tu lugar, aunque quede un poco de miedo.",
    ],
    phrase: "Sé que da miedo. Confío en que puedes con esto.",
    questions: [
      "¿Cuántos dedos de miedo tenía Yachay cuando vio la sombra?",
      "¿A ti te pasa eso a veces? ¿Qué te da miedo en la noche?",
      "¿Qué hizo Yachay cuando tenía miedo?",
    ],
  },
};
