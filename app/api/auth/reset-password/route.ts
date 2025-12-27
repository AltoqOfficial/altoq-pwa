// app/api/auth/reset-password/route.ts
import { supabaseAuthRepository } from "@/repositories/auth/supabase-repository";
import { createAuthService } from "@/services/auth/auth-service";
import { AuthService } from "@/services/auth/auth-service-interface";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";
import type {
  ResetPasswordBody,
  ResetPasswordSuccessResponse,
} from "@/types/auth";
import { supabaseProfileRepository } from "@/repositories/profile/supabase-profile-repository";
import { ApiError } from "@/types";

const authService: AuthService = createAuthService(
  supabaseAuthRepository,
  supabaseProfileRepository
);

/**
 * Reset password
 * @description Envía un correo de recuperación de contraseña al usuario
 * @body ResetPasswordBody
 * @response ResetPasswordSuccessResponse
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    const { email, redirectTo }: ResetPasswordBody = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          message: "Email requerido",
          status: 400,
          code: "missing_email",
        } satisfies ApiError,
        { status: 400 }
      );
    }

    await authService.resetPassword(email, redirectTo);

    const response: ResetPasswordSuccessResponse = {
      message: "Correo de recuperación enviado",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
}
