// ✅ src/components/light/WelcomeSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="relative w-full">
      {/* Background Wall + Gradient */}
      <div className="absolute inset-0">
        <Image
          src="/assets/wall_gradient_bg.png" // Use a full-width background with gradient+wall
          alt="Wall Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 px-4 md:px-12 lg:px-24 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Logo and Tagline */}
        <div className="max-w-2xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <Image
              src="/assets/pj_logo_black.png"
              alt="PJ Legal Logo"
              width={100}
              height={50}
              className="object-contain"
            />
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              PJ LEGAL
            </h1>
          </div>

          <p className="text-lg text-gray-800 mb-6 font-medium">
            <span className="mr-2">Justice</span> |{" "}
            <span className="mx-2">Intelligence</span> |{" "}
            <span className="ml-2">Integrity</span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/consult"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full shadow-md transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right Side: Embedded 3D Wall Logo */}
        <div className="w-full max-w-md">
          <Image
            src="/assets/pj_logo_wall.png"
            alt="PJ Legal Wall Logo"
            width={500}
            height={500}
            className="rounded-none object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
