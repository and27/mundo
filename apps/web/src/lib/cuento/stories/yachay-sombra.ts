import type { CuentoStory, Line } from "../types";

// Cuento v3 · Semana 1 · Miedos de la noche. Texto: docs/cuentos/yachay-sombra-v3.md
// Ilustraciones: OpenAI (1024x1536). Prompts: docs/cuentos/prompts-escenas.md
// Voz provisional: Fish Audio, voz "Cuento" (scripts/cuento/voz_fish.py).
// Las onomatopeyas no las dice la voz: son efectos de sonido (provisionales; luego ElevenLabs SFX).

const IMG = "/cuentos/yachay";
const VOZ = `${IMG}/voz`;
const SFX = `${IMG}/sfx`;
const W = 1024;
const H = 1536;

/** Frase con voz: la duración es la de la voz más un respiro (y más si lleva onomatopeya). */
const v = (id: string, text: string, voice: number, gap = 0.7, extra = 0.35): Line => ({
  text,
  audio: `${VOZ}/${id}.mp3`,
  voice,
  dur: voice + extra,
  gap,
});

export const yachaySombra: CuentoStory = {
  slug: "yachay",
  title: "Yachay y la sombra que se movía",
  subtitle: "Un cuento para la hora de dormir",
  minutes: 4,
  cover: `${IMG}/escena-01.webp`,
  plannedScenes: 10,
  scenes: [
    // 1 · Yachay (de día). Imagen provisional: la abuela no debería estar.
    {
      id: "escena-01",
      image: `${IMG}/escena-01.webp`,
      width: W,
      height: H,
      alt: "Yachay salta en el páramo junto a su cueva",
      bed: `${SFX}/brisa-dia.m4a`,
      lead: 1.0,
      tail: 1.6,
      camera: { focal: [420, 760], zoom: [1, 1.07] },
      lines: [
        v("e1-0", "Al pie de una montaña muy alta, en una cueva calentita, vivía Yachay,", 6.03, 0),
        v("e1-1", "un puma joven con bigotes largos y una cola que nunca se quedaba quieta.", 6.4, 0.6),
        v("e1-2", "Su mejor amigo era Kuntur, un cóndor que volaba alto.", 4.36, 0.8),
        v("e1-3", "De día, Yachay era rapidísimo: saltaba piedras, perseguía mariposas", 6.19, 0.6, 0.3),
        { ...v("e1-4", "y rugía para practicar: *¡grrr!*", 1.93, 0.4, 1.4), say: "y rugía para practicar…" },
        v("e1-5", "Pero de noche…", 1.02, 1.2, 1.8),
      ],
      sounds: [
        { src: `${SFX}/pajaritos.m4a`, at: { line: 0, word: 3 } },
        { src: `${SFX}/pajaritos.m4a`, at: { line: 1, word: 6 } },
        { src: `${SFX}/pajaritos.m4a`, at: { line: 3, word: 8 } },
        { src: `${SFX}/grrr.m4a`, at: { line: 4, word: 4 } },
        { src: `${SFX}/grillos.m4a`, at: { line: 5, offset: 1.2 } },
      ],
      effects: [
        { type: "sun", at: [880, 120], radius: [560, 500], until: { line: 5, offset: -0.1 } },
        { type: "pollen", area: [0, 420, 1024, 800], count: 90, until: { line: 5, offset: -0.1 } },
        { type: "glow", at: [960, 520], radius: [110, 150], pulse: { line: 0, word: 9 }, on: { line: 5, offset: -0.1 } },
        { type: "butterfly", home: [170, 560], leave: { line: 5, offset: -0.7 } },
        { type: "sprite", src: `${IMG}/condor.png`, size: [96, 52], from: [-110, 320], to: [1110, 250], start: { line: 2, offset: -0.3 }, dur: 8.5 },
        { type: "punch", at: { line: 4, word: 4, offset: 0.05 } },
        { type: "dusk", at: { line: 5, offset: -0.1 }, ramp: 2.5 },
        { type: "stars", area: [0, 20, 1024, 420], count: 50, at: { line: 5, offset: 0.9 } },
      ],
    },
    // 2 · La sombra
    {
      id: "escena-02",
      image: `${IMG}/escena-02.webp`,
      width: W,
      height: H,
      alt: "Yachay en su cesta y la abuela junto a una vela; un rayo de luna y una sombra en la pared",
      bed: `${SFX}/viento-noche.m4a`,
      lead: 1.0,
      tail: 1.8,
      camera: { focal: [460, 700], zoom: [1, 1.1] },
      lines: [
        v("e2-0", "De noche, a Yachay le daba miedo.", 2.82, 0),
        { ...v("e2-1", "Y esa noche, la abuela sopló la velita. *Fffu.*", 3.6, 0.7, 1.0), say: "Y esa noche, la abuela sopló la velita." },
        v("e2-2", "La cueva se puso oscura.", 3.06),
        v("e2-3", "Solo entraba un rayito de luna por la puerta.", 2.93, 0.6),
        { ...v("e2-4", "Afuera, el viento hacía *fiuuu… fiuuu.*", 2.46, 0.6, 1.7), say: "Afuera, el viento hacía…" },
        v("e2-5", "Y en la pared, con la luz de la luna, apareció una sombra larga, larga…", 6.5),
        v("e2-6", "…que se movía.", 0.94, 0.5, 1.5),
      ],
      sounds: [
        { src: `${SFX}/soplido.m4a`, at: { line: 1, word: 8, offset: -0.05 } },
        { src: `${SFX}/rafaga.m4a`, at: { line: 4, word: 4, offset: -0.3 } },
      ],
      effects: [
        { type: "candle", flame: [912, 1010], size: [17, 28], cover: "rgb(240,162,64)", out: { line: 1, word: 8 } },
        { type: "darken", at: { line: 2 }, amount: 0.5, ramp: 1.6 },
        { type: "beam", from: [210, 180], to: [470, 690], widthFrom: 45, widthTo: 150, color: "#fff1c4", count: 230, boost: { line: 3 }, gust: { line: 4, word: 4, offset: -0.3 } },
        { type: "creep", at: [365, 590], radius: [45, 85], start: { line: 6, offset: -0.4 } },
      ],
    },
    // 3 · El cuerpo avisa
    {
      id: "escena-03",
      image: `${IMG}/escena-03.webp`,
      width: W,
      height: H,
      alt: "Yachay asustado en su cesta, con las patas en la panza; detrás, la sombra de su cola",
      bed: `${SFX}/viento-noche.m4a`,
      bedGain: 0.7,
      lead: 0.9,
      tail: 1.8,
      camera: {
        focal: [512, 760],
        zoom: [1, 1],
        keys: [
          { at: { line: 0 }, focal: [540, 680], zoom: 1.22, dur: 3 },
          { at: { line: 2 }, focal: [520, 830], zoom: 1.35, dur: 2 },
          { at: { line: 3 }, focal: [520, 720], zoom: 1.12, dur: 1.6 },
        ],
      },
      lines: [
        { ...v("e3-0", "Los bigotes de Yachay se pusieron tiesos: *¡tuiing!*", 3.55, 0, 1.2), say: "Los bigotes de Yachay se pusieron tiesos…" },
        v("e3-1", "La panza se le apretó como una pelotita.", 3.24),
        { ...v("e3-2", "Y el corazón le latía rapidísimo: *pum-pum, pum-pum.*", 2.87, 0.7, 2.6), say: "Y el corazón le latía rapidísimo…" },
        v("e3-3", "—¡Abuela! —llamó—. Hay algo en la pared.", 3.47, 0.6),
      ],
      sounds: [
        { src: `${SFX}/tuiing.m4a`, at: { line: 0, word: 7 } },
        { src: `${SFX}/latido.m4a`, at: { line: 2, word: 6, offset: -0.2 } },
      ],
      effects: [
        { type: "beam", from: [212, 70], to: [576, 660], widthFrom: 60, widthTo: 190, color: "#fff1c4", count: 200 },
        { type: "heartbeat", at: { line: 2, word: 6, offset: -0.2 }, dur: 2.8 },
      ],
    },
    // 4 · ¿Cuánto miedo?
    {
      id: "escena-04",
      image: `${IMG}/escena-04.webp`,
      width: W,
      height: H,
      alt: "La abuela junto a Yachay; él levanta la pata para mostrar cuánto miedo tiene",
      bed: `${SFX}/viento-noche.m4a`,
      bedGain: 0.6,
      lead: 0.9,
      tail: 1.8,
      camera: {
        focal: [560, 700],
        zoom: [1, 1],
        keys: [
          { at: { line: 2 }, focal: [520, 640], zoom: 1.12, dur: 4 },
          { at: { line: 6, offset: -0.6 }, focal: [290, 790], zoom: 1.6, dur: 1.8 },
          { at: { line: 7, offset: -0.2 }, focal: [520, 680], zoom: 1.08, dur: 2.2 },
        ],
      },
      lines: [
        v("e4-0", "La abuela volvió despacito y se sentó a su lado.", 4.05, 0),
        v("e4-1", "No le dijo que no pasaba nada. No se rio.", 3.68),
        v("e4-2", "—¿Tienes miedo? —le preguntó.", 2.27, 0.8),
        v("e4-3", "—Sí —susurró Yachay.", 2.22),
        v("e4-4", "—¿Cuánto miedo? Muéstrame con tu pata.", 3.66, 0.8),
        v("e4-5", "La pata cerrada es nada de miedo. Cuatro dedos es un miedo grande.", 6.3),
        v("e4-6", "Yachay levantó un dedo… dos… tres… cuatro.", 4.62, 0.9, 0.8),
        v("e4-7", "—Es un miedo grande —dijo la abuela.", 3.06, 0.8),
      ],
      effects: [
        { type: "beam", from: [212, 80], to: [512, 660], widthFrom: 55, widthTo: 170, color: "#fff1c4", count: 180 },
        {
          type: "count",
          points: [
            [227, 800],
            [267, 777],
            [310, 785],
            [337, 827],
          ],
          at: [
            { line: 6, word: 3 },
            { line: 6, word: 4 },
            { line: 6, word: 5 },
            { line: 6, word: 6 },
          ],
        },
      ],
    },
    // 5 · Dónde se siente
    {
      id: "escena-05",
      image: `${IMG}/escena-05.webp`,
      width: W,
      height: H,
      alt: "Yachay con la pata en la panza; la abuela se toca el pecho",
      bed: `${SFX}/viento-noche.m4a`,
      bedGain: 0.55,
      lead: 0.9,
      tail: 5.5, // silencio para que el niño ponga la mano donde siente el miedo
      camera: {
        focal: [520, 720],
        zoom: [1, 1],
        keys: [
          { at: { line: 1 }, focal: [380, 820], zoom: 1.2, dur: 3 },
          { at: { line: 2 }, focal: [640, 620], zoom: 1.18, dur: 3 },
          { at: { line: 4 }, focal: [512, 720], zoom: 1.05, dur: 3 },
        ],
      },
      lines: [
        v("e5-0", "—¿Y dónde lo sientes?", 1.67, 0),
        v("e5-1", "—En la panza. Y en los bigotes.", 2.48),
        v("e5-2", "—El miedo avisa en el cuerpo —dijo la abuela—.", 3.71, 0.8),
        v("e5-3", "Es como la alarma de un carro: a veces suena aunque no pase nada malo.", 5.38),
        v("e5-4", "¿A ti te pasa eso a veces? ¿Dónde lo sientes tú?", 3.66, 1.0),
        v("e5-5", "Pon tu mano ahí…", 1.57, 0.8, 0.8),
      ],
      effects: [
        { type: "beam", from: [210, 70], to: [500, 780], widthFrom: 55, widthTo: 170, color: "#fff1c4", count: 160 },
        { type: "glow", at: [360, 905], radius: [95, 80], color: "#ffd38a", pulse: { line: 1, word: 2 } },
        { type: "glow", at: [700, 690], radius: [95, 85], color: "#ffd38a", pulse: { line: 2, word: 5 } },
        { type: "glow", at: [512, 900], radius: [420, 260], color: "#ffcf86", pulse: { line: 5, offset: 0.4 } },
      ],
    },
    // 6 · La frase
    {
      id: "escena-06",
      image: `${IMG}/escena-06.webp`,
      width: W,
      height: H,
      alt: "La abuela acaricia la frente de Yachay",
      bed: `${SFX}/viento-noche.m4a`,
      bedGain: 0.45,
      lead: 1.0,
      tail: 2.8,
      camera: {
        focal: [540, 680],
        zoom: [1, 1],
        keys: [{ at: { line: 0 }, focal: [420, 600], zoom: 1.24, dur: 14 }],
      },
      lines: [
        v("e6-0", "Yachay quería que la abuela se quedara con él.", 3.0, 0),
        v("e6-1", "La abuela le acarició la frente y le dijo, despacio:", 4.08, 0.8),
        v("e6-2", "—Sé que da miedo. Confío en que puedes con esto.", 3.87, 1.0, 0.8),
      ],
      effects: [
        { type: "beam", from: [212, 70], to: [376, 520], widthFrom: 50, widthTo: 130, color: "#fff1c4", count: 140 },
        { type: "glow", at: [356, 560], radius: [90, 75], color: "#ffd8a0", pulse: { line: 1, word: 2 } },
        { type: "glow", at: [430, 640], radius: [300, 260], color: "#ffcf90", pulse: { line: 2, offset: 0.3 } },
      ],
    },
    // 7 · La sombra copiona
    {
      id: "escena-07",
      image: `${IMG}/escena-07.webp`,
      width: W,
      height: H,
      alt: "Yachay mueve la cola y su sombra en la pared lo copia; la abuela sonríe",
      bed: `${SFX}/viento-noche.m4a`,
      bedGain: 0.45,
      lead: 0.9,
      tail: 2.2,
      camera: {
        focal: [170, 760],
        zoom: [1.3, 1.3],
        keys: [
          { at: { line: 0 }, focal: [150, 560], zoom: 1.3, dur: 3 },
          { at: { line: 4, offset: -0.3 }, focal: [520, 700], zoom: 1.05, dur: 2.2 },
        ],
      },
      lines: [
        v("e7-0", "Yachay miró la sombra otra vez.", 2.3, 0),
        v("e7-1", "Tenía miedo, pero quiso saber qué era.", 3.08),
        v("e7-2", "Movió su cola, despacito. La sombra también se movió.", 5.07),
        v("e7-3", "Movió la cola rápido, y la sombra bailó.", 3.68),
        v("e7-4", "—¡Abuela! ¡La sombra me copia!", 2.8, 0.6),
        { ...v("e7-5", "Yachay soltó una risita: *jijiji.*", 2.27, 0.5, 1.2), say: "Yachay soltó una risita…" },
        v("e7-6", "La sombra era… ¡su propia cola!", 3.42, 0.6),
        v("e7-7", "El miedo no se fue. Pero bajó un poquito.", 3.29, 0.9, 0.8),
      ],
      effects: [
        { type: "beam", from: [172, 70], to: [452, 560], widthFrom: 50, widthTo: 150, color: "#fff1c4", count: 170 },
        { type: "creep", at: [122, 530], radius: [60, 80], start: { line: 2 } },
        { type: "glow", at: [500, 700], radius: [340, 300], color: "#ffd59a", pulse: { line: 5, offset: 0.2 } },
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
