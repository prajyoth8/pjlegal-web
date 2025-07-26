// ✅ src/components/light/NewsSection.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";

type NewsItem = {
  title: string;
  link: string;
  source: string;
  published?: string;
  summary?: string;
};

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchNews() {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      console.log("📦 News API response:", data);

      if (data?.articles?.length > 0) {
        setNews(data.articles);
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error("❌ Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchNews();
}, []);


  return (
    <section id="news" className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            📰 Latest Legal News
          </h2>
          <Link
            href="/news"
            className="text-sm text-blue-600 hover:underline font-semibold"
          >
            View All News →
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading news...</p>
        ) : news.length === 0 ? (
          <p className="text-gray-500">No news available at the moment.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar">
            {news.slice(0, 5).map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[280px] max-w-sm border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <FaNewspaper className="text-blue-600" />
                  <span>{item.source}</span>
                  {item.published && <span>• {item.published}</span>}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                  {item.title}
                </h3>
                {item.summary && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.summary}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
