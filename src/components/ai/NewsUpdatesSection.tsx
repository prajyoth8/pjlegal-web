"use client";

const newsItems = [
  {
    title: "PJ Legal Launches AI-powered Legal Drafting Platform",
    date: "June 2025",
    link: "#",
  },
  {
    title: "Seminar: Land Rights & Litigation Reform - Hyderabad",
    date: "May 2025",
    link: "#",
  },
  {
    title: "High Court Ruling on Property Dispute - Landmark Win",
    date: "April 2025",
    link: "#",
  },
];

export default function NewsUpdatesSection() {
  return (
    <section className="w-full px-4 py-10 space-y-6">
      <h2 className="text-2xl font-bold text-yellow-400 text-center">
        Latest News & Events
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="block bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all shadow-sm"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-yellow-300 mt-1">{item.date}</p>
            <span className="text-xs text-blue-400 mt-2 inline-block">
              Read more →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
