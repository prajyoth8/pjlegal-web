"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Article = {
  title: string;
  url: string;
  summary: string;
  published: string;
  image?: string;
  source: string;
};

export default function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
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
    <section className="py-6 px-4 sm:px-8 md:px-16 bg-white dark:bg-zinc-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        📰 Latest Legal News
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10 text-gray-500">
          <Loader2 className="animate-spin mr-2" /> Fetching news...
        </div>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">No news available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <a
              href={article.url}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
              className="border p-4 rounded-lg hover:shadow-md transition dark:border-zinc-700"
            >
              <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-400">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{article.summary}</p>
              <div className="mt-4 text-xs text-zinc-500 flex justify-between items-center">
                <span>{article.published}</span>
                <span className="italic">{article.source}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
