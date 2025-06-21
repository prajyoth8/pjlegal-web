// ✅ src/components/light/WelcomeSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function WelcomeSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [taglineIndex, setTaglineIndex] = useState(0);
  const tags = [
    { text: "Justice", color: "text-blue-700" },
    { text: "Intelligence", color: "text-purple-700" },
    { text: "Integrity", color: "text-green-700" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % tags.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center overflow-hidden">
      {/* ✨ Floating Particles */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-60 h-60 bg-gradient-to-br from-yellow-300 via-pink-400 to-red-500 opacity-20 rounded-full filter blur-2xl animate-pulse pointer-events-none"></div>

      {/* 🌈 Background Gradient Loop */}
      <div className="absolute inset-0 z-0 animate-gradientLoop bg-[url('/assets/wall_gradient_bg.png')] bg-cover bg-center mix-blend-overlay opacity-100" />

      {/* 🎯 Central Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl rounded-3xl shadow-2xl bg-white/20 backdrop-blur-md px-6 sm:px-10 lg:px-14 py-16 sm:py-20 text-center flex flex-col items-center hover:shadow-yellow-200 hover:shadow-[0_0_50px_0_rgba(255,223,0,0.3)] transition-all duration-500"
      >
        {/* 🔷 Logo + Title */}
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

        {/* 🌀 Animated Tagline */}
        <motion.p
          key={taglineIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mt-4 text-xl font-semibold transition-colors duration-500 ${tags[taglineIndex].color}`}
        >
          {tags[taglineIndex].text}
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

      {/* ⬇️ Scroll Hint */}
      <motion.div
        className="absolute bottom-6 animate-bounce text-gray-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xl">&#x2193;</span>
        <p className="text-xs mt-1">Scroll down</p>
      </motion.div>
    </section>
  );
}
