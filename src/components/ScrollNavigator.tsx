"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

// Your section IDs in order
const sections = ["hero", "carousel", "articles", "news", "contact"];

export default function ScrollNavigator() {
  const [current, setCurrent] = useState(0);
  const [showUp, setShowUp] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight - viewportHeight;
      const scrollPercent = (scrollY / totalHeight) * 100;
      setProgress(scrollPercent);

      let bestMatch = 0;
      let bestVisibility = 0;

      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          if (visibleHeight > bestVisibility) {
            bestMatch = index;
            bestVisibility = visibleHeight;
          }
        }
      });

      setCurrent(bestMatch);
      setShowUp(scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {/* Scroll Progress Bar */}
      <div className="w-1 h-64 bg-gray-600 rounded relative">
        <div
          className="absolute top-0 left-0 w-1 bg-yellow-400 rounded"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Section Dots */}
      <div className="flex flex-col items-center gap-2 mt-4">
        {sections.map((id, index) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === current
                ? "border-yellow-400 bg-yellow-400"
                : "border-gray-400 bg-transparent"
            }`}
            title={id.toUpperCase()}
          />
        ))}
      </div>

      {/* Scroll To Top */}
      {showUp && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-2 rounded-full bg-black bg-opacity-70 text-white hover:bg-yellow-500 hover:text-black transition shadow-md"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </div>
  );
}
