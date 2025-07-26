// app/articles/[id]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export const dynamic = "auto"; // or "force-static"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Optional but recommended to eliminate the warning
export async function generateStaticParams() {
  const { data } = await supabase.from("articles").select("id");
  return data?.map((article) => ({ id: article.id })) || [];
}

export default async function ArticlePage(props: { params: { id: string } }) {
  const articleId = props.params.id;

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .single();

  if (!data || error) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on: {new Date(data.created_at).toLocaleDateString()}
      </p>

      <div className="prose prose-neutral prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
      </div>

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
