// components/insights/EducationList.tsx
"use client";

import Link from "next/link";
import { 
  FiBook, 
  FiShield, 
  FiFileText, 
  FiList, 
  FiZap,
  FiArrowRight,
  FiBalanceScale
} from "react-icons/fi";
import { motion } from "framer-motion";

const educationSections = [
  {
    id: "new-criminal-laws",
    title: "BNS, BNSS & BSA (2023)",
    description: "Complete guide to India's reformed criminal justice system",
    icon: <FiBook className="text-red-500" />,
    gradient: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
  },
  {
    id: "citizen-rights",
    title: "Citizen Rights Under BNSS",
    description: "New procedural safeguards in arrest, bail & investigations",
    icon: <FiShield className="text-blue-500" />,
    gradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
  },
  {
    id: "evidence-changes",
    title: "BSA Evidence Rules",
    description: "Digital evidence, witness protection & forensic mandates",
    icon: <FiFileText className="text-purple-500" />,
    gradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
  },
  {
    id: "comparison",
    title: "Old vs New Laws",
    description: "Section-by-section comparison of IPC/CrPC vs BNS/BNSS",
    icon: <FiBalanceScale className="text-green-500" />,
    gradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
  },
  {
    id: "glossary",
    title: "Legal Glossary (A-Z)",
    description: "Definitions of terms in BNS, BNSS & BSA",
    icon: <FiList className="text-yellow-500" />,
    gradient: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
  },
  {
    id: "myth-busters",
    title: "Myth Busters",
    description: "Clarifying misconceptions about new laws",
    icon: <FiZap className="text-pink-500" />,
    gradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
  },
];

export default function EducationList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {educationSections.map((section) => (
        <motion.div
          key={section.id}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href={`/education?id=${section.id}`}
            className={`block bg-gradient-to-br ${section.gradient} border border-gray-200 dark:border-gray-700 rounded-2xl p-6 h-full transition-all hover:shadow-lg hover:border-transparent`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                {section.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {section.description}
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group">
                  Explore section
                  <FiArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}