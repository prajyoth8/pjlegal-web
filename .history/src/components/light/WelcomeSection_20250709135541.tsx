// // ✅ src/components/light/WelcomeSection.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { ChevronDown } from "lucide-react";
// import ConsultationModal from "@/components/ConsultationModal";
// import { useState } from "react";

// export default function WelcomeSection() {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <section className="relative w-full bg-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center overflow-hidden">
//       {/* ✨ Floating Gradient Particles */}
//       <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
//       <div className="absolute top-40 right-0 w-60 h-60 bg-gradient-to-br from-yellow-300 via-pink-400 to-red-500 opacity-20 rounded-full filter blur-2xl animate-pulse pointer-events-none"></div>

//       {/* 🎯 Central Card */}
//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0, y: 30 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="relative w-full max-w-7xl rounded-3xl shadow-2xl bg-[url('/assets/hero_light.jpg')] bg-cover bg-center px-4 sm:px-6 lg:px-12 py-16 sm:py-20 text-center flex flex-col items-center hover:shadow-yellow-200 hover:shadow-[0_0_50px_0_rgba(255,223,0,0.3)] transition-all duration-500"
//       >
//         {/* 🔽 Auto-scroll Hint */}
//         <a
//           href="#next-section"
//           className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer"
//         >
//           <ChevronDown className="h-6 w-6 text-gray-500 animate-bounce group-hover:text-blue-600 transition" />
//           <span className="mt-1 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition">
//             Scroll Down
//           </span>
//         </a>

//         {/* 🎯 Logo and Title */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={inView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ delay: 0.1, duration: 0.5 }}
//           className="flex flex-col items-center gap-4"
//         >
//           <Image
//             src="/pj_logo_black.png"
//             alt="PJ Legal Logo"
//             width={100}
//             height={100}
//             className="object-contain"
//           />
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 tracking-tight">
//             PJ LEGAL
//           </h1>
//         </motion.div>

//         {/* 💬 Tagline */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="mt-4 text-lg font-semibold"
//         >
//           <span className="text-blue-700">Justice</span>
//           <span className="mx-2 text-gray-700">|</span>
//           <span className="text-purple-700">Intelligence</span>
//           <span className="mx-2 text-gray-700">|</span>
//           <span className="text-green-700">Integrity</span>
//         </motion.p>

//         {/* 🚀 CTA Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.5, duration: 0.5 }}
//           className="mt-8 flex flex-wrap justify-center gap-4"
//         >
//           <button
//             onClick={() => setModalOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105 hover:shadow-blue-300 animate-bounce-once"
//           >
//             Book Consultation
//           </button>
//           <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />

//           <Link
//             href="#contact"
//             className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105"
//           >
//             Get in Touch
//           </Link>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ArrowRight } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";
import { useState, useEffect } from "react";

export default function WelcomeSection() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [modalOpen, setModalOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}
      </div>

      {/* Glass Morphic Blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-300/20 to-pink-400/20 rounded-full filter blur-[90px] pointer-events-none" />

      {/* Main Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Glass Morphic Card */}
        <motion.div
          variants={itemVariants}
          className="relative backdrop-blur-xl bg-white/70 border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 pointer-events-none" />

          {/* Inner Content */}
          <div className="relative z-10 px-6 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
            {/* Logo & Title */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
              <div className="p-4 bg-white/80 rounded-2xl shadow-lg">
                <Image
                  src="/pj_logo_black.png"
                  alt="PJ Legal Logo"
                  width={120}
                  height={120}
                  className="object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
              >
                PJ LEGAL
              </motion.h1>
            </motion.div>

            {/* Animated Tagline */}
            <motion.div
              variants={containerVariants}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              {["Justice", "Intelligence", "Integrity"].map((word, index) => (
                <motion.span
                  key={word}
                  variants={itemVariants}
                  custom={index}
                  className={`text-xl font-medium px-4 py-2 rounded-full backdrop-blur-sm ${
                    word === "Justice"
                      ? "bg-blue-500/10 text-blue-700"
                      : word === "Intelligence"
                        ? "bg-purple-500/10 text-purple-700"
                        : "bg-green-500/10 text-green-700"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setModalOpen(true)}
                className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg"
              >
                <span className="relative z-10 flex items-center">
                  Book Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group bg-white/90 border border-gray-200 text-gray-800 font-semibold px-8 py-4 rounded-full shadow-lg"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          variants={itemVariants}
          href="#next-section"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="h-8 w-8 text-gray-500 group-hover:text-blue-600 transition-colors" />
          </motion.div>
          <span className="mt-2 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
            Explore More
          </span>
        </motion.a>
      </motion.div>

      {/* Consultation Modal */}
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
