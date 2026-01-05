import { NextResponse } from "next/server";
import { createParentGuidePromptV2 } from "@/lib/prompts";
// import { createAuditorPrompt } from "@/lib/prompts"; // COMENTADO PARA DEMO - Reactivar en producción
import OpenAI from "openai";
import { getAuthUser } from "@/lib/apiAuth";
import { parseLlmJson } from "@/lib/llm/parse";
import { normalizeParentGuide } from "@/lib/llm/normalize/parentGuide";
import type { ParentGuideV1 } from "@/schemas/parentGuide.v1";
import type { ParentGuideV2 } from "@/schemas/parentGuide.v2";

// ✅ FUNCIÓN ORIGINAL - DeepSeek
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

// 🆕 NUEVA FUNCIÓN - OpenAI
async function callOpenAI(prompt: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini", // Modelo más potente y reciente
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    response_format: { type: "json_object" },
    max_tokens: 2000,
  });

  if (!response.choices[0]?.message?.content) {
    throw new Error("No content received from OpenAI API");
  }

  return response.choices[0].message.content;
}

export async function POST(request: Request) {
  try {
    const { user, error } = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error }, { status: 401 });
    }
    const body = await request.json();
    const userQuery = body.query;

    const useOpenAI = body.useOpenAI || false;

    if (!userQuery) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const aiProvider = useOpenAI ? "OpenAI" : "DeepSeek";
    console.log(
      `Aynia (${aiProvider}) - Generando cuento personalizado con metodología MIM...`
    );

    const generatorPrompt = createParentGuidePromptV2(userQuery);

    // 🎯 USAR LA FUNCIÓN SEGÚN EL PARÁMETRO
    const guideString = useOpenAI
      ? await callOpenAI(generatorPrompt)
      : await callDeepSeek(generatorPrompt);

    console.log(`Aynia (${aiProvider}) - Guía generada exitosamente.`);

    /*
    // REACTIVAR EN PRODUCCIÓN: Sistema dual Aynia + Ayni Guard
    console.log(`Ayni Guard (${aiProvider}) - Auditando y refinando contenido...`);
    const auditorPrompt = createAuditorPrompt(guideString);
    const finalGuideString = useOpenAI 
      ? await callOpenAI(auditorPrompt)
      : await callDeepSeek(auditorPrompt);
    console.log(`Ayni Guard (${aiProvider}) - Auditoría completada.`);
    const finalGuide: ActionableGuide = JSON.parse(finalGuideString);
    */

    // Usar directamente la respuesta de Aynia para demo
    const parsed = parseLlmJson<ParentGuideV1 | ParentGuideV2>(
      guideString,
      "parent_guide.v2"
    );
    if (!parsed.ok) {
      console.error("Invalid LLM response:", parsed.error);
      return NextResponse.json(
        { error: "Invalid AI response.", details: parsed.error },
        { status: 502 }
      );
    }

    const finalGuide = normalizeParentGuide(parsed.data);

    return NextResponse.json({
      ...finalGuide,
      _metadata: { aiProvider, schemaVersion: parsed.schemaVersion }, // Para saber cuál se usó
    });
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
