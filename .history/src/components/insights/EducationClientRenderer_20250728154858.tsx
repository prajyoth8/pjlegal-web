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
  FiScale,
  FiZap
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const educationSections = [
  {
    id: "new-criminal-laws",
    title: "Bharatiya Nyaya Sanhita, Nagarik Suraksha Sanhita & Sakshya Adhiniyam (2023)",
    description: "India's reformed criminal justice system (Effective from July 1, 2024)",
    icon: <FiBook className="text-red-500" />,
    items: [
      {
        topic: "Key Changes Overview",
        comparison: [
          {
            title: "Sedition Law",
            old: "IPC Section 124A (Colonial-era provision)",
            new: "BNS Section 152 (Acts endangering sovereignty)",
            analysis: "Narrower definition with safeguards against misuse"
          },
          {
            title: "FIR Registration",
            old: "CrPC Section 154 (Jurisdictional restrictions)",
            new: "BNSS Section 173 (Nationwide Zero FIR mandate)",
            analysis: "Digital tracking of FIRs across all police stations"
          },
          {
            title: "Electronic Evidence",
            old: "Evidence Act Section 65B (Complex certification)",
            new: "BSA Section 61 (Direct admissibility)",
            analysis: "Hash verification for digital records"
          }
        ]
      },
      {
        topic: "New Offenses Introduced",
        subtopics: [
          {
            title: "Mob Lynching (BNS Sec. 103(2))",
            description: "Explicit definition with death penalty provision",
            oldLaw: "No specific provision in IPC",
            newLaw: "Section 103(2) BNS"
          },
          {
            title: "Organized Crime (BNS Sec. 111-120)",
            description: "New chapter addressing mafia-style offenses",
            oldLaw: "State-specific laws like MCOCA",
            newLaw: "Section 111 BNS"
          },
          {
            title: "Community Service (BNS Sec. 23)",
            description: "Alternative punishment for petty offenses",
            oldLaw: "Not recognized in IPC",
            newLaw: "Section 23 BNS"
          }
        ]
      }
    ]
  },
  {
    id: "citizen-rights",
    title: "Citizen Rights Under BNSS",
    description: "Enhanced protections in the new criminal procedure",
    icon: <FiShield className="text-blue-500" />,
    items: [
      {
        topic: "Arrest Procedures (BNSS Sec. 35)",
        explanation: "Police must:\n1. Inform arrest grounds in writing\n2. Notify family/lawyer digitally within 2 hrs\n3. Get magistrate approval for custody beyond 24 hrs",
        comparison: [
          {
            title: "Arrest Memo",
            old: "CrPC Section 50 (Basic rights)",
            new: "BNSS Section 35 (Digital documentation)",
            analysis: "Real-time tracking of arrests"
          }
        ]
      },
      {
        topic: "Bail Reforms (BNSS Sec. 479)",
        explanation: "1. First-time offenders (<3 yr punishment) get bail in 24 hrs\n2. Mandatory bail hearing within 14 days\n3. Electronic bail applications",
        quickTips: [
          "No arrest needed for <3 yr offenses (BNSS Sec. 37)",
          "Police must give written bail rejection reasons",
          "Video-conferencing for bail hearings"
        ]
      }
    ]
  },
  {
    id: "comparison",
    title: "Old vs New Criminal Laws",
    description: "Section-by-section analysis of IPC/CrPC vs BNS/BNSS",
    icon: <FiScale className="text-green-500" />,
    items: [
      {
        topic: "Major Substantive Changes",
        comparison: [
          {
            title: "Murder",
            old: "IPC Section 302 (Death penalty or life imprisonment)",
            new: "BNS Section 101 (Same but with clearer definitions)",
            analysis: "Adds 'organized crime murder' as aggravated form"
          },
          {
            title: "Rape",
            old: "IPC Section 376 (Gender-specific)",
            new: "BNS Section 69 (Gender-neutral)",
            analysis: "Includes marital rape in certain circumstances"
          }
        ]
      },
      {
        topic: "Procedural Changes",
        comparison: [
          {
            title: "Medical Examination",
            old: "CrPC Section 53 (Limited scope)",
            new: "BNSS Section 176 (Mandatory forensic team)",
            analysis: "For all offenses punishable by 7+ years"
          },
          {
            title: "Trial Duration",
            old: "No strict timeline",
            new: "BNSS Section 258 (45-day verdict mandate)",
            analysis: "Clock starts after trial completion"
          }
        ]
      }
    ]
  },
  {
    id: "myth-busters",
    title: "New Laws: Myth vs Reality",
    description: "Clarifying misconceptions about BNS/BNSS/BSA",
    icon: <FiZap className="text-yellow-500" />,
    items: [
      {
        topic: "Police can detain without FIR under new laws",
        truth: false,
        explanation: "BNSS Section 173 makes FIR mandatory for cognizable offenses. 'Preliminary Enquiry' allowed only for non-cognizable cases (max 14 days).",
        relatedLaws: ["Section 173 BNSS", "Section 175 BNSS"]
      },
      {
        topic: "Death penalty abolished in BNS",
        truth: false,
        explanation: "BNS retains death penalty for 11 offenses including:\n- Gang rape with death (Sec. 70(3))\n- Mob lynching (Sec. 103(2))\n- Terrorism deaths (Sec. 113)",
        relatedLaws: ["Section 103 BNS", "Section 113 BNS"]
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
      className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'ring-1 ring-blue-500' : 'hover:shadow-md'}`}
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
                      <div className="flex-shrink-0 pt-1">
                        <FiInfo className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{sub.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">{sub.description}</p>
                        
                        {(sub.oldLaw || sub.newLaw) && (
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {sub.oldLaw && (
                              <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                                <h5 className="text-xs font-semibold text-amber-800 dark:text-amber-200 mb-1">PREVIOUS LAW</h5>
                                <p className="text-sm text-amber-700 dark:text-amber-300">{sub.oldLaw}</p>
                              </div>
                            )}
                            {sub.newLaw && (
                              <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-200 dark:border-green-800">
                                <h5 className="text-xs font-semibold text-green-800 dark:text-green-200 mb-1">NEW LAW</h5>
                                <p className="text-sm text-green-700 dark:text-green-300">{sub.newLaw}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {item.comparison && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Detailed Comparison</h4>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Provision</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Old Law (IPC/CrPC)</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">New Law (BNS/BNSS)</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Analysis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                      {item.comparison.map((comp: any, i: number) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">{comp.title}</td>
                          <td className="whitespace-pre-line px-3 py-4 text-sm text-gray-700 dark:text-gray-300">{comp.old}</td>
                          <td className="whitespace-pre-line px-3 py-4 text-sm text-gray-700 dark:text-gray-300">{comp.new}</td>
                          <td className="whitespace-pre-line px-3 py-4 text-sm text-gray-700 dark:text-gray-300">{comp.analysis}</td>
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
                      <span className="font-semibold">Truth:</span> {item.explanation || (item.truth ? "This is correct" : "This is incorrect")}
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
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Key Takeaways</h4>
                <ul className="space-y-3">
                  {item.quickTips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1">
                        <div className="p-1 rounded-full bg-blue-100 text-blue-500">
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {section.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl">
          {section.description}
        </p>
        
        {id === "new-criminal-laws" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 rounded-r-lg"
          >
            <p className="text-yellow-700 dark:text-yellow-300">
              <strong>Note:</strong> Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA) replaced IPC, CrPC, and Evidence Act respectively from <strong>July 1, 2024</strong>.
            </p>
          </motion.div>
        )}
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
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Official Resources</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Access full texts of the new laws from government sources:
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://legislative.gov.in/sites/default/files/BNS-Eng.pdf" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                BNS (English PDF)
                <FiExternalLink className="ml-2" />
              </a>
              <a 
                href="https://legislative.gov.in/sites/default/files/BNSS-Eng.pdf" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                BNSS (English PDF)
                <FiExternalLink className="ml-2" />
              </a>
              <a 
                href="https://legislative.gov.in/sites/default/files/BSA-Eng.pdf" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                BSA (English PDF)
                <FiExternalLink className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}