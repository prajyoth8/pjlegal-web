// import React from "react";

// type NewsCardProps = {
//   title: string;
//   link: string;
//   summary: string;
//   published: string;
//   image?: string;
//   source: string;
// };

// export default function NewsCard({ title, link, summary, published, image, source }: NewsCardProps) {
//   return (
//     <a
//       href={link}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block border rounded-lg shadow hover:shadow-md transition bg-white dark:bg-[#111827] dark:text-white overflow-hidden"
//     >
//       {image && (
//         <img src={image} alt={title} className="w-full h-48 object-cover" />
//       )}

//       <div className="p-4 space-y-2">
//         <h3 className="text-lg font-semibold">{title}</h3>
//         <p className="text-sm text-gray-600 dark:text-gray-300">{summary}</p>
//         <div className="text-xs text-gray-500 mt-2 flex justify-between">
//           <span>{source}</span>
//           <span>{published}</span>
//         </div>
//       </div>
//     </a>
//   );
// }


import React from "react";
import { motion } from "framer-motion";

type NewsCardProps = {
  title: string;
  link: string;
  summary: string;
  published: string;
  image?: string;
  source: string;
  index?: number;
};

export default function NewsCard({ 
  title, 
  link, 
  summary, 
  published, 
  image, 
  source,
  index = 0 
}: NewsCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 dark:text-white overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative overflow-hidden h-48">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute bottom-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
          {source}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{summary}</p>
        <div className="text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <span>{new Date(published).toLocaleDateString()}</span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">Read more →</span>
        </div>
      </div>
    </motion.a>
  );
}