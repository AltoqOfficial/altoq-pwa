import Link from "next/link";

import { Logo } from "@/components/atoms/Logo/Logo";
import { Typography } from "@/components/atoms/Typography/Typography";
import { SOCIAL_LINKS, CONTACT } from "@/constants";

/**
 * Footer Component (Organism)
 * Main footer that appears on all pages
 *
 * Features:
 * - Logo and tagline
 * - Contact information
 * - Quick links
 * - Social media links
 * - Copyright
 */
export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo variant="white" />
            <Typography variant="p" className="text-neutral-300">
              Infórmate, compara y decide Altoq
            </Typography>
            <Typography variant="small" className="text-neutral-400">
              {CONTACT.email}
            </Typography>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <Typography variant="h6" className="font-semibold">
              Enlaces Rápidos
            </Typography>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/unete"
                className="text-sm text-neutral-300 transition-colors hover:text-white"
              >
                Únete como voluntario
              </Link>
              <Link
                href="/compara"
                className="text-sm text-neutral-300 transition-colors hover:text-white"
              >
                Comparar candidatos
              </Link>
              <Link
                href="/preguntas-frecuentes"
                className="text-sm text-neutral-300 transition-colors hover:text-white"
              >
                Preguntas Frecuentes
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <Typography variant="h6" className="font-semibold">
              Legal
            </Typography>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/terminos"
                className="text-sm text-neutral-300 transition-colors hover:text-white"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/privacidad"
                className="text-sm text-neutral-300 transition-colors hover:text-white"
              >
                Política de Privacidad
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <Typography variant="h6" className="font-semibold">
              Síguenos
            </Typography>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition-colors hover:text-white"
                aria-label="TikTok"
              >
                {/* TODO: Add TikTok icon */}
                TikTok
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                {/* TODO: Add LinkedIn icon */}
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                {/* TODO: Add Instagram icon */}
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-neutral-800 pt-8">
          <Typography variant="small" className="text-center text-neutral-400">
            © {new Date().getFullYear()} Altoq. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
