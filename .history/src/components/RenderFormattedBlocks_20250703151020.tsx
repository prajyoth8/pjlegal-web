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

import React from "react";

type TextBlock = {
  type:
    | "paragraph"
    | "heading_1"
    | "heading_2"
    | "heading_3"
    | "heading_4"
    | "subheading"
    | "quote";
  text: string;
};

type ListItem = {
  type: "list_item";
  text: string;
  list_type: "ordered" | "unordered";
  items?: ListItem[];
};

type ListBlock = {
  type: "ordered_list" | "unordered_list";
  items: (ListItem | ListBlock)[];
};

type ButtonBlock = {
  type: "button";
  label: string;
  action: string;
};

export type FormattedBlock = TextBlock | ListBlock | ButtonBlock;

const RenderListItem: React.FC<{ item: ListItem | ListBlock; depth?: number }> = ({
  item,
  depth = 0,
}) => {
  if ("list_type" in item) {
    // This is a list item
    return (
      <li className={`text-gray-700 ${depth > 0 ? "pl-4" : ""}`}>
        <span dangerouslySetInnerHTML={{ __html: item.text }} />
        {item.items && (
          <RenderList
            items={item.items}
            type={item.list_type === "ordered" ? "ordered_list" : "unordered_list"}
            depth={depth + 1}
          />
        )}
      </li>
    );
  }
  // This is a nested list block
  return <RenderList items={item.items} type={item.type} depth={depth} />;
};

const RenderList: React.FC<{
  items: (ListItem | ListBlock)[];
  type: "ordered_list" | "unordered_list";
  depth?: number;
}> = ({ items, type, depth = 0 }) => {
  const ListTag = type === "ordered_list" ? "ol" : "ul";
  // Update list styling for better nesting
  const listClass =
    type === "ordered_list" ? `list-decimal pl-${depth * 4}` : `list-disc pl-${depth * 4}`;

  return (
    <ListTag className={`${listClass} ${depth > 0 ? "pl-4" : ""}`}>
      {items.map((item, idx) => (
        <RenderListItem key={idx} item={item} depth={depth} />
      ))}
    </ListTag>
  );
};

export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        // Text blocks (paragraphs, headings, quotes)
        if ("text" in block) {
          switch (block.type) {
            case "heading_1":
              return (
                <h1
                  key={index}
                  className="text-2xl font-bold text-gray-900"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            case "heading_2":
              return (
                <h2
                  key={index}
                  className="text-xl font-bold text-gray-800"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            case "heading_3":
              return (
                <h3
                  key={index}
                  className="text-lg font-semibold text-gray-700"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            case "heading_4":
            case "subheading":
              return (
                <h4
                  key={index}
                  className="text-md font-medium text-blue-600"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            case "paragraph":
              return (
                <p
                  key={index}
                  className="text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            case "quote":
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            default:
              return null;
          }
        }

        // List blocks
        if (block.type === "ordered_list" || block.type === "unordered_list") {
          return <RenderList key={index} items={block.items} type={block.type} />;
        }

        // Button blocks
        if (block.type === "button") {
          return (
            <a
              key={index}
              href={block.action}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition"
            >
              {block.label}
            </a>
          );
        }

        return null;
      })}
    </div>
  );
};
