import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

/**
 * Auth Callback Route
 * Handles email confirmation redirect from Supabase
 * Exchanges the auth code for a session and redirects to /auth/confirmed
 * The confirmed page (client-side) checks for pending form and redirects appropriately
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Redirect to /auth/confirmed which handles pending form check client-side
  const next = searchParams.get("next") ?? "/auth/confirmed";

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to the confirmed page after successful auth
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // In development, redirect to origin
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // In production with proxy, use forwarded host
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If no code or error occurred, redirect to error page or home
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
