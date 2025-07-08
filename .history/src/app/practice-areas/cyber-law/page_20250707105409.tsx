// "use client";

// import { useState } from "react";
// import { ShieldCheck, Lock, Cpu, Bug, GlobeLock, UserSearch, FileLock2, Network, PhoneCall } from "lucide-react";
// import { motion } from "framer-motion";
// import ConsultationModal from "@/components/ConsultationModal";
// import PracticeDetailLayout from "@/components/PracticeDetailLayout";

// const services = [
//   {
//     title: "Data Privacy & Protection",
//     description: "GDPR, Indian PDP Bill, and enterprise data compliance services for businesses and professionals.",
//     icon: <Lock className="w-5 h-5" />
//   },
//   {
//     title: "Cybercrime & Fraud Defense",
//     description: "Legal assistance for victims of cyberstalking, financial fraud, impersonation, and hacking.",
//     icon: <ShieldCheck className="w-5 h-5" />
//   },
//   {
//     title: "AI & Algorithmic Accountability",
//     description: "Advisory on ethical AI use, deepfakes, automated decisions, and algorithm transparency.",
//     icon: <Cpu className="w-5 h-5" />
//   },
//   {
//     title: "Digital Contracts & E-Signatures",
//     description: "Drafting, reviewing, and enforcing smart contracts, NDAs, and digital agreements.",
//     icon: <FileLock2 className="w-5 h-5" />
//   },
//   {
//     title: "Cyber Compliance for Startups",
//     description: "Helping tech founders navigate cyber laws, platform liabilities, and IP concerns.",
//     icon: <Network className="w-5 h-5" />
//   },
//   {
//     title: "Social Media & Reputation",
//     description: "Legal recourse against defamation, doxxing, revenge porn, and social media abuse.",
//     icon: <UserSearch className="w-5 h-5" />
//   }
// ];

// export default function CyberLawPage() {
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <PracticeDetailLayout title="Cyber Law & Digital Rights" icon={<GlobeLock className="w-6 h-6" />}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

//         {/* Intro Section */}
//         <section className="text-center mb-16">
//           <motion.h1
//             className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Modern Legal Solutions for the Digital World
//           </motion.h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             We protect your digital rights, ensure compliance, and defend against online threats. From AI regulations to cybercrime — we’re with you at every byte.
//           </p>
//         </section>

//         {/* Service Tiles */}
//         <section className="mb-20">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((service, i) => (
//               <motion.div
//                 key={i}
//                 className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//               >
//                 <div className="flex items-center gap-4 mb-3 text-blue-600">
//                   <div className="bg-blue-50 p-3 rounded-lg">{service.icon}</div>
//                   <h3 className="font-semibold text-lg text-gray-800">{service.title}</h3>
//                 </div>
//                 <p className="text-gray-600 text-sm">{service.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Why Cyber Law Matters */}
//         <section className="mb-20 bg-gradient-to-r from-blue-50 to-purple-50 p-10 rounded-3xl border border-gray-200">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Cyber Law Is Critical Today</h2>
//             <ul className="text-gray-700 space-y-3 text-left list-disc list-inside">
//               <li>India saw over 1.6 lakh cybercrime cases in 2023 alone – <strong>protection is no longer optional</strong>.</li>
//               <li>Data privacy regulations like <strong>DPDP Bill</strong> affect every digital business and professional.</li>
//               <li>AI-generated content, deepfakes, and automated frauds need fast legal remedies.</li>
//               <li><strong>Social media misuse</strong> is growing — users must know their rights and legal options.</li>
//             </ul>
//           </div>
//         </section>

//         {/* CTA Block */}
//         <section className="text-center">
//           <h3 className="text-2xl font-semibold mb-4">Facing a digital legal issue?</h3>
//           <p className="text-gray-600 mb-6 max-w-lg mx-auto">
//             Get expert advice within 24 hours. We handle urgent issues like impersonation, fraud, and data leaks swiftly.
//           </p>
//           <button
//             onClick={() => setModalOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
//           >
//             Request Immediate Consultation
//           </button>
//         </section>

//         <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
//       </div>
//     </PracticeDetailLayout>
//   );
// }

// "use client";

// import { useState } from "react";
// import {
//   ShieldCheck,
//   Lock,
//   Cpu,
//   Bug,
//   GlobeLock,
//   UserSearch,
//   FileLock2,
//   Network,
//   PhoneCall,
//   Code,
//   Database,
//   Fingerprint,
//   Shield,
//   Bot,
//   Cloud,
//   MailWarning,
//   Check,
//   X,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import ConsultationModal from "@/components/ConsultationModal";
// import PracticeDetailLayout from "@/components/PracticeDetailLayout";
// import Image from "next/image";

// const services = [
//   {
//     title: "Data Privacy Compliance",
//     description: "GDPR, DPDP Act 2023 compliance for businesses handling Indian users' data",
//     icon: <Database className="w-5 h-5" />,
//     color: "bg-blue-100",
//     trending: "DPDP Act Implementation",
//     stats: "72% of Indian firms non-compliant with new data laws",
//   },
//   {
//     title: "AI Governance",
//     description: "Legal frameworks for generative AI, deepfakes, and algorithmic bias",
//     icon: <Bot className="w-5 h-5" />,
//     color: "bg-purple-100",
//     trending: "AI Regulation",
//     stats: "300% increase in AI-related disputes since 2022",
//   },
//   {
//     title: "Cybercrime Defense",
//     description: "Representation in online fraud, sextortion, and financial cybercrimes",
//     icon: <Shield className="w-5 h-5" />,
//     color: "bg-red-100",
//     trending: "Digital Payment Frauds",
//     stats: "₹2.2 trillion lost to cyber fraud in 2023",
//   },
//   {
//     title: "Blockchain & Web3",
//     description: "Smart contract audits, NFT disputes, and crypto regulations",
//     icon: <Code className="w-5 h-5" />,
//     color: "bg-amber-100",
//     trending: "Virtual Asset Regulation",
//     stats: "47% of crypto exchanges face compliance issues",
//   },
//   {
//     title: "Digital Identity Protection",
//     description: "Legal remedies for Aadhaar leaks, biometric misuse, and identity theft",
//     icon: <Fingerprint className="w-5 h-5" />,
//     color: "bg-green-100",
//     trending: "Biometric Data Leaks",
//     stats: "1.3M Indians affected by identity fraud monthly",
//   },
//   {
//     title: "Cloud Security Compliance",
//     description: "Legal guidance for cloud storage, SaaS agreements, and cross-border data flows",
//     icon: <Cloud className="w-5 h-5" />,
//     color: "bg-indigo-100",
//     trending: "Data Localization",
//     stats: "89% of enterprises use non-compliant cloud services",
//   },
// ];

// const trendingIssues = [
//   {
//     title: "Deepfake Regulations",
//     description: "Legal actions against AI-generated impersonation and synthetic media",
//     icon: <UserSearch className="w-5 h-5" />,
//   },
//   {
//     title: "Dark Web Monitoring",
//     description: "Legal strategies when your data appears on illicit marketplaces",
//     icon: <GlobeLock className="w-5 h-5" />,
//   },
//   {
//     title: "Ransomware Response",
//     description: "Compliance with new mandatory reporting requirements",
//     icon: <MailWarning className="w-5 h-5" />,
//   },
//   {
//     title: "IoT Liability",
//     description: "Legal responsibility for smart device data breaches",
//     icon: <Cpu className="w-5 h-5" />,
//   },
// ];

// export default function CyberLawPage() {
//   const [activeService, setActiveService] = useState<number | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <PracticeDetailLayout
//       title="Cyber & Digital Rights Law"
//       icon={<GlobeLock className="w-6 h-6" />}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//         {/* Hero Section */}
//         <motion.section
//           className="relative rounded-3xl overflow-hidden mb-16"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80 z-0">
//             <Image
//               src="/assets/cyber-law-hero.jpg"
//               alt="Digital security concept"
//               fill
//               className="object-cover opacity-30"
//               priority
//             />
//           </div>
//           <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-full mb-4">
//                 DIGITAL LEGAL PROTECTION
//               </span>
//               <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
//                 Navigating the{" "}
//                 <span className="text-amber-300">Evolving Cyber Legal Landscape</span>
//               </h1>
//               <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
//                 Comprehensive legal solutions for data protection, AI governance, and digital rights
//                 in India's fast-changing tech ecosystem.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <button
//                   onClick={() => setModalOpen(true)}
//                   className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
//                 >
//                   Get Cyber Legal Advice
//                 </button>
//                 <a
//                   href="#trends"
//                   className="text-white border border-white/30 hover:border-white/60 px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
//                 >
//                   Emerging Threats
//                 </a>
//               </div>
//             </motion.div>
//           </div>
//         </motion.section>

//         {/* Core Services */}
//         <section className="mb-20">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Our <span className="text-blue-600">Cyber Law Services</span>
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Specialized legal support for India's digital economy and evolving cyber regulations
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((service, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 onClick={() => setActiveService(i)}
//                 className={`bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all ${service.color}`}
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 rounded-lg bg-white shadow-sm">{service.icon}</div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
//                     <p className="text-gray-600 mb-3">{service.description}</p>
//                     <div className="text-xs font-medium text-gray-500 mt-2">
//                       <span className="text-blue-600">{service.trending}</span> • {service.stats}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Trending Cyber Law Issues */}
//         <section
//           id="trends"
//           className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20 border border-gray-200"
//         >
//           <div className="max-w-4xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 2024 <span className="text-purple-600">Cyber Law Trends</span>
//               </h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Emerging digital legal challenges requiring immediate attention
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {trendingIssues.map((issue, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 + 0.3 }}
//                   className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
//                       {issue.icon}
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-800 mb-1">{issue.title}</h3>
//                       <p className="text-gray-600 text-sm">{issue.description}</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Cyber Law Importance */}
//         <section className="mb-20">
//           <div className="prose prose-lg max-w-3xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//               Why <span className="text-blue-600">Cyber Legal Counsel</span> is Essential
//             </h2>

//             <div className="space-y-6">
//               <p>
//                 With India's digital economy projected to reach $1 trillion by 2025, cyber legal
//                 issues are growing exponentially. The Digital Personal Data Protection Act 2023
//                 establishes strict compliance requirements with penalties up to ₹500 crore for
//                 violations.
//               </p>

//               <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
//                 <h3 className="font-bold text-blue-800 mb-3">Critical Cyber Law Updates:</h3>
//                 <ul className="list-disc list-inside space-y-2 text-blue-900">
//                   <li>Mandatory 72-hour data breach reporting under DPDP Rules</li>
//                   <li>New CERT-In directions for VPN and cloud service providers</li>
//                   <li>Supreme Court rulings on digital privacy as fundamental right</li>
//                   <li>IT Rules 2021 amendments for social media accountability</li>
//                 </ul>
//               </div>

//               <p>
//                 Our cyber law team combines technical understanding with legal expertise to navigate
//                 these complex regulations. We help clients implement compliant systems while
//                 protecting their digital assets and rights.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Emergency Response */}
//         <section className="bg-gradient-to-r from-blue-900 to-purple-800 rounded-3xl p-8 md:p-12 text-white">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
//               <PhoneCall className="w-8 h-8" />
//             </div>
//             <h2 className="text-2xl md:text-3xl font-bold mb-4">Cyber Emergency Response</h2>
//             <p className="text-white/90 mb-6 max-w-2xl mx-auto">
//               If you're experiencing an active cyber attack, data breach, or online extortion
//               attempt, we provide immediate legal assistance to mitigate damage and preserve
//               evidence.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <a
//                 href="tel:+911234567890"
//                 className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
//               >
//                 Call Emergency Hotline
//               </a>
//               <button
//                 onClick={() => setModalOpen(true)}
//                 className="text-white border border-white/30 hover:border-white/60 px-6 py-3 rounded-lg font-medium transition hover:shadow-lg"
//               >
//                 Send Secure Alert
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Service Detail Modal */}
//         <AnimatePresence>
//           {activeService !== null && (
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
//                   <h3 className="text-xl font-bold text-gray-900">
//                     {services[activeService].title}
//                   </h3>
//                   <button
//                     onClick={() => setActiveService(null)}
//                     className="text-gray-500 hover:text-black"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 {/* Scrollable Body */}
//                 <div className="overflow-y-auto p-6 space-y-6 text-gray-700">
//                   <div className="flex items-start gap-4">
//                     <div className={`${services[activeService].color} p-3 rounded-lg`}>
//                       {services[activeService].icon}
//                     </div>
//                     <div>
//                       <p className="text-lg">{services[activeService].description}</p>
//                       <div className="text-sm font-medium text-blue-600 mt-2">
//                         Trending: {services[activeService].trending}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-gray-800 mb-3">Recent Developments</h4>
//                     <ul className="list-disc list-inside space-y-2 text-sm">
//                       <li>New compliance deadlines under DPDP Act</li>
//                       <li>Updated CERT-In cybersecurity directions</li>
//                       <li>Recent high-profile cases and precedents</li>
//                       <li>Upcoming regulatory changes</li>
//                     </ul>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-3">Our Approach</h4>
//                     <ul className="space-y-3">
//                       <li className="flex items-start gap-3">
//                         <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span>Technical + legal threat assessment</span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span>Compliance gap analysis</span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span>Strategic response planning</span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span>Ongoing monitoring and updates</span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Sticky Footer */}
//                 <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between">
//                   <button
//                     className="text-gray-600 hover:text-black font-medium"
//                     onClick={() => setActiveService(null)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md"
//                     onClick={() => {
//                       setModalOpen(true);
//                       setActiveService(null);
//                     }}
//                   >
//                     Get Specialist Advice
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
//       </div>
//     </PracticeDetailLayout>
//   );
// }


"use client";
import { useState } from "react";
import {
  ShieldCheck, Lock, Cpu, Database, Fingerprint, Cloud,
  TrendingUp, ChevronDown, Globe, Code, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";

// Type definitions
type CardItem = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  trend: string;
  stats: string;
  legalBasis: string[];
  caseStudies: string[];
};

// Core Services Data
const servicesData: CardItem[] = [
  // ... (unchanged card definitions: ai-governance, data-resilience, digital-identity, cybercrime-defense)
];

// Practice Areas Data
const practiceAreas: CardItem[] = [
  // ... (unchanged card definitions: fintech-regulations, cloud-security)
];

const allCards = [...servicesData, ...practiceAreas];

// Modal Component
const ServiceModal = ({ service, onClose }: { service: CardItem, onClose: () => void }) => (
  <motion.div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      initial={{ scale: 0.95, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.95, y: 20 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b p-6 flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${service.color}`}>{service.icon}</div>
          <div>
            <h2 className="text-2xl font-bold">{service.title}</h2>
            <p className="text-gray-600">{service.shortDescription}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Overview</h3>
          <p>{service.longDescription}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Key Stats</h3>
          <p className="text-blue-700 font-medium">{service.trend} — {service.stats}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Legal References</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {service.legalBasis.map((ref, i) => (
              <li key={i}>{ref}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Case Studies</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {service.caseStudies.map((study, i) => (
              <li key={i}>{study}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between items-center">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-black font-medium px-4 py-2"
        >
          Close
        </button>
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md"
        >
          Request Consultation
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// Card Stack
const CardStack = ({ cards, setActiveCard }: { cards: CardItem[], setActiveCard: (card: CardItem) => void }) => (
  <div className="relative min-h-[500px]">
    {cards.map((card, i) => (
      <motion.div
        key={card.id}
        className={`absolute w-full bg-white rounded-2xl shadow-lg border ${card.borderColor} p-6 cursor-pointer`}
        style={{
          zIndex: cards.length - i,
          transform: `translateY(${i * 20}px) scale(${1 - i * 0.05})`
        }}
        whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
        onClick={() => setActiveCard(card)}
      >
        <div className="flex gap-4">
          <div className={`p-3 rounded-lg ${card.color}`}>{card.icon}</div>
          <div>
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.shortDescription}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
              <TrendingUp className="w-4 h-4" />
              <span>{card.trend}</span>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
    <div className="absolute bottom-0 left-0 right-0 text-center pt-20">
      <p className="text-gray-500">Click any card to view details</p>
      <ChevronDown className="w-6 h-6 mx-auto mt-2 animate-bounce" />
    </div>
  </div>
);

// Cyber Law Page
export default function CyberLawPage() {
  const [activeCard, setActiveCard] = useState<CardItem | null>(null);
  const [view, setView] = useState<"services" | "practice-areas">("services");

  return (
    <PracticeDetailLayout title="Cyber Law" icon={<Globe className="w-6 h-6" />}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setView("services")}
              className={`px-4 py-2 rounded-full transition ${view === "services" ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-200"}`}
            >
              Our Solutions
            </button>
            <button
              onClick={() => setView("practice-areas")}
              className={`px-4 py-2 rounded-full transition ${view === "practice-areas" ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-200"}`}
            >
              Practice Areas
            </button>
          </div>
        </div>

        {/* Cards */}
        <CardStack
          cards={view === "services" ? servicesData : practiceAreas}
          setActiveCard={setActiveCard}
        />

        {/* Modal */}
        <AnimatePresence>
          {activeCard && (
            <ServiceModal service={activeCard} onClose={() => setActiveCard(null)} />
          )}
        </AnimatePresence>
      </div>
    </PracticeDetailLayout>
  );
}
