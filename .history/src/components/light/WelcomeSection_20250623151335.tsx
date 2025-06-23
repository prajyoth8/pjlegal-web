// ✅ src/components/light/WelcomeSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

export default function WelcomeSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative w-full bg-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center overflow-hidden">
      {/* ✨ Floating Gradient Particles */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-60 h-60 bg-gradient-to-br from-yellow-300 via-pink-400 to-red-500 opacity-20 rounded-full filter blur-2xl animate-pulse pointer-events-none"></div>

      {/* 🎯 Central Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-7xl rounded-3xl shadow-2xl bg-[url('/assets/lawyer.png')] bg-cover bg-center px-4 sm:px-6 lg:px-12 py-16 sm:py-20 text-center flex flex-col items-center hover:shadow-yellow-200 hover:shadow-[0_0_50px_0_rgba(255,223,0,0.3)] transition-all duration-500"
      >
        {/* 🔽 Auto-scroll Hint */}
        <a
          href="#next-section"
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer"
        >
          <ChevronDown className="h-6 w-6 text-gray-500 animate-bounce group-hover:text-blue-600 transition" />
          <span className="mt-1 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition">
            Scroll Down
          </span>
        </a>

        {/* 🎯 Logo and Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <Image
            src="/assets/pj_logo_icon.png"
            alt="PJ Legal Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            PJ LEGAL
          </h1>
        </motion.div>

        {/* 💬 Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-lg font-semibold"
        >
          <span className="text-blue-700">Justice</span>
          <span className="mx-2 text-gray-700">|</span>
          <span className="text-purple-700">Intelligence</span>
          <span className="mx-2 text-gray-700">|</span>
          <span className="text-green-700">Integrity</span>
        </motion.p>

        {/* 🚀 CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/consult"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105 hover:shadow-blue-300 animate-bounce-once"
          >
            Book Consultation
          </Link>
          <Link
            href="/contact"
            className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
