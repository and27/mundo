import { supabase } from "../../../lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/authCookies";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "El correo electronico y la contrasena son obligatorios" },
        { status: 400 }
      );
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      let errorMessage = "Error al iniciar sesion.";
      if (authError.message.includes("Invalid login credentials")) {
        errorMessage = "El correo electronico o la contrasena son incorrectos.";
      }
      return NextResponse.json({ error: errorMessage }, { status: 401 });
    }

    if (!data.user) {
      return NextResponse.json(
        {
          error: "No se pudo obtener la informacion del usuario tras el login.",
        },
        { status: 500 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      const { error: createError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email!,
        role: "parent",
        display_name: data.user.email!.split("@")[0],
        current_mode: "individual",
      });

      if (createError) {
        console.error("Error creating missing profile:", createError);
      }
    }

    const accessToken = data.session?.access_token;
    const refreshToken = data.session?.refresh_token;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "No se pudo iniciar la sesion correctamente." },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      {
        message: "Inicio de sesion exitoso",
        userId: data.user.id,
        email: data.user.email,
        role: profile?.role || "parent",
        display_name: profile?.display_name || data.user.email?.split("@")[0],
      },
      { status: 200 }
    );

    const isProduction = process.env.NODE_ENV === "production";
    const accessMaxAge = data.session?.expires_in ?? 3600;

    response.cookies.set({
      name: ACCESS_TOKEN_COOKIE,
      value: accessToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: accessMaxAge,
    });

    response.cookies.set({
      name: REFRESH_TOKEN_COOKIE,
      value: refreshToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("Server error during login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


