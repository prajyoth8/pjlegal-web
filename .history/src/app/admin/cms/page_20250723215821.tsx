
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AdminAuthGuard from "@/components/AdminAuthGuard";
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

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

type Article = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  image_url: string | null;
  created_at: string;
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
  
  // Article form state
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleTags, setArticleTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  // Legal document form state
  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteContent, setPasteContent] = useState("");
  const [pasteTags, setPasteTags] = useState("");

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

        const [logsRes, lawsRes, sourcesRes, articlesRes] = await Promise.all([
          supabase
            .from("scraper_logs")
            .select("*")
            .order("scraped_at", { ascending: false })
            .limit(50),
          supabase
            .from("recent_laws")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(50),
          supabase.from("law_sources").select("*").order("name", { ascending: true }),
          supabase
            .from("articles")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(50),
        ]);

        setLogs(logsRes.data || []);
        setLaws(lawsRes.data || []);
        setSources(sourcesRes.data || []);
        setArticles(articlesRes.data || []);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (document.getElementById("article-image")) {
      (document.getElementById("article-image") as HTMLInputElement).value = "";
    }
  };

  const handleSubmitArticle = async () => {
  if (!articleTitle.trim() || !articleContent.trim()) {
    toast.error("Title and content are required");
    return;
  }

  setIsUploading(true);
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (!session || sessionError) {
      throw new Error(sessionError?.message || "Not authenticated");
    }

    let imageUrl = null;
    
    if (imageFile) {
      // Validate image
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(imageFile.type)) {
        throw new Error("Only JPEG, PNG, and WebP images are allowed");
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error("Image size must be less than 5MB");
      }

      // Upload image
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `thumbnails/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("article-images")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("article-images")
        .getPublicUrl(filePath);
      
      imageUrl = urlData.publicUrl;
    }

    // Insert article
    const { error } = await supabase.from("articles").insert([{
      title: articleTitle,
      content: articleContent,
      tags: articleTags.split(",").map((t) => t.trim()).filter(Boolean),
      image_url: imageUrl,
      created_by: session.user.id,
    }]);

    if (error) throw error;

    toast.success("Article published successfully!");
    setArticleTitle("");
    setArticleContent("");
    setArticleTags("");
    setImageFile(null);
    setImagePreview(null);

    // Refresh articles list
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    setArticles(data || []);

  } catch (err: unknown) {
    let errorMessage = "Failed to publish article";
    
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    } else if (err && typeof err === 'object' && 'message' in err) {
      errorMessage = String(err.message);
    }

    console.error("Publishing error:", err);
    toast.error(errorMessage);
  } finally {
    setIsUploading(false);
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

      // Refresh laws list
      const { data } = await supabase
        .from("recent_laws")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      setLaws(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save legal text");
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-transparent border-t-emerald-400 rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-300 font-medium">Initializing CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        {/* Header */}
        <header className="border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm sm:text-base">Dashboard</span>
            </button>
            <div className="text-center">
              <h1 className="text-lg sm:text-xl md:text-2xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                Legal Content Hub
              </h1>
              <p className="text-xs text-neutral-400 mt-1 truncate max-w-[150px] sm:max-w-none mx-auto">
                Welcome, {userEmail}
              </p>
            </div>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/admin");
              }}
              className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium rounded-full border border-neutral-700 hover:bg-neutral-800/50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {/* Article Creation Section - Now at the top */}
          <section className="mb-6 bg-neutral-900 rounded-xl border border-neutral-800 shadow-lg overflow-hidden">
            <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-neutral-800">
              <h3 className="text-sm sm:text-base font-medium text-neutral-200">
                Create New Article/Blog Post
              </h3>
            </div>
            <div className="p-4 sm:p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Article title"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-cyan-400 focus:ring-cyan-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your article content here..."
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-cyan-400 focus:ring-cyan-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200 min-h-[150px]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="legal, analysis, etc."
                    value={articleTags}
                    onChange={(e) => setArticleTags(e.target.value)}
                    className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-cyan-400 focus:ring-cyan-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1">
                    Thumbnail Image
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer flex items-center gap-2 text-xs sm:text-sm text-neutral-300 bg-neutral-800 hover:bg-neutral-700/50 border border-neutral-700 rounded-lg px-3 py-2 transition-colors">
                      <ImagePlus className="w-4 h-4" />
                      {imageFile ? "Change Image" : "Upload Image"}
                      <input
                        id="article-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {imageFile && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="text-xs sm:text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden border border-neutral-700">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSubmitArticle}
                  disabled={isUploading}
                  className="w-full flex justify-center items-center py-2 px-4 sm:py-2.5 sm:px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    "Publish Article"
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Scraper Section */}
          <section className="mb-6">
            <div className="bg-neutral-900 rounded-xl p-4 sm:p-5 border border-neutral-800 shadow-lg">
              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-light text-neutral-200">
                    Automated Content Scraper
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Fetch legal documents from external sources
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-emerald-400 focus:ring-emerald-400/30 text-sm py-2 px-3 border shadow-sm"
                    disabled={isScraping}
                  >
                    <option value="">Select source...</option>
                    {sources.map((s) => (
                      <option key={s.id} value={s.type}>
                        {s.name}{" "}
                        {s.last_scraped &&
                          `(last: ${new Date(s.last_scraped).toLocaleDateString()})`}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={triggerScraper}
                    disabled={!selectedSource || isScraping}
                    className="inline-flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] transition-all duration-200 hover:shadow-emerald-500/20"
                  >
                    {isScraping ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Running...
                      </>
                    ) : (
                      "Run Scraper"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Content Tabs */}
          <div className="mb-4 sm:mb-6">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab("logs")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === "logs"
                    ? "bg-neutral-800 text-emerald-400 shadow"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                }`}
              >
                Scraper Logs
              </button>
              <button
                onClick={() => setActiveTab("laws")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === "laws"
                    ? "bg-neutral-800 text-emerald-400 shadow"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                }`}
              >
                Recent Laws
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "logs" ? (
            <section className="mb-6 bg-neutral-900 rounded-xl border border-neutral-800 shadow-lg overflow-hidden">
              <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="text-sm sm:text-base font-medium text-neutral-200">
                  Scraper Activity
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-400">
                  {logs.length} entries
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800">
                  <thead className="bg-neutral-800/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-5 sm:py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-5 sm:py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-5 sm:py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {logs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-neutral-800/30 transition-colors duration-150"
                      >
                        <td className="px-3 py-2 sm:px-5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-neutral-300">
                          {formatDate(log.scraped_at)}
                        </td>
                        <td className="px-3 py-2 sm:px-5 sm:py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${
                              log.status === "success"
                                ? "bg-emerald-900/50 text-emerald-400"
                                : "bg-red-900/50 text-red-400"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 sm:px-5 sm:py-4 text-xs sm:text-sm text-neutral-400 max-w-[150px] sm:max-w-xs truncate">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <section className="mb-6 bg-neutral-900 rounded-xl border border-neutral-800 shadow-lg overflow-hidden">
              <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="text-sm sm:text-base font-medium text-neutral-200">
                  Legal Documents
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-400">
                  {laws.length} entries
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800">
                  <thead className="bg-neutral-800/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-5 sm:py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 sm:px-5 sm:py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {laws.map((law) => (
                      <tr
                        key={law.id}
                        className="hover:bg-neutral-800/30 transition-colors duration-150"
                      >
                        <td className="px-3 py-2 sm:px-5 sm:py-4 text-xs sm:text-sm font-medium text-neutral-200 max-w-[200px] sm:max-w-xs truncate">
                          {law.title}
                        </td>
                        <td className="px-3 py-2 sm:px-5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-neutral-400">
                          {law.url && (
                            <a
                              href={law.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                              <span className="hidden sm:inline">Source</span>
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Legal Document Creation Section */}
          <section className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-lg overflow-hidden">
            <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-neutral-800">
              <h3 className="text-sm sm:text-base font-medium text-neutral-200">
                Manual Legal Document Entry
              </h3>
            </div>
            <div className="p-4 sm:p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Document title"
                    value={pasteTitle}
                    onChange={(e) => setPasteTitle(e.target.value)}
                    className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-emerald-400 focus:ring-emerald-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1">
                    Content
                  </label>
                  <textarea
                    placeholder="Paste legal content here..."
                    value={pasteContent}
                    onChange={(e) => setPasteContent(e.target.value)}
                    className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-emerald-400 focus:ring-emerald-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200 min-h-[150px]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="contract, regulation, etc."
                    value={pasteTags}
                    onChange={(e) => setPasteTags(e.target.value)}
                    className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-emerald-400 focus:ring-emerald-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200"
                  />
                </div>
                <button
                  onClick={handleSubmitText}
                  className="w-full flex justify-center py-2 px-4 sm:py-2.5 sm:px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
                >
                  Save Legal Document
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AdminAuthGuard>
  );
}