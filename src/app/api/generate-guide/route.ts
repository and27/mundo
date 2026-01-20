import { NextResponse } from "next/server";
import { createParentGuidePromptV2, createAuditorPrompt } from "@/lib/prompts";
import OpenAI from "openai";
import { getAuthUser } from "@/lib/apiAuth";
import { parseLlmJson } from "@/lib/llm/parse";
import { normalizeParentGuide } from "@/lib/llm/normalize/parentGuide";
import { buildRateLimitHeaders, checkRateLimit } from "@/lib/rateLimit";
import type { ParentGuideV1 } from "@/schemas/parentGuide.v1";
import type { ParentGuideV2 } from "@/schemas/parentGuide.v2";

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const AI_TIMEOUT_MS = toNumber(process.env.AI_TIMEOUT_MS, 20000);
const AI_MAX_QUERY_LENGTH = toNumber(process.env.AI_MAX_QUERY_LENGTH, 800);
const AI_RATE_LIMIT_MAX = toNumber(process.env.AI_RATE_LIMIT_MAX, 10);
const AI_RATE_LIMIT_WINDOW_MS = toNumber(
  process.env.AI_RATE_LIMIT_WINDOW_MS,
  60000
);
const AI_GUARDRAILS_ENABLED = process.env.AI_GUARDRAILS_ENABLED !== "false";

type ParseResult =
  | {
      ok: true;
      data: ParentGuideV1 | ParentGuideV2;
      schemaVersion: string;
      raw: unknown;
    }
  | {
      ok: false;
      error: string;
      raw?: unknown;
    };

function getClientKey(request: Request, userId: string): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const forwardedIp = forwarded.split(",")[0]?.trim();
  const ip = forwardedIp || request.headers.get("x-real-ip") || "unknown";
  return `${userId}:${ip}`;
}

async function callDeepSeek(
  prompt: string,
  timeoutMs: number
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
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
        max_tokens: 2000,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API Error:", errorText);
      throw new Error("AI_PROVIDER_ERROR");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function callOpenAI(
  prompt: string,
  timeoutMs: number
): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: timeoutMs,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
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
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const rateLimitResult = checkRateLimit(
      getClientKey(request, user.id),
      AI_RATE_LIMIT_MAX,
      AI_RATE_LIMIT_WINDOW_MS
    );
    const rateHeaders = buildRateLimitHeaders(rateLimitResult);

    if (!rateLimitResult.ok) {
      return NextResponse.json(
        {
          error:
            "Has alcanzado el limite de solicitudes. Intenta de nuevo en unos minutos.",
        },
        { status: 429, headers: rateHeaders }
      );
    }

    const body = await request.json();
    const userQuery =
      typeof body?.query === "string" ? body.query.trim() : "";
    const useOpenAI = Boolean(body?.useOpenAI);

    if (!userQuery) {
      return NextResponse.json(
        { error: "Debes escribir una consulta." },
        { status: 400, headers: rateHeaders }
      );
    }

    if (userQuery.length > AI_MAX_QUERY_LENGTH) {
      return NextResponse.json(
        { error: "La consulta es demasiado larga." },
        { status: 400, headers: rateHeaders }
      );
    }

    const aiProvider = useOpenAI ? "OpenAI" : "DeepSeek";
    const generatorPrompt = createParentGuidePromptV2(userQuery);

    const guideString = useOpenAI
      ? await callOpenAI(generatorPrompt, AI_TIMEOUT_MS)
      : await callDeepSeek(generatorPrompt, AI_TIMEOUT_MS);

    let finalGuideString = guideString;

    if (AI_GUARDRAILS_ENABLED) {
      try {
        const auditorPrompt = createAuditorPrompt(guideString);
        finalGuideString = useOpenAI
          ? await callOpenAI(auditorPrompt, AI_TIMEOUT_MS)
          : await callDeepSeek(auditorPrompt, AI_TIMEOUT_MS);
      } catch (guardError) {
        console.error("Ayni Guard failed, using original guide:", guardError);
      }
    }

    const candidates =
      finalGuideString === guideString
        ? [guideString]
        : [finalGuideString, guideString];

    let parsed: ParseResult | null = null;

    for (const candidate of candidates) {
      const attempt = parseLlmJson<ParentGuideV1 | ParentGuideV2>(
        candidate,
        "parent_guide.v2"
      );
      if (attempt.ok) {
        parsed = attempt;
        break;
      }
      parsed = attempt;
    }

    if (!parsed?.ok) {
      console.error("Invalid LLM response:", parsed?.error);
      return NextResponse.json(
        { error: "No se pudo procesar la respuesta de IA." },
        { status: 502, headers: rateHeaders }
      );
    }

    const finalGuide = normalizeParentGuide(parsed.data);

    return NextResponse.json(
      {
        ...finalGuide,
        _metadata: {
          aiProvider,
          schemaVersion: parsed.schemaVersion,
          guardrailsEnabled: AI_GUARDRAILS_ENABLED,
        },
      },
      { headers: rateHeaders }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Ocurrio un error inesperado. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
