// 📁 src/components/HomeWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import CarouselSection from "@/components/CarouselSection";
import DisclaimerModal from "@/components/DisclaimerModal";

export default function HomeWrapper() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Always show on first load (not persisted intentionally)
    setShowDisclaimer(true);
  }, []);

  return (
    <>
      {showDisclaimer && (
        <DisclaimerModal
          checked={checked}
          onCheck={() => setChecked(!checked)}
          onProceed={() => setShowDisclaimer(false)}
          disabled={!checked}
        />
      )}

      {!showDisclaimer && (
        <div>
          <HeroSection />
          <CarouselSection />
        </div>
      )}
    </>
  );
}
