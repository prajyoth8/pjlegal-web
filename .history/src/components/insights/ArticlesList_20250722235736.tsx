"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Trash2, Edit } from "lucide-react";
import { toast } from "react-hot-toast";
import AdminAuthGuard from "../AdminAuthGuard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Article = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  image_url: string | null;
  created_at: string;
  created_by: {
    email: string;
  } | null;
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
        .select(`
          id,
          title,
          content,
          tags,
          image_url,
          created_at,
          created_by:users(email)
        `)
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

  const deleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Article deleted successfully");
      fetchArticles();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete article");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="animate-pulse space-y-4">
              <div className="h-48 bg-neutral-800 rounded-lg"></div>
              <div className="h-6 bg-neutral-800 rounded w-3/4"></div>
              <div className="h-4 bg-neutral-800 rounded w-full"></div>
              <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-neutral-800 rounded-full"></div>
                <div className="h-6 w-16 bg-neutral-800 rounded-full"></div>
              </div>
              <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <AdminAuthGuard
    <div className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-neutral-200">
            Published Articles
          </h2>
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
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/articles/${article.id}`}>
                    <h3 className="text-xl font-medium text-neutral-200 hover:text-cyan-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {/* Add edit functionality */}}
                      className="text-neutral-400 hover:text-cyan-400 transition-colors"
                      aria-label="Edit article"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteArticle(article.id)}
                      className="text-neutral-400 hover:text-red-400 transition-colors"
                      aria-label="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
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
                    {article.created_by?.email && (
                      `By ${article.created_by.email.split('@')[0]}`
                    )}
                  </span>
                  <span>
                    {new Date(article.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
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
              <svg
                className="mx-auto h-12 w-12 text-neutral-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-neutral-300">No articles published yet</h3>
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