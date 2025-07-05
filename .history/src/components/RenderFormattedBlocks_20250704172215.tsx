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





import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

type HeadingBlock = {
  type: "heading_1" | "heading_2" | "heading_3" | "heading_4";
  text: string;
};

type QuoteBlock = {
  type: "quote";
  text: string;
};

type ListItem = { text: string };

type ListBlock = {
  type: "bulleted_list_group" | "numbered_list_group";
  items: ListItem[];
};

type TableBlock = {
  type: "table";
  rows: string[][];
};

export type FormattedBlock = ParagraphBlock | HeadingBlock | QuoteBlock | ListBlock | TableBlock;

export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
  return (
    <div className="space-y-4 text-gray-900 text-[15px] leading-relaxed">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-gray-900 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-gray-400 pl-4 italic text-gray-700"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            );

          case "heading_1":
          case "heading_2":
          case "heading_3":
          case "heading_4":
            const level = parseInt(block.type.split("_")[1]);
            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag key={index} className={`font-bold text-gray-800 text-lg`}>
                <span dangerouslySetInnerHTML={{ __html: block.text }} />
              </HeadingTag>
            );

          case "bulleted_list_group":
          case "numbered_list_group":
            const isOrdered = block.type === "numbered_list_group";
            const ListTag = isOrdered ? "ol" : "ul";
            return (
              <ListTag key={index} className="ml-6 list-disc space-y-1">
                {block.items.map((item, i) => (
                  <li key={i}>
                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  </li>
                ))}
              </ListTag>
            );

          case "table":
            return (
              <div key={index} className="overflow-x-auto">
                <table className="table-auto min-w-full border border-collapse border-gray-400 text-sm text-left">
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="border border-gray-300 px-3 py-1 align-top"
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return (
              <p key={index} className="text-red-500 font-mono text-sm">
                🚨 Unknown block: {JSON.stringify(block)}
              </p>
            );
        }
      })}
    </div>
  );
};
