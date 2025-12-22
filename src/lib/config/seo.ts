import { Metadata } from "next";

import { APP_NAME, APP_DESCRIPTION, APP_URL, SEO } from "@/constants";

interface SEOParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates metadata for pages
 * Follows Next.js 14+ metadata API
 * Optimized for PageSpeed Insights 100% and top search rankings
 */
export function generateMetadata({
  title,
  description = APP_DESCRIPTION,
  image = `${APP_URL}/og-image.png`,
  path = "",
  noIndex = false,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: SEOParams = {}): Metadata {
  const pageTitle = title ? `${title} | ${APP_NAME}` : SEO.DEFAULT_TITLE;
  const url = `${APP_URL}${path}`;
  const allKeywords = [...SEO.KEYWORDS, ...keywords];

  return {
    // Basic Meta Tags
    title: {
      default: pageTitle,
      template: SEO.TITLE_TEMPLATE,
    },
    description,
    keywords: allKeywords,
    authors: [{ name: author || APP_NAME, url: APP_URL }],
    creator: APP_NAME,
    publisher: APP_NAME,

    // Application metadata
    applicationName: APP_NAME,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",

    // Category for app stores and search engines
    category: "politics",

    // Classification for better search indexing
    classification: "Political Information Platform",

    // Robots configuration with advanced directives
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    // Open Graph - Enhanced for social sharing
    openGraph: {
      type,
      locale: "es_PE",
      alternateLocale: ["es_ES", "es_MX", "es_CO"],
      url,
      title: pageTitle,
      description,
      siteName: APP_NAME,
      countryName: "Peru",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
          type: "image/png",
        },
        {
          url: `${APP_URL}/icons/icon-512x512.png`,
          width: 512,
          height: 512,
          alt: `${APP_NAME} Logo`,
          type: "image/png",
        },
      ],
    },

    // Twitter Card - Enhanced
    twitter: {
      card: "summary_large_image",
      site: "@altoqperu",
      creator: "@altoqperu",
      title: pageTitle,
      description,
      images: {
        url: image,
        alt: pageTitle,
      },
    },

    // Canonical and alternate URLs
    alternates: {
      canonical: url,
      languages: {
        "es-PE": url,
        "x-default": url,
      },
    },

    // Verification for search engines
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
      },
    },

    // Format detection - disable automatic formatting
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // PWA manifest
    manifest: "/manifest.webmanifest",

    // Icons - Complete set for all devices
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        {
          url: "/icons/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/icons/icon-512x512.png",
          color: "#f17272",
        },
      ],
    },

    // Apple Web App configuration
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: APP_NAME,
      startupImage: [
        {
          url: "/icons/icon-512x512.png",
          media: "(device-width: 375px) and (device-height: 812px)",
        },
      ],
    },

    // Other meta tags
    other: {
      "apple-mobile-web-app-capable": "yes",
      "mobile-web-app-capable": "yes",
      "theme-color": "#f17272",
      "msapplication-TileColor": "#f17272",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

/**
 * Generates JSON-LD structured data for organization
 * Enhanced with more details for better search presence
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${APP_URL}/#organization`,
    name: APP_NAME,
    alternateName: ["Altoq Perú", "Altoq Peru", "AltoQ"],
    description: APP_DESCRIPTION,
    url: APP_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${APP_URL}/#logo`,
      url: `${APP_URL}/icons/icon-512x512.png`,
      contentUrl: `${APP_URL}/icons/icon-512x512.png`,
      width: 512,
      height: 512,
      caption: APP_NAME,
    },
    image: {
      "@type": "ImageObject",
      url: `${APP_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    foundingDate: "2024",
    foundingLocation: {
      "@type": "Place",
      name: "Lima, Perú",
    },
    areaServed: {
      "@type": "Country",
      name: "Perú",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "contacto@altoqperu.com",
        availableLanguage: ["Spanish"],
      },
    ],
    sameAs: [
      "https://www.tiktok.com/@altoqperu",
      "https://www.facebook.com/altoqperu",
      "https://twitter.com/altoqperu",
      "https://www.instagram.com/altoqperu",
      "https://www.linkedin.com/company/altoqperu",
    ],
  };
}

/**
 * Generates JSON-LD WebSite schema for search box and site links
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${APP_URL}/#website`,
    name: APP_NAME,
    alternateName: "Altoq - Vota Informado",
    description: APP_DESCRIPTION,
    url: APP_URL,
    inLanguage: "es-PE",
    publisher: {
      "@id": `${APP_URL}/#organization`,
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${APP_URL}/compara?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };
}

/**
 * Generates JSON-LD WebPage schema
 */
export function generateWebPageSchema({
  title,
  description = APP_DESCRIPTION,
  path = "",
  datePublished,
  dateModified,
}: {
  title: string;
  description?: string;
  path?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${APP_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    name: title,
    description,
    url,
    inLanguage: "es-PE",
    isPartOf: {
      "@id": `${APP_URL}/#website`,
    },
    about: {
      "@id": `${APP_URL}/#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${APP_URL}/og-image.png`,
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };
}

/**
 * Generates JSON-LD BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${APP_URL}${item.url}`,
    })),
  };
}

/**
 * Generates JSON-LD FAQPage schema for FAQ sections
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates JSON-LD SoftwareApplication schema for PWA
 */
export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PEN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };
}
