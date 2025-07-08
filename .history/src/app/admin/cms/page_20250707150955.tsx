"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CMSPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  const [pasteText, setPasteText] = useState("");
  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteTags, setPasteTags] = useState("");

  const [articleContent, setArticleContent] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleTags, setArticleTags] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        router.push("/admin");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("is_admin,email")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        router.push("/admin");
        return;
      }

      setUserEmail(profile.email);
    };

    checkAuth();
  }, [router]);

  const handlePasteTextSubmit = async () => {
    if (!pasteText.trim()) {
      toast.error("Text content is required.");
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    const title = pasteTitle.trim() || "Untitled Legal Content";

    const { error } = await supabase.from("recent_laws").insert([
      {
        title,
        content: pasteText.trim(),
        source: "Manual Entry",
        published_date: new Date().toISOString(),
        tags: pasteTags.split(",").map((t) => t.trim()),
        created_by: session?.session?.user.id,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Failed to save legal text.");
      return;
    }

    toast.success("Legal content submitted.");
    setPasteText("");
    setPasteTitle("");
    setPasteTags("");
  };

  const handleArticleSubmit = async () => {
    if (!articleContent.trim() || !articleTitle.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    const { data: session } = await supabase.auth.getSession();

    const { error } = await supabase.from("articles").insert([
      {
        title: articleTitle.trim(),
        content: articleContent.trim(),
        tags: articleTags.split(",").map((t) => t.trim()),
        created_by: session?.session?.user.id,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Failed to submit article.");
      return;
    }

    toast.success("Article published.");
    setArticleContent("");
    setArticleTitle("");
    setArticleTags("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-300">📚 CMS Manager</h1>
            <p className="text-sm text-blue-300">
              Logged in as <span className="font-mono">{userEmail}</span>
            </p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/admin");
            }}
            className="mt-4 md:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Logout
          </button>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          {/* Paste Legal Text */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
            <h2 className="text-xl font-semibold mb-2">📄 Paste Legal Text</h2>
            <input
              type="text"
              placeholder="Title (optional)"
              value={pasteTitle}
              onChange={(e) => setPasteTitle(e.target.value)}
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <textarea
              placeholder="Paste legal content here..."
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              className="w-full h-32 p-3 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={pasteTags}
              onChange={(e) => setPasteTags(e.target.value)}
              className="w-full my-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <button
              onClick={handlePasteTextSubmit}
              className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              Submit Text
            </button>
          </div>

          {/* Paste Article / Blog */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
            <h2 className="text-xl font-semibold mb-2">📝 Paste Article / Blog</h2>
            <input
              type="text"
              placeholder="Title"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <textarea
              placeholder="Paste article or blog content here..."
              value={articleContent}
              onChange={(e) => setArticleContent(e.target.value)}
              className="w-full h-32 p-3 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={articleTags}
              onChange={(e) => setArticleTags(e.target.value)}
              className="w-full my-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <button
              onClick={handleArticleSubmit}
              className="w-full mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
            >
              Publish Article
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
