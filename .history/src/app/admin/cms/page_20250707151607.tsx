"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Log = {
  id: string;
  status: string;
  scraped_at: string;
  details: string;
  source: string;
};

type Law = {
  id: string;
  title: string;
  published_date: string;
  source: string;
  url: string;
};

type Source = {
  id: string;
  name: string;
  type: string;
  last_scraped: string | null;
};

export default function CMSPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [logs, setLogs] = useState<Log[]>([]);
  const [laws, setLaws] = useState<Law[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  const [activeTab, setActiveTab] = useState<"logs" | "laws">("logs");
  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteContent, setPasteContent] = useState("");
  const [pasteTags, setPasteTags] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleTags, setArticleTags] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (!session || sessionError) {
          router.push("/admin");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("is_admin, email")
          .eq("id", session.user.id)
          .single();

        if (!profile?.is_admin || profileError) {
          await supabase.auth.signOut();
          router.push("/admin");
          return;
        }

        setUserEmail(profile.email);

        const [logsRes, lawsRes, sourcesRes] = await Promise.all([
          supabase.from("scraper_logs").select("*").order("scraped_at", { ascending: false }).limit(50),
          supabase.from("recent_laws").select("*").order("created_at", { ascending: false }).limit(50),
          supabase.from("law_sources").select("*").order("name", { ascending: true }),
        ]);

        setLogs(logsRes.data || []);
        setLaws(lawsRes.data || []);
        setSources(sourcesRes.data || []);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const triggerScraper = async () => {
    if (!selectedSource) {
      toast.error("Please select a source first");
      return;
    }

    setIsScraping(true);
    try {
      const response = await fetch(`/api/scrape?source=${selectedSource}`);
      if (!response.ok) throw new Error("Scraper failed");

      toast.success("Scraper triggered successfully!");
      setTimeout(() => {
        supabase
          .from("scraper_logs")
          .select("*")
          .order("scraped_at", { ascending: false })
          .limit(50)
          .then(({ data }) => {
            if (data) setLogs(data);
          });
      }, 3000);
    } catch (error) {
      console.error("Scraper error:", error);
      toast.error("Failed to trigger scraper");
    } finally {
      setIsScraping(false);
    }
  };

  const handleSubmitText = async () => {
    if (!pasteTitle.trim() || !pasteContent.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error("No session");

      const { error } = await supabase.from("recent_laws").insert([
        {
          title: pasteTitle,
          content: pasteContent,
          tags: pasteTags.split(",").map((t) => t.trim()),
          source: "Manual Entry",
          published_date: new Date().toISOString(),
          created_by: session.user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Legal content saved!");
      setPasteTitle("");
      setPasteContent("");
      setPasteTags("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save legal text");
    }
  };

  const handleSubmitArticle = async () => {
    if (!articleTitle.trim() || !articleContent.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error("No session");

      const { error } = await supabase.from("articles").insert([
        {
          title: articleTitle,
          content: articleContent,
          tags: articleTags.split(",").map((t) => t.trim()),
          created_by: session.user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Article/blog published!");
      setArticleTitle("");
      setArticleContent("");
      setArticleTags("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish article");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading CMS...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* [rest of the CMS remains unchanged up to the Upload Legal Docs section] */}

        {/* Paste Text + Paste Article/Blog Section */}
        <section className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">📝 Manual Entry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paste Legal Text */}
            <div>
              <h3 className="font-medium mb-2">📄 Paste Legal Text</h3>
              <input
                type="text"
                placeholder="Title"
                value={pasteTitle}
                onChange={(e) => setPasteTitle(e.target.value)}
                className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <textarea
                placeholder="Paste legal content here..."
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
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
                onClick={handleSubmitText}
                className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Submit Legal Text
              </button>
            </div>

            {/* Paste Article/Blog */}
            <div>
              <h3 className="font-medium mb-2">📰 Paste Article / Blog</h3>
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
                onClick={handleSubmitArticle}
                className="w-full mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
              >
                Publish Article / Blog
              </button>
            </div>
          </div>
        </section>

        {/* [rest of CMS page continues if any] */}
      </div>
    </div>
  );
}
