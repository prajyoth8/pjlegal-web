// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { BookOpen, Newspaper, GraduationCap } from "lucide-react";
// import NewsList from "@/components/insights/NewsList";

// // Dummy data (replace with real DB/API fetch)
// const dummyInsights = [
//   { id: 1, type: "news", title: "Latest Legal Update", excerpt: "New amendment to civil law..." },
//   { id: 2, type: "blogs", title: "Understanding Property Rights", excerpt: "Explore fundamentals of property law in India..." },
//   { id: 3, type: "education", title: "Legal Education Trends 2025", excerpt: "AI-driven learning is shaping legal education..." },
//   { id: 4, type: "blogs", title: "Constitution and You", excerpt: "Know your rights and how they work in practice..." },
// ];

// const categoryIcons = {
//   news: <Newspaper className="text-blue-500" />,
//   blogs: <BookOpen className="text-amber-600" />,
//   education: <GraduationCap className="text-green-600" />,
// };

// export default function InsightsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [activeType, setActiveType] = useState<string | null>(null);
//   const [filteredInsights, setFilteredInsights] = useState(dummyInsights);

//   useEffect(() => {
//     const queryType = searchParams.get("type");
//     if (queryType && ["news", "blogs", "education"].includes(queryType)) {
//       setActiveType(queryType);
//     } else {
//       setActiveType(null);
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     if (activeType) {
//       setFilteredInsights(dummyInsights.filter((item) => item.type === activeType));
//     } else {
//       setFilteredInsights(dummyInsights);
//     }
//   }, [activeType]);

//   const handleFilterClick = (type: string | null) => {
//     if (type) {
//       router.push(`/insights?type=${type}`);
//     } else {
//       router.push("/insights");
//     }
//   };

//   return (
//     <section className="px-6 py-12 max-w-6xl mx-auto">
//       <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 dark:text-white">Insights</h1>
//       <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
//         Stay informed with our latest legal news, blogs, and educational articles.
//       </p>

//       {/* Filter buttons */}
//       <div className="flex justify-center gap-4 mb-8 flex-wrap">
//         <button
//           onClick={() => handleFilterClick(null)}
//           className={`px-4 py-2 rounded-full border transition font-medium ${!activeType ? "bg-amber-600 text-white" : "border-gray-300 text-gray-600 dark:text-gray-300"}`}
//         >
//           All
//         </button>
//         <button
//           onClick={() => handleFilterClick("news")}
//           className={`px-4 py-2 rounded-full border transition font-medium ${activeType === "news" ? "bg-blue-600 text-white" : "border-gray-300 text-gray-600 dark:text-gray-300"}`}
//         >
//           News
//         </button>
//         <button
//           onClick={() => handleFilterClick("blogs")}
//           className={`px-4 py-2 rounded-full border transition font-medium ${activeType === "blogs" ? "bg-amber-600 text-white" : "border-gray-300 text-gray-600 dark:text-gray-300"}`}
//         >
//           Blogs
//         </button>
//         <button
//           onClick={() => handleFilterClick("education")}
//           className={`px-4 py-2 rounded-full border transition font-medium ${activeType === "education" ? "bg-green-600 text-white" : "border-gray-300 text-gray-600 dark:text-gray-300"}`}
//         >
//           Education
//         </button>
//       </div>

//       {/* List of insights */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <AnimatePresence>
//           {filteredInsights.map((item) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-md transition p-6 border border-gray-100 dark:border-gray-800"
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 {categoryIcons[item.type as keyof typeof categoryIcons]}
//                 <span className="uppercase text-xs tracking-wider text-gray-500 dark:text-gray-400">
//                   {item.type}
//                 </span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 {item.title}
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//                 {item.excerpt}
//               </p>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NewsList from "@/components/insights/NewsList";
import ArticlesList from "@/components/insights/ArticlesList";

function InsightsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "news";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Insights</h1>
      {type === "news" && <NewsList />}
      {type === "articles" && <ArticlesList />}
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      }
    >
      <InsightsContent />
    </Suspense>
  );
}

// ✅ src/app/insights/page.tsx
// "use client";

// import { useSearchParams } from "next/navigation";
// import NewsList from "@/components/insights/NewsList";
// import ArticlesList from "@/components/insights/ArticlesList";

// export default function InsightsPage() {
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type") || "news";

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4 capitalize">{type} Insights</h1>

//       {type === "news" && <NewsList />}
//       {type === "articles" && <ArticlesList />}

//     </div>
//   );
// }
