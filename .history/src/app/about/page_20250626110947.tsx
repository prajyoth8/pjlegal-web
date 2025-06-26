// ✅ No "use client" — this is a Server Component
import AboutContent from "./AboutContent";

export const metadata = {
  title: "About PJ Legal",
  description: "Learn more about the mission, practice, and expertise of Advocate PJ.",
};

export default function AboutPage() {
  return <AboutContent />;
}
