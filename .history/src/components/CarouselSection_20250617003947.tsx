"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import ReactMarkdown from "react-markdown";

const images = [
  {
    src: "/assets/carousel1.png",
    title: "LegalTech Automation",
    caption: "AI-powered workflows & contract automation",
    description: `### Features:
- Automate legal documentation
- Smart workflow triggers
- Template-based contract generation

**Benefits:**
- Saves hours of manual work
- Reduces human error
- Enables quick review & approval`,
  },
  {
    src: "/assets/carousel2.png",
    title: "Cybersecurity & Law",
    caption: "Protection for digital assets & breaches",
    description: `### Features:
- AI breach detection
- Digital evidence logging
- Compliance alerts

**Benefits:**
- Protects sensitive client data
- Reduces risk of legal non-compliance`,
  },
  {
    src: "/assets/carousel3.png",
    title: "Litigation Support",
    caption: "Evidence handling & court preparation",
    description: `### Features:
- Document bundling tools
- Witness preparation support
- Courtroom-ready file exports

**Benefits:**
- Helps prepare efficiently for hearings
- Maintains structured records`,
  },
  {
    src: "/assets/carousel4.png",
    title: "HR & Labor Law",
    caption: "Hiring, workplace & policy compliance",
    description: `### Features:
- Smart contract generation
- Workplace compliance tracker
- Leave & termination templates

**Benefits:**
- Simplifies hiring
- Avoids regulatory penalties`,
  },
  {
    src: "/assets/carousel5.png",
    title: "Corporate Governance",
    caption: "Boards, policies & legal compliance",
    description: `### Features:
- Minutes of meeting automation
- Board resolution templates
- Compliance calendar alerts

**Benefits:**
- Promotes transparency
- Ensures timely legal filings`,
  },
  {
    src: "/assets/carousel6.png",
    title: "AI for Legal Drafting",
    caption: "Smarter agreements and notices",
    description: `### Features:
- Clause-by-clause drafting
- Context-aware AI suggestions
- Error & redundancy detection

**Benefits:**
- Fast, accurate drafts
- Avoids copy-paste pitfalls`,
  },
  {
    src: "/assets/carousel7.png",
    title: "Legal Research Intelligence",
    caption: "Extract insights from vast legal data",
    description: `### Features:
- Case law summarization
- Citation extraction
- Judgment comparison engine

**Benefits:**
- Legal research in seconds
- Supports argument building`,
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

  const [modalData, setModalData] = useState<null | (typeof images)[0]>(null);

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
            onClick={() => setModalData(img)}
          >
            <div className="w-full h-[300px] relative rounded-xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-semibold">{img.title}</h3>
                <p className="text-sm">{img.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 py-10">
          <div className="bg-gray-900 rounded-xl max-w-5xl w-full p-6 relative flex flex-col lg:flex-row gap-6">
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setModalData(null)}
            >
              <X size={24} />
            </button>

            {/* Text Section */}
            <div className="flex-1 text-white space-y-4 overflow-y-auto max-h-[70vh] pr-4">
              <h3 className="text-2xl font-bold">{modalData.title}</h3>
              <p className="text-sm text-gray-300">{modalData.caption}</p>
              <ReactMarkdown className="prose prose-invert text-white text-sm">
                {modalData.description}
              </ReactMarkdown>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-[40%] rounded-lg overflow-hidden">
              <Image
                src={modalData.src}
                alt={modalData.title}
                width={600}
                height={400}
                className="object-cover rounded-md w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
