// 📁 src/app/page.tsx
import HeroSection from "@/components/HeroSection";
import CarouselSection from "@/components/CarouselSection";
import HomeWrapper from "@/components/HomeWrapper";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CarouselSection />
    </div>
  );
}
