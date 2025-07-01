import React from "react";

export type FormattedBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bullet"; text: string }
  | { type: "quote"; text: string }
  | { type: "code"; text: string }
  | { type: "image"; url: string; caption?: string }
  | { type: "button"; label: string; action: string };

export default function RenderFormattedBlocks({ blocks }: { blocks: FormattedBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return <h2 key={i} className="text-lg font-bold text-amber-700">{block.text}</h2>;
          case "subheading":
            return <h3 key={i} className="text-base font-semibold text-amber-600">{block.text}</h3>;
          case "paragraph":
            return <p key={i} className="text-sm">{block.text}</p>;
          case "bullet":
            return (
              <ul key={i} className="list-disc list-inside text-sm">
                <li>{block.text}</li>
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-amber-400 pl-4 italic text-gray-600">
                {block.text}
              </blockquote>
            );
          case "code":
            return (
              <pre key={i} className="bg-gray-800 text-white p-3 rounded text-xs overflow-x-auto">
                <code>{block.text}</code>
              </pre>
            );
          case "image":
            return (
              <div key={i} className="my-3">
                <img src={block.url} alt={block.caption || "Image"} className="rounded shadow-md" />
                {block.caption && <p className="text-xs text-center text-gray-500 mt-1">{block.caption}</p>}
              </div>
            );
          case "button":
            return (
              <a
                key={i}
                href={block.action}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-amber-600 transition"
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
}
