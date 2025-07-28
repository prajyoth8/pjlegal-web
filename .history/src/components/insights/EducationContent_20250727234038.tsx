"use client";

import { Accordion, AccordionItem } from "@radix-ui/react-accordion";

const topics = [
  {
    title: "Know Your Rights",
    content: `Learn about your fundamental rights as an Indian citizen, including:
- Right to equality
- Right to freedom of speech
- Right to education
- Right to constitutional remedies`
  },
  {
    title: "Everyday Law",
    content: `Understand laws that impact your daily life:
- Tenant and landlord rights
- Consumer protection
- Cyber safety
- Traffic and road rules`
  },
  {
    title: "Legal Aid & Support",
    content: `How to access free legal aid, public defenders, and pro bono services for marginalized communities.`
  }
];

export default function EducationContent() {
  return (
    <div className="space-y-6">
      {topics.map((topic, index) => (
        <Accordion type="single" collapsible key={index}>
          <AccordionItem value={`item-${index}`}>
            <button className="w-full text-left text-lg font-semibold bg-gray-100 px-4 py-3 rounded hover:bg-gray-200">
              {topic.title}
            </button>
            <div className="text-gray-700 bg-white px-4 py-2 border-l-4 border-blue-500 rounded-b">
              <pre className="whitespace-pre-wrap font-sans text-sm">{topic.content}</pre>
            </div>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
