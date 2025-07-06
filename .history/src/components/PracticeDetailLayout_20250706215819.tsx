// "use client";

// import Link from "next/link";

// export default function PracticeDetailLayout({
//   title,
//   description,
//   points,
// }: {
//   title: string;
//   description: string;
//   points?: string[];
// }) {
//   return (
//     <div className="min-h-screen bg-white text-black py-16 px-4 max-w-4xl mx-auto">
//       <Link href="/#practice" className="text-blue-600 text-sm mb-4 inline-block">
//         ← Back to Practice Areas
//       </Link>
//       <h1 className="text-4xl font-bold mb-6 text-purple-800">{title}</h1>
//       <p className="text-lg mb-6 text-gray-700">{description}</p>
//       {points?.length ? (
//         <ul className="list-disc list-inside text-gray-800 space-y-2">
//           {points.map((pt, i) => (
//             <li key={i}>{pt}</li>
//           ))}
//         </ul>
//       ) : null}
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";

// export default function PracticeDetailLayout({
//   title,
//   description,
//   points,
// }: {
//   title: string;
//   description: string;
//   points?: string[];
// }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <Link
//             href="/#practice"
//             className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors group mb-8"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Back to Practice Areas
//           </Link>

//           <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-amber-600">
//             {title}
//           </h1>

//           <div className="prose prose-lg max-w-none text-gray-700 mb-10">
//             <p className="text-lg md:text-xl leading-relaxed">{description}</p>
//           </div>

//           {points?.length ? (
//             <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-gray-100">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Areas We Handle:</h2>
//               <ul className="space-y-3">
//                 {points.map((pt, i) => (
//                   <motion.li
//                     key={i}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * i }}
//                     className="flex items-start"
//                   >
//                     <span className="flex-shrink-0 mt-1 mr-3">
//                       <svg
//                         className="h-5 w-5 text-purple-500"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     </span>
//                     <span className="text-gray-700">{pt}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           ) : null}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

export default function PracticeDetailLayout({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-amber-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/#practice"
            className="inline-flex items-center text-sm text-purple-700 hover:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Practice Areas
          </Link>
        </div>

        {/* Title and Icon */}
        <div className="flex items-center gap-3 mb-6 text-purple-800">
          {icon}
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>

        {children}
      </div>
    </div>
  );
}
