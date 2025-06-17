// src/components/MarkdownRenderer.tsx
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold" {...props} />
        ),
        p: ({ node, ...props }) => <p className="mb-2" {...props} />,
        li: ({ node, ...props }) => (
          <li className="list-disc ml-5" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
