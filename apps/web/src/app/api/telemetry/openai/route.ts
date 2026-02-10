import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/apiAuth";
import { getOpenAIMetricsSnapshot } from "@/lib/telemetry/openaiMetrics";

export async function GET(request: Request) {
  const { user } = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  return NextResponse.json(getOpenAIMetricsSnapshot());
}
