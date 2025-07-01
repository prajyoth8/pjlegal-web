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

