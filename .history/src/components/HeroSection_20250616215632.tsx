"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/assets/hero_main.png" // 📌 Make sure this PNG is in /public/assets/
        alt="PJ Legal Hero"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl">
          Empowering Justice <br /> With Intelligence & Integrity
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          A forward-thinking law firm blending legal wisdom with cyber & AI
          expertise.
        </p>
        <Link
          href="#practice"
          className="mt-8 inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Explore Our Practice Areas
        </Link>
      </div>
    </section>
  );
}
