import {
  CompareHero,
  ComingSoonSection,
  StepsGrid,
  AIPromotionSection,
} from "./components";

export function ComparePromotion() {
  return (
    <div className="p-32 space-y-24">
      <div>
        <CompareHero />
        <ComingSoonSection />
      </div>
      <StepsGrid />
      <AIPromotionSection />
    </div>
  );
}
