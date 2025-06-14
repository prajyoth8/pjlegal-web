'use client';

export default function ClientsSection() {
  return (
    <section className="w-full max-w-4xl px-6 py-10 text-white">
      <h3 className="text-2xl font-semibold mb-4">What Our Clients Say</h3>
      <div className="space-y-4">
        <blockquote className="text-sm border-l-4 border-blue-500 pl-4 italic">
          “PJ Legal provided quick and accurate solutions. The AI tools are impressive!” — Amit S.
        </blockquote>
        <blockquote className="text-sm border-l-4 border-purple-500 pl-4 italic">
          “I loved the chatbot guidance. Very futuristic and professional.” — Neha D.
        </blockquote>
      </div>
    </section>
  );
}
