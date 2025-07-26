// app/articles/[id]/ArticleContent.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

export default function ArticleContent({ article }: { article: any }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-neutral-100 mb-4">{article.title}</h1>

      {article.image_url && (
        <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <div className="text-neutral-400 text-sm mb-4 flex justify-between">
        <span>By <span className="text-cyan-400">Author Name</span></span>
        <span>{new Date(article.created_at).toLocaleDateString()}</span>
      </div>

      <ReactMarkdown
        className="prose prose-invert max-w-none"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {article.content}
      </ReactMarkdown>
    </div>
  );
}