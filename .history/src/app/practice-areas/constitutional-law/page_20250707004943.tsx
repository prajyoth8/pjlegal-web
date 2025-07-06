"use client";

import { useState } from "react";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";
import {
  Scale,
  Gavel,
  BookOpen,
  Shield,
  Landmark,
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
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationModal from "@/components/ConsultationModal";

const services = [
  {
    title: "Fundamental Rights Enforcement",
    short: "Legal remedies for violation of your constitutional rights under Part III.",
    icon: <ShieldCheck className="w-5 h-5" />,
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
    icon: <ScrollText className="w-5 h-5" />,
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
          className="relative overflow-hidden rounded-3xl shadow-lg mb-16 bg-gradient-to-br from-blue-900 to-indigo-800"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/assets/constitution-banner.jpg"
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
                  pjlegal.r@gmail.com
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
                    <div
                      className={`${services[activeIndex].color} ${services[activeIndex].textColor} p-4 rounded-xl`}
                    >
                      {services[activeIndex].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {services[activeIndex].title}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 my-4 rounded-full"></div>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                    <p className="text-lg">{services[activeIndex].description}</p>

                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Our Approach:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>In-depth constitutional analysis</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Comprehensive precedent research</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Strategic litigation planning</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Persuasive constitutional arguments</span>
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
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition"
                    >
                      Consult Our Experts
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





// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Scale,
//   Landmark,
//   Users,
//   Gavel,
//   ScrollText,
//   ArrowRight,
//   X,
//   Check,
//   BookOpenCheck,
//   PhoneCall,
//   UserCheck,
//   Clock,
//   Globe,
//   ShieldCheck,
// } from "lucide-react";
// import PracticeDetailLayout from "@/components/PracticeDetailLayout";
// import ConsultationModal from "@/components/ConsultationModal";

// const services = [
//   {
//     title: "Fundamental Rights Enforcement",
//     short: "Legal remedies for violation of your constitutional rights under Part III.",
//     icon: <ShieldCheck className="w-5 h-5" />,
//     about:
//       "We help you enforce your fundamental rights guaranteed under the Indian Constitution including right to equality, freedom, life and liberty.",
//     highlights: [
//       "Protection against unlawful arrest or detention",
//       "Right to freedom of speech and religion",
//       "Right to education, equality and privacy",
//     ],
//     legalReferences: [
//       "Article 14 – Right to Equality",
//       "Article 21 – Right to Life and Personal Liberty",
//       "Article 19 – Right to Freedom",
//     ],
//   },
//   {
//     title: "Public Interest Litigation (PIL)",
//     short: "Filing and defending PILs to ensure justice for the public at large.",
//     icon: <Users className="w-5 h-5" />,
//     about:
//       "PILs serve as a democratic tool to highlight issues affecting the public or marginalized sections. We draft and argue PILs with precision and constitutional sensitivity.",
//     highlights: [
//       "Matters related to environment, governance, corruption",
//       "Relief to weaker sections without direct access to court",
//       "Strategic legal research and preparation",
//     ],
//     legalReferences: [
//       "Article 32 – Right to Constitutional Remedies",
//       "Judicial Precedents – Vishaka v. State of Rajasthan, Hussainara Khatoon v. State of Bihar",
//     ],
//   },
//   {
//     title: "Writ Petitions",
//     short: "Drafting and arguing writs like Habeas Corpus, Mandamus, Certiorari, etc.",
//     icon: <ScrollText className="w-5 h-5" />,
//     about:
//       "We handle all forms of writ petitions to challenge actions or inactions of state authorities violating your rights.",
//     highlights: [
//       "Speedy relief through High Court or Supreme Court",
//       "Drafting with accuracy and citation of precedent",
//       "Applicable against state, government, or public officers",
//     ],
//     legalReferences: ["Article 226 – Power of High Courts", "Article 32 – Writs by Supreme Court"],
//   },
//   {
//     title: "Constitutional Challenges",
//     short: "Challenge to constitutional validity of laws or government actions.",
//     icon: <Gavel className="w-5 h-5" />,
//     about:
//       "We represent clients in cases that challenge the legality and constitutionality of statutes, executive actions or regulations.",
//     highlights: [
//       "Analysis of constitutional conflict with existing laws",
//       "Strategic litigation planning",
//       "Research-driven drafting and pleading",
//     ],
//     legalReferences: ["Kesavananda Bharati v. State of Kerala", "Minerva Mills v. Union of India"],
//   },
// ];

// const processSteps = [
//   {
//     title: "Legal Consultation",
//     description: "Discuss your issue and determine constitutional violations.",
//     icon: <PhoneCall className="w-5 h-5 text-blue-600" />,
//   },
//   {
//     title: "Case Strategy",
//     description: "We study precedents and constitutional provisions in detail.",
//     icon: <BookOpenCheck className="w-5 h-5 text-purple-600" />,
//   },
//   {
//     title: "Petition Drafting",
//     description: "Carefully crafted writs or PILs with supporting affidavits.",
//     icon: <UserCheck className="w-5 h-5 text-green-600" />,
//   },
//   {
//     title: "Filing & Follow-up",
//     description: "Regular updates and hearings in High Court or Supreme Court.",
//     icon: <Clock className="w-5 h-5 text-amber-600" />,
//   },
// ];

// export default function ConstitutionalLawPage() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <PracticeDetailLayout title="Constitutional Law" icon={<Landmark className="w-6 h-6" />}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Hero */}
//         <div className="relative overflow-hidden rounded-3xl shadow-lg mb-16 bg-gradient-to-br from-purple-900 to-blue-900">
//           <div className="absolute inset-0 z-0 opacity-20">
//             <Image
//               src="/assets/constitutional-law-image.jpg"
//               alt="Constitutional Law Hero"
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//           <div className="relative z-10 p-8 md:p-16 text-white">
//             <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-4">
//               CONSTITUTIONAL PROTECTION
//             </span>
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               Defending Your <span className="text-amber-300">Fundamental Rights</span>
//             </h1>
//             <p className="text-lg text-white/90 mb-8 max-w-2xl">
//               Expert legal services for PILs, Writs, and Constitutional remedies under the Indian
//               Constitution.
//             </p>
//             <div className="flex gap-4 flex-wrap">
//               <button
//                 onClick={() => setModalOpen(true)}
//                 className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition"
//               >
//                 Get Free Consultation
//               </button>
//               <a
//                 href="#process"
//                 className="text-white border border-white/30 hover:border-white/60 px-6 py-3 rounded-lg font-medium transition"
//               >
//                 How We Work
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Services */}
//         <div className="mb-20">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
//             Our <span className="text-purple-600">Key Services</span>
//           </h2>
//           <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
//             Tailored legal strategy and court representation for constitutional violations and
//             public interest matters.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {services.map((service, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ y: -4 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 onClick={() => setActiveIndex(i)}
//                 className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg cursor-pointer"
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">{service.icon}</div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
//                     <p className="text-gray-600">{service.short}</p>
//                     <div className="text-blue-600 mt-2 font-medium flex items-center gap-1">
//                       Learn more <ArrowRight className="w-4 h-4" />
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Process */}
//         <div id="process" className="mb-24">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
//             Our <span className="text-blue-600">Approach</span>
//           </h2>
//           <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
//             Strategic steps to ensure your rights are protected and justice is pursued efficiently.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {processSteps.map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md"
//               >
//                 <div className="mb-4 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
//                   {step.icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
//                 <p className="text-gray-600">{step.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Modal */}
//         <AnimatePresence>
//           {activeIndex !== null && (
//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <motion.div
//                 className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
//                 initial={{ scale: 0.95 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.95 }}
//               >
//                 {/* Sticky Header */}
//                 <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//                   <h3 className="text-xl font-bold text-gray-900">{services[activeIndex].title}</h3>
//                   <button
//                     onClick={() => setActiveIndex(null)}
//                     className="text-gray-500 hover:text-black"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 {/* Scrollable Body */}
//                 <div className="overflow-y-auto p-6 space-y-6 text-gray-700">
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-2">About</h4>
//                     <p>{services[activeIndex].about}</p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-2">Highlights</h4>
//                     <ul className="list-disc list-inside space-y-2">
//                       {services[activeIndex].highlights.map((point, i) => (
//                         <li key={i} className="flex items-start gap-2">
//                           <Check className="w-5 h-5 text-green-500 mt-1" />
//                           <span>{point}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-2">Legal References</h4>
//                     <ul className="list-disc list-inside space-y-2">
//                       {services[activeIndex].legalReferences.map((ref, i) => (
//                         <li key={i}>{ref}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Sticky Footer */}
//                 <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between">
//                   <button
//                     className="text-gray-600 hover:text-black font-medium"
//                     onClick={() => setActiveIndex(null)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md"
//                     onClick={() => {
//                       setModalOpen(true);
//                       setActiveIndex(null);
//                     }}
//                   >
//                     Book a Consultation
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
//     </PracticeDetailLayout>
//   );
// }
