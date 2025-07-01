// import React from "react";

// export type FormattedBlock =
//   | { type: "paragraph"; text: string }
//   | { type: "title"; text: string }
//   | { type: "heading"; text: string }
//   | { type: "bulleted_list"; text: string }
//   | { type: "numbered_list"; text: string }
//   | { type: "quote"; text: string }
//   | { type: "table_row"; text: string }
//   | { type: "code"; text: string }
//   | { type: "image"; url: string; caption?: string }
//   | { type: "button"; label: string; action: string };

// export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
//   return (
//     <div className="space-y-2">
//       {blocks.map((block, i) => {
//         switch (block.type) {
//           case "title":
//             return (
//               <h1 key={i} className="text-xl font-bold text-blue-900">
//                 {block.text}
//               </h1>
//             );

//           case "heading":
//             return (
//               <h2 key={i} className="text-lg font-semibold text-blue-800">
//                 {block.text}
//               </h2>
//             );

//           case "paragraph":
//             return (
//               <p key={i} className="text-base text-gray-800">
//                 {block.text}
//               </p>
//             );

//           case "bulleted_list":
//             return (
//               <ul key={i} className="list-disc list-inside text-base text-gray-700">
//                 <li>{block.text.replace(/^[-*•+]\s/, "")}</li>
//               </ul>
//             );

//           case "numbered_list":
//             return (
//               <ol key={i} className="list-decimal list-inside text-base text-gray-700">
//                 <li>{block.text.replace(/^\d+\.\s/, "")}</li>
//               </ol>
//             );

//           case "quote":
//             return (
//               <blockquote key={i} className="border-l-4 border-gray-400 pl-4 italic text-gray-600">
//                 {block.text}
//               </blockquote>
//             );

//           case "table_row":
//             return (
//               <pre
//                 key={i}
//                 className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm overflow-x-auto"
//               >
//                 {block.text}
//               </pre>
//             );

//           case "code":
//             return (
//               <pre key={i} className="bg-black text-white p-3 rounded text-sm overflow-x-auto">
//                 {block.text}
//               </pre>
//             );

//           case "image":
//             return (
//               <div key={i} className="my-3">
//                 <img src={block.url} alt={block.caption || "image"} className="rounded shadow" />
//                 {block.caption && (
//                   <p className="text-center text-sm text-gray-500">{block.caption}</p>
//                 )}
//               </div>
//             );

//           case "button":
//             return (
//               <a
//                 key={i}
//                 href={block.action}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
//               >
//                 {block.label}
//               </a>
//             );

//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// };

// components/RenderFormattedBlocks.tsx
import React from "react";

export type FormattedBlock = {
  type: string;
  text?: string;
  items?: string[];
  language?: string;
  code?: string;
  rows?: string[][];
  headers?: string[];
};

export function RenderFormattedBlocks({ blocks }: { blocks: FormattedBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "title":
            return (
              <h1 key={i} className="text-xl font-bold">
                {block.text}
              </h1>
            );
          case "heading":
            return (
              <h2 key={i} className="text-lg font-semibold">
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3 key={i} className="text-base font-semibold">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={i} className="text-sm leading-relaxed whitespace-pre-line">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="list-disc ml-6 space-y-1 text-sm">
                {(block.items || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-amber-500 pl-4 italic text-sm text-gray-700 dark:text-gray-300"
              >
                {block.text}
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={i}
                className="bg-gray-900 text-white p-3 rounded-lg text-sm overflow-x-auto"
              >
                <code>{block.code}</code>
              </pre>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto text-sm">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  {block.headers && (
                    <thead className="bg-gray-200 dark:bg-gray-700">
                      <tr>
                        {block.headers.map((h, idx) => (
                          <th key={idx} className="border px-3 py-2 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {block.rows?.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={
                          rIdx % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-100 dark:bg-gray-700"
                        }
                      >
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="border px-3 py-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
