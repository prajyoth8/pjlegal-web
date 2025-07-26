// ✅ src/app/articles/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic"; // ensures fresh fetch per request

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      id,
      title,
      content,
      tags,
      image_url,
      created_at,
      created_by:users(id, email)
    `
    )
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-neutral-100 mb-4">{data.title}</h1>

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

      <div className="text-neutral-400 text-sm mb-4 flex justify-between">
        <span>By {data.created_by?.email?.split("@")[0] || "Unknown Author"}</span>
        <span>
          {new Date(data.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="prose prose-invert max-w-none text-neutral-300 mb-6 whitespace-pre-wrap">
        {data.content}
      </div>

      <div className="flex flex-wrap gap-2">
        {data.tags?.map((tag: string) => (
          <span key={tag} className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
