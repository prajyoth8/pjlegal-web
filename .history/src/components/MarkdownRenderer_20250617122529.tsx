import ReactMarkdown from "react-markdown";

const markdownComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold my-4" {...props}>
      {children}
    </h1>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-base mb-2 text-gray-700" {...props}>
      {children}
    </p>
  ),
  li: ({ children, ...props }: any) => (
    <li className="list-disc ml-6" {...props}>
      {children}
    </li>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>;
}
