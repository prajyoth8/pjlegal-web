// ✅ components/light/WelcomeSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="relative w-full h-[90vh] bg-white flex items-center justify-between px-6 md:px-24 py-12">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 space-y-4"
      >
        <Image
          src="/assets/pj_logo_dark.png"
          alt="PJ Legal Logo"
          width={120}
          height={120}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
          PJ LEGAL
        </h1>
        <p className="text-lg text-neutral-700">
          <span className="font-medium">Justice</span> | Intelligence, Integrity
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            href="/book"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            Book Consultation
          </Link>
          <Link
            href="/contact"
            className="bg-gray-100 px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>

      {/* Right: Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex md:w-1/2 justify-center"
      >
        <Image
          src="/assets/pj_logo_wall.png"
          alt="PJ Legal Wall Logo"
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </section>
  );
}
