"use client";

import { useState } from "react";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";
import { Gavel, ArrowRight, BookOpenCheck, X, Check, HeartHandshake } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  {
    title: "Marriage Registration & Validation",
    description:
      "Legal advice and assistance with marriage registration under the Hindu Marriage Act, 1955 or Special Marriage Act, 1954, ensuring documentation compliance.",
    icon: "📜",
    color: "bg-blue-100",
  },
  {
    title: "Divorce & Judicial Separation",
    description:
      "Representation in divorce proceedings under Section 13 of the Hindu Marriage Act or Section 27 of the Special Marriage Act, with focus on mutual or contested grounds.",
    icon: "⚖️",
    color: "bg-red-100",
  },
  {
    title: "Child Custody & Visitation Rights",
    description:
      "Applications under Guardians and Wards Act, 1890 and relevant family law statutes to secure joint/shared custody, visitation, or sole guardianship.",
    icon: "👨‍👩‍👧",
    color: "bg-yellow-100",
  },
  {
    title: "Maintenance & Alimony",
    description:
      "Petitions under Section 125 CrPC and personal laws for interim and permanent maintenance to spouse, children, or elderly parents.",
    icon: "💰",
    color: "bg-green-100",
  },
  {
    title: "Domestic Violence Protection",
    description:
      "Protection orders, residence orders, and compensation under the Protection of Women from Domestic Violence Act, 2005. Emergency filing supported.",
    icon: "🛡️",
    color: "bg-pink-100",
  },
  {
    title: "Dowry Harassment & 498A",
    description:
      "Legal strategy and representation in dowry-related cruelty cases under Section 498A IPC and Dowry Prohibition Act, 1961 — for both complainants and accused.",
    icon: "🎗️",
    color: "bg-amber-100",
  },
  {
    title: "Adoption & Guardianship",
    description:
      "Support for adoption process and guardianship petitions under Hindu Adoption and Maintenance Act, 1956, ensuring compliance and consent safeguards.",
    icon: "🧸",
    color: "bg-indigo-100",
  },
];

export default function FamilyLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <PracticeDetailLayout title="Family Law" icon={<HeartHandshake className="w-6 h-6" />}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900 to-amber-800 shadow-2xl mb-12"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/family-law-banner.jpg"
              alt="Family Law Banner"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 p-8 md:p-12 text-white">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Compassionate Legal Support for Family Matters
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              We offer empathetic and strategic legal assistance in matrimonial, custody, adoption,
              and domestic issues.
            </motion.p>
          </div>
        </motion.div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Services */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BookOpenCheck className="w-6 h-6 text-purple-600" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-amber-600">
                  Our Family Law Services
                </span>
              </h2>

              <ul className="space-y-4">
                {services.map((service, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`${service.color} rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer group`}
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

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/#consultation"
                className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Request Legal Guidance
              </a>
              <a
                href="/#contact"
                className="text-purple-700 underline font-medium hover:text-purple-900 flex items-center gap-1"
              >
                Contact Our Family Law Team
                <ArrowRight className="w-4 h-4 mt-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-6">
            {/* Image Card */}
            <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <Image
                src="/assets/family-law-image.jpg"
                alt="Family Law"
                width={400}
                height={300}
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-medium text-lg">
                  Legal Care for Families in Crisis
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-purple-600" />
                Why Choose PJ Legal?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Experienced in both litigation and mediation
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Sensitive to emotional and child custody concerns
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Transparent, client-focused legal care
                </li>
              </ul>
            </div>

            {/* Emergency Support */}
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-3">Domestic Violence or Urgency?</h3>
              <p className="text-sm text-red-700 mb-3">
                If you need immediate protection, call us now for urgent court relief under DV Act.
              </p>
              <a
                href="tel:+911234567890"
                className="inline-flex items-center gap-2 text-red-700 font-medium hover:text-red-900"
              >
                📞 +91 12345 67890
              </a>
            </div>
          </div>
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

              <p className="text-gray-700 text-lg leading-relaxed">
                {services[activeIndex].description}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Our Family Law Process:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Confidential first consultation
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Emotional and legal support throughout
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Result-focused court strategy or mediation
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="/#consultation"
                  className="bg-gradient-to-r from-purple-600 to-amber-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-md transition"
                >
                  Talk to a Family Law Expert
                </a>
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
