import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";
import { buildRateLimitHeaders, checkRateLimit } from "@/lib/rateLimit";
import { LEAD_CITIES, LEAD_ROLES } from "@/lib/leads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UNIQUE_VIOLATION = "23505";

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

export async function POST(request: Request) {
  const limit = checkRateLimit(`leads:${clientIp(request)}`, 5, 60_000);
  const headers = buildRateLimitHeaders(limit);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos. Prueba de nuevo en un minuto." },
      { status: 429, headers }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400, headers });
  }

  // Campo trampa: invisible para personas, los bots lo rellenan.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { headers });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const city = typeof body.city === "string" ? body.city : "";
  const role = typeof body.role === "string" ? body.role : "";
  const consent = body.consent === true;
  const source =
    typeof body.source === "string" ? body.source.slice(0, 60) || null : null;

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Escribe tu nombre." }, { status: 400, headers });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Revisa tu correo." }, { status: 400, headers });
  }
  if (!(LEAD_CITIES as readonly string[]).includes(city)) {
    return NextResponse.json({ error: "Elige tu ciudad." }, { status: 400, headers });
  }
  if (!(LEAD_ROLES as readonly string[]).includes(role)) {
    return NextResponse.json({ error: "Elige a qué te dedicas." }, { status: 400, headers });
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Necesitamos tu permiso para escribirte." },
      { status: 400, headers }
    );
  }

  const { error } = await supabase
    .from("professional_leads")
    .insert({ name, email, city, role, consent, source });

  // Si ya se habia registrado con ese correo, no es un error para esa persona.
  if (error && error.code !== UNIQUE_VIOLATION) {
    console.error("[leads] No se pudo guardar el contacto:", error);
    return NextResponse.json(
      { error: "No pudimos guardar tus datos." },
      { status: 500, headers }
    );
  }

  return NextResponse.json({ ok: true }, { headers });
}
