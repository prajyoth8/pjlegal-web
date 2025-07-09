// "use client";

// import Link from "next/link";

// const simplifiedPracticeAreas = [
//   { name: "Civil Law", slug: "civil-law" },
//   { name: "Constitutional Law", slug: "constitutional-law" },
//   { name: "Corporate Laws", slug: "corporate-laws" },
//   { name: "Criminal Law", slug: "criminal-law" },
//   { name: "Election Law", slug: "election-law" },
//   { name: "Family Law", slug: "family-law" },
//   { name: "Labour Law", slug: "labour-law" },
//   { name: "Property Law", slug: "property-law" },
//   { name: "Real Estate RERA", slug: "real-estate-rera" },
//   { name: "Service Law", slug: "service-law" },
// ];

// export default function PracticeSection() {
//   return (
//     <section id="practice" className="py-16 bg-gray-50 text-black">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-8 text-center">Practice Areas</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {simplifiedPracticeAreas.map(({ name, slug }) => (
//             <Link
//               key={slug}
//               href={`/practice-areas/${slug}`}
//               className="block bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg hover:border-purple-400 transition"
//             >
//               <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const practiceAreas = [
  {
    name: "Civil Law",
    slug: "civil-law",
    icon: "⚖️",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    name: "Criminal Law",
    slug: "criminal-law",
    icon: "🔍",
    gradient: "from-red-500 to-red-600",
  },
  {
    name: "Family Law",
    slug: "family-law",
    icon: "👨‍👩‍👧‍👦",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Property Law",
    slug: "property-law",
    icon: "🏠",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    name: "Constitutional Law",
    slug: "constitutional-law",
    icon: "📜",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    name: "Cyber Law",
    slug: "cyber-law",
    icon: "💻",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Corporate & Business Law",
    slug: "corporate-law",
    icon: "🏢",
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Consumer Protection Law",
    slug: "consumer-law",
    icon: "🛒",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    name: "Labour & Employment Law",
    slug: "labour-law",
    icon: "👷‍♂️",
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    name: "Education Law",
    slug: "education-law",
    icon: "🎓",
    gradient: "from-sky-500 to-sky-600",
  },
  {
    name: "Environmental Law",
    slug: "environmental-law",
    icon: "🌿",
    gradient: "from-green-500 to-green-600",
  },
  {
    name: "Intellectual Property Rights (IPR)",
    slug: "ipr-law",
    icon: "💡",
    gradient: "from-fuchsia-500 to-fuchsia-600",
  },
  {
    name: "Taxation Law",
    slug: "taxation-law",
    icon: "💰",
    gradient: "from-lime-500 to-lime-600",
  },
  {
    name: "Banking & Insurance Law",
    slug: "banking-law",
    icon: "🏦",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    name: "Technology & AI Law",
    slug: "technology-law",
    icon: "🤖",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    name: "Arbitration & ADR",
    slug: "adr-law",
    icon: "🕊️",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    name: "Legal Aid & Pro Bono Services",
    slug: "pro-bono-law",
    icon: "🤝",
    gradient: "from-rose-500 to-rose-600",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring" as const,
      damping: 10,
      stiffness: 100,
    },
  },
};

// Usage remains the same:
<motion.div key={slug} variants={item} className="h-full">
  {/* content */}
</motion.div>;

export default function PracticeSection() {
  return (
    <section id="practice" className="relative py-24 overflow-hidden bg-[#f9fafb]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-purple-100 mb-4"
          >
            <span className="text-xs font-semibold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-purple-600">
              Legal Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
              Comprehensive
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-purple-600">
              Practice Areas
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Specialized legal services tailored to your unique needs with our multidisciplinary
            approach
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {practiceAreas.map(({ slug, name, icon, gradient }) => (
            <motion.div key={slug} variants={item} className="h-full">
              <Link href={`/practice-areas/${slug}`} className="group block h-full">
                <div className="h-full bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 border border-gray-100 hover:border-transparent relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 ${gradient} transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10">
                    <div className="flex items-start">
                      <div
                        className={`text-3xl mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-white bg-gradient-to-br ${gradient} p-2 rounded-lg`}
                      >
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                          {name}
                        </h3>
                        <div
                          className={`mt-2 w-8 h-1 rounded-full bg-gradient-to-r ${gradient} group-hover:w-12 transition-all duration-300`}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center text-gray-500 group-hover:text-white font-medium text-sm transition-colors duration-300">
                      Explore area
                      <FiArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-amber-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110"
          >
            Need specialized legal advice?
            <FiArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
