// ✅ app/articles/[id]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Published: {new Date(data.created_at).toDateString()}</p>

      <div className="prose prose-neutral prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
      </div>

      {/* 🔗 Back link */}
      <div className="mt-10">
        <Link
          href="/insights?type=articles"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to all articles
        </Link>
      </div>
    </main>
  );
}
