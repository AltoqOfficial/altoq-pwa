// app/api/auth/logout/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";
import type { LogoutSuccessResponse } from "@/types/auth";

/**
 * Logout de usuario
 * @description Cierra la sesión activa del usuario en Supabase (SSR)
 */
export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    const response: LogoutSuccessResponse = {
      message: "Sesión cerrada",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
}
