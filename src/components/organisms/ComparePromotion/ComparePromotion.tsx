import {
  CompareHero,
  ComingSoonSection,
  StepsGrid,
  AIPromotionSection,
} from "./components";
import Image from "next/image";
import { Button } from "@/components/atoms";

export function ComparePromotion() {
  return (
    <div className="space-y-24">
      <div className="w-full bg-[#FF2727] overflow-hidden relative h-[700px]">
        <div>
          <Image
            src="/promotion/left/acuña_promotion.webp"
            alt="Acuña"
            width={610}
            height={610}
            className="absolute bottom-0 z-10 translate-x-14"
          />
          <Image
            src="/promotion/left/butters_promotion.webp"
            alt="Butters"
            width={570}
            height={570}
            className="absolute bottom-0 z-20"
          />
          <Image
            src="/promotion/left/keiko_promotion.webp"
            alt="Keiko"
            width={300}
            height={300}
            className="absolute bottom-0 z-30"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-40">
          <h1 className="font-kenyan font-extrabold text-[#FEFEFE] text-[270px]">
            VS
          </h1>
          <div className="w-[25%] h-0.5 bg-white mb-8"></div>
          <span className="font-semibold text-[#FEFEFE] text-xl max-w-md text-center">
            ¿No te decides por alguno? Compara y descubre las debilidades y
            fortalezas de cada candidato
          </span>
          <Button variant="secondary" className="invert mt-12">
            Prueba la demo
          </Button>
        </div>
        <div>
          <Image
            src="/promotion/right/alvarez_promotion.webp"
            alt="Alvarez"
            width={640}
            height={640}
            className="absolute bottom-0 right-0 z-10 -translate-x-14"
          />
          <Image
            src="/promotion/right/barnechea_promotion.webp"
            alt="Barnechea"
            width={480}
            height={480}
            className="absolute bottom-0 right-0 z-20 -translate-x-15"
          />
          <Image
            src="/promotion/right/lopez_promotion.webp"
            alt="Lopez"
            width={400}
            height={400}
            className="absolute bottom-0 right-0 z-30 tra"
          />
        </div>
      </div>
      <div className="p-32">
        <CompareHero />
        <ComingSoonSection />
      </div>
      <StepsGrid />
      <AIPromotionSection />
    </div>
  );
}
