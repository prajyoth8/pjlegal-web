"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ArticleClientRenderer from "./ArticleClientRenderer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ArticleClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [article, setArticle] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.replace("/insights?type=articles");
      return;
    }

    const fetchData = async () => {
      const { data: articleData } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      const { data: relatedArticles } = await supabase
        .from("articles")
        .select("*")
        .neq("id", id)
        .limit(3);

      setArticle(articleData);
      setRelated(relatedArticles || []);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (!id || loading) return null;

  return <ArticleClientRenderer article={article} related={related} />;
}
