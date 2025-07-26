import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

export default function ArticleContent({ article }: { article: any }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-semibold text-neutral-100 mb-4">{article.title}</h1>
    
          {/* Thumbnail */}
          {article.image_url && (
            <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
              <Image
                src={article.image_url.trim()}
                alt={article.title}
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized
              />
            </div>
          )}
    
          {/* Metadata */}
          <div className="text-neutral-400 text-sm mb-4 flex justify-between">
            <span>
              By{' '}
              <span className="text-cyan-400 font-medium hover:underline">
                Adv. R. Prajyoth Kumar
              </span>
            </span>
            <span>
              {new Date(article.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
    
          {/* Article Content */}
          <ReactMarkdown
            className="prose prose-invert max-w-none text-neutral-100 mb-6"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {article.content}
          </ReactMarkdown>
    
          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
    
          {/* Social Share */}
          <div className="flex gap-4 mt-10 border-t border-neutral-800 pt-6">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                article.title
              )}&url=${encodeURIComponent(
                `https://pjlegal.in/articles/${article.id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `https://pjlegal.in/articles/${article.id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Share on LinkedIn
            </a>
          </div>
    
          {/* Related Articles */}
          <div className="mt-12 border-t border-neutral-800 pt-6">
            <h3 className="text-xl font-semibold text-neutral-100 mb-4">
              Related Articles
            </h3>
            <ul className="list-disc pl-5 text-neutral-300 space-y-2">
              <li>
                <a href="/articles/xyz123" className="text-cyan-400 hover:underline">
                  Supreme Court's Take on Platform Workers (2025)
                </a>
              </li>
              <li>
                <a href="/articles/abc456" className="text-cyan-400 hover:underline">
                  Gig Economy Reforms in Karnataka Announced
                </a>
              </li>
            </ul>
          </div>
    
          {/* Navigation Links */}
          <div className="flex justify-between items-center mt-10 text-sm text-neutral-400">
            <a href="/insights?type=articles" className="hover:text-cyan-400">
              &larr; Back to All Articles
            </a>
          </div>
        </div>
  );
}