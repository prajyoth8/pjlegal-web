// components/animated/PracticeCarousel.jsx

"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const practiceAreas = [
  {
    title: "Litigation & Dispute Resolution",
    description:
      "Handling civil, criminal, and commercial litigation with precision.",
    icon: "⚖️",
  },
  {
    title: "Property & Land Law",
    description: "Resolving land ownership, title disputes, and registrations.",
    icon: "🏡",
  },
  {
    title: "Legal Drafting & Notices",
    description: "Professional legal documents, notices, and contracts.",
    icon: "📝",
  },
  {
    title: "Cyber & IT Law",
    description: "Handling online fraud, defamation, data protection cases.",
    icon: "💻",
  },
  {
    title: "Consumer Protection",
    description: "Protecting consumer rights and grievance redressal.",
    icon: "🛍️",
  },
];

export default function PracticeCarousel() {
  const { theme } = useTheme();

  return (
    <section
      className={`w-full py-16 px-6 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
      id="practice"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Practice Areas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-6 shadow-xl border ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-800 hover:shadow-yellow-600/30"
                  : "bg-white border-gray-200 hover:shadow-yellow-400/20"
              } transition-all`}
            >
              <div className="text-4xl mb-4">{area.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
              <p className="text-sm text-gray-400 dark:text-gray-300">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
