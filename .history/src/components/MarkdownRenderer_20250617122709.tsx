import React from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm"; // Optional for tables, task lists, etc.

const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-3xl font-bold my-4 text-neutral-800 dark:text-white"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-2xl font-semibold my-3 text-neutral-700 dark:text-white"
      {...props}
    >
      {children}
    </h2>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base text-gray-700 dark:text-gray-300 mb-3" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 text-sm px-1 py-0.5 rounded"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-gray-900 text-white p-4 rounded mb-4 overflow-x-auto"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-400 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 my-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
