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

    return NextResponse.json(
      {
        message: "Inicio de sesión exitoso",
        userId: data.user.id,
        email: data.user.email,
        role: profile?.role || "parent",
        display_name: profile?.display_name || data.user.email?.split("@")[0],
        accessToken: data.session?.access_token ?? null,
      },
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


