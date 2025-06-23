// ✅ src/components/light/PracticeSection.tsx
export default function PracticeSection() {
  const areas = [
    "Civil Law",
    "Criminal Law",
    "Property Disputes",
    "Land Documentation",
    "Legal Notices & Agreements",
    "Family Law",
  ];

  return (
    <section id="practice" className="py-16 bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Practice Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{area}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
