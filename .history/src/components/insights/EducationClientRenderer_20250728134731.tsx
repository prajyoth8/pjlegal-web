"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { educationTopics } from @/; // Adjust path if needed

export default function EducationClientRenderer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <div className="space-y-6">
      {educationTopics.map((section) => (
        <div
          key={section.title}
          className="border border-gray-200 dark:border-gray-700 rounded-md shadow-sm"
        >
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full px-5 py-4 text-left font-semibold flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-t-md hover:bg-gray-200 transition"
          >
            <span>{section.title}</span>
            {openSection === section.title ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>

          {openSection === section.title && (
            <div className="px-5 py-4 bg-white dark:bg-gray-900 rounded-b-md">
              {section.items.map((item, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-bold text-lg text-blue-700 dark:text-blue-400">
                    {item.topic}
                  </h4>

                  {item.subtopics && (
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-800 dark:text-gray-300">
                      {item.subtopics.map((sub, i) => (
                        <li key={i}>{sub}</li>
                      ))}
                    </ul>
                  )}

                  {item.explanation && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {item.explanation}
                    </p>
                  )}

                  {item.useCase && (
                    <p className="mt-2 italic text-sm text-gray-500 dark:text-gray-400">
                      Use Case: {item.useCase}
                    </p>
                  )}

                  {item.truth !== undefined && (
                    <p className="mt-2 text-gray-800 dark:text-gray-300">
                      <strong className="text-red-600">Myth:</strong> {item.topic}
                      <br />
                      <strong className="text-green-600">Truth:</strong> {item.truth ? "✅ True" : "❌ False"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
