import { NextResponse } from "next/server";
import { create3PillarGuidePrompt, createAuditorPrompt } from "@/lib/prompts";
import { ActionableGuide } from "@/types/ai";

async function callDeepSeek(prompt: string): Promise<string> {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
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

    console.log("Ayni Guard - Paso 1: Generando borrador creativo...");
    const generatorPrompt = create3PillarGuidePrompt(userQuery);
    const draftGuideString = await callDeepSeek(generatorPrompt);
    console.log("Ayni Guard - Borrador generado.");

    console.log("Ayni Guard - Paso 2: Auditando y refinando contenido...");
    const auditorPrompt = createAuditorPrompt(draftGuideString);
    const finalGuideString = await callDeepSeek(auditorPrompt);
    console.log("Ayni Guard - Auditoría completada.");

    const finalGuide: ActionableGuide = JSON.parse(finalGuideString);
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
