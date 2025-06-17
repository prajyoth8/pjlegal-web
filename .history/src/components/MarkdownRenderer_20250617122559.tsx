import ReactMarkdown from "react-markdown";
import type { ComponentPropsWithoutRef } from "react";

const markdownComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-3xl font-bold my-4" {...props}>
      {children}
    </h1>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className="text-base text-gray-700 mb-2" {...props}>
      {children}
    </p>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className="list-disc ml-6" {...props}>
      {children}
    </li>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
  );
}
