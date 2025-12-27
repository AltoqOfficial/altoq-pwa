// app/api/auth/logout/route.ts
import { supabaseAuthRepository } from "@/repositories/auth/supabase-repository";
import { createAuthService } from "@/services/auth/auth-service";
import { AuthService } from "@/services/auth/auth-service-interface";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";
import type { LogoutSuccessResponse } from "@/types/auth";
import { supabaseProfileRepository } from "@/repositories/profile/supabase-profile-repository";
const authService: AuthService = createAuthService(
  supabaseAuthRepository,
  supabaseProfileRepository
);

/**
 * Logout de usuario
 * @description Cierra la sesión activa del usuario en Supabase
 * @response LogoutSuccessResponse
 * @auth bearer
 * @tag Auth
 * @openapi
 */
export async function POST() {
  try {
    await authService.logout();

    const response: LogoutSuccessResponse = {
      message: "Sesión cerrada",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
}
