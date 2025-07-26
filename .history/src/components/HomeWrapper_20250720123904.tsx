// "use client";

// import { useEffect, useState } from "react";
// import WelcomeSection from "@/components/light/WelcomeSection";
// import PracticeSection from "@/components/light/PracticeSection";
// import NewsSection from "@/components/light/NewsSection";
// import AboutSection from "@/components/light/AboutSection";
// import DisclaimerModal from "@/components/DisclaimerModal";
// import ContactSection from "@/components/light/ContactSection";
// import ArticlesSection from "@/components/light/ArticlesSection";
// import EducationSection from "@/components/light/EducationSection";
// import Navbar from "./Navbar";
// import VisitorsSection from "@/components/light/VisitorsSection";
// import Footer from "@/components/Footer";
// import { useSearchParams } from "next/navigation";

// export default function HomeWrapper() {
//   const searchParams = useSearchParams();
//   const [showDisclaimer, setShowDisclaimer] = useState(true);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const accepted = sessionStorage.getItem("pj_disclaimer_accepted");
//     if (accepted === "true") {
//       setShowDisclaimer(false);

//       // Handle scrollTo if coming back via direct navigation
//       const scrollTo = searchParams?.get("scrollTo");
//       if (scrollTo) {
//         setTimeout(() => {
//           const el = document.getElementById(scrollTo);
//           if (el) {
//             const yOffset = -80;
//             const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
//             window.scrollTo({ top: y, behavior: "smooth" });
//           }
//         }, 400);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (!showDisclaimer) {
//       const scrollTo = searchParams?.get("scrollTo");
//       if (scrollTo) {
//         setTimeout(() => {
//           const el = document.getElementById(scrollTo);
//           if (el) {
//             const yOffset = -80;
//             const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
//             window.scrollTo({ top: y, behavior: "smooth" });
//           }
//         }, 300);
//       }
//     }
//   }, [searchParams, showDisclaimer]);

//   const handleProceed = () => {
//     sessionStorage.setItem("pj_disclaimer_accepted", "true");
//     setShowDisclaimer(false);

//     // Scroll to requested section if scrollTo param exists
//     const scrollTo = searchParams?.get("scrollTo");
//     if (scrollTo) {
//       setTimeout(() => {
//         const el = document.getElementById(scrollTo);
//         if (el) {
//           const yOffset = -80;
//           const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
//           window.scrollTo({ top: y, behavior: "smooth" });
//         }
//       }, 300);
//     }
//   };

//   return (
//     <>
//       {showDisclaimer && (
//         <DisclaimerModal
//           checked={checked}
//           onCheck={() => setChecked(!checked)}
//           onProceed={handleProceed}
//           disabled={!checked}
//         />
//       )}

//       {!showDisclaimer && (
//         <div>
//           <Navbar />
//           <WelcomeSection />
//           <AboutSection />
//           <PracticeSection />
//           <NewsSection />
//           <ArticlesSection />
//           <EducationSection />
//           <VisitorsSection />
//           <ContactSection />
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import WelcomeSection from "@/components/light/WelcomeSection";
import PracticeSection from "@/components/light/PracticeSection";
// import NewsSection from "@/components/light/NewsSection";
import AboutSection from "@/components/light/AboutSection";
import DisclaimerModal from "@/components/DisclaimerModal";
import ContactSection from "@/components/light/ContactSection";
import ArticlesSection from "@/components/light/ArticlesSection";
import EducationSection from "@/components/light/EducationSection";
import Navbar from "./Navbar";
import VisitorsSection from "@/components/light/VisitorsSection";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import InsightsSection from "./light/InsightsSection";

export default function HomeWrapper() {
  const searchParams = useSearchParams();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const accepted = sessionStorage.getItem("pj_disclaimer_accepted");
    if (accepted === "true") {
      setShowDisclaimer(false);

      // Handle scrollTo if coming back via direct navigation
      const scrollTo = searchParams?.get("scrollTo");
      if (scrollTo) {
        setTimeout(() => {
          const el = document.getElementById(scrollTo);
          if (el) {
            const yOffset = -80;
            const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 400);
      }
    }
  }, []);

  useEffect(() => {
    if (!showDisclaimer) {
      const scrollTo = searchParams?.get("scrollTo");
      if (scrollTo) {
        setTimeout(() => {
          const el = document.getElementById(scrollTo);
          if (el) {
            const yOffset = -80;
            const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 300);
      }
    }
  }, [searchParams, showDisclaimer]);

  const handleProceed = () => {
    sessionStorage.setItem("pj_disclaimer_accepted", "true");
    setShowDisclaimer(false);

    // Scroll to requested section if scrollTo param exists
    const scrollTo = searchParams?.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <>
      {showDisclaimer && (
        <DisclaimerModal
          checked={checked}
          onCheck={() => setChecked(!checked)}
          onProceed={handleProceed}
          disabled={!checked}
        />
      )}

      {!showDisclaimer && (
        <div>
          {/* REMOVE the Navbar component from here */}
          <WelcomeSection />
          <AboutSection />
          <PracticeSection />
          <section id="insights" className="scroll-mt-24 bg-gray-50 py-16 px-6">
            
              

              <div className="space-y-16">
                {/* <NewsSection /> */}
                <InsightsSection />
              </div>
            
          </section>

          <VisitorsSection />
          <ContactSection />
        </div>
      )}
    </>
  );
}
