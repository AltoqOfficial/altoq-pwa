import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { CountdownTimer } from "@/components/molecules/CountdownTimer";
import { LAUNCH_DATE } from "@/constants";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* TODO: Add background image */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        {/* Top Text */}
        <h1 className="font-kenyan text-4xl text-white">Altoq</h1>
        <Typography
          variant="small"
          className="mb-4 text-white uppercase tracking-widest"
        >
          Próximamente en
        </Typography>

        {/* Main Title - Days Count */}
        <Typography
          variant="h1"
          className="mb-6 text-primary-600"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
          suppressHydrationWarning
        >
          50 DÍAS
        </Typography>

        {/* Subtitle */}
        <Typography variant="h3" className="mb-6 text-white">
          Infórmate <span className="text-primary-600">Altoq</span>
        </Typography>

        {/* Description */}
        <Typography
          variant="p"
          className="mx-auto mb-8 max-w-2xl text-neutral-300"
        >
          Obtén acceso prioritario cuando lancemos. Regístrate ahora para
          recibir actualizaciones y ser el primero en explorar nuestra
          plataforma.
        </Typography>

        {/* Email Form */}
        <form className="mx-auto mb-16 flex max-w-md flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className="flex-1 rounded-lg border border-neutral-700 bg-white/10 px-4 py-3 text-white placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50"
            required
          />
          <Button variant="primary" size="lg" type="submit">
            Notifícame
          </Button>
        </form>

        {/* Countdown Timer */}
        <div className="mb-8">
          <Typography variant="h4" className="mb-6 text-white">
            Lanzamiento en:
          </Typography>
          <CountdownTimer targetDate={LAUNCH_DATE} />
        </div>

        {/* CTA Button */}
        <Button variant="outline" size="lg" asChild>
          <a href="#conoce-mas">Conoce más</a>
        </Button>
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
