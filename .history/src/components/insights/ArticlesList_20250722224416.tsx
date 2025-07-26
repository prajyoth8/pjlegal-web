"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  summary: string;
  author?: string;
  published?: string;
  url: string;
};

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Understanding Contract Law in India",
    summary: "Explore the essential elements and legal interpretations of contract law applicable in Indian courts.",
    author: "Adv. Priya Sharma",
    published: "2024-10-15",
    url: "/articles/contract-law-basics",
  },
  {
    id: 2,
    title: "Recent Supreme Court Judgments on Fundamental Rights",
    summary: "A digest of major SC rulings from 2024–2025 with implications on civil liberties.",
    author: "Editorial Team",
    published: "2025-01-12",
    url: "/articles/sc-judgments-rights",
  },
  {
    id: 3,
    title: "Using AI Tools in Legal Drafting",
    summary: "How lawyers can leverage artificial intelligence to streamline contract and notice creation.",
    author: "Adv. Rohit Nair",
    published: "2025-03-05",
    url: "/articles/ai-in-legal-drafting",
  },
];

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // For now using static, later replace with fetch("/api/articles") or Supabase
    setArticles(mockArticles);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {articles.map((article) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md"
        >
          <Link href={article.url}>
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline line-clamp-2">
              {article.title}
            </h3>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {article.summary}
          </p>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            {article.author && <span>By {article.author} • </span>}
            {article.published}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
