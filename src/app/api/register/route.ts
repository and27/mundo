import { createFacilitatorProfile } from "@/lib/supabaseDB";
import { supabase } from "../../../lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

const passwordMinLength = 8;

const getPasswordError = (password: string) => {
  if (password.length < passwordMinLength) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "La contraseña debe incluir letras y numeros.";
  }
  return "";
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, role } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const passwordError = getPasswordError(password);
  if (passwordError) {
    return NextResponse.json({ error: passwordError }, { status: 400 });
  }

  const allowedRoles: string[] = ["parent", "educator"];
  if (role && !allowedRoles.includes(role)) {
    return NextResponse.json(
      { error: "Rol no válido proporcionado" },
      { status: 400 },
    );
  }

  try {
    const { data: signUpData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      let errorMessage = "Error en el registro.";
      if (authError.message.includes("already registered")) {
        errorMessage = "Este correo electrónico ya está registrado.";
      } else if (authError.message.includes("Password should be at least")) {
        errorMessage =
          "La contraseña debe tener al menos 8 caracteres y contener letras y numeros.";
      } else {
        errorMessage = authError.message;
      }
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const actualUser = signUpData?.user;

    if (actualUser) {
      const { error: profileError } = await createFacilitatorProfile({
        id: actualUser.id,
        email: actualUser.email || "",
        role: role,
      });
      if (profileError) {
        console.error(
          "Profile creation failed after auth user creation:",
          profileError,
        );
        try {
          const { error: deleteAuthUserError } =
            await supabase.auth.admin.deleteUser(actualUser.id);
          if (deleteAuthUserError) {
            console.error(
              "CRITICAL: Failed to delete auth user after profile creation failure:",
              deleteAuthUserError,
            );
          }
        } catch (cleanupError) {
          console.error(
            "CRITICAL: Exception during auth user cleanup:",
            cleanupError,
          );
        }
        return NextResponse.json(
          {
            error:
              "Error al crear el perfil de usuario después del registro. Se intentó revertir el registro.",
          },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        {
          error:
            "No se pudo obtener la información del usuario después del registro.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Registro exitoso", userId: actualUser.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Server error during registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
