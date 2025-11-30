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
      description="¡Hola! En Altoq estamos arrancando fuerte y, por ahora, buscamos colaboradores voluntarios que quieran aportar ideas, talento y energía. No hay pagos en esta fase, pero sí la oportunidad de formar parte del equipo inicial, aprender, crecer y ayudar a construir una plataforma que puede marcar la diferencia."
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
