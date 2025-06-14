'use client';

const faqs = [
  { q: 'Is PJ Legal a government-recognized law firm?', a: 'Yes, PJ Legal complies with all regulatory bodies and practices under the Bar Council of India guidelines.' },
  { q: 'How does AI assist in legal services?', a: 'Our AI tools help draft documents, summarize cases, and provide instant responses to queries.' },
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-gray-50 dark:bg-gray-900 py-12 w-full">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <details key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-200">{item.q}</summary>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
