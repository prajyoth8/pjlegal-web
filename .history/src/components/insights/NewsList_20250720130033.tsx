"use client";

import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

type NewsArticle = {
  title: string;
  link: string;
  summary: string;
  published: string;
  image?: string;
  source: string;
};

export default function NewsList() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) return <div className="text-center py-10">Loading news…</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((item, i) => (
        <NewsCard key={i} {...item} />
      ))}
    </div>
  );
}
