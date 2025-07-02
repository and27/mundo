import { NextResponse } from "next/server";
import { create3PillarGuidePrompt } from "@/lib/prompts";
// import { createAuditorPrompt } from "@/lib/prompts"; // COMENTADO PARA DEMO - Reactivar en producción
import { ActionableGuide } from "@/types/ai";

async function callDeepSeek(prompt: string): Promise<string> {
  const response = await fetch(process.env.DEEPSEEK_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      stream: false,
      response_format: { type: "json_object" },
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

    console.log("Aynia - Generando guía personalizada con metodología MIM...");
    const generatorPrompt = create3PillarGuidePrompt(userQuery);
    const guideString = await callDeepSeek(generatorPrompt);
    console.log("Aynia - Guía generada exitosamente.");

    /*
    // REACTIVAR EN PRODUCCIÓN: Sistema dual Aynia + Ayni Guard
    console.log("Ayni Guard - Auditando y refinando contenido...");
    const auditorPrompt = createAuditorPrompt(guideString);
    const finalGuideString = await callDeepSeek(auditorPrompt);
    console.log("Ayni Guard - Auditoría completada.");
    const finalGuide: ActionableGuide = JSON.parse(finalGuideString);
    */

    // Usar directamente la respuesta de Aynia para demo
    const finalGuide: ActionableGuide = JSON.parse(guideString);

    return NextResponse.json(finalGuide);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Internal Server Error:", error.message);
      return NextResponse.json(
        { error: "An internal server error occurred", details: error.message },
        { status: 500 }
      );
    }
  }
}
