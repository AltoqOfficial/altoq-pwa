// app/api/auth/login/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";
import type { LoginBody, LoginResponse } from "@/types/auth";
import { ApiError } from "@/types";

/**
 * Login de usuario
 * @description Inicia sesión con email y contraseña usando Supabase (SSR)
 */
export async function POST(request: NextRequest) {
  try {
    const body: LoginBody = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          message: "Email y password requeridos",
          status: 400,
          code: "missing_credentials",
        } satisfies ApiError,
        { status: 400 }
      );
    }

    // 1. Crear cliente Supabase SSR
    const supabase = await createClient();

    // 2. Iniciar sesión (esto setea las cookies automáticamente en la respuesta)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error || !data.user || !data.session) {
      throw {
        message: "Credenciales inválidas",
        status: 401,
        code: "invalid_credentials",
      } as ApiError;
    }

    // 3. Respuesta compatible
    const result: LoginResponse = {
      email: data.user.email!,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
}
