// components/ScrollNavigator.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronUp, Dot } from "lucide-react";
import { motion } from "framer-motion";

const sections = ["hero", "about", "practice", "articles", "news", "contact"];

export default function ScrollNavigator() {
  const [current, setCurrent] = useState(0);
  const [showUp, setShowUp] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionElements = sections.map(id => document.getElementById(id));
      const viewportHeight = window.innerHeight;

      sectionElements.forEach((el, index) => {
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollY + viewportHeight / 2 >= top && scrollY < bottom) {
            setCurrent(index);
          }
        }
      });

      setShowUp(scrollY > 400);

      const totalHeight = document.body.scrollHeight - viewportHeight;
      const scrollPercent = (scrollY / totalHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {/* Scroll Progress Bar */}
      <div className="w-1 h-64 bg-gray-600 rounded relative">
        <div
          className="absolute top-0 left-0 w-1 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Dots for Each Section */}
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
          ></button>
        ))}
      </div>

      {/* Scroll to Top Button */}
      {showUp && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-6 p-2 rounded-full bg-black bg-opacity-70 text-white hover:bg-yellow-500 hover:text-black transition shadow-md"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </div>
  );
}
