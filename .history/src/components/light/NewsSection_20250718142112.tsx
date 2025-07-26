"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NewsItem = {
  title: string;
  link: string;
  summary?: string;
  published?: string;
  source?: string;
};

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // fallback if env not set
        const res = await fetch(`${apiBase}/api/news`, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data?.status === "success" && Array.isArray(data.articles)) {
          setNews(data.articles);
        } else {
          setError("No news available at the moment.");
        }
      } catch (err: any) {
        console.error("Error fetching news:", err);
        setError("Unable to fetch news at this time.");
      }
    }

    fetchNews();
  }, []);

  return (
    <section id="news" className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">🗞️ Legal News Updates</h2>

        {error ? (
          <p className="text-center text-gray-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex space-x-6">
              {news.map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[300px] max-w-sm border border-gray-200 bg-gray-50 rounded-xl shadow hover:shadow-md p-4 transition duration-200"
                >
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  {item.published && <p className="text-xs text-gray-400 mb-1">{item.published}</p>}
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {item.summary || "No summary available."}
                  </p>
                  <Link href="/news" className="text-sm text-blue-600 hover:underline font-semibold">
            View All News →
          </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/news"
            className="inline-block text-sm text-blue-700 hover:underline font-semibold"
          >
            View All News →
          </Link>
        </div>
      </div>
    </section>
  );
}
