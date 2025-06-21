// components/PromptCommandBar.tsx
"use client";

import { useState } from "react";
import { Mic, UploadCloud, FileText } from "lucide-react";

export default function PromptCommandBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto mt-28 text-center space-y-4 px-4">
      <h1 className="text-2xl md:text-4xl font-bold">What legal help do you need today?</h1>
      <div className="flex gap-2 flex-wrap justify-center text-sm text-gray-500">
        {["Property", "Family", "Litigation", "Cybercrime"].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/10 text-white rounded-full hover:bg-white/20 cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Type your legal query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-[500px] px-4 py-3 rounded-lg border border-gray-700 bg-black/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-400">
          <Mic size={20} className="text-black" />
        </button>
        <button className="bg-white p-2 rounded-full hover:bg-gray-200">
          <UploadCloud size={20} className="text-black" />
        </button>
        <button className="bg-white p-2 rounded-full hover:bg-gray-200">
          <FileText size={20} className="text-black" />
        </button>
      </div>
    </div>
  );
}
