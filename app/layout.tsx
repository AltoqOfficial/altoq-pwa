import type { Metadata, Viewport } from "next";
import {
  testSohneBreit,
  testSohneSchmal,
  kenyanCoffee,
  atNameSans,
} from "@/lib/fonts";
import Script from "next/script";

import "./globals.css";

import {
  generateMetadata as createMetadata,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/config/seo";
import { PWARegistration } from "@/components/organisms";
import { ConditionalLayout } from "@/components/organisms/ConditionalLayout";
import { GA_MEASUREMENT_ID } from "@/lib/analytics/gtag";
import { Analytics } from "@/components/organisms/Analytics";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/contexts";
import { ThemeAuthGuard } from "@/components/organisms/ThemeAuthGuard";

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f17272" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  colorScheme: "light dark",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root Layout
 * Main layout that wraps the entire application
 * Contains Header and Footer that persist across all pages
 * Optimized for SEO with JSON-LD structured data
 */
export default function RootLayout({ children }: RootLayoutProps) {
  // Generate JSON-LD structured data for SEO
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html
      lang="es-PE"
      className={`${testSohneBreit.variable} ${testSohneSchmal.variable} ${kenyanCoffee.variable} ${atNameSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS Prefetch for third-party resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `}
            </Script>
          </>
        )}

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Favicons - Multiple sizes for different devices */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />

        {/* Apple Touch Icons (iOS) */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-touch-icon.png"
        />

        {/* Apple PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Altoq" />

        {/* Mobile Optimizations */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Altoq" />
        <meta name="format-detection" content="telephone=no" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#f17272" />
        <meta
          name="msapplication-TileImage"
          content="/icons/icon-192x192.png"
        />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider defaultTheme="system">
          <QueryProvider>
            <SmoothScroll />
            {/* Analytics - Track page views */}
            <Analytics />
            {/* PWA Registration */}
            <PWARegistration />

            {/* Conditional Layout - Shows Header/Footer for public pages, custom layout for dashboard */}
            <ConditionalLayout>{children}</ConditionalLayout>
            <ThemeAuthGuard />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
