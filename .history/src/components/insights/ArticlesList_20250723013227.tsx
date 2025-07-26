// src/components/insights/ArticlesList.tsx
import Link from 'next/link'
import Image from 'next/image'

type Article = {
  id: string
  title: string
  content: string
  tags?: string[]
  image_url?: string | null
  created_at: string
  created_by?: {
    email: string
  } | null
}

export default function ArticlesList({ articles }: { articles: Article[] }) {
  function formatDate(dateString: string | Date): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <article 
          key={article.id} 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Image thumbnail */}
          {article.image_url && (
            <div className="relative h-48 w-full">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          
          <div className="p-6">
            {/* Article title linking to detail page */}
            <Link href={`/articles/${article.id}`} className="group">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                {article.title}
              </h3>
            </Link>
            
            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {article.content.substring(0, 150)}...
            </p>
            
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Date and author */}
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{formatDate(article.created_at)}</span>
              {article.created_by?.email && (
                <span>By {article.created_by.email.split('@')[0]}</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}