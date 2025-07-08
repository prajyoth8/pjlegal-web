// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { useRouter } from "next/navigation";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default function KeywordManager() {
//   const [keywords, setKeywords] = useState<any[]>([]);
//   const [newKeyword, setNewKeyword] = useState("");
//   const [newType, setNewType] = useState<"banned" | "legal">("banned");
//   const router = useRouter();

//   useEffect(() => {
//     fetchKeywords();
//   }, []);

//   async function fetchKeywords() {
//     const { data } = await supabase.from("chatbot_keywords").select("*").order("type");
//     setKeywords(data || []);
//   }

//   async function addKeyword() {
//     if (!newKeyword.trim()) return;
//     await supabase.from("chatbot_keywords").insert({ keyword: newKeyword, type: newType });
//     setNewKeyword("");
//     fetchKeywords();
//   }

//   async function deleteKeyword(id: number) {
//     await supabase.from("chatbot_keywords").delete().eq("id", id);
//     fetchKeywords();
//   }

//   async function logout() {
//     await supabase.auth.signOut();
//     router.push("/admin");
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-blue-300">🛡️ Keyword Manager</h1>
//         <button
//           onClick={logout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="bg-white/10 p-6 rounded-xl shadow-lg max-w-4xl mx-auto space-y-6">
//         <div className="flex gap-3 items-center">
//           <input
//             className="flex-grow p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter new keyword..."
//             value={newKeyword}
//             onChange={(e) => setNewKeyword(e.target.value)}
//           />
//           <select
//             value={newType}
//             onChange={(e) => setNewType(e.target.value as any)}
//             className="p-3 rounded-lg bg-white/20 text-white"
//           >
//             <option value="banned">🚫 Banned</option>
//             <option value="legal">⚖️ Legal</option>
//           </select>
//           <button
//             onClick={addKeyword}
//             className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-bold shadow-md"
//           >
//             Add
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto text-left text-white rounded-lg">
//             <thead>
//               <tr className="bg-blue-800/60">
//                 <th className="p-3">Keyword</th>
//                 <th className="p-3">Type</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {keywords.map((kw, idx) => (
//                 <tr
//                   key={kw.id}
//                   className={`${idx % 2 === 0 ? "bg-white/10" : "bg-white/5"} hover:bg-white/20 transition`}
//                 >
//                   <td className="p-3">{kw.keyword}</td>
//                   <td className="p-3">{kw.type === "banned" ? "🚫 Banned" : "⚖️ Legal"}</td>
//                   <td className="p-3">
//                     <button
//                       onClick={() => deleteKeyword(kw.id)}
//                       className="text-red-400 hover:text-red-600 underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {keywords.length === 0 && (
//                 <tr>
//                   <td colSpan={3} className="p-4 text-center text-gray-400">
//                     No keywords found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminAuthGuard from "@/components/AdminAuthGuard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function KeywordManager() {
  const [keywords, setKeywords] = useState<any[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newType, setNewType] = useState<"banned" | "legal">("banned");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchKeywords();
  }, []);

  async function fetchKeywords() {
    setIsLoading(true);
    const { data } = await supabase.from("chatbot_keywords").select("*").order("type");
    setKeywords(data || []);
    setIsLoading(false);
  }

  async function addKeyword() {
    if (!newKeyword.trim()) return;
    setIsLoading(true);
    await supabase.from("chatbot_keywords").insert({ keyword: newKeyword, type: newType });
    setNewKeyword("");
    await fetchKeywords();
  }

  async function deleteKeyword(id: number) {
    setIsLoading(true);
    await supabase.from("chatbot_keywords").delete().eq("id", id);
    await fetchKeywords();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin");
  }

  const filteredKeywords = keywords.filter((kw) =>
    kw.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4 md:p-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                Keyword Management
              </h1>
              <p className="text-blue-200 mt-1">Manage banned and legal keywords for the chatbot</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-100 px-4 py-2 rounded-lg shadow-md border border-red-500/30 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>

            <button
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-100 px-4 py-2 rounded-lg shadow-md border border-blue-500/30 transition-all duration-200 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Dashboard
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 space-y-6 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500 rounded-full filter blur-xl opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-indigo-500 rounded-full filter blur-xl opacity-10"></div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
              <div className="flex-grow w-full">
                <label className="block text-sm font-medium text-blue-100 mb-1">
                  Search Keywords
                </label>
                <input
                  type="text"
                  placeholder="Search keywords..."
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/10 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
              <div className="flex-grow w-full">
                <label className="block text-sm font-medium text-blue-100 mb-1">
                  Add New Keyword
                </label>
                <input
                  type="text"
                  placeholder="Enter keyword..."
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/10 transition-all duration-200"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                />
              </div>
              <div className="w-full md:w-48">
                <label className="block text-sm font-medium text-blue-100 mb-1">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/10 transition-all duration-200"
                >
                  <option value="banned">🚫 Banned</option>
                  <option value="legal">⚖️ Legal</option>
                </select>
              </div>
              <button
                onClick={addKeyword}
                disabled={isLoading || !newKeyword.trim()}
                className={`w-full md:w-auto px-6 py-3 rounded-lg text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isLoading || !newKeyword.trim()
                    ? "bg-blue-700/30 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add Keyword</span>
                  </>
                )}
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full">
                <thead className="bg-blue-800/30">
                  <tr>
                    <th className="p-4 text-left font-medium text-blue-100">Keyword</th>
                    <th className="p-4 text-left font-medium text-blue-100">Type</th>
                    <th className="p-4 text-right font-medium text-blue-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {isLoading && keywords.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-blue-200">
                        Loading keywords...
                      </td>
                    </tr>
                  ) : filteredKeywords.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-blue-200">
                        {searchTerm ? "No matching keywords found" : "No keywords added yet"}
                      </td>
                    </tr>
                  ) : (
                    <AnimatePresence>
                      {filteredKeywords.map((kw) => (
                        <motion.tr
                          key={kw.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-white/5 transition-colors duration-150"
                        >
                          <td className="p-4 font-mono">{kw.keyword}</td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                kw.type === "banned"
                                  ? "bg-red-500/20 text-red-200"
                                  : "bg-green-500/20 text-green-200"
                              }`}
                            >
                              {kw.type === "banned" ? (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                    />
                                  </svg>
                                  Banned
                                </>
                              ) : (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Legal
                                </>
                              )}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => deleteKeyword(kw.id)}
                              disabled={isLoading}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200 flex items-center justify-end w-full gap-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <span>Delete</span>
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-sm text-blue-200/70 text-center">
              <p>{filteredKeywords.length} keyword(s) displayed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
