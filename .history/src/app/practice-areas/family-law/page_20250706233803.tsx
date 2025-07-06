"use client";

import { useState } from "react";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";
import {
  Gavel,
  ArrowRight,
  BookOpenCheck,
  X,
  Check,
  HeartHandshake,
  Users,
  Shield,
  Home,
  Scale,
  Baby,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  {
    title: "Marriage Registration & Validation",
    description:
      "Legal advice and assistance with marriage registration under the Hindu Marriage Act, 1955 or Special Marriage Act, 1954, ensuring documentation compliance.",
    icon: <Users className="w-5 h-5" />,
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
  },
  {
    title: "Divorce & Judicial Separation",
    description:
      "Representation in divorce proceedings under Section 13 of the Hindu Marriage Act or Section 27 of the Special Marriage Act, with focus on mutual or contested grounds.",
    icon: <Scale className="w-5 h-5" />,
    color: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
  },
  {
    title: "Child Custody & Visitation Rights",
    description:
      "Applications under Guardians and Wards Act, 1890 and relevant family law statutes to secure joint/shared custody, visitation, or sole guardianship.",
    icon: <Baby className="w-5 h-5" />, // Replaced Child with Baby icon
    color: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-600",
  },
  {
    title: "Maintenance & Alimony",
    description:
      "Petitions under Section 125 CrPC and personal laws for interim and permanent maintenance to spouse, children, or elderly parents.",
    icon: <Gavel className="w-5 h-5" />,
    color: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
  },
  {
    title: "Domestic Violence Protection",
    description:
      "Protection orders, residence orders, and compensation under the Protection of Women from Domestic Violence Act, 2005. Emergency filing supported.",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
  },
  {
    title: "Dowry Harassment & 498A",
    description:
      "Legal strategy and representation in dowry-related cruelty cases under Section 498A IPC and Dowry Prohibition Act, 1961 — for both complainants and accused.",
    icon: <Home className="w-5 h-5" />,
    color: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-600",
  },
  {
    title: "Adoption & Guardianship",
    description:
      "Support for adoption process and guardianship petitions under Hindu Adoption and Maintenance Act, 1956, ensuring compliance and consent safeguards.",
    icon: <HeartHandshake className="w-5 h-5" />,
    color: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
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
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 to-amber-800 shadow-2xl mb-12"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/family-law-image.png"
              alt="Family Law Banner"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full mb-4">
                Family Legal Solutions
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Compassionate Legal Support for Your Family
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Navigating family legal matters with empathy and expertise to protect what matters
                most.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/#consultation"
                  className="bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transition-all"
                >
                  Schedule Consultation
                </a>
                <a
                  href="/#contact"
                  className="text-white underline font-medium hover:text-gray-200 flex items-center gap-1"
                >
                  Contact Our Team
                  <ArrowRight className="w-4 h-4 mt-0.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Services Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Comprehensive Family Law Services
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Our experienced attorneys provide personalized legal solutions for all family
                  matters, from marriage to child custody, with sensitivity and discretion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`${service.color} ${service.borderColor} rounded-xl p-5 border hover:shadow-md transition-all cursor-pointer group`}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${service.textColor} p-2 rounded-lg`}>{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="mt-3 flex items-center text-sm font-medium text-purple-600">
                          Learn more
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Practice Areas */}
            <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-2xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Approach to Family Law</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <HeartHandshake className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Compassionate Representation</h4>
                  <p className="text-gray-600 text-sm">
                    We understand the emotional challenges of family disputes and provide supportive
                    legal guidance.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <Scale className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Balanced Solutions</h4>
                  <p className="text-gray-600 text-sm">
                    Whether through mediation or litigation, we seek resolutions that protect your
                    family's best interests.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Family Law Consultation</h3>
              <p className="text-gray-600 mb-5">
                Schedule a confidential discussion about your family legal matters.
              </p>
              <a
                href="/#consultation"
                className="block w-full bg-gradient-to-r from-purple-600 to-amber-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:shadow-md transition mb-4"
              >
                Book Appointment
              </a>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-600">
                  <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  +91 87123 51102
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  pjlegal.r@gmail.com
                </p>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Domestic Violence or Urgency?</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Immediate protection orders available 24/7 under DV Act.
                  </p>
                </div>
              </div>
              <a
                href="tel:+91 8712351102"
                className="mt-3 inline-flex items-center gap-2 text-red-700 font-medium hover:text-red-900 text-sm"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                Emergency Hotline: +91 12345 67890
              </a>
            </div>

          </div>
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
              className="bg-white max-w-2xl w-full p-8 rounded-2xl relative shadow-2xl border border-gray-100"
            >
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-black rounded-full p-1 hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-start gap-5 mb-6">
                <div
                  className={`${services[activeIndex].color} ${services[activeIndex].textColor} p-3 rounded-xl`}
                >
                  {services[activeIndex].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {services[activeIndex].title}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-amber-500 my-3 rounded-full"></div>
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">{services[activeIndex].description}</p>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-lg text-gray-900 mb-3">How We Can Help:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Initial case evaluation and strategy development</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Document preparation and court filings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Negotiation or litigation representation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Post-resolution follow-up and modifications</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/#consultation"
                    className="bg-gradient-to-r from-purple-600 to-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition"
                  >
                    Schedule Consultation
                  </a>
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="text-gray-600 hover:text-gray-900 font-medium px-4 py-3"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PracticeDetailLayout>
  );
}
