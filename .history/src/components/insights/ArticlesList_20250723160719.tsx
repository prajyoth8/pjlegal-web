"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type User = {
  id: string;
  email: string;
};

type Article = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  image_url: string | null;
  created_at: string;
  created_by: User[];
};

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select(
          `
          id,
          title,
          content,
          tags,
          image_url,
          created_at,
          created_by:users(id, email)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      setArticles(data || []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles");
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <div className="py-20 text-center text-neutral-500">Loading articles...</div>;
  if (error) return <div className="px-4 py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-neutral-200">Published Articles</h2>
          <span className="text-sm px-3 py-1 rounded-full bg-neutral-800 text-neutral-400">
            {articles.length} {articles.length === 1 ? "article" : "articles"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {article.image_url && (
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image_url.trim()} // ✅ Ensure no extra space or quotes
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized // Optional: can be removed later
                  />
                </div>
              )}

              <div className="p-6">
                <Link href={`/article?id=${article.id}`}>
                  <h3 className="text-xl font-medium text-neutral-200 hover:text-cyan-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                  {article.content.substring(0, 200)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-500">
                  <span>
                    {article.created_by[0]?.email &&
                      `By ${article.created_by[0].email.split("@")[0]}`}
                  </span>
                  <span>
                    {new Date(article.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <h3 className="mt-2 text-lg font-medium text-neutral-300">
                No articles published yet
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Get started by creating your first article in the CMS.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
