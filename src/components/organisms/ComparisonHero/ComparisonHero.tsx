import { Typography } from "@/components/atoms/Typography";

/**
 * ComparisonHero Component (Organism)
 * Hero section for the Compare Candidates page
 *
 * Features:
 * - Bold title: "A COMPARAR!"
 * - Description about comparison tool
 * - Dark background with accent
 */
export function ComparisonHero() {
  return (
    <section className="bg-neutral-900 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Title */}
          <Typography
            variant="h1"
            className="mb-6 text-white"
            style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}
          >
            A <span className="text-primary-600">COMPARAR!</span>
          </Typography>

          {/* Description */}
          <Typography variant="p" className="text-lg text-neutral-300">
            Compara las propuestas, trayectorias y antecedentes de los
            candidatos presidenciales lado a lado. Toma decisiones informadas
            para el futuro del Perú.
          </Typography>
        </div>
      </div>
    </section>
  );
}
