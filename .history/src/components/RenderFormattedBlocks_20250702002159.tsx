import React from "react";

export type FormattedBlock =
  | { type: "paragraph"; text: string }
  | { type: "title"; text: string }
  | { type: "heading"; text: string }
  | { type: "bulleted_list"; text: string }
  | { type: "numbered_list"; text: string }
  | { type: "quote"; text: string }
  | { type: "table_row"; text: string }
  | { type: "code"; text: string }
  | { type: "image"; url: string; caption?: string }
  | { type: "button"; label: string; action: string };

  const displayText = blocks
  .filter((b) => "text" in b)
  .map((b) => (b as { text: string }).text)
  .join(" ");


export const RenderFormattedBlocks: React.FC<{ blocks: FormattedBlock[] }> = ({ blocks }) => {
  const rendered = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "bulleted_list") {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list") {
        items.push(blocks[i].text.replace(/^[-*•+]\s/, ""));
        i++;
      }
      rendered.push(
        <ul key={i} className="list-disc list-inside text-base text-gray-700">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (block.type === "numbered_list") {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list") {
        items.push(blocks[i].text.replace(/^\d+\.\s/, ""));
        i++;
      }
      rendered.push(
        <ol key={i} className="list-decimal list-inside text-base text-gray-700">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (block.type === "table_row") {
      const rows: string[][] = [];
      while (i < blocks.length && blocks[i].type === "table_row") {
        const cells = blocks[i].text.split("|").map((cell) => cell.trim());
        rows.push(cells);
        i++;
      }
      rendered.push(
        <div key={i} className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Handle single block types
    switch (block.type) {
      case "title":
        rendered.push(
          <h1 key={i} className="text-xl font-bold text-blue-900">
            {block.text}
          </h1>
        );
        break;

      case "heading":
        rendered.push(
          <h2 key={i} className="text-lg font-semibold text-blue-800">
            {block.text}
          </h2>
        );
        break;

      case "paragraph":
        rendered.push(
          <p key={i} className="text-base text-gray-800 whitespace-pre-wrap">
            {block.text}
          </p>
        );
        break;

      case "quote":
        rendered.push(
          <blockquote
            key={i}
            className="border-l-4 border-gray-400 pl-4 italic text-gray-600"
          >
            {block.text}
          </blockquote>
        );
        break;

      case "code":
        rendered.push(
          <pre
            key={i}
            className="bg-black text-white p-3 rounded text-sm overflow-x-auto"
          >
            {block.text}
          </pre>
        );
        break;

      case "image":
        rendered.push(
          <div key={i} className="my-3">
            <img src={block.url} alt={block.caption || "image"} className="rounded shadow" />
            {block.caption && (
              <p className="text-center text-sm text-gray-500">{block.caption}</p>
            )}
          </div>
        );
        break;

      case "button":
        rendered.push(
          <a
            key={i}
            href={block.action}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            {block.label}
          </a>
        );
        break;

      default:
        break;
    }

    i++;
  }

  return <div className="space-y-3">{rendered}</div>;
};
