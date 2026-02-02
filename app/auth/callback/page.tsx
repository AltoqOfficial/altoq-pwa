"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Logo } from "@/components/atoms/Logo";

/**
 * Set a cookie with secure options
 */
function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  const isSecure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const secureFlag = isSecure ? "; Secure" : "";

  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax${secureFlag}`;
}

/**
 * Auth Callback Page (Client-side)
 *
 * Handles email confirmation redirect from Supabase.
 * Parses the access_token from URL hash fragment and sets the session.
 * Then redirects to /auth/confirmed which checks for pending form.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash fragment from URL
        const hash = window.location.hash;

        if (hash) {
          // Parse the hash fragment
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");

          if (accessToken && refreshToken) {
            // Set the session using the tokens from the URL
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (sessionError) {
              console.error("Error setting session:", sessionError);
              setError(
                "Error al verificar tu cuenta. Intenta iniciar sesión manualmente."
              );
              return;
            }

            // Set cookies for the app's auth system
            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);

            // Successfully authenticated, redirect to confirmed page
            router.replace("/auth/confirmed");
            return;
          }
        }

        // Check for code parameter (PKCE flow)
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (code) {
          // Exchange code for session
          const { data, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError || !data.session) {
            console.error("Error exchanging code:", exchangeError);
            setError(
              "Error al verificar tu cuenta. Intenta iniciar sesión manualmente."
            );
            return;
          }

          // Set cookies for the app's auth system
          setCookie("accessToken", data.session.access_token);
          setCookie("refreshToken", data.session.refresh_token);

          // Successfully authenticated
          router.replace("/auth/confirmed");
          return;
        }

        // No token or code found
        setError(
          "No se encontró información de autenticación. Intenta iniciar sesión manualmente."
        );
      } catch (err) {
        console.error("Callback error:", err);
        setError("Error inesperado. Intenta iniciar sesión manualmente.");
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
        <Logo variant="white" size="lg" className="mb-8" />
        <h2 className="text-white text-xl font-bold mb-4">
          Error de verificación
        </h2>
        <p className="text-white/60 text-sm mb-8 max-w-sm">{error}</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Ir a iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center">
      <Logo variant="white" size="lg" className="mb-8 animate-pulse" />
      <p className="text-white/60 text-sm">Verificando tu cuenta...</p>
    </div>
  );
}
