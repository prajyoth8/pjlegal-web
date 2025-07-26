"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type NewsItem = {
  title: string;
  link: string;
  published?: string;
  summary?: string;
  source?: string;
};

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news`);
        const data = await res.json();
        console.log("✅ News:", data);
        if (data?.articles?.length) {
          setNews(data.articles.slice(0, 8));
        }
        console.log("✅ Full News Response:", data);
        console.log("✅ Articles Array:", data.articles);

      } catch (err) {
        console.error("❌ Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <section className="py-12 bg-white text-black" id="news">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📰 Latest Legal News</h2>
          <Link href="/news" className="text-blue-600 hover:underline text-sm">
            View All
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Fetching news...</p>
        ) : news.length === 0 ? (
          <p className="text-gray-500">No news available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-x-auto max-h-[420px] pr-1">
            {news.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                {item.source && <p className="text-xs text-gray-500 mb-1">{item.source}</p>}
                {item.summary && <p className="text-sm text-gray-600">{item.summary}</p>}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
