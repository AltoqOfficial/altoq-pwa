import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

/**
 * Auth Callback Route
 * Handles email confirmation redirect from Supabase
 * Exchanges the auth code for a session and redirects to home page
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to the specified page (default: home) after successful auth
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
