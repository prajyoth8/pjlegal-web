// ✅ src/app/articles/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // ✅ To support tables, strikethrough, etc.

export const dynamic = "force-dynamic"; // always fetch latest

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
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

  if (error || !data) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-6 leading-tight">{data.title}</h1>

      {/* Image */}
      {data.image_url && (
        <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
          <Image
            src={data.image_url.trim()}
            alt={data.title}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>
      )}

      {/* Meta Info */}
      <div className="text-sm text-neutral-400 mb-6 flex justify-between items-center">
        <span>
          By <span className="text-cyan-400 font-medium">Adv. R. Prajyoth Kumar</span> {/* 🔒 Hardcoded */}
        </span>
        <span>
          {new Date(data.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Full Article Content */}
      <article className="prose prose-invert prose-p:leading-relaxed prose-headings:font-semibold text-neutral-700 max-w-none mb-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
      </article>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {data.tags?.map((tag: string) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
