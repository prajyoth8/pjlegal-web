"use client";
import { useEffect, useState } from "react";

type Article = {
  title: string;
  url: string;
  summary: string;
  published: string;
  source: string;
};

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Articles & Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded border hover:shadow bg-white dark:bg-gray-900 transition"
          >
            <h3 className="font-semibold text-lg">{article.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">{article.summary}</p>
            <div className="mt-2 text-xs text-gray-500">
              {article.source} · {article.published}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
