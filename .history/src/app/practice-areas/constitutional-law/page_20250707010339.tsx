"use client";

import { useState } from "react";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";
import {
  Scale,
  Gavel,
  BookOpen,
  ShieldCheck,
  Users,
  ArrowRight,
  X,
  FileText,
  Globe,
  UserCog,
  Handshake,
  ClipboardList,
  Award,
  Mail,
  Phone,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationModal from "@/components/ConsultationModal";

const services = [
  {
    title: "Fundamental Rights Enforcement",
    short: "Legal remedies for violation of your constitutional rights under Part III.",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "bg-blue-100/80",
    borderColor: "border-blue-200/50",
    textColor: "text-blue-600",
    gradient: "from-blue-100 to-blue-50",
    about:
      "We help you enforce your fundamental rights guaranteed under the Indian Constitution including right to equality, freedom, life and liberty.",
    highlights: [
      "Protection against unlawful arrest or detention",
      "Right to freedom of speech and religion",
      "Right to education, equality and privacy",
    ],
    legalReferences: [
      "Article 14 – Right to Equality",
      "Article 21 – Right to Life and Personal Liberty",
      "Article 19 – Right to Freedom",
    ],
  },
  {
    title: "Public Interest Litigation (PIL)",
    short: "Filing and defending PILs to ensure justice for the public at large.",
    icon: <Users className="w-5 h-5" />,
    color: "bg-purple-100/80",
    borderColor: "border-purple-200/50",
    textColor: "text-purple-600",
    gradient: "from-purple-100 to-purple-50",
    about:
      "PILs serve as a democratic tool to highlight issues affecting the public or marginalized sections. We draft and argue PILs with precision and constitutional sensitivity.",
    highlights: [
      "Matters related to environment, governance, corruption",
      "Relief to weaker sections without direct access to court",
      "Strategic legal research and preparation",
    ],
    legalReferences: [
      "Article 32 – Right to Constitutional Remedies",
      "Judicial Precedents – Vishaka v. State of Rajasthan, Hussainara Khatoon v. State of Bihar",
    ],
  },
  {
    title: "Writ Petitions",
    short: "Drafting and arguing writs like Habeas Corpus, Mandamus, Certiorari, etc.",
    icon: <FileText className="w-5 h-5" />,
    color: "bg-amber-100/80",
    borderColor: "border-amber-200/50",
    textColor: "text-amber-600",
    gradient: "from-amber-100 to-amber-50",
    about:
      "We handle all forms of writ petitions to challenge actions or inactions of state authorities violating your rights.",
    highlights: [
      "Speedy relief through High Court or Supreme Court",
      "Drafting with accuracy and citation of precedent",
      "Applicable against state, government, or public officers",
    ],
    legalReferences: ["Article 226 – Power of High Courts", "Article 32 – Writs by Supreme Court"],
  },
  {
    title: "Constitutional Challenges",
    short: "Challenge to constitutional validity of laws or government actions.",
    icon: <Gavel className="w-5 h-5" />,
    color: "bg-red-100/80",
    borderColor: "border-red-200/50",
    textColor: "text-red-600",
    gradient: "from-red-100 to-red-50",
    about:
      "We represent clients in cases that challenge the legality and constitutionality of statutes, executive actions or regulations.",
    highlights: [
      "Analysis of constitutional conflict with existing laws",
      "Strategic litigation planning",
      "Research-driven drafting and pleading",
    ],
    legalReferences: ["Kesavananda Bharati v. State of Kerala", "Minerva Mills v. Union of India"],
  },
];

const processSteps = [
  {
    title: "Case Evaluation",
    description: "Detailed analysis of constitutional issues and legal standing",
    icon: <ClipboardList className="w-5 h-5 text-blue-600" />,
  },
  {
    title: "Research & Strategy",
    description: "Comprehensive constitutional jurisprudence research",
    icon: <BookOpen className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "Document Preparation",
    description: "Drafting petitions, writs and supporting affidavits",
    icon: <FileText className="w-5 h-5 text-green-600" />,
  },
  {
    title: "Court Representation",
    description: "Advocacy before High Courts and Supreme Court",
    icon: <Gavel className="w-5 h-5 text-amber-600" />,
  },
];

const landmarkCases = [
  {
    title: "Basic Structure Doctrine",
    description: "Kesavananda Bharati v. State of Kerala (1973)",
  },
  {
    title: "Right to Privacy",
    description: "Justice K.S. Puttaswamy v. Union of India (2017)",
  },
  {
    title: "NJAC Judgment",
    description: "Supreme Court Advocates-on-Record Assn. v. Union of India (2015)",
  },
  {
    title: "Right to Education",
    description: "Unni Krishnan v. State of Andhra Pradesh (1993)",
  },
];

export default function ConstitutionalLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PracticeDetailLayout title="Constitutional Law" icon={<Scale className="w-6 h-6" />}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-lg mb-16 bg-gradient-to-br from-amber-900 to-purple-800"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/assets/constitution-banner.png"
              alt="Indian Constitution"
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
                CONSTITUTIONAL LAW SPECIALISTS
              </motion.span>

              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Defending <span className="text-amber-300">Fundamental Rights</span> &
                Constitutional Values
              </motion.h1>

              <motion.p
                className="text-lg text-white/90 mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Expert legal representation for constitutional matters before High Courts and the
                Supreme Court of India.
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
                  Schedule Consultation
                </button>
                <a
                  href="#landmarks"
                  className="text-white border border-white/30 hover:border-white/60 px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
                >
                  Landmark Cases
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Constitutional Practice</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal services for matters involving interpretation and enforcement of
              the Indian Constitution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <p className="text-gray-600 mb-4">{service.short}</p>
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
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-600">Constitutional Litigation Process</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meticulous approach to constitutional cases ensuring thorough preparation and
              effective advocacy.
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

        {/* Landmark Cases Section */}
        <div
          id="landmarks"
          className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20 border border-gray-200"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Influential <span className="text-blue-600">Constitutional Cases</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Landmark judgments that have shaped India's constitutional jurisprudence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {landmarkCases.map((caseStudy, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{caseStudy.title}</h3>
                      <p className="text-gray-600 text-sm">{caseStudy.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Constitutional Law Matters */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-blue-600">Constitutional Law Matters</span>
            </h2>
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto text-gray-700">
            <p>
              Constitutional law forms the foundation of India's legal system, protecting citizens'
              fundamental rights and defining the relationship between individuals and the State.
              Our Constitution establishes the framework for governance while safeguarding
              democratic principles and the rule of law.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8">Key Constitutional Principles:</h3>
            <ul className="space-y-2">
              <li>
                <strong>Judicial Review:</strong> Power of courts to examine legislative and
                executive actions
              </li>
              <li>
                <strong>Basic Structure Doctrine:</strong> Limits on Parliament's amendment power
              </li>
              <li>
                <strong>Separation of Powers:</strong> Balance between Legislature, Executive and
                Judiciary
              </li>
              <li>
                <strong>Federalism:</strong> Distribution of powers between Center and States
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-3xl p-8 md:p-12 text-white mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Constitutional Legal Assistance?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl">
              Contact us to discuss your constitutional law matter with our experienced legal team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  Email Us
                </h3>
                <a
                  href="mailto:constitution@lawfirm.com"
                  className="text-white/90 hover:text-white underline"
                >
                  cpjlegal.r@gmail.com
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  Call Us
                </h3>
                <a href="tel:+911234567890" className="text-white/90 hover:text-white underline">
                  +91 87123 51102
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              >
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">{services[activeIndex].title}</h3>
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 space-y-6 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                    <p>{services[activeIndex].about}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Highlights</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {services[activeIndex].highlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 mt-1" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Legal References</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {services[activeIndex].legalReferences.map((ref, i) => (
                        <li key={i}>{ref}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sticky Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between">
                  <button
                    className="text-gray-600 hover:text-black font-medium"
                    onClick={() => setActiveIndex(null)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md"
                    onClick={() => {
                      setModalOpen(true);
                      setActiveIndex(null);
                    }}
                  >
                    Book a Consultation
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
