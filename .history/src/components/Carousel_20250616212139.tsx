'use client';
import Image from 'next/image';
import { useState } from 'react';

const images = [
  '/assets/carousel1.jpg',
  '/assets/carousel2.jpg',
  '/assets/carousel3.jpg',
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((index + 1) % images.length);
  const prevSlide = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl mt-8 shadow-lg">
      <Image
        src={images[index]}
        alt={`Slide ${index}`}
        fill
        className="object-cover transition duration-700"
        priority
      />

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/70 p-2 rounded-full">
        ←
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/70 p-2 rounded-full">
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
