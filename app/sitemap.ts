import { MetadataRoute } from "next";

import { APP_URL } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/candidates",
    "/proposals",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
