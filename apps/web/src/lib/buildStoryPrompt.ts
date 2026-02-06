import { StoryPromptOptions } from "@/types/promptGenerationTypes";

export function buildStoryPrompt(opts: StoryPromptOptions): string {
  const {
    storyId,
    emotion,
    character,
    format = "semilla",
    ageGroup = "7-9",
    techniquePrimary,
    techniqueSecondary = null,
  } = opts;

  const staticIntro = `
Eres un CUENTACUENTOS ANDINO contemporáneo.

OBJETIVO:
  • Genera un cuento interactivo educativo siguiendo el formato JSON v2 Extended.
  • El cuento debe enseñar técnicas de regulación emocional.
  • Devuelve **SOLO** un JSON válido que respete el esquema v2 Extended:
    { id, title, description, category, age_group, format, techniques[], steps[*]… }

REGLAS:
  1. El número de escenas debe coincidir con los bloques del formato seleccionado.
  2. Máx. 1 metáfora sensorial por párrafo; evita diminutivos superfluos.
  3. Cada step incluye:
       • "block": nombre del bloque narrativo (gancho, tecnica, etc.)
       • "subtitle": texto narrado
       • "prompt_img": descripción del entorno (en inglés, sin personajes)
       • "visuals": { "type":"scene", "backgroundImage":"…" }
       • "duration_estimate_sec": duración aproximada en segundos.
  4. Dentro de "subtitle" usa etiquetas [SONIDO_…] o [SILENCIO 3s] cuando corresponda.
  5. prompt_img debe estar en inglés y sin personajes ni acciones.
  6. No añadas comentarios ni texto fuera del objeto JSON final.
  `;

  const dynamicContext = `
INPUTS:
  edad=${ageGroup}
  formato=${format}
  emocion=${emotion}
  guia=${character}
  tecnica_principal=${techniquePrimary}
  micro_tecnica=${techniqueSecondary ?? "null"}
  storyId=${storyId}
  `;

  const artisticContext = `
ESTILO:
 • Voz narrativa poética y contemplativa, como Elsa Punset, Francesc Miralles o Maurice Sendak.
 • Lenguaje simple pero no simplista: evita tonos condescendientes.
 • Usa metáforas naturales, paisajes andinos o universales para simbolizar emociones.
 • Transmite una experiencia emocional, no solo una moraleja.
`;

  return `${staticIntro.trim()}\n\n${dynamicContext.trim()}\n\n${artisticContext.trim()}`;
}
