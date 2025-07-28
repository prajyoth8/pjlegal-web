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
    id: "know-your-rights",
    title: "Know Your Rights",
    description: "Understand your fundamental legal protections in various situations",
    icon: <FiFileText className="text-blue-500" />,
    items: [
      {
        topic: "Rights During Arrest",
        subtopics: [
          {
            title: "Right to remain silent",
            description: "You cannot be forced to testify against yourself. Simply state 'I choose to remain silent'.",
            icon: <FiInfo className="text-purple-500" />
          },
          {
            title: "Right to legal aid and representation",
            description: "Free legal aid is available through the National Legal Services Authority if you cannot afford a lawyer."
          },
          {
            title: "Right to be medically examined",
            description: "You can request medical examination within 48 hours of arrest to document any injuries or health conditions."
          }
        ],
        relatedLaws: ["Article 22 of Constitution", "Section 50 CrPC", "Section 54 CrPC"],
        quickTips: ["Always ask for arrest memo", "Inform family immediately", "Note arresting officer details"]
      },
      {
        topic: "Right to Information",
        subtopics: [
          {
            title: "How to file an RTI",
            description: "Submit a simple application in writing or online with ₹10 fee to the Public Information Officer."
          },
          {
            title: "RTI process and timeline",
            description: "Response must come within 30 days (48 hours for life/liberty cases). First appeal available if unsatisfied."
          }
        ],
        quickTips: ["No reason needed for RTI", "Use RTI online portal for convenience", "Keep application concise"]
      },
      {
        topic: "Rights of Tenants",
        subtopics: [
          {
            title: "Eviction rules",
            description: "Landlord must give 15-30 days notice and obtain court order except in exceptional circumstances."
          },
          {
            title: "Security deposit norms",
            description: "Typically 1-2 months rent. Must be refunded within 15 days of vacating with deductions itemized."
          }
        ],
        relatedLaws: ["Rent Control Act (state specific)", "Model Tenancy Act 2021"]
      }
    ]
  },
  {
    id: "legal-process",
    title: "Legal Process Explained",
    description: "Step-by-step guides through common legal procedures",
    icon: <FiInfo className="text-green-500" />,
    items: [
      {
        topic: "Filing an FIR",
        explanation: "FIR (First Information Report) is your first step to initiate criminal proceedings. You can file at any police station (Zero FIR concept allows filing at any location which must then be transferred to proper jurisdiction). The police cannot refuse to register an FIR for cognizable offenses.",
        relatedLaws: ["Section 154 CrPC"],
        quickTips: [
          "Get FIR copy immediately",
          "Note FIR number and officer details",
          "Follow up if investigation stalls"
        ]
      },
      {
        topic: "Bail Process",
        explanation: "Bail allows temporary release during trial. Types include:\n- Regular Bail: After arrest\n- Anticipatory Bail: Before possible arrest\n- Interim Bail: Temporary relief\nBail amount varies by offense and is refundable after case completion.",
        relatedLaws: ["Sections 436-450 CrPC"],
        quickTips: [
          "Bail is rule, jail is exception",
          "Prepare sureties in advance",
          "Document all compliance"
        ]
      }
    ]
  },
  {
    id: "myth-busters",
    title: "Legal Myth Busters",
    description: "Separating fact from fiction in common legal beliefs",
    icon: <FiAlertTriangle className="text-yellow-500" />,
    items: [
      {
        topic: "Police can't refuse to register FIR for cognizable offenses",
        truth: true,
        explanation: "For cognizable offenses (serious crimes where police can arrest without warrant), station house officers are legally obligated to register FIR immediately. Refusal is punishable under Section 166A IPC.",
        relatedLaws: ["Section 154 CrPC", "Section 166A IPC"]
      },
      {
        topic: "Legal notice must be sent by a lawyer",
        truth: false,
        explanation: "While lawyers typically draft notices for precision, any individual can send a legal notice. The key requirements are proper format, clear demands, and sending via registered post.",
        quickTips: [
          "Keep acknowledgment receipt",
          "Allow 15-30 days for response",
          "Follow up if no reply"
        ]
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