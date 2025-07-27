import { supabase } from "../../../lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error during logout:", error);
      return NextResponse.json(
        { error: "Error al cerrar sesión" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Sesión cerrada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error during logout:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
