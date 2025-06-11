import { NextResponse } from "next/server";
import { create3PillarGuidePrompt, createAuditorPrompt } from "@/lib/prompts";
import { ActionableGuide } from "@/types/ai";

export const maxDuration = 60;

function createActionableGuidePrompt(userQuery: string): string {
  return `Como Ayni Guard, experto en bienestar emocional infantil con enfoque cultural andino, crea una guía de apoyo inmediato para: "${userQuery}"

RESPONDE ÚNICAMENTE CON JSON VÁLIDO en este formato EXACTO:
{
  "id": "guide-" + timestamp + "-" + random,
  "guideTitle": "Título empático y esperanzador para la situación",
  "metaphorStory": "Una historia metafórica inspirada en la cultura andina que ayude al niño/a a entender y procesar la situación. Debe ser breve (2-3 párrafos), apropiada para 8-12 años, e incluir elementos como montañas, cóndores, chakras, pachamama, etc. La historia debe reflejar el desafío emocional y ofrecer una resolución esperanzadora.",
  "conversationPlan": {
    "questionsToExplore": [
      "Pregunta abierta para iniciar diálogo sobre la emoción",
      "Segunda pregunta para profundizar en la experiencia",
      "Tercera pregunta de exploración emocional más específica"
    ],
    "phrasesToValidate": [
      "Frase empática para validar la emoción del niño",
      "Frase para normalizar la experiencia emocional",
      "Frase para mostrar comprensión y apoyo"
    ]
  },
  "suggestedActivity": {
    "title": "Nombre descriptivo de la actividad",
    "description": "Descripción clara y motivadora de qué hará el niño y cómo le ayudará emocionalmente",
    "materials": "Lista simple de materiales necesarios, separados por comas"
  },
  "tags": ["emoción1", "emoción2", "temática", "edad", "contexto"],
  "riskAssessment": {
    "riskLevel": "normal" | "attention" | "professional_required",
    "confidence": 0.85,
    "reasoning": "Explicación clara de por qué se asigna este nivel de riesgo basado en la consulta",
    "derivationNote": "Nota adicional sobre factores considerados para la evaluación (opcional)"
  }
}

IMPORTANTE:
- Enfócate en miedos e ira como emociones núcleo validadas por expertos
- El metaphorStory debe usar elementos andinos auténticos y ser resonante
- questionsToExplore debe empoderar al adulto guía con preguntas específicas
- phrasesToValidate debe dar frases concretas para validar emociones
- suggestedActivity debe ser práctica, accesible y offline
- tags debe incluir emociones principales identificadas
- riskAssessment debe evaluar apropiadamente: "normal" para situaciones típicas, "attention" para señales de alerta, "professional_required" para banderas rojas
- Todo el contenido debe ser apropiado para niños 8-12 años y sus guías adultos`;
}

async function callDeepSeek(prompt: string): Promise<string> {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente especializado que SIEMPRE responde ÚNICAMENTE con JSON válido. No agregues texto adicional, explicaciones, ni formato markdown. El JSON debe seguir exactamente la estructura solicitada.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      stream: false,
      response_format: { type: "json_object" },
      max_tokens: 3000, // Aumentar para contenido más rico
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("DeepSeek API Error:", errorText);
    throw new Error(`Failed to fetch response from AI. Details: ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userQuery = body.query;

    if (!userQuery) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    console.log("Ayni Guard - Generando guía ActionableGuide...");

    // Usar prompt actualizado que coincide con la interfaz
    const prompt = createActionableGuidePrompt(userQuery);
    const guideString = await callDeepSeek(prompt);

    console.log("Ayni Guard - Guía generada exitosamente.");

    const finalGuide: ActionableGuide = JSON.parse(guideString);

    if (!finalGuide.id) {
      finalGuide.id = `guide-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }

    return NextResponse.json(finalGuide);
  } catch (error) {
    console.error("Error:", error);

    const fallbackGuide: ActionableGuide = {
      id: `fallback-${Date.now()}`,
      guideTitle: "Guía de Apoyo Inmediato - Respiración y Calma",
      metaphorStory:
        "En las altas montañas de nuestros ancestros, cuando las nubes grises cubren el cielo, el pequeño cóndor aprende a volar por encima de la tormenta. Al principio siente miedo y sus alas tiemblan, pero su mamá cóndor le enseña que respirando profundo y moviendo sus alas con confianza, puede elevarse hasta donde brilla el sol. Así como el cóndor encuentra su fuerza interior, tú también puedes encontrar tu calma respirando como las montañas: lento, profundo y constante.",
      conversationPlan: {
        questionsToExplore: [
          "¿Cómo te sientes en este momento?",
          "¿Puedes contarme qué está pasando por tu mente?",
          "¿Dónde sientes esa emoción en tu cuerpo?",
        ],
        phrasesToValidate: [
          "Entiendo que te sientes así, es completamente normal",
          "Lo que me dices es muy importante y valioso",
          "Eres muy valiente por compartir esto conmigo",
        ],
      },
      suggestedActivity: {
        title: "Respiración del Cóndor",
        description:
          "Una técnica de respiración inspirada en el vuelo majestuoso del cóndor andino para encontrar calma y equilibrio interior",
        materials:
          "Un lugar cómodo para sentarse, imaginación, ganas de sentirse mejor",
      },
      tags: ["respiración", "calma", "ansiedad", "miedo", "autoregulación"],
      riskAssessment: {
        riskLevel: "normal",
        confidence: 0.9,
        reasoning:
          "Situación estándar de apoyo emocional que puede manejarse con técnicas básicas de regulación",
        derivationNote:
          "Fallback generado automáticamente por error técnico, evaluar situación específica",
      },
    };

    return NextResponse.json(fallbackGuide);
  }
}
