import { PageHero } from "@/components/molecules/PageHero";

/**
 * ComparisonHero Component (Organism)
 * Hero section for the Compare Candidates page
 *
 * Uses PageHero molecule for consistent hero section pattern
 */
export function ComparisonHero() {
  return (
    <PageHero
      title="A COMPARAR!"
      description="Compara las propuestas, trayectorias y antecedentes de los candidatos presidenciales lado a lado. Toma decisiones informadas para el futuro del Perú."
      accentWords={["COMPARAR!"]}
      backgroundColor="bg-neutral-900"
      titleColor="text-white"
      descriptionColor="text-neutral-300"
      accentColor="text-primary-600"
      paddingY="md"
      descriptionClassName="text-lg"
    />
  );
}
