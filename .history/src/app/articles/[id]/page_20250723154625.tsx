// ✅ src/app/articles/[id]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { Share2 } from "lucide-react";

export const dynamic = "force-dynamic"; // ✅ always fetch latest article

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ArticlePage({ params }: { params?: { id?: string } }) {
  const articleId = params?.id;

  if (!articleId) return notFound();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .single();

  if (error || !data) return notFound();

  const formattedDate = new Date(data.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/articles/${articleId}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">{data.title}</h1>

      {/* Thumbnail Image */}
      {data.image_url && (
        <div className="relative w-full h-64 md:h-80 mb-6 rounded-xl overflow-hidden">
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
      <div className="text-neutral-400 text-sm mb-4 flex justify-between items-center flex-wrap gap-2">
        <span>By <strong>PJ Legal (R. Prajyoth Kumar)</strong></span>
        <span>{formattedDate}</span>
      </div>

      {/* Content */}
      <article className="prose prose-invert max-w-none text-neutral-300 mb-8 whitespace-pre-wrap leading-relaxed tracking-wide">
        {data.content}
      </article>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.tags?.map((tag: string) => (
          <span key={tag} className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Social Share */}
      <div className="flex items-center gap-4 text-neutral-400 mb-10">
        <Share2 className="w-4 h-4" />
        <span className="text-sm">Share this article:</span>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(data.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Twitter
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(data.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          LinkedIn
        </a>
      </div>

      {/* Back Link */}
      <div className="mt-10">
        <Link
          href="/insights?type=articles"
          className="text-sm text-cyan-400 hover:underline transition"
        >
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}
