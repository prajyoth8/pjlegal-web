"use client";

import { useState } from "react";

const topics = [
  {
    title: "Know Your Rights",
    content: `Learn about your fundamental rights as an Indian citizen, including:
- Right to equality
- Right to freedom of speech
- Right to education
- Right to constitutional remedies`
  },
  {
    title: "Everyday Law",
    content: `Understand laws that impact your daily life:
- Tenant and landlord rights
- Consumer protection
- Cyber safety
- Traffic and road rules`
  },
  {
    title: "Legal Aid & Support",
    content: `How to access free legal aid, public defenders, and pro bono services for marginalized communities.`
  }
];

export default function EducationContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {topics.map((topic, index) => (
        <div key={index} className="border border-gray-300 rounded shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left px-4 py-3 font-semibold bg-gray-100 hover:bg-gray-200 rounded-t"
          >
            {topic.title}
          </button>
          {openIndex === index && (
            <div className="px-4 py-3 text-sm text-gray-700 bg-white border-t border-gray-200 whitespace-pre-wrap">
              {topic.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
