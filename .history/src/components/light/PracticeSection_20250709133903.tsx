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
import { IconType } from "react-icons";
import {
  GiScaleMail,
  GiHandcuffs,
  GiFamilyHouse,
  GiHouse,
  GiConstitution,
  GiHacker,
  GiOfficeChair,
  GiShoppingCart,
  GiWorker,
  GiGraduateCap,
  GiTreeGrowth,
  GiIdea,
  GiMoneyStack,
  GiBank,
  GiArtificialIntelligence,
  GiPeaceDove,
  GiHandshake
} from "react-icons/gi";

const practiceAreas = [
  { name: "Civil Law", slug: "civil-law", icon: GiScaleMail, color: "text-amber-600" },
  { name: "Criminal Law", slug: "criminal-law", icon: GiHandcuffs, color: "text-rose-600" },
  { name: "Family Law", slug: "family-law", icon: GiFamilyHouse, color: "text-indigo-600" },
  { name: "Property Law", slug: "property-law", icon: GiHouse, color: "text-emerald-600" },
  { name: "Constitutional Law", slug: "constitutional-law", icon: GiConstitution, color: "text-blue-600" },
  { name: "Cyber Law", slug: "cyber-law", icon: GiHacker, color: "text-purple-600" },
  { name: "Corporate & Business Law", slug: "corporate-law", icon: GiOfficeChair, color: "text-sky-600" },
  { name: "Consumer Protection Law", slug: "consumer-law", icon: GiShoppingCart, color: "text-orange-600" },
  { name: "Labour & Employment Law", slug: "labour-law", icon: GiWorker, color: "text-amber-500" },
  { name: "Education Law", slug: "education-law", icon: GiGraduateCap, color: "text-violet-600" },
  { name: "Environmental Law", slug: "environmental-law", icon: GiTreeGrowth, color: "text-green-600" },
  { name: "Intellectual Property Rights", slug: "ipr-law", icon: GiIdea, color: "text-fuchsia-600" },
  { name: "Taxation Law", slug: "taxation-law", icon: GiMoneyStack, color: "text-lime-600" },
  { name: "Banking & Insurance Law", slug: "banking-law", icon: GiBank, color: "text-teal-600" },
  { name: "Technology & AI Law", slug: "technology-law", icon: GiArtificialIntelligence, color: "text-cyan-600" },
  { name: "Arbitration & ADR", slug: "adr-law", icon: GiPeaceDove, color: "text-blue-400" },
  { name: "Legal Aid & Pro Bono", slug: "pro-bono-law", icon: GiHandshake, color: "text-rose-500" },
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", bounce: 0.4 } },
};

export default function PracticeSection() {
  return (
    <section id="practice" className="relative py-24 overflow-hidden isolate">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-purple-50/30 to-blue-50/30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-gradient-radial from-purple-400/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        
        {/* Animated floating elements */}
        <motion.div 
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-16 h-16 rounded-full bg-amber-300/30 blur-xl"
        />
        <motion.div 
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-purple-300/30 blur-xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex mb-4"
          >
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
              Legal Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-amber-500 to-purple-600"
          >
            Our Practice Areas
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Specialized legal services tailored to your unique needs, combining traditional expertise with innovative approaches to modern challenges.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {practiceAreas.map(({ name, slug, icon: Icon, color }) => (
            <motion.div key={slug} variants={item} whileHover={{ scale: 1.03 }}>
              <Link href={`/practice-areas/${slug}`} className="group block h-full focus-visible:outline-none">
                <div className="h-full bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-gray-100/70 hover:shadow-lg transition-all duration-300 group-hover:bg-white group-focus-visible:ring-2 group-focus-visible:ring-purple-500 group-focus-visible:ring-offset-2">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-xs border border-gray-100 ${color} group-hover:shadow-md transition-all`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {name}
                      </h3>
                      <motion.div 
                        className="mt-3 w-8 h-1 bg-gradient-to-r from-amber-400 to-purple-500"
                        whileHover={{ width: 24 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                    <div className="mt-6 flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-800 transition-colors">
                      Explore area
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
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
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our legal team specializes in complex, cross-disciplinary cases. Contact us to discuss your unique situation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                Schedule Consultation
              </Link>
              <Link 
                href="/practice-areas" 
                className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                Browse All Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}