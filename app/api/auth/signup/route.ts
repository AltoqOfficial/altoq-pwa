// app/api/auth/signup/route.ts
import { supabaseAuthRepository } from "@/repositories/auth/supabase-repository";
import { supabaseProfileRepository } from "@/repositories/profile/supabase-profile-repository";
import { createAuthService } from "@/services/auth/auth-service";
import { AuthService } from "@/services/auth/auth-service-interface";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";
import type { SignUpRequest, SignUpResponse } from "@/types/auth";
import { ApiError } from "@/types";

const authService: AuthService = createAuthService(
  supabaseAuthRepository,
  supabaseProfileRepository
);

/**
 * Signup de usuario
 * @description Registra un nuevo usuario en Supabase con email, contraseña y perfil asociado
 * @body SignUpRequest
 * @response SignUpResponse
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    const body: SignUpRequest = await request.json();

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

    const result: SignUpResponse = await authService.signup(body);

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
}
