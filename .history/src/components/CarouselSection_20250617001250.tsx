// 📁 src/components/CarouselSection.tsx
"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "keen-slider/keen-slider.min.css";

const images = [
  {
    src: "/assets/carousel1.png",
    title: "LegalTech Automation",
    caption: "AI-powered workflows & contract automation",
  },
  {
    src: "/assets/carousel2.png",
    title: "Cybersecurity & Law",
    caption: "Protection for digital assets & breaches",
  },
  {
    src: "/assets/carousel3.png",
    title: "Litigation Support",
    caption: "Evidence handling & court preparation",
  },
  {
    src: "/assets/carousel4.png",
    title: "HR & Labor Law",
    caption: "Hiring, workplace & policy compliance",
  },
  {
    src: "/assets/carousel5.png",
    title: "Corporate Governance",
    caption: "Boards, policies & legal compliance",
  },
  {
    src: "/assets/carousel6.png",
    title: "AI for Legal Drafting",
    caption: "Smarter agreements and notices",
  },
  {
    src: "/assets/carousel7.png",
    title: "Legal Research Intelligence",
    caption: "Extract insights from vast legal data",
  },
];

export default function CarouselSection() {
  const sliderRef = useRef(null);
  const [sliderInstanceRef, instance] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 1.25,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.5, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.5, spacing: 32 },
      },
    },
  });

  return (
    <section className="py-16 bg-gray-900 relative">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Explore Our Expertise
      </h2>

      {/* Arrow Controls */}
      <button
        className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        onClick={() => instance?.prev()}
      >
        <ChevronLeft className="text-white" size={28} />
      </button>

      <button
        className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        onClick={() => instance?.next()}
      >
        <ChevronRight className="text-white" size={28} />
      </button>

      <div ref={sliderRef} className="keen-slider px-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="keen-slider__slide group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
          >
            <div className="relative w-full h-64">
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
              <h3 className="text-lg font-semibold">{img.title}</h3>
              <p className="text-sm">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
