// 📁 src/components/HomeWrapper.tsx
"use client";

import { useEffect, useState } from "react";
// ❌ Old import from base folder
// import HeroSection from "@/components/HeroSection";
// import CarouselSection from "@/components/CarouselSection";

// ✅ New import from animated subfolder
import HeroSection from "@/components/animated/HeroSection";
import CarouselSection from "@/components/animated/PracticeCarousel";

import DisclaimerModal from "@/components/DisclaimerModal";

export default function HomeWrapper() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
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
          {/* <HeroSection />
          <CarouselSection /> */}
          
        </div>
      )}
    </>
  );
}
