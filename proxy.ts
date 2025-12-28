// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function proxy(request: NextRequest) {
  const protectedRoutes = ["/api/profile", "/api/auth/logout"];

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Token requerido", status: 401, code: "missing_token" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        {
          message: "Token inválido o expirado",
          status: 401,
          code: "invalid_token",
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/profile", "/api/auth/logout"],
};
