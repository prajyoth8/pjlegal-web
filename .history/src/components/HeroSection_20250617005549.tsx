"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-10">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative">
            <button
              className="absolute top-3 right-4 text-gray-700 hover:text-red-500 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeDUMMY_FORM_LINK/viewform?embedded=true"
              width="100%"
              height="600"
              className="border-none w-full"
              loading="lazy"
            >
              Loading…
            </iframe>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl"
        >
          Empowering Justice <br /> With Intelligence & Integrity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          A forward-thinking law firm blending legal wisdom with cyber & AI
          expertise.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            📅 Book Consultation
          </button>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
          >
            📞 Contact Us
          </Link>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-10 animate-bounce text-white text-3xl"
        >
          <span>🔽</span>
        </motion.div>
      </div>
    </section>
  );
}
