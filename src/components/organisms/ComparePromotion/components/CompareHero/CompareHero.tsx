import { Typography, Button } from "@/components/atoms";

export function CompareHero() {
  return (
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
        <Button variant="secondary" size="lg" className="w-full max-w-[20rem]">
          Prueba la demo
        </Button>
      </div>
      <div className="w-full justify-center items-center flex">
        <h1 className="font-kenyan font-extrabold text-primary-600 text-[400px]">
          VS
        </h1>
      </div>
    </div>
  );
}
