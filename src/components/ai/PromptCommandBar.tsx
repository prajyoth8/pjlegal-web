"use client";

import { Sparkles, Gavel, SearchCheck } from "lucide-react";

export default function PromptCommandBar() {
  return (
    <section className="w-full px-4 py-12 text-center space-y-6 bg-white/5 rounded-xl border border-white/10 shadow-sm backdrop-blur-md">
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">Empowering You with Legal Intelligence</h2>
      <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base">
        From contracts to case assessments, let PJ Legal AI assist you in navigating legal complexity with speed, clarity, and confidence.
      </p>

      <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <button className="flex items-center gap-2 bg-yellow-500 text-black font-semibold px-5 py-3 rounded-full hover:bg-yellow-400 transition">
          <Sparkles className="w-5 h-5" />
          Ask Legal AI
        </button>
        <button className="flex items-center gap-2 bg-black border border-yellow-400 text-yellow-300 font-medium px-5 py-3 rounded-full hover:bg-yellow-900 transition">
          <Gavel className="w-5 h-5" />
          Draft Legal Document
        </button>
        <button className="flex items-center gap-2 bg-white/10 text-white px-5 py-3 rounded-full hover:bg-white/20 transition">
          <SearchCheck className="w-5 h-5" />
          Check Case Insight
        </button>
      </div>
    </section>
  );
}
