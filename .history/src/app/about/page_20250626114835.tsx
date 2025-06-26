// ✅ No "use client" — this is a Server Component
import AboutContent from "./AboutContent";
import { HybridLayout } from "@/components/layout";

export const metadata = {
  title: "About PJ Legal",
  description: "Learn more about the mission, practice, and expertise of Advocate PJ.",
};

export default function AboutPage() {
  <HybridLayout></HybridLayout>
  return <AboutContent />;
}
