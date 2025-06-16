"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "keen-slider/keen-slider.min.css";

const images = [
  {
    src: "/assets/carousel1.png",
    title: "LegalTech Automation",
    caption: "AI-powered workflows & contract automation",
    description:
      "Automate repetitive legal tasks, document review, and contract management using AI-driven workflows. Improve turnaround time and reduce manual errors.",
  },
  {
    src: "/assets/carousel2.png",
    title: "Cybersecurity & Law",
    caption: "Protection for digital assets & breaches",
    description:
      "Safeguard digital information and mitigate cyber threats by integrating legal compliance with AI-based cybersecurity assessment and alert systems.",
  },
  {
    src: "/assets/carousel3.png",
    title: "Litigation Support",
    caption: "Evidence handling & court preparation",
    description:
      "Assist legal teams with structured tools for managing case files, preparing witness lists, and organizing digital evidence for trial use.",
  },
  {
    src: "/assets/carousel4.png",
    title: "HR & Labor Law",
    caption: "Hiring, workplace & policy compliance",
    description:
      "Ensure your hiring process, workplace policies, and labor contracts comply with evolving employment laws and regulatory standards.",
  },
  {
    src: "/assets/carousel5.png",
    title: "Corporate Governance",
    caption: "Boards, policies & legal compliance",
    description:
      "Enable transparent and legally sound governance by structuring board decisions, compliance logs, and regulatory documentation using smart tools.",
  },
  {
    src: "/assets/carousel6.png",
    title: "AI for Legal Drafting",
    caption: "Smarter agreements and notices",
    description:
      "Draft customized legal documents with AI assistance—ranging from contracts to notices, all while ensuring accuracy, relevance, and legal conformity.",
  },
  {
    src: "/assets/carousel7.png",
    title: "Legal Research Intelligence",
    caption: "Extract insights from vast legal data",
    description:
      "Use AI to analyze case law, statutes, and judgments. Get instant summaries, legal issue mapping, and precedent suggestions from vast databases.",
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
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-gray-900 rounded-xl max-w-3xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setModalData(null)}
            >
              <X size={24} />
            </button>

            <Image
              src={modalData.src}
              alt={modalData.title}
              width={900}
              height={600}
              className="w-full h-[400px] object-cover rounded-md"
            />
            <div className="mt-4 text-white space-y-4">
              <h3 className="text-2xl font-bold">{modalData.title}</h3>
              <p className="text-sm text-gray-300">{modalData.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
