import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
  const { data } = await supabase.from("articles").select("id");

  return (data ?? []).map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <ReactMarkdown
        className="prose mt-4"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {data.content}
      </ReactMarkdown>
    </div>
  );
}
