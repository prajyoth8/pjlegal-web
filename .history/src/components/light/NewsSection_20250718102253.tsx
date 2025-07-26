"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NewsArticle = {
  title: string;
  link: string;
  summary: string;
  published: string;
  image: string;
  source: string;
};

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date().toISOString().slice(0, 10);
        const filtered = data.articles?.filter(
          (article: NewsArticle) => article.published === today
        );
        setArticles(filtered || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="news" className="py-10 px-4 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
            🗞️ Legal News Today
          </h2>
          <Link
            href="/news"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading news...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No news available for today.
          </p>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-2 scroll-smooth snap-x">
            {articles.map((item, idx) => (
              <div
                key={idx}
                className="w-80 min-w-[20rem] bg-white dark:bg-neutral-800 rounded-xl shadow hover:shadow-lg transition-all duration-200 snap-start flex-shrink-0"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt="News Image"
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    📅 {item.published} &nbsp; | &nbsp; 🏛 {item.source}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-2">
                    {item.summary}
                  </p>
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
