import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/atoms/Typography/Typography";
import { SOCIAL_LINKS, CONTACT, EXTERNAL_LINKS } from "@/constants";

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
    <footer className="border-t border-neutral-200 bg-[#202020] text-white">
      <div className="container mx-auto px-6 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 col-span-2 text-center flex flex-col items-center lg:col-span-1 lg:text-left lg:items-start lg:block">
            <div className="relative h-8 w-28 mb-6 lg:mb-10">
              <Image
                src="/images/logo/altoq.webp"
                alt="Altoque"
                fill
                className="object-contain object-center lg:object-left"
              />
            </div>
            <Typography
              variant="h6"
              weight="400"
              color="white"
              className="text-neutral-300"
            >
              Infórmate, compara y decide Altoq
            </Typography>
            <Typography
              variant="span"
              color="white"
              className="text-neutral-400 opacity-70 underline hover:cursor-pointer"
            >
              {CONTACT.email}
            </Typography>
          </div>
          <div className="hidden lg:block"></div>
          {/* Quick Links */}
          <div className="space-y-4 mx-auto lg:mx-0">
            <nav className="flex flex-col space-y-2">
              <a
                href={EXTERNAL_LINKS.volunteerForm}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-neutral-300"
              >
                Únete como voluntario
              </a>
              <Link
                href="/compara"
                className="text-white transition-colors hover:text-neutral-300"
              >
                Comparar candidatos
              </Link>
              <Link
                href="/#faq"
                className="text-white transition-colors hover:text-neutral-300"
              >
                Preguntas Frecuentes
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4 mx-auto lg:mx-0">
            <div className="flex flex-col gap-1">
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-neutral-300 flex items-center gap-4"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                >
                  <path
                    d="M9.42 0H6.892v10.217c0 1.218-.972 2.218-2.182 2.218s-2.182-1-2.182-2.218c0-1.195.95-2.174 2.117-2.217V5.435C2.075 5.478 0 7.587 0 10.217 0 12.87 2.117 15 4.732 15c2.614 0 4.732-2.152 4.732-4.783V4.978a5.85 5.85 0 0 0 3.348 1.13V3.544C10.913 3.478 9.42 1.913 9.42 0"
                    fill="#fefefe"
                  />
                </svg>
                {/* TODO: Add TikTok icon */}
                TikTok
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-neutral-300 flex items-center gap-4"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#a)">
                    <path
                      d="M13.89 0H1.107C.495 0 0 .483 0 1.081v12.835C0 14.514.495 15 1.107 15H13.89c.612 0 1.11-.486 1.11-1.081V1.08C15 .483 14.502 0 13.89 0M4.45 12.782H2.224v-7.16H4.45zM3.337 4.646a1.29 1.29 0 1 1-.005-2.579 1.29 1.29 0 0 1 .005 2.58m9.445 8.136H10.56v-3.48c0-.83-.015-1.899-1.158-1.899-1.157 0-1.333.906-1.333 1.84v3.54h-2.22v-7.16H7.98V6.6h.03c.296-.563 1.022-1.158 2.103-1.158 2.253 0 2.67 1.483 2.67 3.41z"
                      fill="#fefefe"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h15v15H0z" />
                    </clipPath>
                  </defs>
                </svg>
                {/* TODO: Add LinkedIn icon */}
                LinkedIn
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-neutral-300 flex items-center gap-4"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#a)" fill="#fefefe">
                    <path d="M7.5 1.35c2.004 0 2.241.01 3.03.045.732.032 1.127.155 1.39.257.35.135.601.3.862.56.264.264.425.513.56.861.102.264.225.662.258 1.392.035.79.044 1.028.044 3.03 0 2.003-.01 2.24-.044 3.028-.033.733-.156 1.128-.258 1.392a2.3 2.3 0 0 1-.56.861 2.3 2.3 0 0 1-.861.56c-.264.102-.662.226-1.392.258-.79.035-1.028.044-3.029.044-2.004 0-2.241-.01-3.03-.044-.732-.032-1.127-.155-1.39-.258a2.3 2.3 0 0 1-.862-.56 2.3 2.3 0 0 1-.56-.861c-.102-.264-.225-.662-.258-1.392-.035-.79-.044-1.028-.044-3.029 0-2.004.01-2.241.044-3.03.033-.732.156-1.127.258-1.39.135-.35.299-.601.56-.862.263-.264.512-.425.861-.56.264-.102.662-.225 1.392-.257.788-.036 1.025-.044 3.029-.044M7.5 0C5.464 0 5.209.009 4.41.044S3.063.208 2.59.393a3.7 3.7 0 0 0-1.33.867 3.7 3.7 0 0 0-.867 1.327c-.185.477-.314 1.022-.35 1.82C.01 5.208 0 5.463 0 7.5s.009 2.291.044 3.09.164 1.345.349 1.82c.193.495.448.914.867 1.33a3.7 3.7 0 0 0 1.327.864c.477.185 1.022.314 1.82.35.8.034 1.054.043 3.09.043s2.291-.009 3.09-.044 1.346-.164 1.82-.348c.492-.19.911-.449 1.327-.865s.674-.835.865-1.327c.184-.478.313-1.022.348-1.82.035-.799.044-1.054.044-3.09s-.009-2.291-.044-3.09-.164-1.346-.348-1.82a3.5 3.5 0 0 0-.859-1.333 3.7 3.7 0 0 0-1.327-.864c-.478-.185-1.022-.314-1.82-.35C9.792.01 9.537 0 7.5 0" />
                    <path d="M7.501 3.647a3.853 3.853 0 0 0 0 7.705 3.853 3.853 0 0 0 0-7.705m0 6.352a2.5 2.5 0 1 1 0-4.999 2.5 2.5 0 0 1 0 4.999m4.903-6.504a.9.9 0 1 1-1.799 0 .9.9 0 0 1 1.8 0" />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h15v15H0z" />
                    </clipPath>
                  </defs>
                </svg>
                {/* TODO: Add Instagram icon */}
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center pt-8">
          <Typography variant="small" className="text-white">
            © {new Date().getFullYear()} Altoq. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
