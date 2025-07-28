"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const educationPhases = [
  {
    phase: "Legal Basics",
    topics: [
      {
        title: "Know Your Rights",
        content: `Every Indian citizen is guaranteed fundamental rights under the Constitution:\n\n- **Right to Equality** (Article 14)\n- **Right to Freedom of Speech** (Article 19)\n- **Right to Education** (Article 21A)\n- **Right to Constitutional Remedies** (Article 32)\n\nUnderstanding your rights is the first step to legal empowerment.`
      },
      {
        title: "Everyday Law",
        content: `These are laws that affect your daily routine:\n\n- **Landlord-Tenant Laws**: Rent control and eviction processes\n- **Traffic Rules**: Helmet, seat belt, speed limits\n- **Domestic Violence Protection**: Under Protection of Women from Domestic Violence Act, 2005\n- **Workplace Harassment**: POSH Act`
      }
    ]
  },
  {
    phase: "Justice Access",
    topics: [
      {
        title: "Free Legal Aid",
        content: `You can get **free legal services** through:\n\n- District Legal Services Authority (DLSA)\n- State Legal Services Authority (SLSA)\n- Legal Aid Clinics\n\nEligibility: SC/ST, women, children, disabled, victims of trafficking, etc. (Section 12 of Legal Services Authorities Act, 1987)`
      },
      {
        title: "Filing an FIR",
        content: `An FIR (First Information Report) can be filed for any **cognizable offence**:\n\n- Visit the nearest police station\n- Provide details of the crime verbally or in writing\n- You have the **right to get a copy of FIR for free**`
      },
      {
        title: "When to Consult a Lawyer",
        content: `Seek legal advice when:\n\n- Signing legal agreements\n- Facing criminal charges\n- Land/property disputes\n- Family matters (divorce, custody)`
      }
    ]
  },
  {
    phase: "Digital & Consumer Laws",
    topics: [
      {
        title: "Cyber Safety",
        content: `Protect yourself online:\n\n- Don't share OTPs or passwords\n- Report cybercrimes at [cybercrime.gov.in](https://cybercrime.gov.in)\n- Laws: IT Act 2000, IPC Sections 66A, 67, 354D`
      },
      {
        title: "Consumer Protection",
        content: `The **Consumer Protection Act, 2019** safeguards your rights:\n\n- Right to be informed\n- Right to choose\n- Right to seek redressal\n- Right to consumer education\n\nYou can file complaints online at [consumerhelpline.gov.in](https://consumerhelpline.gov.in)`
      }
    ]
  }
];

export default function EducationContent() {
  return (
    <Accordion.Root type="multiple" className="w-full space-y-6">
      {educationPhases.map((phase, i) => (
        <div key={i}>
          <h2 className="text-xl font-semibold text-indigo-600 border-b border-gray-200 pb-1 mb-2">{phase.phase}</h2>

          {phase.topics.map((topic, j) => (
            <Accordion.Item
              key={j}
              value={`${i}-${j}`}
              className="border border-gray-200 rounded-md overflow-hidden shadow-sm bg-white"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex justify-between items-center w-full px-5 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition">
                  {topic.title}
                  <ChevronDown
                    className="ml-2 h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 py-4 text-gray-700 border-t border-gray-100 whitespace-pre-wrap">
                {topic.content}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </div>
      ))}
    </Accordion.Root>
  );
}
