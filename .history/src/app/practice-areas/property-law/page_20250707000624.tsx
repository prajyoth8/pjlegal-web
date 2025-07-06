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
  MapPin,
  Handshake,
  ClipboardSignature
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationModal from "@/components/ConsultationModal";

const services = [
  {
    title: "Title Verification",
    description: "Comprehensive title checks and document authentication to ensure clear ownership.",
    icon: <ScrollText className="w-5 h-5" />,
    color: "bg-green-100/80",
    borderColor: "border-green-200/50",
    textColor: "text-green-600",
    gradient: "from-green-100 to-green-50"
  },
  {
    title: "Property Disputes",
    description: "Representation in partition suits, ownership disputes, and recovery cases.",
    icon: <Gavel className="w-5 h-5" />,
    color: "bg-red-100/80",
    borderColor: "border-red-200/50",
    textColor: "text-red-600",
    gradient: "from-red-100 to-red-50"
  },
  {
    title: "Registration & Compliance",
    description: "Drafting and registration of property documents with stamp duty advice.",
    icon: <ClipboardSignature className="w-5 h-5" />,
    color: "bg-amber-100/80",
    borderColor: "border-amber-200/50",
    textColor: "text-amber-600",
    gradient: "from-amber-100 to-amber-50"
  },
  {
    title: "RERA Matters",
    description: "Legal support for RERA complaints and builder disputes.",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "bg-indigo-100/80",
    borderColor: "border-indigo-200/50",
    textColor: "text-indigo-600",
    gradient: "from-indigo-100 to-indigo-50"
  },
  {
    title: "Land Acquisition",
    description: "Compensation claims and rehabilitation under land acquisition laws.",
    icon: <MapPin className="w-5 h-5" />,
    color: "bg-blue-100/80",
    borderColor: "border-blue-200/50",
    textColor: "text-blue-600",
    gradient: "from-blue-100 to-blue-50"
  },
  {
    title: "Lease Agreements",
    description: "Drafting and negotiating residential and commercial lease contracts.",
    icon: <Handshake className="w-5 h-5" />,
    color: "bg-purple-100/80",
    borderColor: "border-purple-200/50",
    textColor: "text-purple-600",
    gradient: "from-purple-100 to-purple-50"
  }
];

export default function PropertyLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PracticeDetailLayout title="Property Law" icon={<Building2 className="w-6 h-6" />}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glassmorphism Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-16"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/property-law-image.png"
              alt="Modern building architecture"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80" />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 backdrop-blur-sm">
            <div className="max-w-2xl">
              <motion.span 
                className="inline-block px-3 py-1 text-xs font-medium bg-white/20 text-white/90 rounded-full mb-4 tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                PROPERTY LAW SPECIALISTS
              </motion.span>
              
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Secure Your <span className="text-amber-300">Property Rights</span>
              </motion.h1>
              
              <motion.p
                className="text-lg text-white/90 mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Expert legal solutions for all real estate transactions, disputes, and compliance matters in Telangana.
              </motion.p>
              
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Free Consultation
                </button>
                <button className="text-white border border-white/30 hover:border-white/60 px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                  Our Success Cases
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive <span className="text-blue-600">Property Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We handle all aspects of property law with precision and dedication to protect your real estate investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveIndex(i)}
                className={`bg-white border ${service.borderColor} rounded-2xl p-6 cursor-pointer hover:shadow-lg group transition-all duration-300`}
              >
                <div className="flex gap-4 items-start">
                  <div className={`${service.color} p-3 rounded-xl ${service.textColor}`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="text-sm text-blue-600 font-medium flex items-center gap-2">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`bg-gradient-to-r from-blue-900 to-purple-800 rounded-3xl p-8 md:p-12 mb-20 text-white`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-80">Property Cases Handled</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-80">Client Satisfaction</div>
            </div>
          </div>
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
                className="bg-white max-w-2xl w-full rounded-2xl relative shadow-2xl overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                <div className={`${services[activeIndex].gradient} h-2 w-full`}></div>
                
                <div className="p-8">
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-black rounded-full p-1 hover:bg-gray-100 transition"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="flex items-start gap-6 mb-8">
                    <div className={`${services[activeIndex].color} ${services[activeIndex].textColor} p-4 rounded-xl`}>
                      {services[activeIndex].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {services[activeIndex].title}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 my-4 rounded-full"></div>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                    <p className="text-lg">{services[activeIndex].description}</p>
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Our Approach:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Thorough legal due diligence and document review</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Strategic planning for dispute resolution</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>End-to-end registration and compliance support</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Regular updates and transparent communication</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        setActiveIndex(null);
                        setModalOpen(true);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition hover:-translate-y-0.5"
                    >
                      Get Started Today
                    </button>
                    <button
                      onClick={() => setActiveIndex(null)}
                      className="text-gray-600 hover:text-black font-medium px-6 py-3"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </PracticeDetailLayout>
  );
}