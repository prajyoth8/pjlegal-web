"use client";

import { useState } from "react";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";
import {
  Building2,
  Gavel,
  ShieldCheck,
  Landmark,
  Home,
  Check,
  ArrowRight,
  X,
  ScrollText,
  FileLock2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationModal from "@/components/ConsultationModal";

const services = [
  {
    title: "Property Title Verification",
    description:
      "Comprehensive title checks, encumbrance certificate review, and document authentication to ensure clear ownership before purchase or lease.",
    icon: <ScrollText className="w-5 h-5" />,
    color: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
  },
  {
    title: "Property Disputes & Litigation",
    description:
      "Representation in partition suits, ownership disputes, adverse possession, injunctions, and recovery of possession under civil law.",
    icon: <Gavel className="w-5 h-5" />,
    color: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
  },
  {
    title: "Registration & Stamp Duty Compliance",
    description:
      "Drafting and registration of Sale Deed, Gift Deed, Lease Deed, and Partition Deed along with advice on stamp duty payment & exemption.",
    icon: <FileLock2 className="w-5 h-5" />,
    color: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-600",
  },
  {
    title: "Real Estate Regulation (RERA)",
    description:
      "Legal support for RERA complaints, delayed possession cases, and builder disputes under RERA Act, 2016 before authority or appellate tribunal.",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
  },
  {
    title: "Land Acquisition & Compensation",
    description:
      "Challenging acquisition, compensation claims, and rehabilitation under The Right to Fair Compensation and Transparency Act, 2013.",
    icon: <Landmark className="w-5 h-5" />,
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
  },
];

export default function PropertyLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PracticeDetailLayout title="Property Law" icon={<Building2 className="w-6 h-6" />}>
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
              src="/assets/property-law-image.png"
              alt="Property Law Banner"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative z-10 p-10 md:p-14 lg:p-20 text-white">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full mb-4">
              Property & Real Estate Legal Help
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Secure Your Property Rights with Legal Precision
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-6 max-w-3xl">
              From title verification to RERA and dispute resolution, PJ Legal ensures smooth and
              lawful property transactions across Telangana.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transition-all"
            >
              Book a Consultation
            </button>
            <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
          </div>
        </motion.div>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveIndex(i)}
              className={`${service.color} ${service.borderColor} border rounded-xl p-6 cursor-pointer hover:shadow-md group transition-all`}
            >
              <div className="flex gap-4 items-start">
                <div className={`${service.textColor} p-2 rounded-lg`}>{service.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-700">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">{service.description}</p>
                  <div className="mt-2 text-sm text-purple-600 font-medium flex items-center gap-1">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Modal */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white max-w-2xl w-full p-8 rounded-2xl relative shadow-xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <button
                  onClick={() => setActiveIndex(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`${services[activeIndex].color} ${services[activeIndex].textColor} p-3 rounded-xl`}
                  >
                    {services[activeIndex].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {services[activeIndex].title}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-amber-500 my-3 rounded-full" />
                  </div>
                </div>

                <div className="prose prose-sm max-w-none text-gray-700">
                  <p>{services[activeIndex].description}</p>
                  <h4 className="mt-6">How We Assist You:</h4>
                  <ul className="list-disc pl-5">
                    <li>Legal due diligence and encumbrance search</li>
                    <li>Drafting and vetting of agreements and deeds</li>
                    <li>Registration, mutation, and compliance support</li>
                    <li>Dispute representation in civil court or tribunal</li>
                  </ul>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-amber-600 text-white px-6 py-3 rounded-lg hover:shadow-md transition"
                  >
                    Book Consultation
                  </button>
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="text-gray-600 hover:text-black font-medium px-4 py-2"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PracticeDetailLayout>
  );
}
