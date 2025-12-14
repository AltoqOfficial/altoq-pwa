import {
  ComingSoonSection,
  StepsGrid,
  AIPromotionSection,
  VSScrollAnimation,
} from "./components";

export function ComparePromotion() {
  return (
    <section aria-label="Comparador de candidatos">
      <VSScrollAnimation />

      <div className="px-8 py-24 md:px-16 lg:px-32">
        <ComingSoonSection />
      </div>

      <StepsGrid />

      <AIPromotionSection />
    </section>
  );
}
