// ✅ src/components/light/WelcomeSection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 🔵 Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero_office_pjlegal.jpg" // We'll generate this image
          alt="PJ Legal Office"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/60" />
      </div>

      {/* 🔵 Content */}
      <div className="relative z-10 max-w-5xl px-6 text-left text-black">
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PJ <span className="text-blue-500">Legal</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Blending legal wisdom. Empowering{" "}
          <span className="text-purple-500">Justice</span> with{" "}
          <span className="text-blue-500">Intelligence</span> &{" "}
          <span className="text-indigo-500">Integrity.</span>
        </motion.p>

        {/* 🔵 Action Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link
            href="/book"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow"
          >
            Book Consultation
          </Link>
          <Link
            href="/contact"
            className="border border-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
