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
  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading_1":
            return (
              <h1 key={index} className="text-2xl font-bold text-gray-900">
                {block.text}
              </h1>
            );
          case "heading_2":
            return (
              <h2 key={index} className="text-xl font-bold text-gray-800">
                {block.text}
              </h2>
            );
          case "heading_3":
            return (
              <h3 key={index} className="text-lg font-semibold text-gray-700">
                {block.text}
              </h3>
            );
          case "heading_4":
            return (
              <h4 key={index} className="text-md font-medium text-gray-600">
                {block.text}
              </h4>
            );
          case "subheading":
            return (
              <h4 key={index} className="text-md font-medium text-blue-600">
                {block.text}
              </h4>
            );
          case "paragraph":
            return (
              <p
                key={index}
                className="text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            );
          case "bulleted_list":
            return (
              <ul key={index} className="list-disc pl-5">
                <li className="text-gray-700" dangerouslySetInnerHTML={{ __html: block.text }} />
              </ul>
            );
          case "numbered_list":
            return (
              <ol key={index} className="list-decimal pl-5">
                <li className="text-gray-700" dangerouslySetInnerHTML={{ __html: block.text }} />
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            );
          case "button":
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
          default:
            return null;
        }
      })}
    </div>
  );
};
