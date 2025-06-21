// ✅ src/components/light/WelcomeSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="bg-white pt-32 pb-24 px-6 md:px-20 lg:px-36">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Logo, Text, Buttons */}
        <div className="text-center lg:text-left max-w-2xl">
          {/* Logo and Title */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <Image
              src="/assets/pj_logo.png"
              alt="PJ Legal Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              PJ LEGAL
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-lg text-gray-700 font-medium mb-6">
            Justice <span className="mx-2 text-gray-400">|</span>
            Intelligence <span className="mx-2 text-gray-400">,</span>
            Integrity
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/consult"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-full border transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right Side: Wall Logo */}
        <div className="w-full max-w-sm lg:max-w-md">
          <Image
            src="/assets/pj_logo_wall.png"
            alt="PJ Legal Wall Logo"
            width={600}
            height={600}
            className="object-contain rounded-xl drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
