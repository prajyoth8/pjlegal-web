import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

export default function ArticleContent({ article }: { article: any }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Your existing JSX using article prop */}
      <h1 className="text-3xl font-semibold text-neutral-100 mb-4">{article.title}</h1>
      {/* ... */}
    </div>
  );
}