// components/MarkdownRenderer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold my-4" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="text-base text-gray-800 mb-2" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="list-disc ml-6" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
