import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { parseUserAgent, getDeviceType } from "@/lib/utils/deviceDetection";
import { getGeoLocationCached } from "@/lib/utils/geolocation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, deviceInfo, referrer, utmParams, termsAccepted } =
      body ?? {};

    // 1. Validar email básico
    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // 2. Info de user agent / headers (lado servidor)
    const userAgent = request.headers.get("user-agent") || "";
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      null;

    const uaInfo = parseUserAgent(userAgent);

    const screenWidth = deviceInfo?.screenWidth ?? null;

    // Aquí la corrección
    const deviceType = getDeviceType(userAgent, screenWidth ?? 0);

    // Estos campos dependen de lo que devuelva parseUserAgent
    const browser = uaInfo.browser || null;
    const browserVersion = uaInfo.browserVersion || null;
    const os = uaInfo.os || null;

    // 3. Info enviada desde el cliente (puedes ajustar nombres)
    const screenHeight = deviceInfo?.screenHeight ?? null;
    const timezone = deviceInfo?.timezone ?? null;
    const language = deviceInfo?.language ?? null;

    const utm_source = utmParams?.utm_source ?? null;
    const utm_medium = utmParams?.utm_medium ?? null;
    const utm_campaign = utmParams?.utm_campaign ?? null;

    const nowIso = new Date().toISOString();

    // 4. Obtener geolocalización desde IP (usando caché para reducir API calls)
    const geoData = await getGeoLocationCached(ipAddress);

    // 5. Insert anónimo en Supabase (IMPORTANTE: sin .select())
    const { error } = await supabase.from("subscribers").insert([
      {
        email,
        status: "active",
        terms_accepted: !!termsAccepted,
        terms_accepted_at: termsAccepted ? nowIso : null,

        device_type: deviceType,
        os,
        browser,
        browser_version: browserVersion,
        user_agent: userAgent,

        screen_width: screenWidth,
        screen_height: screenHeight,

        timezone,
        language,

        referrer: referrer ?? null,
        utm_source,
        utm_medium,
        utm_campaign,

        ip_address: ipAddress,
        country: geoData.country,
        city: geoData.city,
      },
    ]);

    // 6. Manejo de errores de Supabase / Postgres
    if (error) {
      // Email duplicado (UNIQUE(email))
      if (error.code === "23505") {
        // Puedes devolver 200 o 409 según lo que prefieras semánticamente
        return NextResponse.json(
          {
            success: true,
            message: "Este email ya está suscrito.",
          },
          { status: 409 }
        );
      }

      console.error("Error al insertar suscriptor en Supabase:", error);

      return NextResponse.json(
        { error: "No se pudo registrar la suscripción." },
        { status: 500 }
      );
    }

    // 7. Respuesta de éxito (no dependas de data.*, ya que no hicimos .select())
    return NextResponse.json(
      {
        success: true,
        message: "Suscripción registrada correctamente.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al procesar suscripción:", error);
    return NextResponse.json(
      { error: "Error al procesar la suscripción." },
      { status: 500 }
    );
  }
}
