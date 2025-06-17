import React from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";

const markdownComponents: Components = {
  h1: ({ node, children, ...props }) => (
    <h1 className="text-3xl font-bold my-4" {...props}>
      {children}
    </h1>
  ),
  p: ({ node, children, ...props }) => (
    <p className="text-base text-gray-800 mb-2" {...props}>
      {children}
    </p>
  ),
  li: ({ node, children, ...props }) => (
    <li className="list-disc ml-6" {...props}>
      {children}
    </li>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>;
}
