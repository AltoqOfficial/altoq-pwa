import { Metadata } from "next";

import { APP_NAME, APP_DESCRIPTION, APP_URL, SEO } from "@/constants";

interface SEOParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

/**
 * Generates metadata for pages
 * Follows Next.js 14+ metadata API
 */
export function generateMetadata({
  title,
  description = APP_DESCRIPTION,
  image = `${APP_URL}/og-image.png`,
  path = "",
  noIndex = false,
}: SEOParams = {}): Metadata {
  const pageTitle = title ? `${title} | ${APP_NAME}` : SEO.DEFAULT_TITLE;
  const url = `${APP_URL}${path}`;

  return {
    title: pageTitle,
    description,
    keywords: [...SEO.KEYWORDS],
    authors: [{ name: APP_NAME }],
    creator: APP_NAME,
    publisher: APP_NAME,
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
    openGraph: {
      type: "website",
      locale: "es_PE",
      url,
      title: pageTitle,
      description,
      siteName: APP_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
      creator: "@altoq",
    },
    alternates: {
      canonical: url,
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      ],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: APP_NAME,
    },
  };
}

/**
 * Generates JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    logo: `${APP_URL}/icons/icon-512x512.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contacto@altoq.pe",
    },
    sameAs: [
      "https://facebook.com/altoq",
      "https://twitter.com/altoq",
      "https://instagram.com/altoq",
      "https://linkedin.com/company/altoq",
    ],
  };
}
