// // 📁 src/components/HomeWrapper.tsx
// "use client";

// import { useEffect, useState } from "react";
// // ❌ Old import from base folder
// // import HeroSection from "@/components/HeroSection";
// // import CarouselSection from "@/components/CarouselSection";

// // ✅ New import from animated subfolder
// import HeroSection from "@/components/animated/HeroSection";
// import CarouselSection from "@/components/animated/PracticeCarousel";

// import DisclaimerModal from "@/components/DisclaimerModal";

// export default function HomeWrapper() {
//   const [showDisclaimer, setShowDisclaimer] = useState(true);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     setShowDisclaimer(true);
//   }, []);

//   return (
//     <>
//       {showDisclaimer && (
//         <DisclaimerModal
//           checked={checked}
//           onCheck={() => setChecked(!checked)}
//           onProceed={() => setShowDisclaimer(false)}
//           disabled={!checked}
//         />
//       )}

//       {!showDisclaimer && (
//         <div>
//           <HeroSection />
//           <CarouselSection />
//         </div>
//       )}
//     </>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import WelcomeBar from "@/components/ai/WelcomeBar";
// import PromptCommandBar from "@/components/ai/PromptCommandBar";
// import PracticeCardsSection from "@/components/ai/PracticeCardsSection";
// import NewsUpdatesSection from "@/components/ai/NewsUpdatesSection";
// import ArticlesSection from "@/components/ai/ArticlesSection";
// import DisclaimerModal from "@/components/DisclaimerModal";

// export default function HomeWrapper() {
//   const [showDisclaimer, setShowDisclaimer] = useState(true);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     setShowDisclaimer(true);
//   }, []);

//   return (
//     <>
//       {showDisclaimer ? (
//         <DisclaimerModal
//           checked={checked}
//           onCheck={() => setChecked(!checked)}
//           onProceed={() => setShowDisclaimer(false)}
//           disabled={!checked}
//         />
//       ) : (
//         <div className="space-y-20 pb-32">
//           <WelcomeBar />
//           <PromptCommandBar />
//           <PracticeCardsSection />
//           <NewsUpdatesSection />
//           <ArticlesSection />
//         </div>
//       )}
//     </>
//   );
// }

// ✅ src/components/HomeWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import WelcomeSection from "@/components/light/WelcomeSection";
import PracticeSection from "@/components/light/PracticeSection";
import NewsSection from "@/components/light/NewsSection";
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
          <WelcomeSection />
          <PracticeSection />
          <NewsSection />
        </div>
      )}
    </>
  );
}

