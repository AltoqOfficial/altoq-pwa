// app/api/auth/check-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { handleApiError } from "@/lib/api-error";
import type { ApiError } from "@/types";

interface CheckEmailRequest {
  email: string;
}

interface CheckEmailResponse {
  exists: boolean;
}

/**
 * Verifica si un email ya está registrado
 * @description Consulta si existe un usuario con el email proporcionado
 * @body CheckEmailRequest
 * @response CheckEmailResponse
 */
export async function POST(request: NextRequest) {
  try {
    const body: CheckEmailRequest = await request.json();

    if (!body.email) {
      return NextResponse.json(
        {
          message: "Email requerido",
          status: 400,
          code: "missing_email",
        } satisfies ApiError,
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          message: "Formato de email inválido",
          status: 400,
          code: "invalid_email",
        } satisfies ApiError,
        { status: 400 }
      );
    }

    // Check if supabase admin client is available
    if (!supabaseAdmin) {
      console.error(
        "SUPABASE_SERVICE_ROLE_KEY not configured. Cannot verify email."
      );
      return NextResponse.json(
        {
          message:
            "No se puede verificar el correo en este momento. Contacta al administrador.",
          status: 503,
          code: "service_unavailable",
        } satisfies ApiError,
        { status: 503 }
      );
    }

    // Use admin client to list users and check if email exists
    // Note: listUsers returns paginated results, we search for exact email match
    const { data: listData, error: listError } =
      await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 1000, // Get enough users to search through
      });

    if (listError) {
      console.error("Error listing users:", listError);
      return NextResponse.json(
        {
          message: "Error al verificar el correo. Intenta de nuevo.",
          status: 500,
          code: "check_email_error",
        } satisfies ApiError,
        { status: 500 }
      );
    }

    // Check if any user has this email
    const exists = listData.users.some(
      (user) => user.email?.toLowerCase() === body.email.toLowerCase()
    );

    return NextResponse.json({ exists } satisfies CheckEmailResponse);
  } catch (err) {
    return handleApiError(err);
  }
}
