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
  source: string;
  index?: number;
};

export default function NewsCard({ 
  title, 
  link, 
  summary, 
  published, 
  source,
  index = 0 
}: NewsCardProps) {
  const formattedDate = new Date(published).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900 overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            source === 'Bar & Bench' ? 'bg-blue-500' : 'bg-purple-500'
          }`}></div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {source}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {summary}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </motion.a>
  );
}