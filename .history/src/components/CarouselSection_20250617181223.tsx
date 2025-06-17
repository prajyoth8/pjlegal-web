"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import ReactMarkdown from "react-markdown";

const images = [
  // ... [Same content as before: images array with title, caption, description, src]
];

export default function CarouselSection() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 1.2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 1.5, spacing: 24 },
      },
    },
  });

  const scrollPrev = () => slider.current?.prev();
  const scrollNext = () => slider.current?.next();
  const [modalData, setModalData] = useState<null | (typeof images)[0]>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <section className="py-16 bg-gray-900 relative">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Explore Our Expertise
      </h2>

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

      <div ref={sliderRef} className="keen-slider px-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="keen-slider__slide group bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer"
            onClick={() => setModalData(img)}
          >
            <div className="w-full aspect-[4/3] relative">
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-contain p-4"
                sizes="100vw"
              />
            </div>
            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {img.title}
              </h3>
              <p className="text-sm text-gray-600">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 py-10">
          <div className="bg-gray-900 rounded-xl max-w-5xl w-full p-6 relative flex flex-col lg:flex-row gap-6">
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setModalData(null)}
            >
              <X size={24} />
            </button>

            <div className="flex-1 text-white overflow-y-auto max-h-[70vh] pr-2 text-left">
              <h3 className="text-2xl font-bold mb-1">{modalData.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{modalData.caption}</p>
              <ReactMarkdown
                className="prose prose-invert max-w-none text-white text-sm
                [&>ul>li]:before:content-['🔹'] 
                [&>ul>li]:before:mr-2 
                [&>ul>li]:before:text-blue-400"
              >
                {modalData.description}
              </ReactMarkdown>
            </div>

            <div className="w-full lg:w-[40%] rounded-lg overflow-hidden">
              <Image
                src={modalData.src}
                alt={modalData.title}
                width={600}
                height={400}
                className="object-contain rounded-md w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
