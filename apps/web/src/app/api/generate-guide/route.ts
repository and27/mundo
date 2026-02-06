import { NextResponse } from "next/server";
import { createParentGuidePromptV2, createAuditorPrompt } from "@/lib/prompts";
import OpenAI from "openai";
import { getAuthUser } from "@/lib/apiAuth";
import { parseLlmJson } from "@/lib/llm/parse";
import { normalizeParentGuide } from "@/lib/llm/normalize/parentGuide";
import { buildRateLimitHeaders, checkRateLimit } from "@/lib/rateLimit";
import { mapEmotionLabel } from "@/lib/emotionMapping";
import { classifyEmotionLabel } from "@/lib/llm/emotionClassifier";
import type { EmotionId } from "@/types/ai";
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
const EMOTION_CLASSIFIER_MIN_CONFIDENCE = toNumber(
  process.env.EMOTION_CLASSIFIER_MIN_CONFIDENCE,
  0.6
);
const AI_GUARDRAILS_ENABLED = process.env.AI_GUARDRAILS_ENABLED !== "false";
const GUIDE_DIAGNOSTICS_ENABLED =
  process.env.GUIDE_DIAGNOSTICS_ENABLED === "true" ||
  process.env.NODE_ENV !== "production";

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

function hasMetaphorSection(text: string): boolean {
  if (!text) return false;
  return /"kind"\s*:\s*"metaphor"/i.test(text);
}

function tryParseJson(value: string): Record<string, unknown> | null {
  try {
    const match = value.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function buildFallbackGuide(userQuery: string, raw?: unknown) {
  const rawObj = typeof raw === "string" ? tryParseJson(raw) : null;
  const rawEmotion =
    (rawObj?.emotion as string | undefined) ??
    (rawObj?.emotionId as string | undefined);
  const emotion = mapEmotionLabel(rawEmotion) ?? "miedo";
  const guideTitle =
    (rawObj?.guideTitle as string | undefined) ??
    `Cuento para acompañar ${emotion}`;
  const id =
    (rawObj?.id as string | undefined) ?? `guide_${Date.now()}`;
  const metaphor =
    `En un valle tranquilo, un niño llamado Inti sintió ${emotion}. ` +
    `Con la ayuda de su guía, aprendió a respirar y escuchar su corazón, ` +
    `descubriendo que todas las emociones pueden cuidarse con calma.`;

  return {
    schema_version: "parent_guide.v2",
    id,
    guideTitle,
    emotion,
    tags: [],
    sections: [
      {
        kind: "metaphor",
        title: "Cuento",
        content: metaphor,
      },
      {
        kind: "language",
        title: "Acompañamiento",
        phrases: [
          `Entiendo que sientas ${emotion}.`,
          "Estoy aquí contigo.",
        ],
        questions: [
          "¿Dónde lo sientes en tu cuerpo?",
          "¿Qué crees que necesita esa emoción?",
          "¿Qué te ayudaría ahora mismo?",
        ],
      },
      {
        kind: "practice",
        title: "Respiración suave",
        description:
          "Inhalen contando 4, sostengan 2, exhalen 6. Repetir 3 veces.",
        materials: "Ninguno.",
      },
    ],
  };
}

type EmotionResolution =
  | { ok: true; emotionId: EmotionId; source: "manual" | "inferred" }
  | { ok: false; error: string };

function isVagueQuery(text: string): boolean {
  const normalized = text.toLowerCase();
  const patterns = [
    "no se que pasa",
    "no sé qué pasa",
    "no se que decir",
    "no sé qué decir",
    "no se que hacer",
    "no sé qué hacer",
    "no entiendo",
    "no estoy seguro",
    "no estoy segura",
    "no tengo claro",
    "no tengo idea",
    "no sé",
    "no se",
  ];
  return patterns.some((pattern) => normalized.includes(pattern));
}

async function resolveEmotionForGuide(
  userQuery: string,
  manualEmotion?: string
): Promise<EmotionResolution> {
  if (manualEmotion) {
    const normalized = mapEmotionLabel(manualEmotion);
    if (!normalized) {
      return {
        ok: false,
        error:
          "La emoción seleccionada no es válida. Por favor, elige una emoción disponible.",
      };
    }
    return { ok: true, emotionId: normalized, source: "manual" };
  }

  if (isVagueQuery(userQuery)) {
    return {
      ok: false,
      error:
        "No pudimos inferir la emoción. Elige cuál es la emoción que más representa lo que nos cuentas.",
    };
  }

  const direct = mapEmotionLabel(userQuery);
  if (direct) {
    return { ok: true, emotionId: direct, source: "inferred" };
  }

  const classified = await classifyEmotionLabel(userQuery, AI_TIMEOUT_MS);
  if (
    classified?.emotion &&
    (classified.confidence ?? 0) >= EMOTION_CLASSIFIER_MIN_CONFIDENCE
  ) {
    return { ok: true, emotionId: classified.emotion, source: "inferred" };
  }

  return {
    ok: false,
    error:
      "No pudimos inferir la emoción. Elige cuál es la emoción que más representa lo que nos cuentas.",
  };
}

function logGuideDiagnostics(label: string, text: string) {
  if (!GUIDE_DIAGNOSTICS_ENABLED) return;
  const tail = text.slice(-200);
  console.info(`[guide/diagnostics] ${label}`, {
    hasMetaphor: hasMetaphorSection(text),
    length: text.length,
    tail,
  });
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
    const manualEmotion =
      typeof body?.emotionId === "string" ? body.emotionId.trim() : "";

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

    const emotionResolution = await resolveEmotionForGuide(
      userQuery,
      manualEmotion
    );
    if (!emotionResolution.ok) {
      return NextResponse.json(
        { error: emotionResolution.error, requiresEmotionSelection: true },
        { status: 422, headers: rateHeaders }
      );
    }

    const aiProvider = useOpenAI ? "OpenAI" : "DeepSeek";
    const generatorPrompt = createParentGuidePromptV2(userQuery);

    const guideString = useOpenAI
      ? await callOpenAI(generatorPrompt, AI_TIMEOUT_MS)
      : await callDeepSeek(generatorPrompt, AI_TIMEOUT_MS);

    let finalGuideString = guideString;
    logGuideDiagnostics("generator", guideString);

    if (AI_GUARDRAILS_ENABLED) {
      try {
        const auditorPrompt = createAuditorPrompt(guideString);
        const auditedGuide = useOpenAI
          ? await callOpenAI(auditorPrompt, AI_TIMEOUT_MS)
          : await callDeepSeek(auditorPrompt, AI_TIMEOUT_MS);
        logGuideDiagnostics("auditor", auditedGuide);
        if (!hasMetaphorSection(auditedGuide)) {
          console.warn(
            "Ayni Guard output missing metaphor; using original guide."
          );
          finalGuideString = guideString;
        } else {
          finalGuideString = auditedGuide;
        }
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
      const fallbackGuide = buildFallbackGuide(userQuery, finalGuideString);
      const normalizedFallback = normalizeParentGuide(
        fallbackGuide as ParentGuideV2
      );
      return NextResponse.json(
        {
          ...normalizedFallback,
          _metadata: {
            aiProvider,
            schemaVersion: "parent_guide.v2",
            guardrailsEnabled: AI_GUARDRAILS_ENABLED,
            fallback: "metaphor_missing",
          },
        },
        { headers: rateHeaders }
      );
    }

    parsed.data.emotion = emotionResolution.emotionId;

    const finalGuide = normalizeParentGuide(parsed.data);

    return NextResponse.json(
      {
        ...finalGuide,
        _metadata: {
          aiProvider,
          schemaVersion: parsed.schemaVersion,
          guardrailsEnabled: AI_GUARDRAILS_ENABLED,
          emotionSource: emotionResolution.source,
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
