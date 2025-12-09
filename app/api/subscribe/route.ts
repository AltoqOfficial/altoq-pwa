import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { parseUserAgent, getDeviceType } from "@/lib/utils/deviceDetection";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, deviceInfo, referrer, utmParams, termsAccepted } = body;

    // Validar email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Obtener información del servidor
    const userAgent = request.headers.get("user-agent") || "";
    const { browser, browserVersion, os } = parseUserAgent(userAgent);

    // Obtener IP del cliente
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "";

    // Preparar datos para insertar
    const subscriberData = {
      email: email.toLowerCase().trim(),
      status: "active",

      // Consentimiento legal
      terms_accepted: termsAccepted || false,
      terms_accepted_at: termsAccepted ? new Date().toISOString() : null,

      // Información del dispositivo (del cliente)
      device_type:
        deviceInfo?.deviceType ||
        getDeviceType(userAgent, deviceInfo?.screenWidth || 1920),
      os: os,
      browser: browser,
      browser_version: browserVersion,
      user_agent: userAgent,

      // Información de pantalla (del cliente)
      screen_width: deviceInfo?.screenWidth || null,
      screen_height: deviceInfo?.screenHeight || null,

      // Información de localización (del cliente)
      timezone: deviceInfo?.timezone || null,
      language:
        deviceInfo?.language ||
        request.headers.get("accept-language")?.split(",")[0] ||
        null,

      // Información de origen
      referrer: referrer || null,
      utm_source: utmParams?.utm_source || null,
      utm_medium: utmParams?.utm_medium || null,
      utm_campaign: utmParams?.utm_campaign || null,

      // Información de red
      ip_address: ip || null,

      // country y city se pueden agregar con un servicio de geolocalización
      country: null,
      city: null,
    };

    // Intentar insertar en Supabase
    const { data, error } = await supabase
      .from("subscribers")
      .insert([subscriberData])
      .select()
      .single();

    if (error) {
      // Si el error es por email duplicado
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Este email ya está suscrito" },
          { status: 409 }
        );
      }

      console.error("Error al insertar en Supabase:", error);
      throw error;
    }

    return NextResponse.json(
      {
        message: "Suscripción exitosa",
        subscriber: {
          id: data.id,
          email: data.email,
          created_at: data.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al procesar suscripción:", error);
    return NextResponse.json(
      { error: "Error al procesar la suscripción" },
      { status: 500 }
    );
  }
}
