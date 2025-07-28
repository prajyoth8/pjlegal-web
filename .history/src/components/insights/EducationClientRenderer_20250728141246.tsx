import React from "react";

const educationSections: {
  id: string;
  title: string;
  items: {
    topic: string;
    subtopics?: string[];
    explanation?: string;
    useCase?: string;
    truth?: boolean;
  }[];
}[] = [
  {
    id: "know-your-rights",
    title: "Know Your Rights",
    items: [
      {
        topic: "Rights During Arrest",
        subtopics: [
          "Right to remain silent",
          "Right to legal aid and representation",
          "Right to be medically examined",
        ],
      },
      {
        topic: "Right to Information",
        subtopics: ["How to file an RTI", "RTI process and timeline"],
      },
      {
        topic: "Rights of Tenants",
        subtopics: ["Eviction rules", "Security deposit norms", "Notice period rules"],
      },
      {
        topic: "Rights in Police Encounters",
        subtopics: ["FIR & Zero FIR", "Illegal detention safeguards"],
      },
      {
        topic: "Women’s Rights",
        subtopics: ["Domestic violence laws", "Workplace safety", "POSH Act"],
      },
      {
        topic: "Children’s Rights",
        subtopics: ["Right to free education", "Protection under POCSO"],
      },
      {
        topic: "LGBTQ+ Rights",
        subtopics: ["Legal status post-Supreme Court verdict", "Anti-discrimination protections"],
      },
    ],
  },
  {
    id: "everyday-law",
    title: "Everyday Law in India",
    items: [
      {
        topic: "Consumer Rights",
        subtopics: ["Warranty", "Return policies", "Consumer court process"],
      },
      {
        topic: "Property Law Basics",
        subtopics: ["Mutation", "Sale deed", "Gift deed essentials"],
      },
      {
        topic: "Cyber Law Awareness",
        subtopics: ["Online fraud reporting", "IT Act provisions", "Social media misuse"],
      },
      {
        topic: "Marriage & Divorce",
        subtopics: ["Marriage registration", "Mutual consent divorce", "Alimony basics"],
      },
      {
        topic: "Employment Rights",
        subtopics: ["Minimum wages", "EPF & ESI", "Wrongful termination"],
      },
    ],
  },
  {
    id: "legal-process",
    title: "Legal Process Explained Simply",
    items: [
      {
        topic: "Filing an FIR",
        explanation: "FIR (First Information Report) can be filed at any police station. Zero FIR allows filing at any location and transfer later.",
      },
      {
        topic: "Court Hierarchy",
        explanation: "Starts at District Court, escalates to High Court, and then Supreme Court.",
      },
      {
        topic: "Bail Process",
        explanation: "Bail allows temporary release. Types include regular, anticipatory, and interim.",
      },
      {
        topic: "Civil vs Criminal Law",
        explanation: "Civil: Disputes between individuals. Criminal: Offenses against society.",
      },
      {
        topic: "How a Case Moves in Court",
        explanation: "Filing → Notice → Hearing → Evidence → Arguments → Judgment → Appeal (if any).",
      },
    ],
  },
  {
    id: "templates",
    title: "Ready Templates & Samples",
    items: [
      {
        topic: "RTI Application",
        useCase: "To seek information from government departments.",
      },
      {
        topic: "Legal Notice (General)",
        useCase: "Used in civil disputes like property, payment default.",
      },
      {
        topic: "Affidavit (General Purpose)",
        useCase: "For declarations like name/address proof.",
      },
      {
        topic: "Complaint Format",
        useCase: "To report an issue to relevant authorities.",
      },
      {
        topic: "Cheque Bounce Notice",
        useCase: "Issued under Section 138 of the NI Act.",
      },
    ],
  },
  {
    id: "glossary",
    title: "Legal Glossary",
    items: [
      { topic: "FIR", explanation: "First Information Report – to report a cognizable offense." },
      { topic: "Bail", explanation: "Temporary release granted before or after arrest." },
      { topic: "Cognizable Offence", explanation: "Police can arrest without prior court approval." },
      { topic: "Injunction", explanation: "A court order preventing specific actions." },
      { topic: "PIL", explanation: "Public Interest Litigation filed for the public good." },
    ],
  },
  {
    id: "myth-busters",
    title: "Quick Facts / Myth Busters",
    items: [
      {
        topic: "Police can’t refuse to register FIR",
        truth: true,
      },
      {
        topic: "You must hire a lawyer for RTI",
        truth: false,
      },
      {
        topic: "Divorce is instant in India",
        truth: false,
      },
      {
        topic: "Only men can be arrested without warrant",
        truth: false,
      },
      {
        topic: "Legal notice must be sent by a lawyer",
        truth: false,
      },
    ],
  },
];

export default function EducationClientRenderer({ id }: { id: string }) {
  const section = educationSections.find((s) => s.id === id);

  if (!section) return <div>Topic not found.</div>;

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">{section.title}</h2>

      {section.items.map((item, index) => (
        <div key={index} className="mb-6">
          <h4 className="font-bold text-lg text-blue-700 dark:text-blue-400">
            {item.topic}
          </h4>

          {item.subtopics && (
            <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-800 dark:text-gray-300">
              {item.subtopics.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
          )}

          {item.explanation && (
            <p className="mt-2 text-gray-700 dark:text-gray-300">{item.explanation}</p>
          )}

          {item.useCase && (
            <p className="mt-2 italic text-sm text-gray-500 dark:text-gray-400">
              Use Case: {item.useCase}
            </p>
          )}

          {item.truth !== undefined && (
            <p className="mt-2 text-gray-800 dark:text-gray-300">
              <strong className="text-red-600">Myth:</strong> {item.topic}
              <br />
              <strong className="text-green-600">Truth:</strong> {item.truth ? "✅ True" : "❌ False"}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
