// components/ArticlesSection.tsx
export default function ArticlesSection() {
  const articles = [
    {
      title: "New 2024 Property Law Changes in Telangana",
      summary: "Major updates to registration, mutation, and title validation.",
    },
    {
      title: "How to File a Writ Petition in HC",
      summary: "Step-by-step guide to filing effectively with AI assistance.",
    },
  ];

  return (
    <div className="mt-20 max-w-5xl mx-auto px-4">
      <h2 className="text-xl font-bold text-center">📚 Latest Insights</h2>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {articles.map((a) => (
          <div key={a.title} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{a.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
