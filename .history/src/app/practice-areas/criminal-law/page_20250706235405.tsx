"use client";

import { useState } from "react";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";
import { Gavel, ArrowRight, BookOpenCheck, X, Check, Scale } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  {
    title: "Bail Applications",
    description:
      "We file regular, anticipatory, and interim bail petitions under Sections 436–439 of the CrPC, including urgent bail before magistrate or sessions court. Our strategic approach focuses on securing your freedom while building your defense.",
    icon: "📝",
    color: "bg-blue-100",
  },
  {
    title: "FIR Quashing & Investigation",
    description:
      "We assist in quashing false FIRs under Section 482 CrPC before High Court, and intervene in cases of malicious or unlawful investigation practices. Our team meticulously examines evidence to protect your rights.",
    icon: "🚨",
    color: "bg-red-100",
  },
  {
    title: "Trial Defense for IPC Offenses",
    description:
      "Comprehensive representation in trials involving IPC offenses including theft (S.378), assault (S.351), cheating (S.415), and other criminal charges. We develop case-specific defense strategies for optimal outcomes.",
    icon: "⚖️",
    color: "bg-purple-100",
  },
  {
    title: "Criminal Appeals & Revisions",
    description:
      "Expert filing of criminal appeals (S.374 CrPC) and revisions (S.397–401 CrPC) against convictions, acquittals, and sentence modifications. We identify legal errors to strengthen your appeal.",
    icon: "📜",
    color: "bg-amber-100",
  },
  {
    title: "Domestic Violence & 498A",
    description:
      "Balanced representation for both complainants and accused under DV Act, 2005 and Section 498A IPC. We handle sensitive matrimonial disputes with discretion while protecting your legal rights.",
    icon: "👨‍👩‍👧",
    color: "bg-pink-100",
  },
  {
    title: "Cyber Crime Defense",
    description:
      "Specialized defense for IT Act offenses including identity theft, online fraud, and defamation (Sections 66C, 66D, 67). Our tech-savvy team understands digital evidence complexities.",
    icon: "💻",
    color: "bg-green-100",
  },
  {
    title: "NDPS & Economic Offenses",
    description:
      "Strategic defense in complex cases under NDPS Act, PMLA, and Prevention of Corruption Act. We challenge evidence collection procedures and forensic reports to protect your interests.",
    icon: "💼",
    color: "bg-indigo-100",
  },
];

export default function CriminalLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <PracticeDetailLayout title="Criminal Defense" icon={<Gavel className="w-6 h-6" />}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900 to-gray-900 shadow-2xl mb-12"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/courtroom.png"
              alt="Courtroom"
              fill
              className="object-cover opacity-40"
            />
          </div>
          <div className="relative z-10 p-8 md:p-12 text-white">
            <motion.h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-600 mb-4">
              Strategic Criminal Defense
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              Vigorous protection of your rights at every stage of criminal proceedings, from
              investigation through trial and appeal.
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BookOpenCheck className="w-6 h-6 text-purple-600" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-amber-600">
                  Our Criminal Defense Services
                </span>
              </h2>

              <ul className="space-y-4">
                {services.map((service, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`${service.color} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer group`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl mt-1">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                          {service.title}
                        </h3>
                        <div className="w-6 h-0.5 bg-gradient-to-r from-purple-400 to-amber-400 my-2 group-hover:w-10 transition-all duration-300"></div>
                      </div>
                      <ArrowRight className="text-purple-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Schedule Consultation
              </button>
              <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
              {/* <a
                href="/#consultation"
                className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Book Consultation
              </a> */}
              <a
                href="/#contact"
                className="text-purple-700 underline font-medium hover:text-purple-900 flex items-center gap-1"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 mt-0.5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 sticky top-6"
          >
            {/* Image Card */}
            <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <Image
                src="/assets/criminal-defense.png"
                alt="Criminal Defense"
                width={400}
                height={300}
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-medium text-lg">
                  Protecting Your Rights at Every Stage
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-purple-600" />
                Why Choose Our Defense Team?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>24/7 availability for urgent matters</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Former prosecutors who know the system</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Aggressive pretrial motions practice</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Forensic evidence specialists on staff</span>
                </motion.li>
              </ul>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-3">Emergency Arrest Assistance</h3>
              <p className="text-sm text-red-700 mb-3">
                If you or a loved one has been arrested, contact us immediately for urgent legal
                intervention.
              </p>
              <a
                href="tel:+911234567890"
                className="inline-flex items-center gap-2 text-red-700 font-medium hover:text-red-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +91 87123 51102
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Service Detail Modal */}
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
              className="bg-white max-w-2xl w-full p-8 rounded-xl relative shadow-2xl border border-purple-100"
            >
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-6 right-6 text-gray-600 hover:text-black rounded-full p-1 hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div className={`${services[activeIndex].color} p-2.5 rounded-lg text-2xl`}>
                  {services[activeIndex].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-800">
                    {services[activeIndex].title}
                  </h3>
                  <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-amber-500 my-2"></div>
                </div>
              </div>

              <div className="prose prose-purple max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {services[activeIndex].description}
                </p>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Our Approach:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Immediate case assessment and strategy session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Documentation and evidence collection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Regular client updates and consultation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                                  onClick={() => setModalOpen(true)}
                                  className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
                                >
                                  Schedule Consultation
                                </button>
                                <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
                {/* <a
                  href="/#consultation"
                  className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  Schedule Consultation
                </a> */}
                <button
                  onClick={() => setActiveIndex(null)}
                  className="text-purple-700 underline font-medium hover:text-purple-900"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PracticeDetailLayout>
  );
}
