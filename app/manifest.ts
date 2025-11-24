import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Altoq - Vota Informado",
    short_name: "Altoq",
    description:
      "Plataforma para votar informado en las Elecciones Generales 2026 del Perú",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f17272",
    orientation: "portrait-primary",
    scope: "/",
    id: "/",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Vista de escritorio de Altoq",
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "Vista móvil de Altoq",
      },
    ],
    categories: ["news", "education", "politics"],
    lang: "es-PE",
    dir: "ltr",
  };
}
