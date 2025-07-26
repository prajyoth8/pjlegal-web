// src/app/articles/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const { data: article, error } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      content,
      tags,
      image_url,
      created_at,
      created_by:users(id, email)
    `)
    .eq("id", params.id)
    .single();

  if (error || !article) return notFound();

  const authorName = article.created_by?.[0]?.email?.split("@")[0] || "Unknown Author";
  const formattedDate = new Date(article.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-4">{article.title}</h1>
        
        {/* Author and Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-neutral-400 text-sm mb-6">
          <span>By {authorName}</span>
          <span>{formattedDate}</span>
        </div>

        {/* Featured Image */}
        {article.image_url && (
          <div className="relative w-full h-64 sm:h-96 mb-8 rounded-xl overflow-hidden border border-neutral-800">
            <Image
              src={article.image_url.trim()}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}
      </header>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none text-neutral-300 mb-8 whitespace-pre-wrap">
        {article.content}
      </article>

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="text-xs px-3 py-1 bg-cyan-900/30 text-cyan-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer with Copyright */}
      <footer className="pt-6 mt-8 border-t border-neutral-800">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} PJLegal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}