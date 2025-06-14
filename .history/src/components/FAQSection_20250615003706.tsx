"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";

const faqs = [
  {
    question: "Is PJ Legal a government-recognized law firm?",
    answer:
      "Yes, we are recognized and compliant with Indian legal regulations.",
  },
  {
    question: "How does AI assist in legal services?",
    answer:
      "AI supports legal research, document drafting, and case insights with efficiency.",
  },
  {
    question: "Can your AI provide legal advice?",
    answer:
      "Our AI tools provide support, but formal legal advice is offered by our human experts.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto text-left">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 bg-white/70 rounded-lg shadow">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-sm text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
