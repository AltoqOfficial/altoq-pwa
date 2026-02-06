import type { NextConfig } from "next";

// Bundle analyzer plugin
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable gzip and brotli compression
  compress: true,

  // Power off trailing slash
  trailingSlash: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 31536000, // 1 year for static assets
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.altoq.pe",
      },
    ],
    // Disable blur placeholder for better LCP
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers for security, caching and performance
  async headers() {
    return [
      // Global security and performance headers
      {
        source: "/(.*)",
        headers: [
          // DNS Prefetch
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Security Headers
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // HSTS - Enforce HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Content Security Policy (relaxed for compatibility)
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
        ],
      },
      // Static assets caching
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/candidatos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/partidos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Service Worker headers
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      // Manifest headers
      {
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
      // Sitemap and robots
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // Redirects for SEO consistency
  async redirects() {
    return [
      // Redirect www to non-www for canonical URL
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.altoq.pe",
          },
        ],
        destination: "https://altoq.pe/:path*",
        permanent: true,
      },
    ];
  },

  // Experimental features for Next.js
  experimental: {
    optimizePackageImports: ["framer-motion", "@/components"],
  },

  // Generate source maps only in development
  productionBrowserSourceMaps: false,
};

// Export with bundle analyzer wrapper
export default withBundleAnalyzer(nextConfig);
