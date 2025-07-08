// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// type Log = {
//   id: string;
//   status: string;
//   scraped_at: string;
//   details: string;
//   source: string;
// };

// type Law = {
//   id: string;
//   title: string;
//   published_date: string;
//   source: string;
//   url: string;
// };

// type Source = {
//   id: string;
//   name: string;
//   type: string;
//   last_scraped: string | null;
// };

// export default function CMSPage() {
//   const router = useRouter();
//   const [userEmail, setUserEmail] = useState("");
//   const [logs, setLogs] = useState<Log[]>([]);
//   const [laws, setLaws] = useState<Law[]>([]);
//   const [sources, setSources] = useState<Source[]>([]);
//   const [selectedSource, setSelectedSource] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isScraping, setIsScraping] = useState(false);
//   const [activeTab, setActiveTab] = useState<"logs" | "laws">("logs");
//   const [pasteTitle, setPasteTitle] = useState("");
//   const [pasteContent, setPasteContent] = useState("");
//   const [pasteTags, setPasteTags] = useState("");

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       try {
//         const {
//           data: { session },
//           error: sessionError,
//         } = await supabase.auth.getSession();

//         if (!session || sessionError) {
//           router.push("/admin");
//           return;
//         }

//         const { data: profile, error: profileError } = await supabase
//           .from("users")
//           .select("is_admin, email")
//           .eq("id", session.user.id)
//           .single();

//         if (!profile?.is_admin || profileError) {
//           await supabase.auth.signOut();
//           router.push("/admin");
//           return;
//         }

//         setUserEmail(profile.email);

//         // Fetch all data in parallel
//         const [logsRes, lawsRes, sourcesRes] = await Promise.all([
//           supabase
//             .from("scraper_logs")
//             .select("*")
//             .order("scraped_at", { ascending: false })
//             .limit(50),
//           supabase
//             .from("recent_laws")
//             .select("*")
//             .order("created_at", { ascending: false })
//             .limit(50),
//           supabase.from("law_sources").select("*").order("name", { ascending: true }),
//         ]);

//         setLogs(logsRes.data || []);
//         setLaws(lawsRes.data || []);
//         setSources(sourcesRes.data || []);
//       } catch (error) {
//         console.error("Error loading data:", error);
//         toast.error("Failed to load data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, [router]);

//   const triggerScraper = async () => {
//     if (!selectedSource) {
//       toast.error("Please select a source first");
//       return;
//     }

//     setIsScraping(true);
//     try {
//       const response = await fetch(`/api/scrape?source=${selectedSource}`);
//       if (!response.ok) throw new Error("Scraper failed");

//       toast.success("Scraper triggered successfully!");
//       // Refresh logs after a short delay
//       setTimeout(() => {
//         supabase
//           .from("scraper_logs")
//           .select("*")
//           .order("scraped_at", { ascending: false })
//           .limit(50)
//           .then(({ data }) => {
//             if (data) setLogs(data);
//           });
//       }, 3000);
//     } catch (error) {
//       console.error("Scraper error:", error);
//       toast.error("Failed to trigger scraper");
//     } finally {
//       setIsScraping(false);
//     }
//   };

//   const handleSubmitText = async () => {
//     if (!pasteTitle.trim() || !pasteContent.trim()) {
//       toast.error("Title and content are required");
//       return;
//     }

//     try {
//       const session = (await supabase.auth.getSession()).data.session;
//       if (!session) throw new Error("No session");

//       const { error } = await supabase.from("articles").insert([
//         {
//           title: pasteTitle,
//           content: pasteContent,
//           tags: pasteTags.split(",").map((t) => t.trim()),
//           created_by: session.user.id,
//         },
//       ]);

//       if (error) throw error;

//       toast.success("Article saved!");
//       setPasteTitle("");
//       setPasteContent("");
//       setPasteTags("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save article");
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString();
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
//         <div className="animate-pulse text-2xl">Loading CMS...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
//               📚 CMS Manager
//             </h1>
//             <p className="text-blue-300">
//               Logged in as: <span className="font-mono">{userEmail}</span>
//             </p>
//           </div>
//           <button
//             onClick={async () => {
//               await supabase.auth.signOut();
//               router.push("/admin");
//             }}
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
//           >
//             Logout
//           </button>
//         </header>

//         {/* Trigger Scraper */}
//         <section className="bg-gray-800 rounded-xl p-4 border border-gray-700">
//           <h2 className="text-xl font-semibold mb-3">🛠 Trigger Scraper</h2>
//           <div className="flex flex-col md:flex-row gap-3">
//             <select
//               value={selectedSource}
//               onChange={(e) => setSelectedSource(e.target.value)}
//               className="flex-1 p-2 rounded-md bg-gray-700 border border-gray-600 text-white"
//               disabled={isScraping}
//             >
//               <option value="">Select a source...</option>
//               {sources.map((s) => (
//                 <option key={s.id} value={s.type}>
//                   {s.name}{" "}
//                   {s.last_scraped && `(last: ${new Date(s.last_scraped).toLocaleDateString()})`}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={triggerScraper}
//               disabled={!selectedSource || isScraping}
//               className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
//             >
//               {isScraping ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Running...
//                 </>
//               ) : (
//                 "Run Scraper"
//               )}
//             </button>
//           </div>
//         </section>

//         {/* Tabs for Logs/Laws */}
//         <div className="flex border-b border-gray-700">
//           <button
//             onClick={() => setActiveTab("logs")}
//             className={`px-4 py-2 font-medium ${activeTab === "logs" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}
//           >
//             📋 Scraper Logs
//           </button>
//           <button
//             onClick={() => setActiveTab("laws")}
//             className={`px-4 py-2 font-medium ${activeTab === "laws" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}
//           >
//             📜 Recent Laws
//           </button>
//         </div>

//         {/* Content based on active tab */}
//         {activeTab === "logs" ? (
//           <section className="bg-gray-800 rounded-xl p-4 border border-gray-700">
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-xl font-semibold">Scraper Logs</h2>
//               <span className="text-sm text-gray-400">{logs.length} entries</span>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-700">
//                 <thead className="bg-gray-750">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Time
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Source
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Details
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-700">
//                   {logs.map((log) => (
//                     <tr key={log.id} className="hover:bg-gray-750/50">
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                         {formatDate(log.scraped_at)}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-300">
//                         {log.source || "N/A"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 text-xs rounded-full ${
//                             log.status === "success"
//                               ? "bg-green-900 text-green-200"
//                               : "bg-red-900 text-red-200"
//                           }`}
//                         >
//                           {log.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-300 max-w-xs truncate">
//                         {log.details}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         ) : (
//           <section className="bg-gray-800 rounded-xl p-4 border border-gray-700">
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-xl font-semibold">Recent Laws</h2>
//               <span className="text-sm text-gray-400">{laws.length} entries</span>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-700">
//                 <thead className="bg-gray-750">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Title
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Published
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Source
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-700">
//                   {laws.map((law) => (
//                     <tr key={law.id} className="hover:bg-gray-750/50">
//                       <td className="px-4 py-3 text-sm font-medium text-white max-w-xs">
//                         {law.title}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                         {law.published_date
//                           ? new Date(law.published_date).toLocaleDateString()
//                           : "N/A"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-300">
//                         {law.source || "N/A"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                         {law.url && (
//                           <a
//                             href={law.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-purple-400 hover:text-purple-300"
//                           >
//                             View
//                           </a>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         )}

//         {/* Upload Legal Docs */}
//         <section className="bg-gray-800 rounded-xl p-4 border border-dashed border-gray-600">
//           <h2 className="text-xl font-semibold mb-2">📄 Upload Legal Content</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="border border-gray-700 rounded-lg p-4">
//               <h3 className="font-medium mb-2">Paste Text</h3>
//               <textarea
//                 className="w-full h-32 p-2 rounded bg-gray-700 border border-gray-600 text-white"
//                 placeholder="Paste legal text here..."
//               />
//               <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">
//                 Submit Text
//               </button>
//             </div>
//             <div className="border border-gray-700 rounded-lg p-4">
//               <h3 className="font-medium mb-2">Upload Document</h3>
//               <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
//                 <p className="text-gray-400 mb-3">Drag & drop PDF/DOCX files here</p>
//                 <input type="file" className="hidden" id="file-upload" accept=".pdf,.docx,.doc" />
//                 <label
//                   htmlFor="file-upload"
//                   className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm cursor-pointer"
//                 >
//                   Select Files
//                 </label>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }




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
<header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              📚 CMS Manager
            </h1>
            <p className="text-blue-300">
              Logged in as: <span className="font-mono">{userEmail}</span>
            </p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/admin");
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
          >
            Logout
          </button>
        </header>

        {/* Trigger Scraper */}
        <section className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h2 className="text-xl font-semibold mb-3">🛠 Trigger Scraper</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="flex-1 p-2 rounded-md bg-gray-700 border border-gray-600 text-white"
              disabled={isScraping}
            >
              <option value="">Select a source...</option>
              {sources.map((s) => (
                <option key={s.id} value={s.type}>
                  {s.name}{" "}
                  {s.last_scraped && `(last: ${new Date(s.last_scraped).toLocaleDateString()})`}
                </option>
              ))}
            </select>
            <button
              onClick={triggerScraper}
              disabled={!selectedSource || isScraping}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
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
        </section>

        {/* Tabs for Logs/Laws */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-2 font-medium ${activeTab === "logs" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}
          >
            📋 Scraper Logs
          </button>
          <button
            onClick={() => setActiveTab("laws")}
            className={`px-4 py-2 font-medium ${activeTab === "laws" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}
          >
            📜 Recent Laws
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "logs" ? (
          <section className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Scraper Logs</h2>
              <span className="text-sm text-gray-400">{logs.length} entries</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-750/50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(log.scraped_at)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-300">
                        {log.source || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            log.status === "success"
                              ? "bg-green-900 text-green-200"
                              : "bg-red-900 text-red-200"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300 max-w-xs truncate">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Recent Laws</h2>
              <span className="text-sm text-gray-400">{laws.length} entries</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {laws.map((law) => (
                    <tr key={law.id} className="hover:bg-gray-750/50">
                      <td className="px-4 py-3 text-sm font-medium text-white max-w-xs">
                        {law.title}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {law.published_date
                          ? new Date(law.published_date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-300">
                        {law.source || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {law.url && (
                          <a
                            href={law.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            View
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

        {/* Upload Legal Docs */}
        <section className="bg-gray-800 rounded-xl p-4 border border-dashed border-gray-600">
          <h2 className="text-xl font-semibold mb-2">📄 Upload Legal Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-2">Paste Text</h3>
              <textarea
                className="w-full h-32 p-2 rounded bg-gray-700 border border-gray-600 text-white"
                placeholder="Paste legal text here..."
              />
              <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">
                Submit Text
              </button>
            </div>
            <div className="border border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-2">Upload Document</h3>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <p className="text-gray-400 mb-3">Drag & drop PDF/DOCX files here</p>
                <input type="file" className="hidden" id="file-upload" accept=".pdf,.docx,.doc" />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm cursor-pointer"
                >
                  Select Files
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
        

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
