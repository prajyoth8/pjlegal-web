"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);

  // ESC key close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal && calendlyRef.current) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      window.Calendly?.initInlineWidget({
        url: "https://calendly.com/pjlegal-r",
        parentElement: calendlyRef.current,
      });

      const listener = (e: MessageEvent) => {
        if (e.data?.event === "calendly.event_scheduled") {
          toast.success("✅ Thank you! Your consultation is booked.");
          setTimeout(() => setShowModal(false), 1500);
        }
      };

      window.addEventListener("message", listener);
      return () => window.removeEventListener("message", listener);
    }
  }, [showModal]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/hero.png"
        alt="Hero"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10 backdrop-blur-sm" />

      {/* Modal */}
      {showModal && (
        <div
          ref={modalRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-10 overflow-y-auto"
        >
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative shadow-xl backdrop-blur-lg">
            <button
              className="absolute top-3 right-4 text-gray-700 hover:text-red-500 text-2xl font-bold z-50"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div ref={calendlyRef} className="w-full h-[600px] overflow-auto" />
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen text-center px-4">
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

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
          >
            📅 Book Consultation
          </button>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition duration-200 shadow-md"
          >
            📞 Contact Us
          </Link>
        </motion.div>

        {/* Scroll Arrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 cursor-pointer group"
          onClick={() =>
            document
              .getElementById("practice")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <svg
            className="w-8 h-8 text-white group-hover:text-blue-400 animate-bounce drop-shadow-md transition duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <p className="text-sm text-gray-300 mt-1 group-hover:text-blue-400 transition">
            Scroll Down
          </p>
        </motion.div>
      </div>
    </section>
  );
}
