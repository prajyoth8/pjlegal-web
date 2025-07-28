"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  {
    id: "rights",
    title: "🔖 Know Your Rights",
    items: [
      {
        topic: "Rights During Arrest",
        subtopics: ["Right to remain silent", "Right to legal aid", "Medical examination on request"],
      },
      {
        topic: "Right to Information",
        subtopics: ["How to file an RTI", "Appeal process", "Time limits under RTI Act"],
      },
      {
        topic: "Rights of Tenants",
        subtopics: ["Eviction procedures", "Security deposit rules", "Notice period"],
      },
      {
        topic: "Rights in Police Encounters",
        subtopics: ["FIR & Zero FIR", "Illegal detention rights", "Magistrate oversight"],
      },
      {
        topic: "Women’s Rights",
        subtopics: ["Domestic violence protection", "Workplace safety laws", "Maternity benefits"],
      },
      {
        topic: "Children's Rights",
        subtopics: ["POCSO Act protections", "Right to education", "Child labor prohibition"],
      },
      {
        topic: "LGBTQ+ Rights",
        subtopics: ["Supreme Court verdicts", "Anti-discrimination rights", "Adoption & marriage status"],
      },
    ],
  },
  {
    id: "everyday-law",
    title: "📘 Everyday Law in India",
    items: [
      {
        topic: "Consumer Rights",
        subtopics: ["Warranty and returns", "Consumer courts", "Online fraud complaints"],
      },
      {
        topic: "Property Law Basics",
        subtopics: ["Mutation", "Gift Deeds", "Sale Agreement essentials"],
      },
      {
        topic: "Cyber Law Awareness",
        subtopics: ["Online abuse", "Social media misuse", "IT Act & penalties"],
      },
      {
        topic: "Marriage & Divorce",
        subtopics: ["Marriage registration", "Mutual consent divorce", "Alimony basics"],
      },
      {
        topic: "Employment Rights",
        subtopics: ["Minimum wages", "PF & ESI", "Wrongful termination remedies"],
      },
    ],
  },
  {
    id: "legal-process",
    title: "📝 Legal Process Explained Simply",
    items: [
      {
        topic: "Filing an FIR",
        explanation: "An FIR can be filed at any police station. No charges apply.",
      },
      {
        topic: "Court Hierarchy",
        explanation: "District → High Court → Supreme Court. Each has appellate powers.",
      },
      {
        topic: "Bail Process",
        explanation: "Bail is temporary release. It can be regular, anticipatory, or interim.",
      },
      {
        topic: "Civil vs Criminal",
        explanation: "Civil = private disputes (property, money), Criminal = offenses against society.",
      },
      {
        topic: "How a Case Moves in Court",
        explanation: "Starts with complaint → evidence → trial → verdict → appeal (if any).",
      },
    ],
  },
  {
    id: "templates",
    title: "📄 Ready Templates & Samples",
    items: [
      {
        topic: "RTI Application",
        useCase: "Request information from govt. authorities under RTI Act.",
      },
      {
        topic: "Legal Notice (General)",
        useCase: "Send before initiating civil legal proceedings.",
      },
      {
        topic: "Affidavit (General Purpose)",
        useCase: "Self-declaration for address, name change, etc.",
      },
      {
        topic: "Complaint Format",
        useCase: "Lodge complaint with police, consumer forum or employer.",
      },
      {
        topic: "Cheque Bounce Notice",
        useCase: "Legal notice under Section 138 of NI Act.",
      },
    ],
  },
  {
    id: "glossary",
    title: "📚 Legal Glossary (A-Z)",
    items: [
      { topic: "FIR", explanation: "First Information Report lodged with the police." },
      { topic: "Bail", explanation: "Release of an accused person while awaiting trial." },
      { topic: "Cognizable Offence", explanation: "Offense where police can arrest without a warrant." },
      { topic: "Injunction", explanation: "Court order to stop someone from doing something." },
      { topic: "PIL", explanation: "Public Interest Litigation to enforce fundamental rights." },
    ],
  },
  {
    id: "myths",
    title: "📌 Quick Facts / Myth Busters",
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

export default function EducationSections() {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.id} id={section.id}>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            {section.title}
          </h2>

          <Accordion type="multiple" className="space-y-2">
            {section.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${section.id}-${index}`} className="border rounded-lg">
                <AccordionTrigger className="px-4 py-2 font-medium text-left text-blue-700 dark:text-blue-400">
                  {item.topic}
                </AccordionTrigger>

                <AccordionContent className="bg-gray-50 dark:bg-gray-900 px-4 py-2">
                  {item.subtopics && (
                    <ul className="list-disc ml-6 space-y-1">
                      {item.subtopics.map((sub: string, i: number) => (
                        <li key={i}>{sub}</li>
                      ))}
                    </ul>
                  )}
                  {item.explanation && <p className="mt-2">{item.explanation}</p>}
                  {item.useCase && <p className="mt-2 italic text-sm">Use: {item.useCase}</p>}
                  {item.truth !== undefined && (
                    <p className="mt-2">
                      <strong className="text-red-600">Myth:</strong> {item.topic}
                      <br />
                      <strong className="text-green-600">Truth:</strong>{" "}
                      {item.truth ? "✅ True" : "❌ False"}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
