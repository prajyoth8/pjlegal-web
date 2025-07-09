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
import { motion, Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const practiceAreas = [
  { name: "Civil Litigation", slug: "civil-law", icon: "⚖️", color: "text-amber-500" },
  { name: "Criminal Defense", slug: "criminal-law", icon: "🔍", color: "text-red-500" },
  { name: "Family Law", slug: "family-law", icon: "👨‍👩‍👧‍👦", color: "text-blue-500" },
  { name: "Real Estate Law", slug: "property-law", icon: "🏠", color: "text-emerald-500" },
  { name: "Constitutional Law", slug: "constitutional-law", icon: "📜", color: "text-indigo-500" },
  { name: "Cyber Law", slug: "cyber-law", icon: "💻", color: "text-purple-500" },
  { name: "Corporate Law", slug: "corporate-law", icon: "🏢", color: "text-gray-500" },
  { name: "Consumer Law", slug: "consumer-law", icon: "🛒", color: "text-rose-500" },
  { name: "Employment Law", slug: "labour-law", icon: "👷‍♂️", color: "text-orange-500" },
  { name: "Education Law", slug: "education-law", icon: "🎓", color: "text-sky-500" },
  { name: "Environmental Law", slug: "environmental-law", icon: "🌿", color: "text-green-500" },
  { name: "IP Rights", slug: "ipr-law", icon: "💡", color: "text-yellow-500" },
  { name: "Tax Law", slug: "taxation-law", icon: "💰", color: "text-lime-500" },
  { name: "Banking Law", slug: "banking-law", icon: "🏦", color: "text-teal-500" },
  { name: "AI & Tech Law", slug: "technology-law", icon: "🤖", color: "text-pink-500" },
  { name: "Dispute Resolution", slug: "adr-law", icon: "🕊️", color: "text-violet-500" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.4,
    },
  },
};

export default function PracticeSection() {
  return (
    <section
      id="practice"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* 3D floating elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-500/10 blur-[80px]"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-amber-500/10 blur-[90px]"></div>

      {/* Grid texture overlay */}
      <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 border border-gray-200 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
            <span className="text-sm font-medium text-gray-700">Legal Expertise</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600"
          >
            Our Practice Areas
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Specialized legal services tailored to your unique needs with innovative solutions
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {practiceAreas.map(({ name, slug, icon, color }) => (
            <motion.div key={slug} variants={item} whileHover={{ y: -5 }}>
              <Link href={`/practice-areas/${slug}`} className="group block h-full">
                <div className="h-full bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Card content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start mb-4">
                      <div
                        className={`text-4xl mr-4 transition-transform duration-300 group-hover:scale-110 ${color}`}
                      >
                        {icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {name}
                      </h3>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                      <div className="flex items-center text-gray-500 group-hover:text-purple-600 font-medium text-sm transition-colors">
                        Explore area
                        <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-purple-400/20 to-amber-400/20"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        CTA at bottom
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Schedule a Consultation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
