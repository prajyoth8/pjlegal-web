// 📁 src/app/page.tsx
import HeroSection from "@/components/HeroSection";
import CarouselSection from "@/components/CarouselSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      {/* other sections like <CarouselSection /> */}
    </div>
  );
}
