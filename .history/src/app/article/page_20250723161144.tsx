"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ArticleClientPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [article, setArticle] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      setArticle(data);

      const { data: allArticles } = await supabase
        .from("articles")
        .select("*")
        .neq("id", id)
        .limit(3);
      setRelated(allArticles || []);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading article...</div>;
  if (!article) return <div className="p-10 text-red-600">Article not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* 🔙 Back */}
      <Link
        href="/insights?type=articles"
        className="inline-flex items-center text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Articles
      </Link>

      {/* 🖼️ Image */}
      {article.image_url && (
        <img
          src={article.image_url}
          alt="Article Image"
          className="w-full max-h-[400px] object-cover mb-6 rounded-xl shadow"
        />
      )}

      {/* 📌 Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{article.title}</h1>

      {/* 🧑 Author & Date */}
      <p className="text-sm text-gray-600 mb-6">
        By <span className="font-medium">{article.author || "PJ Legal"}</span> •{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>

      {/* 📝 Content */}
      <div className="prose prose-lg prose-blue max-w-none mb-10">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>

      {/* 📤 Share Buttons */}
      <div className="flex items-center space-x-3 mb-12">
        <span className="text-sm font-semibold text-gray-600">Share:</span>
        <FacebookShareButton url={currentURL} quote={article.title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={currentURL} title={article.title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={currentURL} title={article.title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={currentURL} title={article.title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      {/* 📚 Related Articles */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {related.map((item) => (
            <Link
              key={item.id}
              href={`/article?id=${item.id}`}
              className="block bg-white shadow hover:shadow-lg rounded-lg p-5 border border-gray-100 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
