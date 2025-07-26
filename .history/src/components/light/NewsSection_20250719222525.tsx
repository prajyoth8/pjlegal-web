// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// type NewsItem = {
//   title: string;
//   link: string;
//   summary?: string;
//   published?: string;
//   source?: string;
// };

// export default function NewsSection() {
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchNews() {
//       try {
//         const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // fallback if env not set
//         const res = await fetch(`${apiBase}/api/news`, {
//           headers: { Accept: "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const data = await res.json();
//         if (data?.status === "success" && Array.isArray(data.articles)) {
//           setNews(data.articles);
//         } else {
//           setError("No news available at the moment.");
//         }
//       } catch (err: any) {
//         console.error("Error fetching news:", err);
//         setError("Unable to fetch news at this time.");
//       }
//     }

//     fetchNews();
//   }, []);

//   return (
//     <section id="news" className="py-16 bg-white text-black">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">🗞️ Legal News Updates</h2>

//         {error ? (
//           <p className="text-center text-gray-500">{error}</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <div className="flex space-x-6">
//               {news.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="min-w-[300px] max-w-sm border border-gray-200 bg-gray-50 rounded-xl shadow hover:shadow-md p-4 transition duration-200"
//                 >
//                   <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
//                   {item.published && <p className="text-xs text-gray-400 mb-1">{item.published}</p>}
//                   <p className="text-sm text-gray-600 line-clamp-3 mb-3">
//                     {item.summary || "No summary available."}
//                   </p>
//                   <Link
//                     href="/news"
//                     className="text-sm text-blue-600 hover:underline font-semibold"
//                   >
//                     Read More →
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}


//         <div className="mt-6 text-center">
//           <Link
//             href="/news"
//             className="inline-block text-sm text-blue-700 hover:underline font-semibold"
//           >
//             View All News →
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }




// components/NewsSection.jsx
import Link from 'next/link';

export default function NewsSection({ news, articles, blogs }) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Legal Updates <span className="text-indigo-600">2025</span>
          </h2>
          <Link href="/legal-updates" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            View All <span className="ml-1">→</span>
          </Link>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          <button className="py-2 px-4 border-b-2 border-indigo-500 font-medium text-indigo-600">
            All Updates
          </button>
          <button className="py-2 px-4 text-gray-500 hover:text-gray-700 font-medium">
            News
          </button>
          <button className="py-2 px-4 text-gray-500 hover:text-gray-700 font-medium">
            Articles
          </button>
          <button className="py-2 px-4 text-gray-500 hover:text-gray-700 font-medium">
            Blogs
          </button>
        </div>
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured News Item */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden col-span-1 md:col-span-2 lg:col-span-1">
            <div className="relative h-48">
              <img 
                src={news[0].imageUrl || "/legal-news-default.jpg"} 
                alt={news[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <span className="inline-block bg-indigo-600 text-white text-xs px-2 py-1 rounded-md mb-2">
                  Latest News
                </span>
                <h3 className="text-white font-bold text-lg">{news[0].title}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{news[0].source}</span>
                <span className="mx-2">•</span>
                <span>{news[0].date}</span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{news[0].summary}</p>
              <Link href={`/news/${news[0].id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                Read More
              </Link>
            </div>
          </div>
          
          {/* Articles and Blogs */}
          <div className="space-y-6">
            {articles.slice(0, 2).map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md mr-2">
                      Analysis
                    </span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{article.summary}</p>
                  <Link href={`/articles/${article.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Read Article
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            {blogs.slice(0, 2).map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-md mr-2">
                      Expert Blog
                    </span>
                    <span className="text-sm text-gray-500">{blog.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{blog.summary}</p>
                  <Link href={`/blogs/${blog.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Read Blog
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Location Filter (India/Telangana) */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full font-medium">
            All India
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50">
            Telangana
          </button>
        </div>
      </div>
    </section>
  );
}