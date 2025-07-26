import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ArticleDetail({ params }: { params: { id: string } }) {
  const { data: article } = await supabase
    .from('articles')
    .select('*, created_by:users(email)')
    .eq('id', params.id)
    .single()

  if (!article) return notFound()

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {article.title}
        </h1>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span>{new Date(article.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</span>
          {article.created_by && (
            <span>By {article.created_by.email.split('@')[0]}</span>
          )}
        </div>
        
        {article.image_url && (
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </header>
      
      <div className="prose dark:prose-invert max-w-none">
        {article.content}
      </div>
      
      <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} PJLegal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}