// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";

// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import AdminAuthGuard from "@/components/AdminAuthGuard";
// import { Link } from "lucide-react";
// import { ArrowLeft } from "lucide-react";

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
//   const [articleTitle, setArticleTitle] = useState("");
//   const [articleContent, setArticleContent] = useState("");
//   const [articleTags, setArticleTags] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

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

//       const { error } = await supabase.from("recent_laws").insert([
//         {
//           title: pasteTitle,
//           content: pasteContent,
//           tags: pasteTags.split(",").map((t) => t.trim()),
//           source: "Manual Entry",
//           published_date: new Date().toISOString(),
//           created_by: session.user.id,
//         },
//       ]);

//       if (error) throw error;

//       toast.success("Legal content saved!");
//       setPasteTitle("");
//       setPasteContent("");
//       setPasteTags("");

//       // Refresh laws list
//       const { data } = await supabase
//         .from("recent_laws")
//         .select("*")
//         .order("created_at", { ascending: false })
//         .limit(50);
//       setLaws(data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save legal text");
//     }
//   };

//   const handleSubmitArticle = async () => {
//     if (!articleTitle.trim() || !articleContent.trim()) {
//       toast.error("Title and content are required");
//       return;
//     }

//     try {
//       const session = (await supabase.auth.getSession()).data.session;
//       if (!session) throw new Error("No session");

//       const { error } = await supabase.from("articles").insert([
//         {
//           title: articleTitle,
//           content: articleContent,
//           tags: articleTags.split(",").map((t) => t.trim()),
//           created_by: session.user.id,
//         },
//       ]);

//       if (error) throw error;

//       toast.success("Article/blog published!");
//       setArticleTitle("");
//       setArticleContent("");
//       setArticleTags("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to publish article");
//     }
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     setIsUploading(true);
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Upload failed");

//       const data = await response.json();
//       toast.success(`File uploaded successfully: ${data.filename}`);
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("Failed to upload file");
//     } finally {
//       setIsUploading(false);
//       e.target.value = ""; // Reset file input
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString();
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="flex flex-col items-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//           <p className="text-gray-700 font-medium">Loading CMS Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AdminAuthGuard>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <header className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//             <button
//               onClick={() => router.push("/admin/dashboard")}
//               className="mb-6 flex items-center space-x-2 text-blue-600 hover:underline"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>Back to Dashboard</span>
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Legal Content Management</h1>
//               <p className="text-sm text-gray-500">Welcome back, {userEmail}</p>
//             </div>

//             <button
//               onClick={async () => {
//                 await supabase.auth.signOut();
//                 router.push("/admin");
//               }}
//               className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
//             >
//               Sign out
//             </button>
//           </div>
//         </header>

//         <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//           {/* Scraper Section */}
//           <section className="mb-8">
//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                 <div>
//                   <h2 className="text-lg font-medium text-gray-900">Content Scraper</h2>
//                   <p className="text-sm text-gray-500">
//                     Automatically fetch legal content from external sources
//                   </p>
//                 </div>
//                 <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
//                   <select
//                     value={selectedSource}
//                     onChange={(e) => setSelectedSource(e.target.value)}
//                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border bg-white"
//                     disabled={isScraping}
//                   >
//                     <option value="">Select a source...</option>
//                     {sources.map((s) => (
//                       <option key={s.id} value={s.type}>
//                         {s.name}{" "}
//                         {s.last_scraped &&
//                           `(last: ${new Date(s.last_scraped).toLocaleDateString()})`}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={triggerScraper}
//                     disabled={!selectedSource || isScraping}
//                     className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
//                   >
//                     {isScraping ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Running...
//                       </>
//                     ) : (
//                       "Run Scraper"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Content Tabs */}
//           <div className="mb-6 border-b border-gray-200">
//             <nav className="-mb-px flex space-x-8">
//               <button
//                 onClick={() => setActiveTab("logs")}
//                 className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === "logs"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 Scraper Logs
//               </button>
//               <button
//                 onClick={() => setActiveTab("laws")}
//                 className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === "laws"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 Recent Laws
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           {activeTab === "logs" ? (
//             <section className="mb-8 bg-white shadow rounded-lg overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                 <h3 className="text-lg font-medium text-gray-900">Scraper Activity</h3>
//                 <span className="text-sm text-gray-500">{logs.length} entries</span>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Time
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Source
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Status
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Details
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {logs.map((log) => (
//                       <tr key={log.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {formatDate(log.scraped_at)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
//                           {log.source || "N/A"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               log.status === "success"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {log.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
//                           {log.details}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           ) : (
//             <section className="mb-8 bg-white shadow rounded-lg overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                 <h3 className="text-lg font-medium text-gray-900">Legal Documents</h3>
//                 <span className="text-sm text-gray-500">{laws.length} entries</span>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Title
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Published
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Source
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {laws.map((law) => (
//                       <tr key={law.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs">
//                           {law.title}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {law.published_date
//                             ? new Date(law.published_date).toLocaleDateString()
//                             : "N/A"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
//                           {law.source || "N/A"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {law.url && (
//                             <a
//                               href={law.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 hover:text-blue-800"
//                             >
//                               View Source
//                             </a>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           )}

//           {/* Content Creation Section */}
//           <section className="bg-white shadow rounded-lg overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">Create New Content</h3>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Manual Legal Entry */}
//                 <div className="border border-gray-200 rounded-lg p-6">
//                   <div className="flex items-center mb-4">
//                     <div className="flex-shrink-0 bg-blue-500 rounded-md p-2">
//                       <svg
//                         className="h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                     <h4 className="ml-3 text-base font-medium text-gray-900">Legal Document</h4>
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <label
//                         htmlFor="legal-title"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Title
//                       </label>
//                       <input
//                         type="text"
//                         id="legal-title"
//                         placeholder="Document title"
//                         value={pasteTitle}
//                         onChange={(e) => setPasteTitle(e.target.value)}
//                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="legal-content"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Content
//                       </label>
//                       <textarea
//                         id="legal-content"
//                         placeholder="Paste legal content here..."
//                         value={pasteContent}
//                         onChange={(e) => setPasteContent(e.target.value)}
//                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border h-32"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="legal-tags"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Tags (comma separated)
//                       </label>
//                       <input
//                         type="text"
//                         id="legal-tags"
//                         placeholder="contract, regulation, etc."
//                         value={pasteTags}
//                         onChange={(e) => setPasteTags(e.target.value)}
//                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border"
//                       />
//                     </div>
//                     <button
//                       onClick={handleSubmitText}
//                       className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       Save Legal Document
//                     </button>
//                   </div>
//                 </div>

//                 {/* Article/Blog Entry */}
//                 <div className="border border-gray-200 rounded-lg p-6">
//                   <div className="flex items-center mb-4">
//                     <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
//                       <svg
//                         className="h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
//                       </svg>
//                     </div>
//                     <h4 className="ml-3 text-base font-medium text-gray-900">Article/Blog Post</h4>
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <label
//                         htmlFor="article-title"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Title
//                       </label>
//                       <input
//                         type="text"
//                         id="article-title"
//                         placeholder="Article title"
//                         value={articleTitle}
//                         onChange={(e) => setArticleTitle(e.target.value)}
//                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="article-content"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Content
//                       </label>
//                       <textarea
//                         id="article-content"
//                         placeholder="Write your article content here..."
//                         value={articleContent}
//                         onChange={(e) => setArticleContent(e.target.value)}
//                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border h-32"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="article-tags"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Tags (comma separated)
//                       </label>
//                       <input
//                         type="text"
//                         id="article-tags"
//                         placeholder="legal, analysis, etc."
//                         value={articleTags}
//                         onChange={(e) => setArticleTags(e.target.value)}
//                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border"
//                       />
//                     </div>
//                     <button
//                       onClick={handleSubmitArticle}
//                       className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                     >
//                       Publish Article
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* File Upload */}
//               {/* <div className="mt-8 border-t border-gray-200 pt-8">
//                 <div className="flex items-center mb-4">
//                   <div className="flex-shrink-0 bg-amber-500 rounded-md p-2">
//                     <svg
//                       className="h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <h4 className="ml-3 text-base font-medium text-gray-900">Upload Documents</h4>
//                 </div>
//                 <div className="mt-4">
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                       <svg
//                         className="mx-auto h-12 w-12 text-gray-400"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 48 48"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className="flex text-sm text-gray-600">
//                         <label
//                           htmlFor="file-upload"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
//                         >
//                           <span>Upload a file</span>
//                           <input
//                             id="file-upload"
//                             name="file-upload"
//                             type="file"
//                             className="sr-only"
//                             accept=".pdf,.docx,.doc"
//                             onChange={handleFileUpload}
//                             disabled={isUploading}
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-gray-500">PDF, DOCX up to 10 MB</p>
//                       {isUploading && (
//                         <div className="pt-2">
//                           <div className="w-full bg-gray-200 rounded-full h-2.5">
//                             <div
//                               className="bg-blue-600 h-2.5 rounded-full animate-pulse"
//                               style={{ width: "45%" }}
//                             ></div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </section>
//         </main>
//       </div>
//     </AdminAuthGuard>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AdminAuthGuard from "@/components/AdminAuthGuard";
import { ArrowLeft } from "lucide-react";

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
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleSubmitArticle = async () => {
    if (!articleTitle.trim() || !articleContent.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error("No session found");

      let imageUrl = null;

      if (imageFile) {
        // Validate file
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(imageFile.type)) {
          throw new Error("Only JPEG, PNG, and WebP images are allowed");
        }

        if (imageFile.size > 5 * 1024 * 1024) {
          throw new Error("Image size must be less than 5MB");
        }

        // Upload with unique filename
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
        const { data: urlData } = supabase.storage.from("article-images").getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      // Insert article
      const { error: insertError } = await supabase.from("articles").insert([
        {
          title: articleTitle,
          content: articleContent,
          tags: articleTags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
          created_by: session.user.id,
          image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      toast.success("Article published successfully!");
      // Reset form
      setArticleTitle("");
      setArticleContent("");
      setArticleTags("");
      setImageFile(null);

      // Refresh articles list if needed
      const { data } = await supabase
        .from("articles")
        .select()
        .order("created_at", { ascending: false });
      setArticles(data || []);
    } catch (err) {
      console.error("Publishing error:", err);

      let errorMessage = "Failed to publish article";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      toast.error(errorMessage);
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

          {/* Content Creation Section */}
          <section className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-lg overflow-hidden">
            <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-neutral-800">
              <h3 className="text-sm sm:text-base font-medium text-neutral-200">
                Content Creation
              </h3>
            </div>
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-6">
                {/* Manual Legal Entry */}
                <div className="bg-neutral-900 rounded-lg p-4 sm:p-5 border border-neutral-800">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="flex-shrink-0 bg-emerald-900/50 rounded-lg p-2 border border-emerald-800/50">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <h4 className="ml-3 text-sm sm:text-base font-medium text-neutral-200">
                      Legal Document
                    </h4>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label
                        htmlFor="legal-title"
                        className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="legal-title"
                        placeholder="Document title"
                        value={pasteTitle}
                        onChange={(e) => setPasteTitle(e.target.value)}
                        className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-emerald-400 focus:ring-emerald-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="legal-content"
                        className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1"
                      >
                        Content
                      </label>
                      <textarea
                        id="legal-content"
                        placeholder="Paste legal content here..."
                        value={pasteContent}
                        onChange={(e) => setPasteContent(e.target.value)}
                        className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-emerald-400 focus:ring-emerald-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200 h-24 sm:h-32"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="article-image"
                        className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1"
                      >
                        Thumbnail Image
                      </label>
                      <input
                        type="file"
                        id="article-image"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="block w-full text-xs sm:text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-800 file:text-neutral-300 hover:file:bg-neutral-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="legal-tags"
                        className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1"
                      >
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        id="legal-tags"
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

                {/* Article/Blog Entry */}
                <div className="bg-neutral-900 rounded-lg p-4 sm:p-5 border border-neutral-800">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="flex-shrink-0 bg-cyan-900/50 rounded-lg p-2 border border-cyan-800/50">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                        <path d="M18 14h-8"></path>
                        <path d="M15 18h-5"></path>
                        <path d="M10 6h8v4h-8V6Z"></path>
                      </svg>
                    </div>
                    <h4 className="ml-3 text-sm sm:text-base font-medium text-neutral-200">
                      Article/Blog Post
                    </h4>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label
                        htmlFor="article-title"
                        className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="article-title"
                        placeholder="Article title"
                        value={articleTitle}
                        onChange={(e) => setArticleTitle(e.target.value)}
                        className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-cyan-400 focus:ring-cyan-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="article-content"
                        className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1"
                      >
                        Content
                      </label>
                      <textarea
                        id="article-content"
                        placeholder="Write your article content here..."
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                        className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-cyan-400 focus:ring-cyan-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200 h-24 sm:h-32"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="article-tags"
                        className="block text-xs sm:text-sm font-medium text-neutral-400 mb-1"
                      >
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        id="article-tags"
                        placeholder="legal, analysis, etc."
                        value={articleTags}
                        onChange={(e) => setArticleTags(e.target.value)}
                        className="block w-full rounded-lg border-neutral-700 bg-neutral-800 focus:border-cyan-400 focus:ring-cyan-400/30 text-xs sm:text-sm py-2 px-3 border shadow-sm text-neutral-200"
                      />
                    </div>
                    <button
                      onClick={handleSubmitArticle}
                      className="w-full flex justify-center py-2 px-4 sm:py-2.5 sm:px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
                    >
                      Publish Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
