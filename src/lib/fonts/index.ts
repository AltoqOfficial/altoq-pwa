import localFont from "next/font/local";

/**
 * Test Sohne Breit Font Family
 * Weights available:
 * - Leicht (Light)
 * - Buch (Book/Regular)
 * - Halbfett (Semibold)
 * - Dreiviertelfett (Bold)
 * - Extrafett (Extra Bold)
 */
export const testSohneBreit = localFont({
  src: [
    {
      path: "../../../public/fonts/TestSohneBreit-Leicht.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/TestSohneBreit-Buch.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/TestSohneBreit-Dreiviertelfett.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/TestSohneBreit-Extrafett.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sohne-breit",
  display: "swap",
});

/**
 * Test Sohne Schmal Font Family
 * Weight available:
 * - Halbfett (Semibold)
 */
export const testSohneSchmal = localFont({
  src: [
    {
      path: "../../../public/fonts/TestSohneSchmal-Halbfett.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sohne-schmal",
  display: "swap",
});

/**
 * Kenyan Coffee Font Family
 * Weights available:
 * - Regular
 * - Bold
 */
export const kenyanCoffee = localFont({
  src: [
    {
      path: "../../../public/fonts/Kenyan-Coffee-Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Kenyan-Coffee-Bd.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kenyan-coffee",
  display: "swap",
});
