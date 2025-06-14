'use client';

import { faqs as faqList } from '@/data/faqs';

export default function FAQSection() {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto text-left">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqList.map((faq, index) => (
          <div key={index} className="p-4 bg-white/70 rounded-lg shadow">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-sm text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
