import { PageHero } from "@/components/molecules/PageHero";

/**
 * JoinHeroSection Component (Organism)
 * Hero section for the Join/Volunteer page
 *
 * Uses PageHero molecule for consistent hero section pattern
 */
export function JoinHeroSection() {
  return (
    <PageHero
      title="ÚNETE A NOSOTROS"
      description="Altoq está en sus primeros pasos. Buscamos voluntarios que quieran sumarse y ganar: experiencia práctica y la oportunidad de crear una plataforma con propósito junto a personas apasionadas."
      backgroundColor="bg-white"
      titleColor="text-neutral-900"
      descriptionColor="text-neutral-600"
      paddingY="lg"
      maxWidth="3xl"
      descriptionClassName="text-lg leading-relaxed"
      titleClassName="mb-8"
    />
  );
}
