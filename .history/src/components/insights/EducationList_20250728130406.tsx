"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const educationSections = [
  {
    id: "know-your-rights",
    title: "Know Your Rights",
    description: "Understand your rights during arrest, FIR, RTI, and more.",
  },
  {
    id: "everyday-law",
    title: "Everyday Law in India",
    description: "Basics of consumer, property, marriage, cyber law, and more.",
  },
  {
    id: "legal-process",
    title: "Legal Process Explained Simply",
    description: "Filing an FIR, bail, civil vs criminal, and court hierarchy.",
  },
  {
    id: "templates",
    title: "Ready Templates & Samples",
    description: "Download RTI, Legal Notice, Affidavit, Complaint formats.",
  },
  {
    id: "glossary",
    title: "Legal Glossary (A-Z)",
    description: "Understand simple definitions of legal terms.",
  },
  {
    id: "myth-busters",
    title: "Quick Facts / Myth Busters",
    description: "Dispel common myths about Indian law.",
  },
];

export default function EducationList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {educationSections.map((section) => (
        <Link
          key={section.id}
          href={`/education?id=${section.id}`}
          className="group block bg-white dark:bg-gray-900 border rounded-lg p-6 hover:border-blue-500 transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <ChevronRight className="text-gray-400 group-hover:text-blue-500 transition" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {section.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
