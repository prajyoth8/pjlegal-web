// // components/insights/EducationList.tsx
// "use client";

// import Link from "next/link";
// import { 
//   FiBook, 
//   FiShield, 
//   FiFileText, 
//   FiList, 
//   FiZap,
//   FiArrowRight,
//   FiUser,
//   FiShoppingBag,
//   FiHome,
//   FiGlobe,
//   FiHeart,
//   FiUsers,
//   FiAlertTriangle,
//   FiBriefcase,
//   FiDollarSign,
//   FiSmartphone
// } from "react-icons/fi";
// import { motion } from "framer-motion";

// // Custom icon components
// const ComparisonIcon = () => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     width="24" 
//     height="24" 
//     viewBox="0 0 24 24" 
//     fill="none" 
//     stroke="currentColor" 
//     strokeWidth="2" 
//     strokeLinecap="round" 
//     strokeLinejoin="round"
//     className="text-green-500"
//   >
//     <path d="M8 3v18m8-18v18M3 8h4m10 0h4M3 16h4m10 0h4"/>
//   </svg>
// );

// const educationSections = [
//   {
//     id: "know-your-rights",
//     title: "Know Your Rights",
//     description: "Comprehensive guide to constitutional and legal protections in India",
//     icon: <FiShield className="text-blue-500" />,
//     gradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
//     highlights: [
//       "<strong>Arrest procedures under BNSS</strong>",
//       "Right to Information Act",
//       "Gender rights and protections",
//       "Consumer and worker rights"
//     ]
//   },
//   {
//     id: "everyday-law",
//     title: "Everyday Legal Matters",
//     description: "Essential legal knowledge for common situations affecting citizens",
//     icon: <FiShoppingBag className="text-purple-500" />,
//     gradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
//     highlights: [
//       "Property buying/selling contracts",
//       "Consumer complaint procedures",
//       "Marriage and divorce laws",
//       "Neighbor and property disputes"
//     ]
//   },
//   {
//     id: "new-criminal-laws",
//     title: "BNS, BNSS & BSA (2023)",
//     description: "Complete analysis of India's reformed criminal justice system",
//     icon: <FiBook className="text-red-500" />,
//     gradient: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20",
//     highlights: [
//       "Comparison with old IPC/CrPC",
//       "Key changes in criminal procedures",
//       "Digital evidence rules under BSA",
//       "New offenses and penalties"
//     ]
//   },
//   {
//     id: "legal-processes",
//     title: "Legal Procedures Guide",
//     description: "Step-by-step walkthrough of common judicial processes",
//     icon: <FiFileText className="text-green-500" />,
//     gradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
//     highlights: [
//       "Filing FIRs and complaints",
//       "Court case journey explained",
//       "Alternative dispute resolution",
//       "Documentation requirements"
//     ]
//   },
//   {
//     id: "digital-rights",
//     title: "Digital & Cyber Laws",
//     description: "Understanding your rights and obligations in digital spaces",
//     icon: <FiSmartphone className="text-indigo-500" />,
//     gradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
//     highlights: [
//       "Social media legal boundaries",
//       "Online financial fraud protection",
//       "Data privacy rights",
//       "Cyberbullying and harassment laws"
//     ]
//   },
//   {
//     id: "family-law",
//     title: "Family & Personal Laws",
//     description: "Legal framework governing relationships and personal matters",
//     icon: <FiUsers className="text-pink-500" />,
//     gradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
//     highlights: [
//       "Marriage registration process",
//       "Child custody guidelines",
//       "Inheritance and succession",
//       "Domestic violence protections"
//     ]
//   },
//   {
//     id: "property-law",
//     title: "Property & Real Estate",
//     description: "Legal aspects of property ownership and transactions",
//     icon: <FiHome className="text-amber-500" />,
//     gradient: "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
//     highlights: [
//       "Title verification process",
//       "Rental agreement clauses",
//       "Property tax obligations",
//       "Land dispute resolution"
//     ]
//   },
//   {
//     id: "employment-law",
//     title: "Employment & Workplace",
//     description: "Rights and regulations in professional environments",
//     icon: <FiBriefcase className="text-teal-500" />,
//     gradient: "from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20",
//     highlights: [
//       "Employee rights and benefits",
//       "Sexual harassment at workplace",
//       "Termination and severance",
//       "Grievance redressal mechanisms"
//     ]
//   },
//   {
//     id: "financial-law",
//     title: "Financial Regulations",
//     description: "Legal framework for banking and financial transactions",
//     icon: <FiDollarSign className="text-lime-500" />,
//     gradient: "from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20",
//     highlights: [
//       "Loan and credit card rights",
//       "Cheque bounce procedures",
//       "Investment fraud protection",
//       "Taxation laws and compliance"
//     ]
//   },
//   {
//     id: "legal-glossary",
//     title: "Legal Glossary (A-Z)",
//     description: "Comprehensive dictionary of legal terms and definitions",
//     icon: <FiList className="text-indigo-500" />,
//     gradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
//     highlights: [
//       "Affidavit: A written statement confirmed by oath or affirmation (BSA Section 57)",
//       "Bail: Temporary release of an accused person awaiting trial (BNSS Section 479)",
//       "Cognizable Offense: Serious crime where police can arrest without warrant (BNSS Section 173)",
//       "Decree: Final order of a court in civil cases (CPC Section 2(2))",
//     ]
//     },
//   {
//     id: "myth-busters",
//     title: "Legal Myth Busters",
//     description: "Debunking common misconceptions about Indian laws",
//     icon: <FiAlertTriangle className="text-yellow-500" />,
//     gradient: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
//     highlights: [
//       "Police arrest procedures",
//       "Tenant-landlord myths",
//       "Traffic violation truths",
//       "Consumer rights realities"
//     ]
//   },
//   {
//     id: "glossary",
//     title: "Legal Terminology",
//     description: "Comprehensive dictionary of legal terms and phrases",
//     icon: <FiList className="text-gray-500" />,
//     gradient: "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
//     highlights: [
//       "BNS/BNSS/BSA definitions",
//       "Court procedure terms",
//       "Contract law vocabulary",
//       "Latin legal phrases explained"
//     ]
//   },
//   {
//     id: "templates",
//     title: "Legal Documents",
//     description: "Ready-to-use templates for common legal needs",
//     icon: <FiFileText className="text-violet-500" />,
//     gradient: "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
//     highlights: [
//       "RTI application formats",
//       "Legal notice templates",
//       "Affidavit samples",
//       "Consumer complaint letters"
//     ]
//   }
// ];

// export default function EducationList() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {educationSections.map((section) => (
//         <motion.div
//           key={section.id}
//           whileHover={{ y: -5 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <Link
//             href={`/education?id=${section.id}`}
//             className={`block bg-gradient-to-br ${section.gradient} border border-gray-200 dark:border-gray-700 rounded-2xl p-6 h-full transition-all hover:shadow-lg hover:border-transparent`}
//           >
//             <div className="flex items-start gap-4">
//               <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
//                 {section.icon}
//               </div>
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                   {section.title}
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-300 mb-3">
//                   {section.description}
//                 </p>
//                 <ul className="space-y-1 mb-4">
//                   {section.highlights.map((highlight, i) => (
//                     <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
//                       <span className="text-blue-500 mr-2 mt-0.5">•</span>
//                       {highlight}
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group">
//                   Explore full section
//                   <FiArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </motion.div>
//       ))}
//     </div>
//   );
// }





// components/insights/EducationList.tsx
"use client";

import Link from "next/link";
import { 
  FiBook, FiShield, FiFileText, FiList, FiZap,
  FiArrowRight, FiVideo, FiAward, FiBriefcase,
  FiCalendar, FiUser, FiHome, FiLayers,
  FiShoppingBag, FiSmartphone, FiUsers,
  FiDollarSign, FiAlertTriangle
} from "react-icons/fi";
import { motion } from "framer-motion";

const educationSections = [
  {
    id: "know-your-rights",
    title: "Know Your Rights",
    icon: <FiShield className="text-white" />,
    bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
    hoverEffect: "hover:shadow-blue-500/20"
  },
  {
    id: "everyday-law",
    title: "Everyday Law",
    icon: <FiShoppingBag className="text-white" />,
    bgColor: "bg-gradient-to-br from-purple-500 to-fuchsia-500",
    hoverEffect: "hover:shadow-purple-500/20"
  },
  {
    id: "new-criminal-laws",
    title: "New Criminal Laws",
    icon: <FiBook className="text-white" />,
    bgColor: "bg-gradient-to-br from-red-500 to-orange-500",
    hoverEffect: "hover:shadow-red-500/20"
  },
  {
    id: "legal-processes",
    title: "Legal Procedures",
    icon: <FiFileText className="text-white" />,
    bgColor: "bg-gradient-to-br from-green-500 to-emerald-500",
    hoverEffect: "hover:shadow-green-500/20"
  }
];

const videoLearning = [
  {
    id: "constitutional-law",
    title: "Constitutional Law",
    icon: <FiVideo className="text-white" />,
    bgColor: "bg-gradient-to-br from-teal-500 to-green-500",
    hoverEffect: "hover:shadow-teal-500/20"
  },
  {
    id: "criminal-procedure",
    title: "Criminal Procedure",
    icon: <FiVideo className="text-white" />,
    bgColor: "bg-gradient-to-br from-indigo-500 to-blue-500",
    hoverEffect: "hover:shadow-indigo-500/20"
  },
  {
    id: "contract-law",
    title: "Contract Law",
    icon: <FiVideo className="text-white" />,
    bgColor: "bg-gradient-to-br from-amber-500 to-yellow-500",
    hoverEffect: "hover:shadow-amber-500/20"
  }
];

const lawExams = [
  {
    id: "clat-llb",
    title: "CLAT & NLU",
    icon: <FiAward className="text-white" />,
    bgColor: "bg-gradient-to-br from-pink-500 to-rose-500",
    hoverEffect: "hover:shadow-pink-500/20"
  },
  {
    id: "nalsa-exams",
    title: "NALSA Exams",
    icon: <FiAward className="text-white" />,
    bgColor: "bg-gradient-to-br from-violet-500 to-purple-500",
    hoverEffect: "hover:shadow-violet-500/20"
  },
  {
    id: "lawcet",
    title: "LAWCET",
    icon: <FiAward className="text-white" />,
    bgColor: "bg-gradient-to-br from-sky-500 to-cyan-500",
    hoverEffect: "hover:shadow-sky-500/20"
  },
  {
    id: "aibe",
    title: "AIBE",
    icon: <FiAward className="text-white" />,
    bgColor: "bg-gradient-to-br from-lime-500 to-green-500",
    hoverEffect: "hover:shadow-lime-500/20"
  },
  {
    id: "judiciary-exams",
    title: "Judiciary",
    icon: <FiAward className="text-white" />,
    bgColor: "bg-gradient-to-br from-amber-500 to-orange-500",
    hoverEffect: "hover:shadow-amber-500/20"
  }
];

const enrollmentProcesses = [
  {
    id: "bar-council",
    title: "Bar Council",
    icon: <FiBriefcase className="text-white" />,
    bgColor: "bg-gradient-to-br from-blue-600 to-indigo-600",
    hoverEffect: "hover:shadow-blue-600/20"
  },
  {
    id: "court-exams",
    title: "Court Exams",
    icon: <FiUser className="text-white" />,
    bgColor: "bg-gradient-to-br from-purple-600 to-fuchsia-600",
    hoverEffect: "hover:shadow-purple-600/20",
    subItems: ["Supreme Court", "High Court", "District Courts"]
  },
  {
    id: "important-dates",
    title: "Important Dates",
    icon: <FiCalendar className="text-white" />,
    bgColor: "bg-gradient-to-br from-emerald-600 to-teal-600",
    hoverEffect: "hover:shadow-emerald-600/20"
  }
];

export default function EducationList() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Legal Education Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your comprehensive guide to Indian law, exams, and legal processes
        </p>
      </div>

      {/* Main Legal Education Sections */}
      <SectionBlock 
        title="Legal Education" 
        icon={<FiBook className="text-blue-500" size={28} />}
        items={educationSections}
        basePath="/education"
        cols="2xl:grid-cols-4"
      />

      {/* Video Learning Section */}
      <SectionBlock 
        title="Video Learning" 
        icon={<FiVideo className="text-green-500" size={28} />}
        description="Interactive video courses on key legal topics"
        items={videoLearning}
        basePath="/education/videos"
        cols="2xl:grid-cols-3"
      />

      {/* Law Exams Section */}
      <SectionBlock 
        title="Law Exams" 
        icon={<FiAward className="text-yellow-500" size={28} />}
        description="Latest updates and preparation resources"
        items={lawExams}
        basePath="/education/exams"
        cols="2xl:grid-cols-5"
      />

      {/* Enrollment Section */}
      <SectionBlock 
        title="Enrollment & Courts" 
        icon={<FiBriefcase className="text-teal-500" size={28} />}
        description="Practice enrollment and court exam processes"
        items={enrollmentProcesses}
        basePath="/education/enrollment"
        cols="2xl:grid-cols-3"
        isLastSection={true}
      />
    </div>
  );
}

// Reusable Section Block Component
const SectionBlock = ({ title, icon, description, items, basePath, cols, isLastSection = false }) => (
  <section className={`mb-16 ${isLastSection ? '' : 'pb-8 border-b border-gray-200 dark:border-gray-800'}`}>
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-md">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
      </div>
    </div>
    
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${cols} gap-6`}>
      {items.map((item) => (
        <ModernCard 
          key={item.id}
          item={item}
          href={`${basePath}?id=${item.id}`}
        />
      ))}
    </div>
  </section>
);

// Modern Card Component with 2025 design elements
const ModernCard = ({ item, href }) => (
  <motion.div
    whileHover={{ y: -8 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
  >
    <Link href={href}>
      <div className={`relative h-full rounded-2xl ${item.bgColor} p-6 shadow-lg ${item.hoverEffect} hover:shadow-xl transition-all duration-300 overflow-hidden group`}>
        {/* Floating icon background */}
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10"></div>
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              {item.icon}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          
          {item.subItems && (
            <ul className="mt-2 space-y-1">
              {item.subItems.map((subItem, i) => (
                <li key={i} className="text-white/80 text-sm flex items-center">
                  <span className="w-2 h-2 rounded-full bg-white/80 mr-2"></span>
                  {subItem}
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-auto pt-4 flex items-center text-white/90 group-hover:text-white transition-colors">
            <span className="mr-2">Explore</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
        
        {/* Hover effect elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-white/30 animate-pulse"></div>
        </div>
      </div>
    </Link>
  </motion.div>
);









// // components/insights/EducationList.tsx
// "use client";

// import Link from "next/link";
// import { 
//   FiBook, 
//   FiShield, 
//   FiFileText, 
//   FiList, 
//   FiZap,
//   FiArrowRight,
//   FiVideo,
//   FiAward,
//   FiBriefcase,
//   FiCalendar,
//   FiUser,
//   FiHome,
//   FiLayers,
//   FiShoppingBag,
//   FiSmartphone,
//   FiUsers,
//   FiDollarSign,
//   FiAlertTriangle
// } from "react-icons/fi";
// import { motion } from "framer-motion";

// const educationSections = [
//   {
//     id: "know-your-rights",
//     title: "Know Your Rights",
//     description: "Comprehensive guide to constitutional and legal protections in India",
//     icon: <FiShield className="text-blue-500" />,
//     gradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
//     highlights: [
//       "<strong>Arrest procedures under BNSS</strong>",
//       "Right to Information Act",
//       "Gender rights and protections",
//       "Consumer and worker rights"
//     ]
//   },
//   {
//     id: "everyday-law",
//     title: "Everyday Legal Matters",
//     description: "Essential legal knowledge for common situations affecting citizens",
//     icon: <FiShoppingBag className="text-purple-500" />,
//     gradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
//     highlights: [
//       "Property buying/selling contracts",
//       "Consumer complaint procedures",
//       "Marriage and divorce laws",
//       "Neighbor and property disputes"
//     ]
//   },
//   {
//     id: "new-criminal-laws",
//     title: "BNS, BNSS & BSA (2023)",
//     description: "Complete analysis of India's reformed criminal justice system",
//     icon: <FiBook className="text-red-500" />,
//     gradient: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20",
//     highlights: [
//       "Comparison with old IPC/CrPC",
//       "Key changes in criminal procedures",
//       "Digital evidence rules under BSA",
//       "New offenses and penalties"
//     ]
//   },
//   {
//     id: "legal-processes",
//     title: "Legal Procedures Guide",
//     description: "Step-by-step walkthrough of common judicial processes",
//     icon: <FiFileText className="text-green-500" />,
//     gradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
//     highlights: [
//       "Filing FIRs and complaints",
//       "Court case journey explained",
//       "Alternative dispute resolution",
//       "Documentation requirements"
//     ]
//   },
//   {
//     id: "digital-rights",
//     title: "Digital & Cyber Laws",
//     description: "Understanding your rights and obligations in digital spaces",
//     icon: <FiSmartphone className="text-indigo-500" />,
//     gradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
//     highlights: [
//       "Social media legal boundaries",
//       "Online financial fraud protection",
//       "Data privacy rights",
//       "Cyberbullying and harassment laws"
//     ]
//   },
//   {
//     id: "family-law",
//     title: "Family & Personal Laws",
//     description: "Legal framework governing relationships and personal matters",
//     icon: <FiUsers className="text-pink-500" />,
//     gradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
//     highlights: [
//       "Marriage registration process",
//       "Child custody guidelines",
//       "Inheritance and succession",
//       "Domestic violence protections"
//     ]
//   },
//   {
//     id: "property-law",
//     title: "Property & Real Estate",
//     description: "Legal aspects of property ownership and transactions",
//     icon: <FiHome className="text-amber-500" />,
//     gradient: "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
//     highlights: [
//       "Title verification process",
//       "Rental agreement clauses",
//       "Property tax obligations",
//       "Land dispute resolution"
//     ]
//   },
//   {
//     id: "employment-law",
//     title: "Employment & Workplace",
//     description: "Rights and regulations in professional environments",
//     icon: <FiBriefcase className="text-teal-500" />,
//     gradient: "from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20",
//     highlights: [
//       "Employee rights and benefits",
//       "Sexual harassment at workplace",
//       "Termination and severance",
//       "Grievance redressal mechanisms"
//     ]
//   },
//   {
//     id: "financial-law",
//     title: "Financial Regulations",
//     description: "Legal framework for banking and financial transactions",
//     icon: <FiDollarSign className="text-lime-500" />,
//     gradient: "from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20",
//     highlights: [
//       "Loan and credit card rights",
//       "Cheque bounce procedures",
//       "Investment fraud protection",
//       "Taxation laws and compliance"
//     ]
//   },
//   {
//     id: "legal-glossary",
//     title: "Legal Glossary (A-Z)",
//     description: "Comprehensive dictionary of legal terms and definitions",
//     icon: <FiList className="text-indigo-500" />,
//     gradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
//     highlights: [
//       "Affidavit: A written statement confirmed by oath or affirmation (BSA Section 57)",
//       "Bail: Temporary release of an accused person awaiting trial (BNSS Section 479)",
//       "Cognizable Offense: Serious crime where police can arrest without warrant (BNSS Section 173)",
//       "Decree: Final order of a court in civil cases (CPC Section 2(2))",
//     ]
//     },
//   {
//     id: "myth-busters",
//     title: "Legal Myth Busters",
//     description: "Debunking common misconceptions about Indian laws",
//     icon: <FiAlertTriangle className="text-yellow-500" />,
//     gradient: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
//     highlights: [
//       "Police arrest procedures",
//       "Tenant-landlord myths",
//       "Traffic violation truths",
//       "Consumer rights realities"
//     ]
//   },
//   {
//     id: "glossary",
//     title: "Legal Terminology",
//     description: "Comprehensive dictionary of legal terms and phrases",
//     icon: <FiList className="text-gray-500" />,
//     gradient: "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
//     highlights: [
//       "BNS/BNSS/BSA definitions",
//       "Court procedure terms",
//       "Contract law vocabulary",
//       "Latin legal phrases explained"
//     ]
//   },
//   {
//     id: "templates",
//     title: "Legal Documents",
//     description: "Ready-to-use templates for common legal needs",
//     icon: <FiFileText className="text-violet-500" />,
//     gradient: "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
//     highlights: [
//       "RTI application formats",
//       "Legal notice templates",
//       "Affidavit samples",
//       "Consumer complaint letters"
//     ]
//   }
// ];


// const videoLearning = [
//   {
//     id: "constitutional-law",
//     title: "Constitutional Law",
//     icon: <FiVideo className="text-green-500" />,
//   },
//   {
//     id: "criminal-procedure",
//     title: "Criminal Procedure",
//     icon: <FiVideo className="text-green-500" />,
//   },
//   {
//     id: "contract-law",
//     title: "Contract Law",
//     icon: <FiVideo className="text-green-500" />,
//   },

// ];

// const lawExams = [
//   {
//     id: "clat-llb",
//     title: "CLAT & NLU Entrance",
//     icon: <FiAward className="text-yellow-500" />,
//   },
//   {
//     id: "nalsa-exams",
//     title: "NALSA Exams",
//     icon: <FiAward className="text-yellow-500" />,
//   },
//   {
//     id: "lawcet",
//     title: "Telangana LAWCET",
//     icon: <FiAward className="text-yellow-500" />,
//   },
//   {
//     id: "aibe",
//     title: "AIBE Exam",
//     icon: <FiAward className="text-yellow-500" />,
//   },
//   {
//     id: "judiciary-exams",
//     title: "Judiciary Exams",
//     icon: <FiAward className="text-yellow-500" />,
//   }
// ];

// const enrollmentProcesses = [
//   {
//     id: "bar-council",
//     title: "Bar Council Enrollment",
//     icon: <FiBriefcase className="text-teal-500" />,
//   },
//   {
//     id: "court-exams",
//     title: "Court Exams",
//     icon: <FiUser className="text-teal-500" />,
//     subItems: [
//       "Supreme Court",
//       "Telangana High Court",
//       "District Courts"
//     ]
//   },
//   {
//     id: "important-dates",
//     title: "Important Dates",
//     icon: <FiCalendar className="text-teal-500" />,
//   }
// ];

// export default function EducationList() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Main Legal Education Sections */}
//       <SectionHeader 
//         title="Legal Education" 
//         icon={<FiBook className="text-blue-500" />}
//       />
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         {educationSections.map((section) => (
//           <SectionCard 
//             key={section.id} 
//             section={section} 
//             href={`/education?id=${section.id}`}
//           />
//         ))}
//       </div>

//       {/* Video Learning Section */}
//       <SectionHeader 
//         title="Video Learning" 
//         icon={<FiVideo className="text-green-500" />}
//         description="Comprehensive video courses on key legal topics"
//       />
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
//         {videoLearning.map((section) => (
//           <SectionCard 
//             key={section.id} 
//             section={section}
//             href={`/education/videos?id=${section.id}`}
//           />
//         ))}
//       </div>

//       {/* Law Exams Section */}
//       <SectionHeader 
//         title="Law Exams & Notifications" 
//         icon={<FiAward className="text-yellow-500" />}
//         description="Latest updates and preparation guides for all law entrance exams"
//       />
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
//         {lawExams.map((section) => (
//           <SectionCard 
//             key={section.id} 
//             section={section}
//             href={`/education/exams?id=${section.id}`}
//           />
//         ))}
//       </div>

//       {/* Enrollment & Court Exams Section */}
//       <SectionHeader 
//         title="Enrollment & Court Exams" 
//         icon={<FiBriefcase className="text-teal-500" />}
//         description="Processes and notifications for legal practice enrollment"
//       />
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         {enrollmentProcesses.map((section) => (
//           <motion.div
//             key={section.id}
//             whileHover={{ y: -5 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <Link
//               href={`/education/enrollment?id=${section.id}`}
//               className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-full transition-all hover:shadow-lg hover:border-blue-500"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500">
//                   {section.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {section.title}
//                 </h3>
//               </div>
//               {section.subItems && (
//                 <ul className="space-y-2 pl-2">
//                   {section.subItems.map((item, i) => (
//                     <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
//                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
//                 Explore <FiArrowRight className="ml-1 w-4 h-4" />
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Reusable Section Header Component
// const SectionHeader = ({ title, icon, description }: { title: string, icon: React.ReactNode, description?: string }) => (
//   <div className="mb-6 flex items-center gap-4">
//     <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
//       {icon}
//     </div>
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
//       {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
//     </div>
//   </div>
// );

// // Reusable Section Card Component
// const SectionCard = ({ section, href }: { section: any, href: string }) => (
//   <motion.div
//     whileHover={{ y: -5 }}
//     transition={{ type: "spring", stiffness: 300 }}
//   >
//     <Link
//       href={href}
//       className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-full transition-all hover:shadow-lg hover:border-blue-500"
//     >
//       <div className="flex items-center gap-4">
//         <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
//           {section.icon}
//         </div>
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           {section.title}
//         </h3>
//       </div>
//       <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
//         Explore <FiArrowRight className="ml-1 w-4 h-4" />
//       </div>
//     </Link>
//   </motion.div>
// );