import { Metadata } from "next";

import { HeroSection } from "@/components/organisms/HeroSection";
import { FAQSection } from "@/components/organisms/FAQSection";
import { SuggestionsSection } from "@/components/organisms/SuggestionsSection";
import { ComparePromotion } from "@/components/organisms/ComparePromotion";
import { LogoLoop } from "@/components/organisms/LogoLoop";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateSoftwareApplicationSchema,
} from "@/lib/config/seo";
import { faqs } from "@/data/faqs";
import { APP_URL } from "@/constants";

/**
 * Enhanced metadata for the home page
 * Optimized for search engines and social sharing
 */
export const metadata: Metadata = {
  title:
    "Altoq - Vota Informado en las Elecciones 2026 | Compara Candidatos Perú",
  description:
    "Plataforma líder para conocer y comparar candidatos en las Elecciones Generales 2026 del Perú. Información verificada, propuestas, antecedentes y herramientas para votar informado.",
  keywords: [
    "altoq",
    "elecciones 2026",
    "elecciones perú",
    "candidatos presidenciales",
    "comparar candidatos",
    "votar informado",
    "elecciones generales peru",
    "propuestas candidatos",
    "JNE",
    "democracia perú",
  ],
  alternates: {
    canonical: APP_URL,
  },
  openGraph: {
    title: "Altoq - Vota Informado en las Elecciones 2026",
    description:
      "Plataforma para conocer candidatos y comparar propuestas en las Elecciones Generales 2026 del Perú",
    url: APP_URL,
    siteName: "Altoq",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Altoq - Vota Informado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Altoq - Vota Informado en las Elecciones 2026",
    description:
      "Plataforma para conocer candidatos y comparar propuestas en las Elecciones Generales 2026 del Perú",
    images: [`${APP_URL}/og-image.png`],
    creator: "@altoqperu",
    site: "@altoqperu",
  },
};

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
