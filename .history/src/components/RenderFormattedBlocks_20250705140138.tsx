// import React from "react";

// type ParagraphBlock = {
//   type:
//     | "paragraph"
//     | "heading_1"
//     | "heading_2"
//     | "heading_3"
//     | "heading_4"
//     | "subheading"
//     | "quote"
//     | "bulleted_list"
//     | "numbered_list";
//   text: string;
// };
// type ButtonBlock = { type: "button"; label: string; action: string };
// export type FormattedBlock = ParagraphBlock | ButtonBlock;

// export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
//   const rendered: JSX.Element[] = [];
//   let tempList: ParagraphBlock[] = [];

//   const flushList = () => {
//     if (tempList.length === 0) return;

//     const listType = tempList[0].type;
//     const items = tempList.map((item, idx) => (
//       <li key={idx} dangerouslySetInnerHTML={{ __html: item.text }} className="text-gray-700" />
//     ));

//     if (listType === "bulleted_list") {
//       rendered.push(
//         <ul key={Math.random()} className="list-disc pl-5">
//           {items}
//         </ul>
//       );
//     } else {
//       rendered.push(
//         <ol key={Math.random()} className="list-decimal pl-5">
//           {items}
//         </ol>
//       );
//     }

//     tempList = [];
//   };

//   blocks.forEach((block, index) => {
//     if (block.type === "bulleted_list" || block.type === "numbered_list") {
//       tempList.push(block as ParagraphBlock);
//       return;
//     } else {
//       flushList();
//     }

//     if ("text" in block) {
//       switch (block.type) {
//         case "heading_1":
//           rendered.push(
//             <h1
//               key={index}
//               className="text-2xl font-bold text-gray-900"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "heading_2":
//           rendered.push(
//             <h2
//               key={index}
//               className="text-xl font-bold text-gray-800"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "heading_3":
//           rendered.push(
//             <h3
//               key={index}
//               className="text-lg font-semibold text-gray-700"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "heading_4":
//         case "subheading":
//           rendered.push(
//             <h4
//               key={index}
//               className="text-md font-medium text-blue-600"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "paragraph":
//           rendered.push(
//             <p
//               key={index}
//               className="text-base text-gray-700"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "quote":
//           rendered.push(
//             <blockquote
//               key={index}
//               className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//       }
//     } else if (block.type === "button") {
//       rendered.push(
//         <a
//           key={index}
//           href={block.action}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition"
//         >
//           {block.label}
//         </a>
//       );
//     }
//   });

//   flushList();
//   return <div className="space-y-3">{rendered}</div>;
// };

// import React from "react";
// import { marked } from "marked";

// function convertMarkdownToHtml(markdown: string): string {
//   return marked.parseInline(markdown) as string; // 👈 Cast to string
// }

// type ParagraphBlock = {
//   type:
//     | "paragraph"
//     | "heading_1"
//     | "heading_2"
//     | "heading_3"
//     | "heading_4"
//     | "subheading"
//     | "quote"
//     | "bulleted_list"
//     | "numbered_list";
//   text: string;
// };

// type ListGroupBlock = {
//   type: "bulleted_list_group" | "numbered_list_group";
//   items: { text: string }[];
// };

// type ButtonBlock = { type: "button"; label: string; action: string };

// type TableBlock = {
//   type: "table";
//   rows: string[][];
// };

// export type FormattedBlock = ParagraphBlock | ButtonBlock | ListGroupBlock | TableBlock;

// export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
//   const rendered: JSX.Element[] = [];

//   blocks.forEach((block, index) => {
//     if ("text" in block) {
//       switch (block.type) {
//         case "heading_1":
//           rendered.push(
//             <h1
//               key={index}
//               className="text-2xl font-bold text-gray-900"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "heading_2":
//           rendered.push(
//             <h2
//               key={index}
//               className="text-xl font-bold text-gray-800"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "heading_3":
//           rendered.push(
//             <h3
//               key={index}
//               className="text-lg font-semibold text-gray-700"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "heading_4":
//         case "subheading":
//           rendered.push(
//             <h4
//               key={index}
//               className="text-md font-medium text-blue-600"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "paragraph":
//           rendered.push(
//             <p
//               key={index}
//               className="text-base text-gray-700"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "quote":
//           rendered.push(
//             <blockquote
//               key={index}
//               className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
//               dangerouslySetInnerHTML={{ __html: block.text }}
//             />
//           );
//           break;
//         case "bulleted_list":
//         case "numbered_list":
//           // Fallback in case grouped list wasn't returned
//           rendered.push(
//             <ul key={index} className="list-disc pl-5">
//               <li dangerouslySetInnerHTML={{ __html: block.text }} />
//             </ul>
//           );
//           break;
//       }
//     } else if (block.type === "bulleted_list_group" || block.type === "numbered_list_group") {
//       const items = block.items.map((item, idx) => (
//         <li key={idx} className="text-gray-700">
//           <span
//             dangerouslySetInnerHTML={{
//               __html: convertMarkdownToHtml(item.text),
//             }}
//           />
//         </li>
//       ));

//       if (block.type === "bulleted_list_group") {
//         rendered.push(
//           <ul key={index} className="list-disc pl-5">
//             {items}
//           </ul>
//         );
//       } else {
//         rendered.push(
//           <ol key={index} className="list-decimal pl-5">
//             {items}
//           </ol>
//         );
//       }
//     } else if (block.type === "button") {
//       rendered.push(
//         <a
//           key={index}
//           href={block.action}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition"
//         >
//           {block.label}
//         </a>
//       );
//     } else if (block.type === "table" && "rows" in block) {
//       rendered.push(
//         <div key={index} className="overflow-x-auto max-w-full">
//           <table className="min-w-[400px] table-auto border-collapse border text-sm mt-2">
//             <tbody>
//               {block.rows.map((row, rIdx) => (
//                 <tr key={rIdx} className={rIdx === 0 ? "bg-gray-200 font-semibold" : "bg-white"}>
//                   {row.map((cell, cIdx) => (
//                     <td
//                       key={cIdx}
//                       className="border border-gray-300 px-3 py-2 text-left align-top whitespace-normal"
//                       dangerouslySetInnerHTML={{ __html: cell }}
//                     />
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     }
//   });

//   return <div className="space-y-3">{rendered}</div>;
// };

// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// type ParagraphBlock = {
//   type: "paragraph";
//   text: string;
// };

// type HeadingBlock = {
//   type: "heading_1" | "heading_2" | "heading_3" | "heading_4";
//   text: string;
// };

// type QuoteBlock = {
//   type: "quote";
//   text: string;
// };

// type ListItem = { text: string };

// type ListBlock = {
//   type: "bulleted_list_group" | "numbered_list_group";
//   items: ListItem[];
// };

// type TableBlock = {
//   type: "table";
//   rows: string[][];
// };

// export type FormattedBlock = ParagraphBlock | HeadingBlock | QuoteBlock | ListBlock | TableBlock;

// export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
//   return (
//     <div className="space-y-4 text-gray-900 text-[15px] leading-relaxed">
//       {blocks.map((block, index) => {
//         switch (block.type) {
//           case "paragraph":
//             return (
//               <p
//                 key={index}
//                 className="text-gray-900 leading-relaxed"
//                 dangerouslySetInnerHTML={{ __html: block.text }}
//               />
//             );

//           case "quote":
//             return (
//               <blockquote
//                 key={index}
//                 className="border-l-4 border-gray-400 pl-4 italic text-gray-700"
//                 dangerouslySetInnerHTML={{ __html: block.text }}
//               />
//             );

//           case "heading_1":
//           case "heading_2":
//           case "heading_3":
//           case "heading_4":
//             const level = parseInt(block.type.split("_")[1]);
//             const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
//             return (
//               <HeadingTag key={index} className={`font-bold text-gray-800 text-lg`}>
//                 <span dangerouslySetInnerHTML={{ __html: block.text }} />
//               </HeadingTag>
//             );

//           case "bulleted_list_group":
//           case "numbered_list_group":
//             const isOrdered = block.type === "numbered_list_group";
//             const ListTag = isOrdered ? "ol" : "ul";
//             return (
//               <ListTag key={index} className="ml-6 list-disc space-y-1">
//                 {block.items.map((item, i) => (
//                   <li key={i}>
//                     <span dangerouslySetInnerHTML={{ __html: item.text }} />
//                   </li>
//                 ))}
//               </ListTag>
//             );

//           case "table":
//             return (
//               <div key={index} className="overflow-x-auto">
//                 <table className="table-auto min-w-full border border-collapse border-gray-400 text-sm text-left">
//                   <tbody>
//                     {block.rows.map((row, i) => (
//                       <tr key={i}>
//                         {row.map((cell, j) => (
//                           <td
//                             key={j}
//                             className="border border-gray-300 px-3 py-1 align-top"
//                             dangerouslySetInnerHTML={{ __html: cell }}
//                           />
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             );

//           default:
//             return (
//               <p key={index} className="text-red-500 font-mono text-sm">
//                 🚨 Unknown block: {JSON.stringify(block)}
//               </p>
//             );
//         }
//       })}
//     </div>
//   );
// };

// import React from "react";
// import { FormattedBlock } from "@/types";
// import parse from "html-react-parser";

// export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
//   return (
//     <div className="space-y-4 w-full overflow-x-auto">
//       {blocks.map((block, index) => {
//         switch (block.type) {
//           case "heading":
//             const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
//             return (
//               <HeadingTag key={index} className="font-semibold text-lg md:text-xl text-gray-800">
//                 {parse(block.text)}
//               </HeadingTag>
//             );

//           case "paragraph":
//             return (
//               <p key={index} className="text-sm text-gray-700 leading-relaxed">
//                 {parse(block.text)}
//               </p>
//             );

//           case "bulleted_list_group":
//             return (
//               <ul key={index} className="list-disc list-inside text-sm text-gray-700 space-y-1">
//                 {block.items.map((item, i) => (
//                   <li key={i}>{parse(item.text)}</li>
//                 ))}
//               </ul>
//             );

//           case "numbered_list_group":
//             return (
//               <ol key={index} className="list-decimal list-inside text-sm text-gray-700 space-y-1">
//                 {block.items.map((item, i) => (
//                   <li key={i}>{parse(item.text)}</li>
//                 ))}
//               </ol>
//             );

//           case "table":
//             return (
//               <div key={index} className="overflow-x-auto">
//                 <table className="table-auto border-collapse border border-gray-400 text-sm text-left w-full min-w-[500px]">
//                   <tbody>
//                     {block.rows.map((row, i) => (
//                       <tr key={i}>
//                         {row.map((cell, j) => (
//                           <td key={j} className="border border-gray-300 px-3 py-2 align-top">
//                             {parse(cell)}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             );

//           case "button":
//             return (
//               <a
//                 key={index}
//                 href={block.action}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
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
import React, { useState } from "react";
import parse from "html-react-parser";

type ParagraphBlock = { type: "paragraph"; text: string };
type HeadingBlock = { type: "heading" | "title"; level?: number; text: string };
type ListItem = { text: string; children?: { text: string }[] };
type ListBlock = { type: "bulleted_list_group" | "numbered_list_group"; items: ListItem[] };
type TableBlock = { type: "table"; rows: string[][] };
type QuoteBlock = { type: "quote"; text: string };
type CodeBlock = { type: "code_block"; text: string };
type ButtonBlock = { type: "button"; label: string; action: string };
type ImageBlock = { type: "image"; url: string; alt?: string };

export type FormattedBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | TableBlock
  | QuoteBlock
  | CodeBlock
  | ButtonBlock
  | ImageBlock;

// 🔧 Utility to merge consecutive list blocks
function mergeListBlocks(blocks: FormattedBlock[]): FormattedBlock[] {
  const merged: FormattedBlock[] = [];
  let tempItems: ListItem[] = [];
  let currentType: "bulleted_list_group" | "numbered_list_group" | null = null;

  for (const block of blocks) {
    if (
      block.type === "numbered_list_group" ||
      block.type === "bulleted_list_group"
    ) {
      if (currentType === block.type || currentType === null) {
        tempItems.push(...block.items);
        currentType = block.type;
      } else {
        merged.push({ type: currentType, items: [...tempItems] } as ListBlock);
        tempItems = [...block.items];
        currentType = block.type;
      }
    } else {
      if (tempItems.length > 0 && currentType) {
        merged.push({ type: currentType, items: [...tempItems] } as ListBlock);
        tempItems = [];
        currentType = null;
      }
      merged.push(block);
    }
  }

  if (tempItems.length > 0 && currentType) {
    merged.push({ type: currentType, items: [...tempItems] } as ListBlock);
  }

  return merged;
}

export const RenderFormattedBlocks: React.FC<{
  blocks: FormattedBlock[];
}> = ({ blocks }) => {
  const [devMode, setDevMode] = useState(false);
  const groupedBlocks = mergeListBlocks(blocks); // 🧠 Important fix

  return (
    <div className="space-y-4 text-[15px] leading-[1.6]">
      {/* Dev Toggle UI */}
      <div className="flex justify-end items-center mb-2">
        <label className="text-sm font-semibold mr-2 text-gray-500">🔧 Dev Mode</label>
        <input
          type="checkbox"
          checked={devMode}
          onChange={() => setDevMode(!devMode)}
          className="cursor-pointer"
        />
      </div>

      {/* Dev JSON View */}
      {devMode ? (
        <pre className="whitespace-pre-wrap bg-black text-green-400 p-4 rounded-md text-sm overflow-auto max-h-[600px]">
          {JSON.stringify(blocks, null, 2)}
        </pre>
      ) : (
        groupedBlocks.map((block, index) => {
          if (block.type === "paragraph") {
            return <p key={index}>{parse(block.text)}</p>;
          }

          if (
            block.type === "heading" ||
            block.type === "title" ||
            block.type.startsWith("heading_")
          ) {
            let level = 2;
            if (block.type === "title") level = 1;
            else if (block.type.startsWith("heading_")) {
              const match = block.type.match(/^heading_(\d)$/);
              if (match) level = parseInt(match[1], 10);
            } else if ("level" in block && typeof block.level === "number") {
              level = block.level;
            }

            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            const headingText = (block as HeadingBlock).text;

            return (
              <Tag key={index} className={`font-bold text-base md:text-lg`}>
                {parse(headingText)}
              </Tag>
            );
          }

          if (block.type === "bulleted_list_group" || block.type === "numbered_list_group") {
            const ListTag = block.type === "numbered_list_group" ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`ml-4 pl-4 ${
                  block.type === "numbered_list_group" ? "list-decimal" : "list-disc"
                } space-y-2`}
              >
                {(block as ListBlock).items.map((item, idx) => (
                  <li key={idx}>
                    {parse(item.text)}
                    {item.children && (
                      <ul className="list-disc ml-6 mt-1 space-y-1 text-sm text-gray-700">
                        {item.children.map((child, cidx) => (
                          <li key={cidx}>{parse(child.text)}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ListTag>
            );
          }

          if (block.type === "table") {
            return (
              <div key={index} className="overflow-x-auto">
                <table className="table-auto border border-gray-300 w-full text-sm">
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex === 0 ? "bg-gray-100 font-semibold" : ""}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} className="border border-gray-300 px-3 py-2">
                            {parse(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          if (block.type === "quote") {
            return (
              <blockquote key={index} className="border-l-4 pl-4 italic text-gray-600">
                {parse(block.text)}
              </blockquote>
            );
          }

          if (block.type === "code_block") {
            return (
              <pre key={index} className="bg-black text-white p-3 rounded text-sm overflow-x-auto">
                <code>{block.text}</code>
              </pre>
            );
          }

          if (block.type === "button") {
            return (
              <a
                key={index}
                href={block.action}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
              >
                {block.label}
              </a>
            );
          }

          if (block.type === "image") {
            return (
              <img
                key={index}
                src={block.url}
                alt={block.alt || ""}
                className="rounded shadow max-w-full"
              />
            );
          }

          return null;
        })
      )}
    </div>
  );
};
