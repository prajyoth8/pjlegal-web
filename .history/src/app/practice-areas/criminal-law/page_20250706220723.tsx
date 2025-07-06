"use client";

import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import { useState } from "react";
import Image from "next/image";
import { Gavel, BookOpenCheck, ArrowRight, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      "We represent clients in trials involving major IPC offenses such as theft (S.378), assault (S.351), cheating (S.415), and other criminal charges.",
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
      "Representation for both complainants and accused under the Protection of Women from Domestic Violence Act, 2005 and Section 498A IPC.",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Cyber Crime Defense",
    description:
      "We defend and advise clients in IT Act offenses such as online fraud, identity theft, and data misuse under Sections 66C, 66D, and 67 of the IT Act.",
    icon: "💻",
  },
  {
    title: "NDPS & Economic Offenses",
    description:
      "Defense in cases under the NDPS Act, Prevention of Corruption Act, and Economic Offenses Wing (EOW) investigations.",
    icon: "💼",
  },
];

export default function CriminalLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <PracticeDetailLayout title="Criminal Law" icon={<Gavel className="w-6 h-6" />}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl shadow-sm p-6 border border-purple-100"
          >
            <p className="text-lg text-gray-800 leading-relaxed">
              <strong className="font-semibold text-purple-800">Criminal Law</strong> deals with
              offenses against the state, individuals, or society. At{" "}
              <strong className="font-semibold text-amber-700">PJ Legal</strong>, we provide
              strategic defense, constitutional safeguards, and rigorous representation in courts
              for both accused and victims of crime.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
              <BookOpenCheck className="w-6 h-6 text-purple-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-amber-600">
                Criminal Defense Services
              </span>
            </h2>

            <ul className="space-y-3">
              {services.map((service, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setActiveIndex(i)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl mt-1">{service.icon}</div>
                    <div>
                      <h3 className="text-gray-800 font-medium group-hover:text-purple-700 transition-colors">
                        {service.title}
                      </h3>
                      <div className="w-8 h-0.5 bg-purple-400 my-2 group-hover:w-12 transition-all duration-300"></div>
                    </div>
                    <ArrowRight className="ml-auto text-purple-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/#consultation"
              className="bg-gradient-to-r from-purple-600 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Book a Consultation
            </a>
            <a
              href="/#contact"
              className="text-purple-700 underline font-medium hover:text-purple-900 flex items-center gap-1"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 mt-0.5" />
            </a>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:block sticky top-24"
        >
          <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg border-4 border-white">
            <Image
              src="/assets/law-criminal-justice.png"
              alt="Criminal Law"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
              <p className="text-white font-medium text-lg">Justice in Criminal Defense</p>
            </div>
          </div>
          <div className="mt-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-800 mb-2">Why Choose PJ Legal?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Urgent bail representation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>High Court & Sessions expertise</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Digital & forensic evidence handling</span>
              </li>
            </ul>
          </div>
        </motion.div>
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
                <h3 className="text-xl font-bold text-purple-800">{services[activeIndex].title}</h3>
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
    </PracticeDetailLayout>
  );
}
