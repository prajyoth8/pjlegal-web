"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Click outside modal to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

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

      {/* Calendly Modal */}
      {showModal && (
        <div
          ref={modalRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-10"
        >
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-4 text-gray-700 hover:text-red-500 text-2xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <iframe
              src="https://calendly.com/pjlegal-r"
              width="100%"
              height="600"
              className="border-none w-full"
              loading="lazy"
              title="Book Consultation"
            >
              Loading…
            </iframe>
          </div>
        </div>
      )}

      {/* Hero Content */}
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

        {/* Action Buttons */}
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

        {/* Enhanced Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 cursor-pointer group"
          onClick={() =>
            document.getElementById("practice")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <svg
            className="w-8 h-8 text-white group-hover:text-blue-400 animate-bounce drop-shadow-md"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <p className="text-sm text-gray-300 mt-1 group-hover:text-blue-400 transition">
            Scroll Down
          </p>
        </motion.div>
      </div>
    </section>
  );
}
