// // pages/admin/keywords.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// type Keyword = {
//   id: string;
//   keyword: string;
//   type: "banned" | "legal";
// };

// export default function KeywordAdmin() {
//   const [keywords, setKeywords] = useState<Keyword[]>([]);
//   const [newKeyword, setNewKeyword] = useState("");
//   const [newType, setNewType] = useState<"banned" | "legal">("banned");
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   //   useEffect(() => {
//   //     const checkSession = async () => {
//   //       const {
//   //         data: { session },
//   //       } = await supabase.auth.getSession();

//   //       if (!session) {
//   //         router.push("/admin");
//   //       } else {
//   //         const { data: userData } = await supabase
//   //           .from("users")
//   //           .select("is_admin")
//   //           .eq("id", session.user.id)
//   //           .single();

//   //         if (!userData?.is_admin) {
//   //           router.push("/admin");
//   //         }
//   //       }
//   //     };

//   //     checkSession();
//   //   }, []);

//   useEffect(() => {
//     checkAdminAccess();
//   }, []);

//   async function checkAdminAccess() {
//     const {
//       data: { user },
//       error,
//     } = await supabase.auth.getUser();

//     if (!user || error) {
//       router.push("/admin");
//       return;
//     }

//     // Fetch profile to verify admin status
//     const { data: profile, error: profileError } = await supabase
//       .from("users")
//       .select("is_admin")
//       .eq("id", user.id)
//       .single();

//     if (profileError || !profile?.is_admin) {
//       router.push("/admin");
//     } else {
//       setLoading(false);
//       fetchKeywords();
//     }
//   }

//   async function fetchKeywords() {
//     const { data, error } = await supabase
//       .from("chatbot_keywords")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (!error) setKeywords(data as Keyword[]);
//   }

//   async function addKeyword() {
//     if (!newKeyword) return;

//     const { error } = await supabase
//       .from("chatbot_keywords")
//       .insert([{ keyword: newKeyword.trim(), type: newType }]);

//     if (!error) {
//       setNewKeyword("");
//       fetchKeywords();
//     }
//   }

//   async function deleteKeyword(id: string) {
//     await supabase.from("chatbot_keywords").delete().eq("id", id);
//     setKeywords((prev) => prev.filter((k) => k.id !== id));
//   }

//   if (loading) return <div className="p-6">🔒 Verifying admin access...</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto relative">
//       <button
//         onClick={async () => {
//           await supabase.auth.signOut();
//           router.push("/admin");
//         }}
//         className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>

//       <h1 className="text-3xl font-extrabold text-blue-800 mb-6">🛡️ Keyword Manager</h1>

//       <div className="flex gap-2 mb-6">
//         <input
//           className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter keyword..."
//           value={newKeyword}
//           onChange={(e) => setNewKeyword(e.target.value)}
//         />
//         <select
//           value={newType}
//           onChange={(e) => setNewType(e.target.value as any)}
//           className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="banned">Banned</option>
//           <option value="legal">Legal</option>
//         </select>
//         <button
//           onClick={addKeyword}
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Add
//         </button>
//       </div>

//       <div className="overflow-x-auto rounded-xl shadow">
//         <table className="min-w-full text-sm bg-white border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left p-4 border-b">Keyword</th>
//               <th className="text-left p-4 border-b">Type</th>
//               <th className="text-left p-4 border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {keywords.map((kw, idx) => (
//               <tr key={kw.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                 <td className="p-4">{kw.keyword}</td>
//                 <td className="p-4">{kw.type === "banned" ? "🚫 Banned" : "✅ Legal"}</td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => deleteKeyword(kw.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function KeywordManager() {
  const [keywords, setKeywords] = useState<any[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newType, setNewType] = useState<"banned" | "legal">("banned");
  const router = useRouter();

  useEffect(() => {
    fetchKeywords();
  }, []);

  async function fetchKeywords() {
    const { data } = await supabase.from("chatbot_keywords").select("*").order("type");
    setKeywords(data || []);
  }

  async function addKeyword() {
    if (!newKeyword.trim()) return;
    await supabase.from("chatbot_keywords").insert({ keyword: newKeyword, type: newType });
    setNewKeyword("");
    fetchKeywords();
  }

  async function deleteKeyword(id: number) {
    await supabase.from("chatbot_keywords").delete().eq("id", id);
    fetchKeywords();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-300">🛡️ Keyword Manager</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>

      <div className="bg-white/10 p-6 rounded-xl shadow-lg max-w-4xl mx-auto space-y-6">
        <div className="flex gap-3 items-center">
          <input
            className="flex-grow p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new keyword..."
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as any)}
            className="p-3 rounded-lg bg-white/20 text-white"
          >
            <option value="banned">🚫 Banned</option>
            <option value="legal">⚖️ Legal</option>
          </select>
          <button
            onClick={addKeyword}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-bold shadow-md"
          >
            Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-white rounded-lg">
            <thead>
              <tr className="bg-blue-800/60">
                <th className="p-3">Keyword</th>
                <th className="p-3">Type</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((kw, idx) => (
                <tr
                  key={kw.id}
                  className={`${idx % 2 === 0 ? "bg-white/10" : "bg-white/5"} hover:bg-white/20 transition`}
                >
                  <td className="p-3">{kw.keyword}</td>
                  <td className="p-3">{kw.type === "banned" ? "🚫 Banned" : "⚖️ Legal"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteKeyword(kw.id)}
                      className="text-red-400 hover:text-red-600 underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {keywords.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-400">
                    No keywords found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
