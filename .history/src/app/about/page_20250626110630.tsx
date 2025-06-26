// ❌ No "use client"
import dynamic from "next/dynamic";

export const metadata = {
  title: "About PJ Legal",
  description: "Learn more about the mission, practice, and expertise of Advocate PJ.",
};

// ✅ Dynamically import the client-side AboutContent
const AboutContent = dynamic(() => import("./AboutContent"), { ssr: false });

export default function AboutPage() {
  return <AboutContent />;
}
