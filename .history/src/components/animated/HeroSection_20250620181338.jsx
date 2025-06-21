'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Prevent SSR errors with theme
  if (!mounted) return null;

  const imageSrc =
    theme === 'dark'
      ? '/assets/hero_dark.jpg'
      : theme === 'light'
      ? '/assets/hero_light.jpg'
      : '/assets/hero_neutral.jpg';

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 📷 Background Image */}
      <Image
        src={imageSrc}
        alt="Hero Background"
        fill
        className="absolute inset-0 z-0 object-cover brightness-50"
        priority
      />

      {/* 🔲 Overlay */}
      <div
        className={`absolute inset-0 z-10 ${
          theme === 'dark'
            ? 'bg-black/60 backdrop-blur-sm'
            : 'bg-white/50 backdrop-blur-md'
        }`}
      />

      {/* 🧑‍⚖️ Foreground Content */}
      <div className="relative z-20 max-w-4xl px-6 text-center text-white dark:text-white text-gray-900">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Welcome to <span className="text-yellow-400">PJ Legal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl mb-6"
        >
          Your trusted AI-powered legal assistant. Navigate confidently.
        </motion.p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="#get-started"
          className="inline-block px-6 py-3 bg-yellow-500 text-black rounded-xl shadow-lg hover:bg-yellow-600 transition"
        >
          Get Started
        </motion.a>
      </div>
    </section>
  );
}
