// ✅ This is a Server Component using searchParams
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import ArticleClientPage from "./ArticleClientPage";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ArticlePage(props: {
  searchParams,
}: {
  searchParams?: { id?: string };
}) {
  const id = searchParams?.id;

  if (!id) {
    redirect("/insights?type=articles");
  }

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  const { data: related } = await supabase
    .from("articles")
    .select("*")
    .neq("id", id)
    .limit(3);

  return (
    <ArticleClientPage
      article={article}
      related={related || []}
    />
  );
}




// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import Link from "next/link";
// import ReactMarkdown from "react-markdown";
// import { ArrowLeft, Bookmark, Clock, User, Eye, MessageSquare, ChevronRight } from "lucide-react";
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   WhatsappIcon,
//   LinkedinIcon,
// } from "react-share";
// import { motion } from "framer-motion";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";


// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default function ArticleClientPage() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const [article, setArticle] = useState<any>(null);
//   const [related, setRelated] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [readingTime, setReadingTime] = useState(0);

//   const currentURL = typeof window !== "undefined" ? window.location.href : "";

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       const { data, error } = await supabase
//         .from("articles")
//         .select("*")
//         .eq("id", id)
//         .single();
//       setArticle(data);

//       // Calculate reading time
//       if (data?.content) {
//         const words = data.content.split(/\s+/).length;
//         setReadingTime(Math.max(1, Math.round(words / 200)));
//       }

//       const { data: allArticles } = await supabase
//         .from("articles")
//         .select("*")
//         .neq("id", id)
//         .limit(3);
//       setRelated(allArticles || []);
//       setLoading(false);
//     };

//     fetchData();
//   }, [id]);

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-pulse flex flex-col items-center">
//         <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-4"></div>
//         <p className="text-lg text-neutral-500">Loading article...</p>
//       </div>
//     </div>
//   );

//   if (!article) return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="text-center max-w-md p-6 bg-red-500/10 rounded-xl border border-red-500/30">
//         <h3 className="text-xl font-medium text-red-400 mb-2">Article not found</h3>
//         <p className="text-neutral-500 mb-4">The requested article could not be loaded.</p>
//         <Link
//           href="/insights?type=articles"
//           className="inline-flex items-center px-4 py-2 bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Articles
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
//       {/* Header with back button */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Link
//             href="/insights?type=articles"
//             className="inline-flex items-center text-neutral-600 hover:text-cyan-500 transition-colors group"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
//             <span className="font-medium">All Articles</span>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Article Content */}
//       <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Article Header */}
//           <header className="mb-12">
//             {/* Tags */}
//             {article.tags?.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {article.tags.map((tag: string) => (
//                   <span
//                     key={tag}
//                     className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* Title */}
//             <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
//               {article.title}
//             </h1>

//             {/* Meta Information */}
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-neutral-500 mb-8">
//               <div className="flex items-center">
//                 <User className="w-4 h-4 mr-2" />
//                 <span>{article.author || "PJ Legal"}</span>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="w-4 h-4 mr-2" />
//                 <span>
//                   {new Date(article.created_at).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric"
//                   })}
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Eye className="w-4 h-4 mr-2" />
//                 <span>{readingTime} min read</span>
//               </div>
//             </div>

//             {/* Featured Image */}
//             {article.image_url && (
//               <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
//                 <img
//                   src={article.image_url}
//                   alt={article.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
//               </div>
//             )}
//           </header>

//           {/* Article Content */}
//           <div className="prose prose-lg max-w-none prose-headings:text-neutral-800 prose-p:text-neutral-600 prose-a:text-cyan-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-800 prose-blockquote:border-l-cyan-500 prose-blockquote:text-neutral-500 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-cyan-500 mb-16">
//             <ReactMarkdown
//   remarkPlugins={[remarkGfm]}
//   rehypePlugins={[rehypeRaw]}
//   className="prose prose-lg max-w-none dark:prose-invert"
// >
//   {article.content}
// </ReactMarkdown>

//           </div>

//           {/* Share and Save */}
//           <div className="border-t border-neutral-200 pt-8 mb-16">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
//               <div>
//                 <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
//                   Share this article
//                 </h3>
//                 <div className="flex items-center space-x-3">
//                   <FacebookShareButton url={currentURL} title={article.title}>
//                     <FacebookIcon size={36} round className="hover:opacity-80 transition-opacity" />
//                   </FacebookShareButton>
//                   <TwitterShareButton url={currentURL} title={article.title}>
//                     <TwitterIcon size={36} round className="hover:opacity-80 transition-opacity" />
//                   </TwitterShareButton>
//                   <WhatsappShareButton url={currentURL} title={article.title}>
//                     <WhatsappIcon size={36} round className="hover:opacity-80 transition-opacity" />
//                   </WhatsappShareButton>
//                   <LinkedinShareButton url={currentURL} title={article.title}>
//                     <LinkedinIcon size={36} round className="hover:opacity-80 transition-opacity" />
//                   </LinkedinShareButton>
//                 </div>
//               </div>
//               <button className="inline-flex items-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors">
//                 <Bookmark className="w-4 h-4 mr-2" />
//                 Save for later
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Related Articles */}
//         {related.length > 0 && (
//           <section className="mt-16">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-2xl font-bold text-neutral-900">Related Articles</h2>
//               <Link
//                 href="/insights?type=articles"
//                 className="inline-flex items-center text-sm font-medium text-cyan-500 hover:text-cyan-600"
//               >
//                 View all
//                 <ChevronRight className="w-4 h-4 ml-1" />
//               </Link>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {related.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   whileHover={{ y: -5 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Link
//                     href={`/article?id=${item.id}`}
//                     className="block h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-neutral-100 transition-all"
//                   >
//                     {item.image_url && (
//                       <div className="relative h-48 w-full">
//                         <img
//                           src={item.image_url}
//                           alt={item.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     )}
//                     <div className="p-6">
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         {item.tags?.slice(0, 2).map((tag: string) => (
//                           <span
//                             key={tag}
//                             className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                       <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
//                         {item.title}
//                       </h3>
//                       <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
//                         {item.summary}
//                       </p>
//                       <div className="flex items-center text-xs text-neutral-400">
//                         <Clock className="w-3 h-3 mr-1" />
//                         <span>
//                           {new Date(item.created_at).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric"
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Comments Section (Placeholder) */}
//         <section className="mt-16 border-t border-neutral-200 pt-12">
//           <div className="flex items-center mb-6">
//             <MessageSquare className="w-5 h-5 text-neutral-500 mr-2" />
//             <h2 className="text-xl font-semibold text-neutral-900">Comments</h2>
//             <span className="ml-2 px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
//               Coming Soon
//             </span>
//           </div>
//           <div className="bg-neutral-50 rounded-xl p-8 text-center">
//             <p className="text-neutral-500">We're working on adding comments to enhance discussion.</p>
//             <p className="text-sm text-neutral-400 mt-2">Check back soon!</p>
//           </div>
//         </section>
//       </article>
//     </div>
//   );
// }