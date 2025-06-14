'use client';

export default function ClientsSection() {
  const testimonials = [
    { name: 'Amit S.', text: 'PJ Legal provided quick and accurate solutions. The AI tools are impressive!' },
    { name: 'Neha D.', text: 'I loved the chatbot guidance. Very futuristic and professional.' },
  ];

  return (
    <section id="clients" className="py-12 w-full bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 dark:text-gray-200 mb-2">“{t.text}”</p>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-400">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
