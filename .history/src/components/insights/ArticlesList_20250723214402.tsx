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
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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

  const filteredArticles = articles.filter((article) => {
    const combinedText = [
      article.title,
      article.content,
      article.tags?.join(" ") || "",
      article.created_by?.[0]?.email || "",
    ].join(" ").toLowerCase();

    if (activeFilter && !article.tags?.includes(activeFilter)) {
      return false;
    }

    return combinedText.includes(query.toLowerCase());
  });

  // Extract all unique tags for filter
  const allTags = Array.from(new Set(articles.flatMap(article => article.tags || [])));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-neutral-400">Loading articles...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-6 bg-red-500/10 rounded-xl border border-red-500/30 max-w-md text-center">
        <h3 className="text-xl font-medium text-red-400 mb-2">Error loading content</h3>
        <p className="text-neutral-400">{error}</p>
        <button 
          onClick={fetchArticles}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
            Knowledge Hub
          </h1>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            Explore our collection of articles, tutorials, and insights
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles by title, content, tags or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-neutral-800/50 backdrop-blur-sm text-neutral-200 border border-neutral-700/50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200 shadow-lg"
            />
            <svg
              className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {allTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeFilter ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700/50'}`}
              >
                All Topics
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag === activeFilter ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tag === activeFilter ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700/50'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-300">
            {activeFilter ? `${activeFilter} Articles` : 'Latest Publications'}
          </h2>
          <span className="text-sm px-3 py-1.5 rounded-full bg-neutral-800/50 text-neutral-400 backdrop-blur-sm">
            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"} found
          </span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group relative bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {article.image_url && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={article.image_url.trim()}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/article?id=${article.id}`}>
                    <h3 className="text-xl font-semibold text-neutral-100 group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                    {article.content.substring(0, 200)}...
                  </p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-700/50">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs text-neutral-400">
                        {article.created_by[0]?.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-neutral-400">
                        {article.created_by[0]?.email?.split("@")[0]}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500">
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
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md p-8 bg-neutral-800/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-cyan-500/10 mb-4">
                <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-300 mb-2">
                No articles found
              </h3>
              <p className="text-neutral-500 text-sm">
                {query ? 'Try a different search term' : 'Check back later for new publications'}
              </p>
              {(query || activeFilter) && (
                <button
                  onClick={() => {
                    setQuery('');
                    setActiveFilter(null);
                  }}
                  className="mt-4 px-4 py-2 text-sm bg-neutral-700/50 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}