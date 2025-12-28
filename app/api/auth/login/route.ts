// app/api/auth/login/route.ts
import { supabaseAuthRepository } from "@/repositories/auth/supabase-repository";
import { supabaseProfileRepository } from "@/repositories/profile/supabase-profile-repository";
import { createAuthService } from "@/services/auth/auth-service";
import { AuthService } from "@/services/auth/auth-service-interface";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";
import type { LoginBody, LoginResponse } from "@/types/auth";
import { ApiError } from "@/types";
import { supabaseAgeRangeRepository } from "@/repositories/age-range/age-range-supabase-repository";
import { supabaseMotivationRepository } from "@/repositories/motivation/motivation-supabase-repository";

const authService: AuthService = createAuthService(
  supabaseAuthRepository,
  supabaseProfileRepository,
  supabaseMotivationRepository,
  supabaseAgeRangeRepository
);

/**
 * Login de usuario
 * @description Inicia sesión con email y contraseña usando Supabase
 * @body LoginBody
 * @response LoginResponse
 * @auth bearer
 * @tag Auth
 * @openapi
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

    const result: LoginResponse = await authService.login(
      body.email,
      body.password
    );

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
}
