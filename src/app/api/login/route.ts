import { supabase } from "../../../lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "El correo electrónico y la contraseña son obligatorios" },
        { status: 400 }
      );
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      let errorMessage = "Error al iniciar sesión.";
      if (authError.message.includes("Invalid login credentials")) {
        errorMessage = "El correo electrónico o la contraseña son incorrectos.";
      } else {
        errorMessage = authError.message;
      }
      return NextResponse.json({ error: errorMessage }, { status: 401 });
    }

    if (!data.user) {
      return NextResponse.json(
        {
          error: "No se pudo obtener la información del usuario tras el login.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Inicio de sesión exitoso", user: data.user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error during login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
