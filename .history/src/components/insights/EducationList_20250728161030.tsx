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
  FiUser,
  FiShoppingBag,
  FiHome,
  FiGlobe,
  FiHeart,
  FiUsers,
  FiAlertTriangle
} from "react-icons/fi";
import { motion } from "framer-motion";

// Custom icon components
const ComparisonIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="text-green-500"
  >
    <path d="M8 3v18m8-18v18M3 8h4m10 0h4M3 16h4m10 0h4"/>
  </svg>
);

const educationSections = [
  {
    id: "know-your-rights",
    title: "Know Your Rights",
    description: "Understand your fundamental legal protections",
    icon: <FiShield className="text-blue-500" />,
    gradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
  },
  {
    id: "everyday-law",
    title: "Everyday Law in India",
    description: "Common legal scenarios in daily life",
    icon: <FiShoppingBag className="text-purple-500" />,
    gradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
  },
  {
    id: "new-criminal-laws",
    title: "BNS, BNSS & BSA (2023)",
    description: "India's reformed criminal justice system",
    icon: <FiBook className="text-red-500" />,
    gradient: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
  },
  {
    id: "legal-process",
    title: "Legal Process Explained",
    description: "Step-by-step guides through procedures",
    icon: <FiFileText className="text-green-500" />,
    gradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
  },
  {
    id: "myth-busters",
    title: "Myth Busters",
    description: "Clarifying legal misconceptions",
    icon: <FiAlertTriangle className="text-yellow-500" />,
    gradient: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
  },
  {
    id: "glossary",
    title: "Legal Glossary (A-Z)",
    description: "Definitions of legal terms",
    icon: <FiList className="text-indigo-500" />,
    gradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
  }
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