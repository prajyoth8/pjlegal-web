// ✅ app/articles/[id]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

// ✅ Create Supabase client directly
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Fix for "params.id must be awaited" warning
export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: "Article",
  };
}

type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const articleId = params.id;

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .single();

  if (error || !data) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on: {new Date(data.created_at).toLocaleDateString()}
      </p>

      {/* ✅ Markdown Content */}
      <div className="prose prose-neutral prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
      </div>

      {/* 🔗 Back to articles */}
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
