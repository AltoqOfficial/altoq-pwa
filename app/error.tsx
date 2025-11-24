"use client";

import { useEffect } from "react";

import { Button, Container, Typography } from "@/components/atoms";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary-50 to-secondary-50">
      <Container maxWidth="md" className="text-center">
        <div className="mb-8 inline-flex h-32 w-32 items-center justify-center rounded-full bg-red-100 text-6xl">
          ⚠️
        </div>

        <Typography variant="h2" className="mb-4 text-red-600">
          Algo salió mal
        </Typography>

        <Typography variant="p" className="mb-2 text-neutral-600">
          Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
        </Typography>

        {process.env.NODE_ENV === "development" && (
          <div className="my-6 rounded-lg bg-red-50 p-4 text-left">
            <Typography variant="small" className="font-mono text-red-800">
              {error.message}
            </Typography>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={reset}>
            Intentar de nuevo
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Volver al inicio
          </Button>
        </div>
      </Container>
    </main>
  );
}
