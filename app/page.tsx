import { HeroSection } from "@/components/organisms/HeroSection";
import { FAQSection } from "@/components/organisms/FAQSection";
import { SuggestionsSection } from "@/components/organisms/SuggestionsSection";
import { ComparePromotion } from "@/components/organisms/ComparePromotion";
import { LogoLoop } from "@/components/organisms/LogoLoop";
import {
  generateMetadata,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateSoftwareApplicationSchema,
} from "@/lib/config/seo";
import { faqs } from "@/data/faqs";

/**
 * Enhanced metadata for the home page
 * Optimized for search engines and social sharing
 */
export const metadata = generateMetadata({
  description:
    "¿Cómo votar informado en las Elecciones 2026? Altoq es tu guía electoral: compara candidatos presidenciales, analiza propuestas, trayectorias y antecedentes. Plataforma gratuita para información electoral verificada en Perú.",
  path: "",
  type: "website",
});

/**
 * Home Page (Landing Page)
 * Route: /
 *
 * SEO Optimized with:
 * - Semantic HTML structure
 * - JSON-LD structured data for FAQs
 * - Breadcrumb schema
 * - WebPage schema
 *
 * Sections:
 * 1. Hero Section - Countdown timer + hero message
 * 2. Logo Loop - Partner/media logos
 * 3. Compare Section - Preview of comparison feature (VS)
 * 4. FAQ Section - Preguntas Frecuentes with JSON-LD
 * 5. Suggestions Section - Caja de sugerencias
 */
export default function HomePage() {
  // Generate JSON-LD structured data for the page
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "/" },
  ]);
  const webPageSchema = generateWebPageSchema({
    title: "Altoq - Vota Informado en las Elecciones 2026",
    description:
      "Plataforma líder para conocer y comparar candidatos en las Elecciones Generales 2026 del Perú.",
    path: "",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString(),
  });
  const softwareSchema = generateSoftwareApplicationSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      {/* Hero Section with Countdown */}
      <HeroSection />

      {/* Partner/Media Logo Loop */}
      <LogoLoop />

      {/* Candidate Comparison Promotion */}
      <ComparePromotion />

      {/* Visual Separator */}
      <div
        className="h-0.5 w-[70%] mx-auto bg-[#484848] opacity-50 my-32"
        aria-hidden="true"
      />

      {/* Frequently Asked Questions - with FAQ Schema */}
      <FAQSection />

      {/* Suggestions Box */}
      <SuggestionsSection />
    </>
  );
}
