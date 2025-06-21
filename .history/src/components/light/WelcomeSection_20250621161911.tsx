"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function WelcomeSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [logoInView, setLogoInView] = useState(false);

  useEffect(() => {
    if (inView) setLogoInView(true);
  }, [inView]);

  return (
    <section className="relative w-full bg-white py-20 px-4 md:px-8 lg:px-16">
      {/* Foreground Card with Wall Gradient Background */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 0 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
      >
        {/* Gradient + Wall Background inside Card */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/wall_gradient_bg.png"
            alt="Wall Background"
            layout="fill"
            objectFit="cover"
            className="opacity-95"
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 px-8 py-12">
          {/* Left Section */}
          <div className="max-w-xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-4"
            >
              <Image
                src="/assets/pj_logo_icon.png"
                alt="PJ Legal Logo"
                width={80}
                height={80}
                className={`transition-all duration-700 ${
                  logoInView ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              />
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                PJ LEGAL
              </h1>
            </motion.div>

            <p className="text-lg md:text-xl font-semibold mb-6">
              <span className="text-blue-700">Justice</span>{" "}
              <span className="text-gray-500">|</span>{" "}
              <span className="text-purple-700">Intelligence</span>{" "}
              <span className="text-gray-500">|</span>{" "}
              <span className="text-green-700">Integrity</span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #3b82f6" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/consult"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
                >
                  Book Consultation
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #ccc" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/contact"
                  className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full shadow-md transition"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Section - Wall Logo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-sm"
          >
            <Image
              src="/assets/pj_logo_wall.png"
              alt="PJ Legal Wall Logo"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
