import Link from "next/link";

import { Button, Typography } from "@/components/atoms";
import { ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <div className="mb-8 inline-flex h-32 w-32 items-center justify-center rounded-full bg-primary-100 text-6xl">
          😕
        </div>

        <Typography variant="h1" className="mb-4 text-primary-600">
          404
        </Typography>

        <Typography variant="h3" className="mb-4 text-neutral-700">
          Página no encontrada
        </Typography>

        <Typography variant="p" className="mb-8 text-neutral-600">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </Typography>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={ROUTES.HOME}>
            <Button size="lg">Volver al inicio</Button>
          </Link>
          <Link href={ROUTES.COMPARATOR}>
            <Button size="lg" variant="outline">
              Comparar Candidatos
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
