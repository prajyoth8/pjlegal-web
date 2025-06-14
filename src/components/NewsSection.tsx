'use client';

export default function NewsSection() {
  const newsItems = [
    { title: 'Legal AI in India – A Game Changer', date: 'June 2025' },
    { title: 'How PJ Legal Uses AI for Drafting', date: 'May 2025' },
    { title: 'Top 10 Legal Tech Tools in 2025', date: 'April 2025' },
  ];

  return (
    <section id="news" className="bg-white/80 dark:bg-gray-900 py-12 w-full">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Insights & Articles</h2>
        <ul className="space-y-4">
          {newsItems.map((item, idx) => (
            <li key={idx} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
