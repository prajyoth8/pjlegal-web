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
import { motion } from "framer-motion";

const simplifiedPracticeAreas = [
  { name: "Civil Law", slug: "civil-law", icon: "⚖️" },
  { name: "Constitutional Law", slug: "constitutional-law", icon: "📜" },
  { name: "Corporate Laws", slug: "corporate-laws", icon: "🏢" },
  { name: "Criminal Law", slug: "criminal-law", icon: "🔍" },
  { name: "Election Law", slug: "election-law", icon: "🗳️" },
  { name: "Family Law", slug: "family-law", icon: "👨‍👩‍👧‍👦" },
  { name: "Labour Law", slug: "labour-law", icon: "👷" },
  { name: "Property Law", slug: "property-law", icon: "🏠" },
  { name: "Real Estate RERA", slug: "real-estate-rera", icon: "🏗️" },
  { name: "Service Law", slug: "service-law", icon: "💼" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PracticeSection() {
  return (
    <section id="practice" className="py-20 bg-gradient-to-b from-gray-50 to-white text-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Practice Areas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive legal expertise across diverse practice areas to serve your needs
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {simplifiedPracticeAreas.map(({ name, slug, icon }) => (
            <motion.div key={slug} variants={item}>
              <Link href={`/practice-areas/${slug}`} className="group block h-full">
                <div className="h-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1.5">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">{icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                        {name}
                      </h3>
                      <div className="mt-2 w-8 h-1 bg-purple-500 group-hover:w-12 transition-all duration-300"></div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-purple-600 font-medium text-sm">
                    Learn more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/practice-areas"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all hover:scale-105"
          >
            View All Practice Areas
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
