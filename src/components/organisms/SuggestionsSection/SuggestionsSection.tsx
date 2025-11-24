"use client";

import { useState, FormEvent } from "react";

import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";

/**
 * SuggestionsSection Component (Organism)
 * Contact form for suggestions and feedback
 *
 * Features:
 * - Background: Congress building image
 * - Contact form with name, email, phone, message
 * - Form submission handling
 * - Success/error states
 */
export function SuggestionsSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <section className="relative overflow-hidden bg-neutral-900 py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* TODO: Add Congress building background image */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 to-black/90" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Info */}
          <div className="flex flex-col justify-center">
            <Typography variant="h2" className="mb-6 text-white">
              Caja de <span className="text-primary-600">sugerencias</span>
            </Typography>
            <Typography variant="p" className="mb-8 text-neutral-300">
              ¿Tienes alguna sugerencia, pregunta o comentario? Nos encantaría
              escucharte. Tu opinión nos ayuda a mejorar Altoq para todos los
              peruanos.
            </Typography>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography variant="small" className="text-neutral-400">
                    Email
                  </Typography>
                  <Typography variant="p" className="text-white">
                    contacto@altoqperu.com
                  </Typography>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography variant="small" className="text-neutral-400">
                    Ubicación
                  </Typography>
                  <Typography variant="p" className="text-white">
                    Lima, Perú
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
            {isSuccess ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <Typography variant="h4" className="mb-2 text-white">
                  ¡Mensaje enviado!
                </Typography>
                <Typography variant="p" className="text-neutral-300">
                  Gracias por tu mensaje. Te responderemos pronto.
                </Typography>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm text-white"
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-white"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm text-white"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50"
                    placeholder="+51 999 999 999"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm text-white"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50"
                    placeholder="Cuéntanos tu sugerencia o pregunta..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Enviando..." : "Enviar sugerencia"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
