// ✅ src/components/light/WelcomeSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WelcomeSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative w-full bg-white py-20 px-4 flex justify-center">
      {/* Card Container */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl rounded-3xl shadow-2xl bg-[url('/assets/wall_gradient_bg.png')] bg-cover bg-center px-6 py-16 lg:px-20 lg:py-20 flex flex-col items-center text-center hover:shadow-yellow-200 hover:shadow-[0_0_50px_0_rgba(255,223,0,0.3)] transition-all duration-500"
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <Image
            src="/assets/pj_logo_icon.png"
            alt="PJ Legal Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            PJ <span className="text-purple-700">Intelligence</span>
          </h1>
        </motion.div>

        {/* Tagline with Colored Text */}
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

        {/* Call-to-action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-5"
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
