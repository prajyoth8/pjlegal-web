"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WelcomeSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative w-full bg-white py-16">
      {/* Card Container */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-7xl rounded-3xl shadow-2xl overflow-hidden bg-cover bg-center backdrop-blur"
        style={{
          backgroundImage: `url('/assets/wall_gradient_bg.png')`,
        }}
      >
        {/* Optional subtle animated background blob */}
        <motion.div
          className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-300 opacity-10 rounded-full blur-3xl z-0"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />

        {/* Silhouette overlay (10% opacity) */}
        <div className="absolute inset-0 z-0 bg-[url('/assets/lawyer_silhouette.png')] bg-no-repeat bg-right bg-contain opacity-5" />

        {/* Foreground Content */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side */}
          <motion.div
            className="max-w-2xl text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="uppercase tracking-widest text-sm text-gray-500 mb-2">
              Welcome to
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <Image
                src="/assets/pj_logo_icon.png"
                alt="PJ Legal Logo"
                width={90}
                height={90}
                className="object-contain"
              />
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                PJ LEGAL
              </h1>
            </div>

            <p className="text-md text-gray-700 font-medium mb-2">
              Empowering Justice with Intelligence and Integrity.
            </p>

            <p className="text-lg mb-6 font-semibold">
              <span className="text-blue-700">Justice</span> |{" "}
              <span className="text-purple-700">Intelligence</span> |{" "}
              <span className="text-green-700">Integrity</span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="/consult"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              >
                Book Consultation
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full shadow-md transition hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Image
              src="/assets/pj_logo_wall.png"
              alt="PJ Legal Wall Logo"
              width={500}
              height={500}
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="text-center mt-4 text-gray-400 text-sm pb-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ↓ Scroll to Explore
        </motion.div>
      </motion.div>
    </section>
  );
}
