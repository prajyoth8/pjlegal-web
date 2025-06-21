// components/PracticeCardsSection.tsx
"use client";

const services = [
  {
    title: "Property Disputes",
    description: "Draft notices, verify ownership, prevent fraud.",
    icon: "🏠",
  },
  {
    title: "Criminal Matters",
    description: "Guidance on FIRs, bails, police complaints.",
    icon: "⚖️",
  },
  {
    title: "Family & Divorce",
    description: "Petitions, maintenance, and custody matters.",
    icon: "👨‍👩‍👧‍👦",
  },
];

export default function PracticeCardsSection() {
  return (
    <div className="max-w-7xl mx-auto mt-20 px-4 grid md:grid-cols-3 gap-6">
      {services.map((item) => (
        <div
          key={item.title}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition transform duration-300"
        >
          <div className="text-3xl">{item.icon}</div>
          <h3 className="mt-4 font-bold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-400 mt-2">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
