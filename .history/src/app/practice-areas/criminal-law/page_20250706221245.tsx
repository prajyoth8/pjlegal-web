"use client";

import { useState } from "react";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";
import { Gavel, ArrowRight, BookOpenCheck, X, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  {
    title: "Bail Applications",
    description:
      "We file regular, anticipatory, and interim bail petitions under Sections 436–439 of the CrPC, including urgent bail before magistrate or sessions court.",
    icon: "📝",
  },
  {
    title: "FIR Quashing & Investigation",
    description:
      "We assist in quashing false FIRs under Section 482 CrPC before High Court, and intervene in cases of malicious or unlawful investigation practices.",
    icon: "🚨",
  },
  {
    title: "Trial Defense for IPC Offenses",
    description:
      "We represent clients in trials involving IPC offenses such as theft (S.378), assault (S.351), cheating (S.415), and other criminal charges.",
    icon: "⚖️",
  },
  {
    title: "Criminal Appeals & Revisions",
    description:
      "We file criminal appeals (S.374 CrPC) and revisions (S.397–401 CrPC) against convictions, acquittals, and sentence modifications.",
    icon: "📜",
  },
  {
    title: "Domestic Violence & 498A",
    description:
      "Representation for both complainants and accused under DV Act, 2005 and Section 498A IPC for cruelty and matrimonial abuse.",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Cyber Crime Defense",
    description:
      "We handle IT Act offenses like identity theft, online fraud, and defamation under Sections 66C, 66D, and 67 of the IT Act.",
    icon: "💻",
  },
  {
    title: "NDPS & Economic Offenses",
    description:
      "Defense in cases under NDPS Act, PMLA, and Prevention of Corruption Act involving drug charges or financial fraud.",
    icon: "💼",
  },
];

export default function CriminalLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-white to-purple-100 py-16 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
        {/* HEADER */}
        <div className="px-6 pt-6 pb-2 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
            <Gavel className="w-6 h-6" /> Criminal Law
          </h1>
          <a
            href="/#practice"
            className="text-sm text-purple-600 underline hover:text-purple-800"
          >
            ← Back to Practice Areas
          </a>
        </div>

        {/* INTRO */}
        <div className="px-6 pb-6 text-gray-800 leading-relaxed">
          Criminal Law deals with offenses against the state, individuals, or society. At{" "}
          <strong>PJ Legal</strong>, we provide strategic defense, constitutional safeguards, and
          rigorous representation in courts for both accused and victims of crime.
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-gray-100">
          {/* LEFT: SERVICES */}
          <div className="col-span-2 p-6 border-r border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-purple-600" />
              Criminal Defense Services
            </h2>

            <ul className="space-y-4">
              {services.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-purple-50 hover:bg-purple-100 p-4 rounded-lg cursor-pointer transition"
                  onClick={() => setActiveIndex(i)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-gray-800 font-medium">{s.title}</span>
                  </div>
                  <ArrowRight className="text-purple-500" />
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: IMAGE & WHY CHOOSE */}
          <div className="p-6 space-y-6">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-white shadow-lg">
              <Image
                src="/assets/law-criminal-justice.png"
                alt="Criminal Law"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent text-white text-sm p-3 font-medium">
                Justice in Criminal Defense
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-2">Why Choose PJ Legal?</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  Urgent bail representation
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  High Court & Sessions expertise
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  Digital & forensic evidence handling
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="px-6 py-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <a
            href="/#consultation"
            className="bg-gradient-to-r from-purple-600 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-md transition"
          >
            Book a Consultation
          </a>
          <a
            href="/#contact"
            className="text-purple-700 underline font-medium hover:text-purple-900"
          >
            Contact Us →
          </a>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-lg w-full p-6 rounded-xl relative shadow-2xl border border-purple-100"
            >
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black rounded-full p-1 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{services[activeIndex].icon}</div>
                <h3 className="text-xl font-bold text-purple-800">
                  {services[activeIndex].title}
                </h3>
              </div>
              <p className="text-gray-700 pl-2 border-l-4 border-purple-200">
                {services[activeIndex].description}
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setActiveIndex(null)}
                  className="text-purple-700 underline font-medium hover:text-purple-900"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
