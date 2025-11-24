import { Typography } from "@/components/atoms/Typography";

/**
 * JoinHeroSection Component (Organism)
 * Hero section for the Join/Volunteer page
 *
 * Features:
 * - Large title: "ÚNETE A NOSOTROS"
 * - Description of volunteer opportunity
 * - Call to action message
 * - Clean, centered layout
 */
export function JoinHeroSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Title */}
          <Typography
            variant="h1"
            className="mb-8"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
          >
            ÚNETE A NOSOTROS
          </Typography>

          {/* Description */}
          <Typography
            variant="p"
            className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-600"
          >
            ¡Hola! En Altoq estamos arrancando fuerte y, por ahora, buscamos
            colaboradores voluntarios que quieran aportar ideas, talento y
            energía. No hay pagos en esta fase, pero sí la oportunidad de formar
            parte del equipo inicial, aprender, crecer y ayudar a construir una
            plataforma que puede marcar la diferencia.
          </Typography>
        </div>
      </div>
    </section>
  );
}
