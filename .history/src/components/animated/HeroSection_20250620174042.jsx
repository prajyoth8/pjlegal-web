// components/animated/HeroSection.jsx

'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section className={`w-full h-screen flex items-center justify-center px-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Welcome to <span className="text-blue-500">PJ Legal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl mb-6"
        >
          Your AI-powered legal assistant. Navigate law smartly, confidently, and efficiently.
        </motion.p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="#get-started"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          Get Started
        </motion.a>
      </div>
    </section>
  );
}
