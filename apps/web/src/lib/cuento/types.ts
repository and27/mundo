// Modelo de datos del reproductor de cuentos "mágicos".
// Una escena = una ilustración + frases narradas + efectos (cámara, luz, partículas).
// Las coordenadas están en píxeles de la imagen original (no de la pantalla).

export type Point = [number, number];

/** Una frase narrada. El texto admite *palabras sonoras* entre asteriscos. */
export interface Line {
  text: string;
  /** Duración en segundos. Cuando haya voz, se reemplaza por la duración del audio. */
  dur: number;
  /** Silencio antes de la frase (s). Por defecto 0.3. */
  gap?: number;
  /** Lo que dice la voz, si difiere del texto (p. ej. sin onomatopeyas, que son efectos). */
  say?: string;
  /** Audio de la voz para esta frase. */
  audio?: string;
  /** Duración de la voz (s). Las palabras se sincronizan con ella. */
  voice?: number;
}

/** Efecto de sonido atado a un momento del guion. */
export interface Sound {
  src: string;
  at: Cue;
  gain?: number;
}

/**
 * Momento del guion al que se ata un efecto.
 * `word` es el índice de la palabra dentro de la frase; -1 = final de la frase.
 */
export interface Cue {
  line: number;
  word?: number;
  /** Desfase extra en segundos. */
  offset?: number;
}

export type Effect =
  /** Rayo de luz con polvo flotando dentro. */
  | {
      type: "beam";
      from: Point;
      to: Point;
      widthFrom: number;
      widthTo: number;
      color?: string;
      count?: number;
      /** El rayo se intensifica en este momento. */
      boost?: Cue;
      /** Ráfaga de viento que agita el polvo. */
      gust?: Cue;
    }
  /** Pelusas o polen flotando con la luz. */
  | { type: "pollen"; area: [number, number, number, number]; count?: number; until?: Cue }
  /** Resplandor de sol (pantalla). */
  | { type: "sun"; at: Point; radius: Point; until?: Cue }
  /** Resplandor cálido (cueva, ventana). Pulsa en `pulse` y se queda encendido desde `on`. */
  | { type: "glow"; at: Point; radius: Point; color?: string; pulse?: Cue; on?: Cue }
  /** Vela encendida que se apaga en `out`. `cover` es el color del fondo detrás de la llama. */
  | { type: "candle"; flame: Point; cover: string; out: Cue }
  /** Atardecer: degradado oscuro desde arriba; la parte baja (texto) queda clara. */
  | { type: "dusk"; at: Cue; ramp?: number }
  /** La escena se oscurece desde arriba (noche dentro de la cueva). */
  | { type: "darken"; at: Cue; amount?: number; ramp?: number }
  | { type: "stars"; area: [number, number, number, number]; count?: number; at: Cue }
  /** Mariposa animada que revolotea alrededor de `home`. */
  | { type: "butterfly"; home: Point; leave?: Cue }
  /** Imagen recortada que cruza la escena (p. ej. el cóndor). */
  | { type: "sprite"; src: string; size: Point; from: Point; to: Point; start: Cue; dur: number }
  /** Pequeño golpe de cámara (p. ej. en "¡grrr!"). */
  | { type: "punch"; at: Cue }
  /** Penumbra que se desliza (la sombra "que se movía"). */
  | { type: "creep"; at: Point; radius: Point; start: Cue };

export interface Scene {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  /** Ambiente continuo de fondo (más largo que la escena). */
  bed?: string;
  bedGain?: number;
  /** Efectos de sonido puntuales. */
  sounds?: Sound[];
  /** Segundos antes de la primera frase. */
  lead?: number;
  /** Segundos después de la última frase. */
  tail?: number;
  camera: {
    /** Punto de la imagen hacia el que se acerca la cámara. */
    focal: Point;
    /** Zoom inicial y final (1 = imagen cubriendo la pantalla). */
    zoom: [number, number];
    /** Desplazamiento horizontal del foco durante la escena (px de imagen): paneo. */
    panX?: [number, number];
  };
  lines: Line[];
  effects: Effect[];
}

export interface ParentActivity {
  title: string;
  intro: string;
  steps: string[];
  phrase: string;
  questions: string[];
}

export interface CuentoStory {
  slug: string;
  title: string;
  subtitle: string;
  minutes: number;
  cover: string;
  scenes: Scene[];
  /** Escenas totales previstas (para mostrar "vista previa"). */
  plannedScenes?: number;
  activity: ParentActivity;
}
