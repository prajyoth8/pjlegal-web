// components/insights/EducationClientRenderer.tsx
"use client";

import React, { useState } from "react";
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiExternalLink, 
  FiFileText, 
  FiInfo, 
  FiAlertTriangle, 
  FiCheck, 
  FiX,
  FiBook,
  FiShield,
  FiUser,
  FiShoppingBag,
  FiHome,
  FiGlobe,
  FiHeart,
  FiUsers
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Custom icon components
const ComparisonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <path d="M8 3v18m8-18v18M3 8h4m10 0h4M3 16h4m10 0h4"/>
  </svg>
);

const educationSections = [
  {
    id: "know-your-rights",
    title: "Know Your Rights",
    description: "Understand your fundamental legal protections",
    icon: <FiShield className="text-blue-500" />,
    items: [
      {
        topic: "Rights During Arrest (BNSS Sec. 35)",
        explanation: "Under the new BNSS:\n1. Police must inform arrest grounds in writing\n2. Notify family/lawyer digitally within 2 hrs\n3. Medical examination within 48 hrs\n4. Custody beyond 24 hrs needs magistrate approval",
        comparison: [
          {
            title: "Arrest Memo",
            old: "CrPC Section 50 (Basic rights)",
            new: "BNSS Section 35 (Digital documentation)",
            analysis: "Real-time tracking of arrests now mandatory"
          }
        ],
        quickTips: [
          "Always ask for arrest memo copy",
          "Note officer details and timestamp",
          "Invoke right to legal aid immediately"
        ]
      },
      {
        topic: "Right to Information",
        subtopics: [
          {
            title: "How to file an RTI",
            description: "Submit application with ₹10 fee to Public Information Officer",
            icon: <FiFileText />
          },
          {
            title: "RTI Process Timeline",
            description: "Response within 30 days (48 hrs for life/liberty cases)"
          }
        ]
      },
      {
        topic: "Women's Rights (BNS Sec. 69-72)",
        explanation: "New provisions under BNS:\n- Gender-neutral rape laws\n- Stricter punishment for gang rape\n- Marital rape punishable in certain cases\n- Voyeurism includes digital means",
        relatedLaws: ["Section 69 BNS", "Section 70 BNS", "Section 354D IPC (old)"]
      }
    ]
  },
  {
    id: "everyday-law",
    title: "Everyday Law in India",
    description: "Common legal scenarios in daily life",
    icon: <FiShoppingBag className="text-purple-500" />,
    items: [
      {
        topic: "Consumer Rights",
        subtopics: [
          {
            title: "E-commerce Returns",
            description: "30-day return window mandatory for defective goods"
          },
          {
            title: "Service Deficiencies",
            description: "Can approach District Consumer Forum for claims < ₹50 lakh"
          }
        ]
      },
      {
        topic: "Property Transactions (BSA Impact)",
        explanation: "Under new BSA:\n1. Electronic sale deeds valid\n2. Digital signatures legally binding\n3. Video recording of transactions admissible",
        relatedLaws: ["BSA Section 61", "Registration Act"]
      }
    ]
  },
  {
    id: "new-criminal-laws",
    title: "BNS, BNSS & BSA (2023)",
    description: "India's reformed criminal justice system",
    icon: <FiBook className="text-red-500" />,
    items: [
      {
        topic: "Key Changes Overview",
        comparison: [
          {
            title: "Sedition Law",
            old: "IPC Section 124A",
            new: "BNS Section 152",
            analysis: "Narrower definition with safeguards"
          },
          {
            title: "FIR Registration",
            old: "CrPC Section 154",
            new: "BNSS Section 173",
            analysis: "Nationwide Zero FIR mandate"
          }
        ]
      },
      {
        topic: "Digital Evidence (BSA Sec. 61)",
        explanation: "Electronic records now primary evidence without certificate requirement:\n- Emails\n- Server logs\n- CCTV footage\n- Cryptocurrency transactions",
        quickTips: [
          "Preserve original device",
          "Capture metadata",
          "Use hash verification"
        ]
      }
    ]
  },
  {
    id: "legal-process",
    title: "Legal Process Explained",
    description: "Step-by-step guides through procedures",
    icon: <FiFileText className="text-green-500" />,
    items: [
      {
        topic: "Filing an FIR (BNSS Sec. 173)",
        explanation: "New process under BNSS:\n1. Can file at any police station (Zero FIR)\n2. Digital tracking mandatory\n3. Refusal punishable\n4. Status updates every 14 days",
        quickTips: [
          "Get FIR copy immediately",
          "Note diary entry number",
          "Follow up via citizen portal"
        ]
      },
      {
        topic: "Bail Process (BNSS Sec. 479)",
        explanation: "Reformed bail system:\n- 24 hr bail for first-time <3 yr offenses\n- Electronic bail applications\n- Video-conferencing hearings\n- Written rejection reasons required"
      }
    ]
  },
  {
    id: "myth-busters",
    title: "Myth Busters",
    description: "Clarifying legal misconceptions",
    icon: <FiAlertTriangle className="text-yellow-500" />,
    items: [
      {
        topic: "Police can detain without FIR under new laws",
        truth: false,
        explanation: "BNSS Section 173 makes FIR mandatory for cognizable offenses. 'Preliminary Enquiry' allowed only for non-cognizable cases (max 14 days).",
        relatedLaws: ["BNSS Section 173", "BNSS Section 175"]
      },
      {
        topic: "Women can't be arrested at night",
        truth: false,
        explanation: "No such blanket protection. While Section 46(4) CrPC provided safeguards, BNSS Section 35 applies equal procedures with additional protections for all."
      }
    ]
  }
];

const EducationCard = ({ item, isOpen, toggle }: { item: any, isOpen: boolean, toggle: () => void }) => {
  return (
    <motion.div
      initial={false}
      animate={{ 
        backgroundColor: isOpen ? 'rgba(239, 246, 255, 0.5)' : 'rgba(255, 255, 255, 1)',
        borderColor: isOpen ? '#3b82f6' : '#e5e7eb'
      }}
      className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'ring-1 ring-blue-500' : 'hover:shadow-md'} dark:bg-gray-800 dark:border-gray-700`}
    >
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.topic}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-blue-500"
        >
          <FiChevronDown size={24} />
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            {item.explanation && (
              <div className="prose prose-blue dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{item.explanation}</p>
              </div>
            )}
            
            {item.subtopics && (
              <div className="space-y-4 mb-6">
                {item.subtopics.map((sub: any, i: number) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      {sub.icon && <div className="flex-shrink-0 pt-1">{sub.icon}</div>}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{sub.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">{sub.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {item.comparison && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Comparison: Old vs New Law</h4>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg dark:ring-gray-600">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aspect</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Before (IPC/CrPC)</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">After (BNS/BNSS)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                      {item.comparison.map((comp: any, i: number) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">{comp.title}</td>
                          <td className="whitespace-pre-line px-3 py-4 text-sm text-gray-700 dark:text-gray-300">{comp.old}</td>
                          <td className="whitespace-pre-line px-3 py-4 text-sm text-gray-700 dark:text-gray-300">{comp.new}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {item.truth !== undefined && (
              <div className={`p-4 rounded-xl mb-6 ${item.truth ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1 rounded-full ${item.truth ? 'bg-green-100 text-green-600 dark:bg-green-800/30' : 'bg-red-100 text-red-600 dark:bg-red-800/30'}`}>
                    {item.truth ? <FiCheck size={18} /> : <FiX size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Myth: {item.topic}</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line">
                      <span className="font-semibold">Fact:</span> {item.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {item.relatedLaws && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Legal References</h4>
                <div className="flex flex-wrap gap-2">
                  {item.relatedLaws.map((law: string, i: number) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {law}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {item.quickTips && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Practical Tips</h4>
                <ul className="space-y-3">
                  {item.quickTips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1">
                        <div className="p-1 rounded-full bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400">
                          <FiCheck size={14} />
                        </div>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function EducationClientRenderer({ id }: { id: string }) {
  const section = educationSections.find((s) => s.id === id);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  if (!section) return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Section not found</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">The requested legal education section does not exist.</p>
    </div>
  );

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center md:text-left"
      >
        <div className="inline-flex items-center justify-center md:justify-start p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 mb-6">
          {section.icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          {section.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl">
          {section.description}
        </p>
      </motion.header>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-6"
      >
        {section.items.map((item, index) => (
          <EducationCard 
            key={index}
            item={item}
            isOpen={!!openItems[index]}
            toggle={() => toggleItem(index)}
          />
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <FiExternalLink className="text-blue-500" size={28} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Need Legal Help?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Connect with legal experts or download official documents:
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://legalaffairs.gov.in/" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministry of Law
                <FiExternalLink className="ml-2" />
              </a>
              <a 
                href="https://www.indiacode.nic.in/" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                India Code
                <FiExternalLink className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}