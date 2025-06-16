// 📁 src/components/CarouselSection.tsx
"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

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
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1.2, spacing: 12 },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: { perView: 2.2, spacing: 16 },
      },
      "(min-width: 1025px)": {
        slides: { perView: 3.5, spacing: 24 },
      },
    },
  });

  const scrollPrev = () => slider.current?.prev();
  const scrollNext = () => slider.current?.next();

  return (
    <section className="py-16 bg-gray-900 relative">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Explore Our Expertise
      </h2>

      {/* Arrows */}
      <button
        className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        onClick={scrollPrev}
      >
        <ChevronLeft className="text-white" size={28} />
      </button>

      <button
        className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        onClick={scrollNext}
      >
        <ChevronRight className="text-white" size={28} />
      </button>

      {/* Carousel */}
      <div ref={sliderRef} className="keen-slider px-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="keen-slider__slide group relative rounded-xl shadow-xl overflow-hidden cursor-pointer"
          >
            <div className="w-full h-[280px] relative">
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 25vw"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-semibold">{img.title}</h3>
                <p className="text-sm">{img.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
