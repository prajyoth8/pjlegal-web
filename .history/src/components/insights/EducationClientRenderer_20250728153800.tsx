import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiExternalLink, FiFileText, FiInfo, FiAlertTriangle, FiCheck, FiX } from "react-icons/fi";

const educationSections: {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: {
    topic: string;
    subtopics?: {
      title: string;
      description: string;
      newLaw?: string; // BNS/BNSS/BSA specific
      oldLaw?: string; // Previous IPC/CrPC/Evidence Act
      icon?: React.ReactNode;
    }[];
    explanation?: string;
    useCase?: string;
    truth?: boolean;
    relatedLaws?: string[];
    quickTips?: string[];
  }[];
}[] = [
  {
    id: "new-criminal-laws",
    title: "BNS, BNSS & BSA (2023)",
    description: "Key changes in India's new criminal justice system (effective July 2024)",
    icon: <FiFileText className="text-red-500" />,
    items: [
      {
        topic: "Bharatiya Nyaya Sanhita (BNS)",
        subtopics: [
          {
            title: "Sedition Replaced (Sec. 124 BNS)",
            description: "Now 'Acts endangering sovereignty & integrity' (Sec. 152) with stricter safeguards against misuse",
            newLaw: "Section 152 BNS",
            oldLaw: "Section 124A IPC"
          },
          {
            title: "Mob Lynching (Sec. 103(2))",
            description: "First explicit definition with punishment up to death penalty",
            newLaw: "Section 103(2) BNS"
          },
          {
            title: "Organized Crime (Sec. 111)",
            description: "New chapter addressing mafia-style offenses with enhanced punishments",
            newLaw: "Section 111-120 BNS"
          }
        ],
        quickTips: [
          "BNS has 358 sections vs IPC's 511",
          "20 new offenses added",
          "Community service introduced for petty crimes"
        ]
      },
      {
        topic: "Bharatiya Nagarik Suraksha Sanhita (BNSS)",
        subtopics: [
          {
            title: "Zero FIR Nationwide (Sec. 173)",
            description: "Mandatory acceptance at any police station with digital tracking",
            newLaw: "Section 173 BNSS",
            oldLaw: "Judicial precedent only"
          },
          {
            title: "Forensic Evidence Mandate (Sec. 176)",
            description: "Compulsory forensic team visit for crimes punishable by 7+ years",
            newLaw: "Section 176 BNSS"
          },
          {
            title: "Timely Justice (Sec. 258)",
            description: "Mandatory verdicts within 45 days of trial completion",
            newLaw: "Section 258 BNSS"
          }
        ],
        relatedLaws: ["Section 185 BNSS (Video recording of searches)", "Section 230 BNSS (Electronic summons)"]
      },
      {
        topic: "Bharatiya Sakshya Adhiniyam (BSA)",
        subtopics: [
          {
            title: "Electronic Evidence (Sec. 61)",
            description: "All digital records (emails, server logs, messages) now primary evidence",
            newLaw: "Section 61 BSA",
            oldLaw: "Section 65B Evidence Act"
          },
          {
            title: "Video Conferencing (Sec. 106)",
            description: "Witness testimony via secure video link made admissible",
            newLaw: "Section 106 BSA"
          },
          {
            title: "Documentary Evidence (Sec. 57)",
            description: "Expands definition to include electronic contracts, e-signatures",
            newLaw: "Section 57 BSA"
          }
        ],
        quickTips: [
          "BSA recognizes 32 types of electronic evidence",
          "Hash value verification for digital documents",
          "Presumption of genuineness for official electronic records"
        ]
      }
    ]
  },
  {
    id: "citizen-rights",
    title: "Citizen Rights Under BNSS",
    description: "New procedural safeguards in criminal cases",
    icon: <FiInfo className="text-blue-500" />,
    items: [
      {
        topic: "Arrest Procedures (Sec. 35 BNSS)",
        explanation: "Police must inform about grounds of arrest in writing AND digitally to family/lawyer within 2 hours. Custody beyond 24 hours requires special magistrate approval.",
        relatedLaws: ["Section 35 BNSS (Arrest memo)", "Section 36 BNSS (Medical examination)"]
      },
      {
        topic: "Bail Reforms (Sec. 479 BNSS)",
        explanation: "First-time offenders for crimes with <3 year punishment get bail within 24 hours. Mandatory bail hearing within 14 days for other cases.",
        quickTips: [
          "No arrest needed for offenses punishable by <3 years (Sec. 37 BNSS)",
          "Bail application can be filed electronically",
          "Police must give written reasons for bail rejection"
        ]
      },
      {
        topic: "Victim Rights (Sec. 193 BNSS)",
        subtopics: [
          {
            title: "Victim Compensation Scheme",
            description: "Minimum ₹10,000 interim relief within 30 days for violent crimes",
            newLaw: "Section 193(3) BNSS"
          },
          {
            title: "Right to Updates",
            description: "Investigating officer must update victim every 30 days in writing",
            newLaw: "Section 193(5) BNSS"
          }
        ]
      }
    ]
  },
  {
    id: "evidence-changes",
    title: "BSA Evidence Rules",
    description: "Critical changes in evidence collection & presentation",
    icon: <FiAlertTriangle className="text-purple-500" />,
    items: [
      {
        topic: "Digital Evidence Admissibility",
        explanation: "Under BSA Section 61, electronic records no longer require certificate under Section 65B. Courts can admit: \n- Device clone copies\n - Cloud storage data\n - CCTV footage without affidavit\n - Cryptocurrency transaction logs",
        relatedLaws: ["Section 61 BSA", "Section 63 BSA (Hash verification)", "Section 67 BSA (Presumption of electronic agreements)"]
      },
      {
        topic: "Witness Protection (Sec. 398 BNSS)",
        explanation: "New provisions for:\n- In-camera testimony\n- Voice modulation\n- Remote testimony\n- Expunging identity from records",
        quickTips: [
          "Apply to District Witness Protection Cell",
          "Special measures for vulnerable witnesses",
          "Travel & accommodation reimbursement"
        ]
      }
    ]
  },
  {
    id: "myth-busters",
    title: "New Laws: Myth vs Reality",
    description: "Clarifying misconceptions about BNS/BNSS/BSA",
    icon: <FiAlertTriangle className="text-yellow-500" />,
    items: [
      {
        topic: "Police can detain without FIR under new laws",
        truth: false,
        explanation: "BNSS Section 173 makes FIR mandatory for any cognizable offense. 'Preliminary Enquiry' allowed only for non-cognizable cases (max 14 days).",
        relatedLaws: ["Section 173 BNSS", "Section 175 BNSS (Preliminary Enquiry)"]
      },
      {
        topic: "Death penalty abolished in BNS",
        truth: false,
        explanation: "BNS retains death penalty for 11 offenses including:\n- Gang rape with death (Sec. 70(3))\n- Mob lynching (Sec. 103(2))\n- Terrorism resulting in death (Sec. 113)",
        relatedLaws: ["Section 103 BNS", "Section 113 BNS"]
      }
    ]
  }
];

const EducationCard = ({ item, isOpen, toggle }: { item: any, isOpen: boolean, toggle: () => void }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isOpen ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}>
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.topic}</h3>
        <span className="text-blue-500">
          {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </span>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
          {item.explanation && (
            <div className="prose prose-blue dark:prose-invert max-w-none mb-4">
              <p className="text-gray-700 dark:text-gray-300">{item.explanation}</p>
            </div>
          )}
          
          {item.subtopics && (
            <div className="space-y-4 mb-4">
              {item.subtopics.map((sub: any, i: number) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    {sub.icon && <div className="mt-1">{sub.icon}</div>}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{sub.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{sub.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {item.truth !== undefined && (
            <div className={`p-4 rounded-lg mb-4 ${item.truth ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-1 rounded-full ${item.truth ? 'bg-green-100 text-green-600 dark:bg-green-800/30' : 'bg-red-100 text-red-600 dark:bg-red-800/30'}`}>
                  {item.truth ? <FiCheck size={18} /> : <FiX size={18} />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Myth: {item.topic}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    <span className="font-semibold">Truth:</span> {item.explanation || (item.truth ? "This is correct" : "This is incorrect")}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {item.relatedLaws && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Related Laws</h4>
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
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Quick Tips</h4>
              <ul className="space-y-2">
                {item.quickTips.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">
                      <FiCheck size={14} />
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {item.useCase && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">When to Use</h4>
              <p className="text-gray-700 dark:text-gray-300">{item.useCase}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function EducationClientRenderer({ id }: { id: string }) {
  const section = educationSections.find((s) => s.id === id);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  if (!section) return <div className="p-6 text-center">Topic not found.</div>;

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center justify-center md:justify-start p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
          {section.icon}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{section.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">{section.description}</p>
      </header>
      
      <div className="grid grid-cols-1 gap-6">
        {section.items.map((item, index) => (
          <EducationCard 
            key={index}
            item={item}
            isOpen={!!openItems[index]}
            toggle={() => toggleItem(index)}
          />
        ))}
      </div>
      
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <FiExternalLink size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Need more help?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Connect with legal experts or access additional resources through our partner network.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              Get Legal Assistance
              <FiExternalLink className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}