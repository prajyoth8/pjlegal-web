// 📁 src/components/CarouselSection.tsx
"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

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
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 2,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 32,
        },
      },
    },
  });

  const handleClick = (title: string) => {
    console.log("Clicked:", title); // Replace with route push or modal later
  };

  return (
    <section className="py-16 bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Explore Our Expertise
      </h2>

      <div ref={sliderRef} className="keen-slider px-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="keen-slider__slide cursor-pointer group relative overflow-hidden rounded-xl shadow-xl"
            onClick={() => handleClick(img.title)}
          >
            <Image
              src={img.src}
              alt={img.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
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
