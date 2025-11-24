import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { generateMetadata as createMetadata } from "@/lib/config/seo";
import { PWARegistration } from "@/components/organisms";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f17272",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root Layout
 * Main layout that wraps the entire application
 * Contains Header and Footer that persist across all pages
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es-PE" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Standard Favicon */}
        <link rel="icon" href="/icons/icon-192x192.png" />

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
          href="/icons/apple-touch-icon-167x167.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-touch-icon-120x120.png"
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

        {/* Microsoft */}
        <meta name="msapplication-TileColor" content="#f17272" />
        <meta
          name="msapplication-TileImage"
          content="/icons/icon-192x192.png"
        />
      </head>
      <body className="font-sans antialiased">
        {/* PWA Registration */}
        <PWARegistration />

        {/* Main App Structure */}
        <div className="flex min-h-screen flex-col">
          {/* Header - Persists across all pages */}
          <Header />

          {/* Main Content - Changes per page */}
          <main className="flex-1">{children}</main>

          {/* Footer - Persists across all pages */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
