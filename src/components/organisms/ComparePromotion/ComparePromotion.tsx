import { Typography } from "@/components/atoms";
import { Button } from "@/components/atoms";

export function ComparePromotion() {
  return (
    <div className="py-32">
      <div>
        <div className="w-full flex flex-col justify-center items-center mx-auto max-w-xl gap-8">
          <Typography
            variant="h3"
            weight="600"
            className="text-neutral-500"
            align="center"
          >
            Compara candidatos a la presidencia
          </Typography>
          <Button
            variant="secondary"
            size="lg"
            className="w-full max-w-[20rem]"
          >
            Prueba la demo
          </Button>
        </div>
        <div className="w-full justify-center items-center flex">
          <h1 className="font-kenyan font-extrabold text-primary-600 text-[400px]">
            VS
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <Typography
            variant="p"
            weight="300"
            className="tracking-widest"
            align="center"
          >
            PRÓXIMAMENTE
          </Typography>
          <div className="w-full mx-auto flex flex-col items-center justify-center gap-3.5">
            <Typography
              align="center"
              variant="h3"
              className="flex gap-3"
              weight="600"
            >
              Mi Candidato{" "}
              <Typography align="center" variant="h3" color="primary">
                Ideal
              </Typography>
            </Typography>
            <Typography variant="p" className="max-w-2xl" align="center">
              Si aún no te decices, ¡tranqui!. Deja que la Inteligencia
              Artificial te conozca y te dirá qué candidatos se alinean más
              contigo.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
