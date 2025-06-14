'use client';

import { useState } from 'react';

const faqs = [
  { question: 'Is PJ Legal a government-recognized law firm?', answer: 'Yes, we are recognized and compliant with Indian legal regulations.' },
  { question: 'How does AI assist in legal services?', answer: 'AI supports legal research, document drafting, and case insights with efficiency.' },
  { question: 'Can your AI provide legal advice?', answer: 'Our AI tools provide support, but formal legal advice is offered by our human experts.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-4xl px-6 py-10 text-white">
      <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
      <ul className="space-y-4">
        {faqs.map((faq, idx) => (
          <li key={idx}>
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left font-medium focus:outline-none"
            >
              {faq.question}
            </button>
            {openIndex === idx && <p className="mt-2 text-sm text-gray-300">{faq.answer}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
