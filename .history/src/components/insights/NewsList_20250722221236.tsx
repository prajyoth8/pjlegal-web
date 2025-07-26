// "use client";

// import React, { useEffect, useState } from "react";
// import NewsCard from "./NewsCard";

// type NewsArticle = {
//   title: string;
//   link: string;
//   summary: string;
//   published: string;
//   image?: string;
//   source: string;
// };

// export default function NewsList() {
//   const [articles, setArticles] = useState<NewsArticle[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchNews() {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
//         const data = await res.json();
//         setArticles(data.articles || []);
//       } catch (err) {
//         console.error("Failed to load news", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchNews();
//   }, []);

//   if (loading) return <div className="text-center py-10">Loading news…</div>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {articles.map((item, i) => (
//         <NewsCard key={i} {...item} />
//       ))}
//     </div>
//   );
// }


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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Failed to load news", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} />;
  if (articles.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-8">
      {articles.map((item, i) => (
        <NewsCard key={`${item.link}-${i}`} index={i} {...item} />
      ))}
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-8">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-5 space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="flex justify-between pt-3">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
    <div className="w-16 h-16 mb-4 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
      <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to load news</h3>
    <p className="text-gray-600 dark:text-gray-400 max-w-md">{message}</p>
    <button 
      onClick={() => window.location.reload()}
      className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
    >
      Retry
    </button>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
    <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No news articles found</h3>
    <p className="text-gray-600 dark:text-gray-400 max-w-md">There are currently no news articles available. Please check back later.</p>
  </div>
);