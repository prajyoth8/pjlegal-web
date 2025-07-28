"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Sample data (you can replace with real content later)
const educationSections = [
  {
    title: "Know Your Rights",
    description: "Empower yourself with awareness of your basic legal rights.",
    topics: [
      { title: "Rights During Arrest", link: "/education/arrest-rights" },
      { title: "Right to Information", link: "/education/rti-rights" },
      { title: "Rights of Tenants", link: "/education/tenant-rights" },
      { title: "Rights in Police Encounters", link: "/education/police-rights" },
      { title: "Women’s Rights", link: "/education/women-rights" },
      { title: "Children's Rights", link: "/education/children-rights" },
      { title: "LGBTQ+ Rights", link: "/education/lgbtq-rights" },
    ],
  },
  {
    title: "Everyday Law in India",
    description: "Understand legal topics that affect your daily life.",
    topics: [
      { title: "Consumer Rights", link: "/education/consumer-rights" },
      { title: "Property Law Basics", link: "/education/property-law" },
      { title: "Cyber Law Awareness", link: "/education/cyber-law" },
      { title: "Marriage & Divorce", link: "/education/marriage-divorce" },
      { title: "Employment Rights", link: "/education/employment-rights" },
    ],
  },
  {
    title: "Legal Process Explained Simply",
    description: "Learn how legal processes work in clear, easy language.",
    topics: [
      { title: "Filing an FIR", link: "/education/filing-fir" },
      { title: "Court Hierarchy", link: "/education/court-hierarchy" },
      { title: "Bail Process", link: "/education/bail-process" },
      { title: "Civil vs Criminal", link: "/education/civil-vs-criminal" },
      { title: "How a Case Moves in Court", link: "/education/case-flow" },
    ],
  },
  {
    title: "Templates & Samples",
    description: "Download free legal templates in PDF/Word.",
    topics: [
      { title: "RTI Application", link: "/education/templates/rti" },
      { title: "General Legal Notice", link: "/education/templates/legal-notice" },
      { title: "Affidavit", link: "/education/templates/affidavit" },
      { title: "Complaint Format", link: "/education/templates/complaint" },
      { title: "Cheque Bounce Notice", link: "/education/templates/cheque-bounce" },
    ],
  },
  {
    title: "Legal Glossary (A–Z)",
    description: "Simple explanations for legal terms.",
    topics: [
      { title: "FIR", link: "/education/glossary/fir" },
      { title: "Bail", link: "/education/glossary/bail" },
      { title: "Cognizable Offence", link: "/education/glossary/cognizable" },
      { title: "Injunction", link: "/education/glossary/injunction" },
      { title: "PIL", link: "/education/glossary/pil" },
    ],
  },
  {
    title: "Quick Facts / Myth Busters",
    description: "Clear common myths and misunderstandings about the law.",
    topics: [
      { title: "FIRs must be registered", link: "/education/myths/fir" },
      { title: "RTI can be filed without lawyer", link: "/education/myths/rti" },
      { title: "Divorce isn’t instant", link: "/education/myths/divorce" },
      { title: "Arrest laws are gender-neutral", link: "/education/myths/arrest" },
      { title: "Anyone can send a legal notice", link: "/education/myths/notice" },
    ],
  },
];

export default function EducationSections() {
  return (
    <Accordion.Root type="multiple" className="space-y-4">
      {educationSections.map((section, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                "flex w-full items-center justify-between p-4 font-semibold text-left text-lg bg-gray-100 dark:bg-gray-800 rounded-t-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              )}
            >
              {section.title}
              <ChevronDown className="h-5 w-5 transition-transform duration-200 AccordionChevron" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="p-4 border-t dark:border-gray-700 space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {section.description}
            </p>
            <ul className="space-y-1">
              {section.topics.map((topic, i) => (
                <li key={i}>
                  <Link
                    href={topic.link}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {topic.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
