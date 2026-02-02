import { ConditionalHome } from "@/components/organisms/ConditionalHome";
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
 * Home Page
 * Route: /
 *
 * Conditional rendering:
 * - Unauthenticated users: Landing page with hero, logo loop, compare, FAQ, suggestions
 * - Authenticated users: Dashboard with sidebar and content
 *
 * SEO preserved with JSON-LD structured data
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

      {/* Conditional Content: Landing or Dashboard */}
      <ConditionalHome />
    </>
  );
}
