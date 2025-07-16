import { StoryPromptOptions } from "@/types/promptGenerationTypes";

/**
 * Construye el prompt maestro que se envía al LLM.
 * – Respeta el esquema JSON v2 Extended (Manual de Historias).
 * – Devuelve **solo** el texto del prompt (sin salto de línea final extra).
 */
export function buildStoryPrompt(opts: StoryPromptOptions): string {
  const {
    storyId,
    emotion,
    character,
    format = "semilla", // "semilla" | "sendero" | "ceremonia"
    ageGroup = "7-9", // "0-3" | "4-6" | "7-9" | "10-12"
    techniquePrimary,
    techniqueSecondary = null, // puede ser null
  } = opts;

  return `
Eres un CUENTACUENTOS ANDINO contemporáneo.

INPUTS:
  edad=${ageGroup} | formato=${format} | emocion=${emotion} | guia=${character} | tecnica_principal=${techniquePrimary} | micro_tecnica=${
    techniqueSecondary ?? "null"
  } | storyId=${storyId}

OBJETIVO:
  • Genera un cuento interactivo que enseñe **${techniquePrimary}** y ayude con la emoción **${emotion}**.
  • Sigue la plantilla de bloques definida para el formato **${format}** (ver Manual §4).
  • Devuelve **SOLO** un JSON válido que respete el esquema v2 Extended (id, title, description, category, age_group, format, techniques[], steps[*]…).

REGLAS:
  1. El número de escenas = número de bloques del formato seleccionado.
  2. Máx. 1 metáfora sensorial por párrafo; evita diminutivos superfluos.
  3. Cada step incluye:
       • "block": nombre de bloque narrativo (gancho, tecnica, etc.)
       • "subtitle": texto narrado
       • "prompt_img": descripción del entorno (en inglés, **sin personajes**)
       • "visuals": { "type":"scene", "backgroundImage":"…" }
       • "duration_estimate_sec": duración aproximada en segundos
  4. Dentro de "subtitle" usa etiquetas [SONIDO_…] o [SILENCIO 3s] cuando corresponda a la técnica.
  5. \`prompt_img\` debe estar en inglés y **sin personajes ni acciones**.
  6. No añadas comentarios ni texto fuera del objeto JSON final.
`.trim();
}
