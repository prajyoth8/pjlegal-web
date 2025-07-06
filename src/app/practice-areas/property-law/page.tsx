"use client";

import { useState } from "react";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";
import {
  Building2,
  Gavel,
  ShieldCheck,
  Landmark,
  ArrowRight,
  X,
  ScrollText,
  FileLock2,
  MapPin,
  Handshake,
  ClipboardSignature,
  Clock,
  BookOpenCheck,
  UserCheck,
  PhoneCall,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationModal from "@/components/ConsultationModal";

const services = [
  {
    title: "Title Verification",
    description:
      "Comprehensive title checks and document authentication to ensure clear ownership.",
    icon: <ScrollText className="w-5 h-5" />,
    color: "bg-green-100/80",
    borderColor: "border-green-200/50",
    textColor: "text-green-600",
    gradient: "from-green-100 to-green-50",
    modalContent: {
      about:
        "Our Title Verification service ensures legal ownership and checks for encumbrances, fraud, or litigation on a property before any transaction.",
      highlights: [
        "Analysis of title deeds for up to 30 years",
        "Review of Encumbrance Certificate (EC)",
        "Cross-verification with Sub-Registrar records",
        "Examination of previous sale/purchase deeds",
      ],
      legalReferences: [
        "Transfer of Property Act, 1882",
        "Registration Act, 1908",
        "Indian Evidence Act, 1872 (for document authentication)",
      ],
    },
  },
  {
    title: "Property Disputes",
    description: "Representation in partition suits, ownership disputes, and recovery cases.",
    icon: <Gavel className="w-5 h-5" />,
    color: "bg-red-100/80",
    borderColor: "border-red-200/50",
    textColor: "text-red-600",
    gradient: "from-red-100 to-red-50",
    modalContent: {
      about:
        "We handle property disputes involving partitions, succession, adverse possession, and ownership challenges.",
      highlights: [
        "Drafting and filing partition suits",
        "Legal representation in revenue and civil courts",
        "Out-of-court settlement facilitation",
        "Handling ancestral and self-acquired property conflicts",
      ],
      legalReferences: [
        "Hindu Succession Act, 1956",
        "Code of Civil Procedure, 1908",
        "Limitation Act, 1963 (for adverse possession claims)",
      ],
    },
  },
  {
    title: "Registration & Compliance",
    description: "Drafting and registration of property documents with stamp duty advice.",
    icon: <ClipboardSignature className="w-5 h-5" />,
    color: "bg-amber-100/80",
    borderColor: "border-amber-200/50",
    textColor: "text-amber-600",
    gradient: "from-amber-100 to-amber-50",
    modalContent: {
      about:
        "We manage complete registration of sale deeds, gift deeds, lease deeds, and provide stamp duty calculation assistance.",
      highlights: [
        "Drafting legally sound deeds and agreements",
        "Online slot booking with Sub-Registrar offices",
        "Stamp duty and registration fee guidance",
        "Execution and attestation procedures",
      ],
      legalReferences: [
        "Indian Stamp Act, 1899",
        "Registration Act, 1908",
        "State Stamp Duty Rules",
      ],
    },
  },
  {
    title: "RERA Matters",
    description: "Legal support for RERA complaints and builder disputes.",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "bg-indigo-100/80",
    borderColor: "border-indigo-200/50",
    textColor: "text-indigo-600",
    gradient: "from-indigo-100 to-indigo-50",
    modalContent: {
      about:
        "We represent buyers in cases of project delays, false promises, and deviations in builder agreements under RERA.",
      highlights: [
        "Filing RERA complaints and appeals",
        "Review of Builder Buyer Agreements",
        "Advice on penalties and compensation",
        "Support for refund or possession claims",
      ],
      legalReferences: [
        "Real Estate (Regulation and Development) Act, 2016",
        "Telangana RERA Rules",
        "Consumer Protection Act, 2019 (when applicable)",
      ],
    },
  },
  {
    title: "Land Acquisition",
    description: "Compensation claims and rehabilitation under land acquisition laws.",
    icon: <MapPin className="w-5 h-5" />,
    color: "bg-blue-100/80",
    borderColor: "border-blue-200/50",
    textColor: "text-blue-600",
    gradient: "from-blue-100 to-blue-50",
    modalContent: {
      about:
        "We assist landowners and farmers facing acquisition by government or private entities by negotiating compensation and filing objections.",
      highlights: [
        "Filing claims for higher compensation",
        "Representation in Land Acquisition Officer hearings",
        "Challenging urgency clauses in courts",
        "Support with rehabilitation schemes",
      ],
      legalReferences: [
        "Right to Fair Compensation and Transparency in Land Acquisition Act, 2013",
        "State-specific Land Acquisition Rules",
      ],
    },
  },
  {
    title: "Lease Agreements",
    description: "Drafting and negotiating residential and commercial lease contracts.",
    icon: <Handshake className="w-5 h-5" />,
    color: "bg-purple-100/80",
    borderColor: "border-purple-200/50",
    textColor: "text-purple-600",
    gradient: "from-purple-100 to-purple-50",
    modalContent: {
      about:
        "We prepare custom lease agreements for landlords and tenants, ensuring protection and compliance under tenancy laws.",
      highlights: [
        "Drafting lease, rent, and leave-and-license agreements",
        "Security deposit and termination clause guidance",
        "Advice on lock-in periods and eviction rules",
        "Execution with witnesses and attestation",
      ],
      legalReferences: [
        "Indian Contract Act, 1872",
        "Rent Control Acts (State-specific)",
        "Transfer of Property Act, 1882",
      ],
    },
  },
];

const processSteps = [
  {
    title: "Initial Consultation",
    description: "Free 30-minute discussion to understand your property legal needs",
    icon: <PhoneCall className="w-5 h-5 text-blue-600" />,
  },
  {
    title: "Document Review",
    description: "Thorough examination of your property documents",
    icon: <BookOpenCheck className="w-5 h-5 text-green-600" />,
  },
  {
    title: "Strategy Session",
    description: "Personalized legal approach for your situation",
    icon: <UserCheck className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Regular Updates",
    description: "Continuous communication throughout your case",
    icon: <Clock className="w-5 h-5 text-amber-600" />,
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
          className="relative overflow-hidden rounded-3xl shadow-lg mb-16 bg-gradient-to-br from-blue-800 to-purple-900"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/assets/property-law-image.png"
              alt="Abstract property law background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
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
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your Trusted <span className="text-amber-300">Property Legal Partner</span>
              </motion.h1>

              <motion.p
                className="text-lg text-white/90 mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Personalized legal guidance for all real estate matters with transparent pricing and
                clear communication.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
                >
                  Free Initial Consultation
                </button>
                <a
                  href="#process"
                  className="text-white border border-white/30 hover:border-white/60 px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
                >
                  How We Work
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Property Law Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal support for all your real estate needs with attention to detail
              and client-focused approach.
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

        {/* Our Process Section */}
        <div id="process" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-600">Client-Focused Process</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent steps to ensure you understand and are comfortable with every stage of
              your property legal matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20 border border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why <span className="text-blue-600">Choose Our Firm</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                What makes our property law services different for new homeowners and investors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  Personalized Attention
                </h3>
                <p className="text-gray-600">
                  Every client receives direct access to their attorney with prompt responses to all
                  inquiries.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    <ScrollText className="w-5 h-5" />
                  </div>
                  Clear Documentation
                </h3>
                <p className="text-gray-600">
                  We explain all legal documents in plain language so you understand every clause
                  and implication.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  Timely Service
                </h3>
                <p className="text-gray-600">
                  Property transactions often have deadlines - we prioritize meeting all critical
                  dates.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                    <Handshake className="w-5 h-5" />
                  </div>
                  Transparent Pricing
                </h3>
                <p className="text-gray-600">
                  Clear fee structures with no hidden costs, including fixed-fee options for common
                  services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Property Law <span className="text-blue-600">FAQs</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Common questions about property legal matters in Telangana.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How long does property registration typically take?",
                answer:
                  "The registration process usually takes 1-2 weeks after document preparation, depending on Sub-Registrar office schedules.",
              },
              {
                question: "What documents do I need for title verification?",
                answer:
                  "You'll need the sale deed, previous title deeds, property tax receipts, encumbrance certificate, and survey documents.",
              },
              {
                question: "Can I handle a property dispute without going to court?",
                answer:
                  "Many disputes can be resolved through mediation or negotiation. We explore all alternative dispute resolution options first.",
              },
              {
                question:
                  "What's the difference between RERA and consumer court for builder disputes?",
                answer:
                  "RERA specifically handles real estate developer issues with faster resolution, while consumer court has broader jurisdiction but longer timelines.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 transition-all"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Modal */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center sm:p-6 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl relative shadow-2xl flex flex-col overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                {/* Top gradient bar */}
                <div className={`${services[activeIndex].gradient} h-2 w-full`}></div>

                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white px-6 sm:px-8 py-4 border-b border-gray-200 flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`${services[activeIndex].color} ${services[activeIndex].textColor} p-3 rounded-xl`}
                    >
                      {services[activeIndex].icon}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {services[activeIndex].title}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 my-2 rounded-full"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="text-gray-400 hover:text-black rounded-full p-1 hover:bg-gray-100 transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto px-6 sm:px-8 py-6 flex-1">
                  <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
                    {/* About */}
                    <section>
                      <h4 className="text-lg font-semibold text-gray-900">About</h4>
                      <p>{services[activeIndex].modalContent?.about}</p>
                    </section>

                    {/* Highlights */}
                    {services[activeIndex].modalContent?.highlights?.length > 0 && (
                      <section>
                        <h4 className="text-lg font-semibold text-gray-900">Highlights</h4>
                        <ul className="list-disc list-inside space-y-2">
                          {services[activeIndex].modalContent.highlights.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Legal References */}
                    {services[activeIndex].modalContent?.legalReferences?.length > 0 && (
                      <section>
                        <h4 className="text-lg font-semibold text-gray-900">
                          Relevant Legal References
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {services[activeIndex].modalContent.legalReferences.map((law, idx) => (
                            <li key={idx}>{law}</li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </div>
                </div>

                {/* Sticky Footer */}
                <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 px-6 sm:px-8 py-4 flex flex-wrap justify-end gap-4">
                  <button
                    onClick={() => {
                      setActiveIndex(null);
                      setModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition"
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </PracticeDetailLayout>
  );
}
