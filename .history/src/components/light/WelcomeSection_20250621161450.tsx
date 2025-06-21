"use client";

import Image from "next/image";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="relative w-full">
      {/* Background Wall + Gradient */}
      <div className="absolute inset-0">
        <Image
          src="/assets/wall_gradient_bg.png"
          alt="Wall Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>

      {/* Foreground Card Content */}
      <div className="relative z-10 flex justify-center px-4 md:px-8 lg:px-16 py-16">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl px-6 md:px-12 py-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Left Section */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <Image
                src="/assets/pj_logo_icon.png"
                alt="PJ Legal Logo"
                width={80}
                height={80}
                className="object-contain"
              />
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                PJ LEGAL
              </h1>
            </div>

            <p className="text-lg md:text-xl font-semibold mb-6">
              <span className="text-blue-700">Justice</span>{" "}
              <span className="text-gray-500">|</span>{" "}
              <span className="text-purple-700">Intelligence</span>{" "}
              <span className="text-gray-500">|</span>{" "}
              <span className="text-green-700">Integrity</span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/consult"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
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

          {/* Right Section */}
          <div className="w-full max-w-sm">
            <Image
              src="/assets/pj_logo_wall.png"
              alt="PJ Legal Wall Logo"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
