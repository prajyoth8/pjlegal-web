// 📁 src/components/CarouselSection.tsx

"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/assets/carousel1.png", alt: "Legal Insights" },
  { src: "/assets/carousel2.png", alt: "Courtroom Experience" },
  { src: "/assets/carousel3.png", alt: "AI Legal Tech" },
];

export default function CarouselSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore Our Expertise
      </h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-8"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="min-w-[300px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-[300px]"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
