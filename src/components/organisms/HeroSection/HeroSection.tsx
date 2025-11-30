import Image from "next/image";
import { Typography } from "@/components/atoms/Typography";
import { DaysCountSVG } from "@/components/molecules/DaysCountSVG";
import { Logo } from "@/components/atoms/Logo";
import { AnimatedText } from "@/components/atoms/AnimatedText";
import { EmailSubscribeForm } from "@/components/molecules/EmailSubscribeForm";

/**
 * HeroSection Component (Organism)
 * Main hero section with countdown timer
 *
 * Features:
 * - Hero title: "50 DÍAS" (dynamic based on countdown)
 * - Subtitle: "Infórmate Altoq"
 * - Description text
 * - Email subscription form
 * - Countdown timer
 * - Background: Palacio de Gobierno image
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900 -mt-34.5 md:-mt-20 lg:-mt-34.5 pt-16 md:pt-20">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Palacio de Gobierno Background Image */}
        <Image
          src="/images/hero/palacio-gobierno.webp"
          alt="Palacio de Gobierno del Perú"
          fill
          priority
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
          sizes="100vw"
          className="object-cover"
        />

        {/* Layer 1: Top gradient - Full screen */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0E0E0E 8.36%, rgba(32, 32, 32, 0.00) 100%)",
          }}
        />

        {/* Layer 2: Top to bottom gradient - 90% height */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: "90%",
            background:
              "linear-gradient(180deg, #0E0E0E 8.36%, rgba(32, 32, 32, 0.00) 78.05%)",
          }}
        />

        {/* Layer 3: Bottom gradient - 20% height */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "20%",
            background:
              "linear-gradient(180deg, rgba(32, 32, 32, 0.00) 8.36%, #0E0E0E 78.05%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        {/* Top Text */}
        <Typography
          variant="h6"
          font="sohneBreit"
          weight="400"
          align="center"
          className="mb-3 uppercase text-gradient-neutral"
          style={{ letterSpacing: "2.6px" }}
        >
          Disponible en
        </Typography>
        {/* Main Title - Days Count */}
        <DaysCountSVG />

        <div className="mb-2 flex justify-center gap-2 lg:gap-3 group">
          {/* Subtitle with Animated Text */}
          <Typography
            variant="h3"
            font="sohneBreit"
            weight="700"
            align="center"
            className="text-surface self-center"
          >
            <AnimatedText
              words={["Infórmate", "Compara", "Decide"]}
              changeDelay={800}
              restartDelay={2000}
            />
          </Typography>
          <Logo size="sm" priority className="h-10 w-auto md:h-12 lg:h-16" />
        </div>

        {/* Description */}
        <Typography
          variant="p"
          align="center"
          font="sohneBreit"
          weight="400"
          className="mx-auto mb-8 max-w-2xl text-surface"
        >
          ¿No sabes por quién votar en estas elecciones? Ingresa tu email y
          recibe acceso anticipado a la plataforma 100% gratis ¡Vota bien{" "}
          <Typography
            variant="span"
            font="sohneBreit"
            weight="700"
            className="text-primary-500"
          >
            PE
          </Typography>
          !
        </Typography>

        {/* Email Form */}
        <div className="mx-auto mb-16 max-w-2xl">
          <EmailSubscribeForm
            submitText="¡Notifícame!"
            placeholder="Email"
            showCheckbox={true}
            checkboxLabel="Acepto recibir novedades, noticias y actualizaciones importantes sobre Altoq."
            inputVariant="default"
            buttonVariant="primary"
            size="lg"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-white/50">
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
