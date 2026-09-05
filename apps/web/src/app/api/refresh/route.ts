import { NextResponse } from "next/server";
import { createAuthClient } from "@/lib/supabaseServer";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  getCookieValue,
} from "@/lib/authCookies";

const clearSessionCookies = (response: NextResponse) => {
  const isProduction = process.env.NODE_ENV === "production";
  for (const name of [ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE]) {
    response.cookies.set({
      name,
      value: "",
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }
  return response;
};

export async function POST(request: Request) {
  const refreshToken = getCookieValue(
    request.headers.get("cookie"),
    REFRESH_TOKEN_COOKIE
  );

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No hay sesion que renovar." },
      { status: 401 }
    );
  }

  const { data, error } = await createAuthClient().auth.refreshSession({
    refresh_token: refreshToken,
  });

  const session = data?.session;
  if (error || !session?.access_token || !session?.refresh_token) {
    // El refresh token esta revocado o caducado: no sirve de nada conservarlo.
    return clearSessionCookies(
      NextResponse.json({ error: "Sesion expirada." }, { status: 401 })
    );
  }

  const response = NextResponse.json({ userId: data.user?.id ?? null });
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: session.access_token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: session.expires_in ?? 3600,
  });

  response.cookies.set({
    name: REFRESH_TOKEN_COOKIE,
    value: session.refresh_token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
