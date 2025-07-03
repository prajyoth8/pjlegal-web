import React from "react";

export type FormattedBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading_1"; text: string }
  | { type: "heading_2"; text: string }
  | { type: "heading_3"; text: string }
  | { type: "heading_4"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bulleted_list"; text: string }
  | { type: "numbered_list"; text: string }
  | { type: "quote"; text: string }
  | { type: "button"; label: string; action: string };

export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
  const rendered: React.ReactNode[] = [];
  let tempList: FormattedBlock[] = [];

  const flushList = () => {
    if (tempList.length > 0) {
      const listType = tempList[0].type;
      if (listType === "bulleted_list") {
        rendered.push(
          <ul key={rendered.length} className="list-disc pl-5">
            {tempList.map((item, idx) => (
              <li
                key={idx}
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            ))}
          </ul>
        );
      } else if (listType === "numbered_list") {
        rendered.push(
          <ol key={rendered.length} className="list-decimal pl-5">
            {tempList.map((item, idx) => (
              <li
                key={idx}
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            ))}
          </ol>
        );
      }
      tempList = [];
    }
  };

  blocks.forEach((block, index) => {
    if (block.type === "bulleted_list" || block.type === "numbered_list") {
      if (tempList.length === 0 || tempList[0].type === block.type) {
        tempList.push(block);
      } else {
        flushList();
        tempList.push(block);
      }
      return;
    } else {
      flushList();
    }

    switch (block.type) {
      case "heading_1":
        rendered.push(
          <h1 key={index} className="text-2xl font-bold text-gray-900">
            {block.text}
          </h1>
        );
        break;
      case "heading_2":
        rendered.push(
          <h2 key={index} className="text-xl font-bold text-gray-800">
            {block.text}
          </h2>
        );
        break;
      case "heading_3":
        rendered.push(
          <h3 key={index} className="text-lg font-semibold text-gray-700">
            {block.text}
          </h3>
        );
        break;
      case "heading_4":
        rendered.push(
          <h4 key={index} className="text-md font-medium text-gray-600">
            {block.text}
          </h4>
        );
        break;
      case "subheading":
        rendered.push(
          <h4 key={index} className="text-md font-medium text-blue-600">
            {block.text}
          </h4>
        );
        break;
      case "paragraph":
        rendered.push(
          <p
            key={index}
            className="text-base text-gray-700"
            dangerouslySetInnerHTML={{ __html: block.text }}
          />
        );
        break;
      case "quote":
        rendered.push(
          <blockquote
            key={index}
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
            dangerouslySetInnerHTML={{ __html: block.text }}
          />
        );
        break;
      case "button":
        rendered.push(
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
        break;
      default:
        break;
    }
  });

  flushList();

  return <div className="space-y-3">{rendered}</div>;
};
