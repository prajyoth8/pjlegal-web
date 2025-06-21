// ✅ src/components/light/WelcomeSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="bg-white py-20 px-4 md:px-12 lg:px-24">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left Side: Text + Buttons */}
        <div className="text-center lg:text-left max-w-2xl">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <Image
              src="/assets/pj_logo.png"
              alt="PJ Legal Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              PJ LEGAL
            </h1>
          </div>

          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold">Justice</span> |{" "}
            <span className="font-semibold">Intelligence</span> |{" "}
            <span className="font-semibold">Integrity</span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
            <Link
              href="/consult"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-full border shadow-sm transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right Side: Logo on Wall */}
        <div className="w-full max-w-md">
          <Image
            src="/assets/pj_logo_wall.png"
            alt="PJ Legal Wall Logo"
            width={500}
            height={500}
            className="object-contain rounded-xl shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
