"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/assets/hero.png"
        alt="Hero"
        fill
        sizes="100vw"
        className="object-cover"
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

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/book"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            📅 Book Consultation
          </Link>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
          >
            📞 Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
