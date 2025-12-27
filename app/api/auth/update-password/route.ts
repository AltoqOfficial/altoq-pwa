// app/api/auth/update-password/route.ts
import { supabaseAuthRepository } from "@/repositories/auth/supabase-repository";
import { createAuthService } from "@/services/auth/auth-service";
import { AuthService } from "@/services/auth/auth-service-interface";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";
import type {
  UpdatePasswordBody,
  UpdatePasswordSuccessResponse,
} from "@/types/auth";
import { supabaseProfileRepository } from "@/repositories/profile/supabase-profile-repository";
import { ApiError } from "@/types";

const authService: AuthService = createAuthService(
  supabaseAuthRepository,
  supabaseProfileRepository
);

/**
 * Update password
 * @description Actualiza la contraseña del usuario autenticado en Supabase
 * @body UpdatePasswordBody
 * @response UpdatePasswordSuccessResponse
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    const { newPassword }: UpdatePasswordBody = await request.json();

    if (!newPassword) {
      return NextResponse.json(
        {
          message: "Nueva contraseña requerida",
          status: 400,
          code: "missing_password",
        } satisfies ApiError,
        { status: 400 }
      );
    }

    await authService.updatePassword(newPassword);

    const response: UpdatePasswordSuccessResponse = {
      message: "Contraseña actualizada correctamente",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
}
