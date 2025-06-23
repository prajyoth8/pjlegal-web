// ✅ src/components/light/NewsSection.tsx
export default function NewsSection() {
  const news = [
    {
      title: "Telangana High Court: New Property Ruling",
      date: "June 2025",
      snippet: "A recent judgment redefines how ancestral rights are interpreted in Telangana...",
    },
    {
      title: "Supreme Court On Limitation Act",
      date: "May 2025",
      snippet: "The SC clarified Section 5 extension in delay condonation matters...",
    },
  ];

  return (
    <section id="news" className="py-16 bg-white text-black">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Latest Legal Updates</h2>
        <div className="space-y-6">
          {news.map((item, idx) => (
            <div key={idx} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{item.date}</p>
              <p className="text-gray-700">{item.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
