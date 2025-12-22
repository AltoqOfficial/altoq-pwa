import { MetadataRoute } from "next";

import { APP_URL } from "@/constants";

/**
 * Dynamic sitemap generator for improved SEO
 * Generates a comprehensive sitemap with all public routes
 * Following Google's sitemap best practices
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static routes with their priorities and change frequencies
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/compara", priority: 0.9, changeFrequency: "daily" as const },
  ];

  // Generate sitemap entries
  return staticRoutes.map((route) => ({
    url: `${APP_URL}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
