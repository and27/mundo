import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/apiAuth";
import { buildRateLimitHeaders, checkRateLimit } from "@/lib/rateLimit";
import { resolveEmotionForGuide } from "@/lib/emotionResolution";

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const AI_RATE_LIMIT_MAX = toNumber(process.env.AI_RATE_LIMIT_MAX, 10);
const AI_RATE_LIMIT_WINDOW_MS = toNumber(
  process.env.AI_RATE_LIMIT_WINDOW_MS,
  60000
);

function getClientKey(request: Request, userId: string): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const forwardedIp = forwarded.split(",")[0]?.trim();
  const ip = forwardedIp || request.headers.get("x-real-ip") || "unknown";
  return `${userId}:${ip}`;
}

export async function POST(request: Request) {
  const { user } = await getAuthUser(request);
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
  const manualEmotion =
    typeof body?.emotionId === "string" ? body.emotionId.trim() : "";

  if (!userQuery) {
    return NextResponse.json(
      { error: "Debes escribir una consulta." },
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

  return NextResponse.json(
    {
      emotionId: emotionResolution.emotionId,
      source: emotionResolution.source,
    },
    { headers: rateHeaders }
  );
}
