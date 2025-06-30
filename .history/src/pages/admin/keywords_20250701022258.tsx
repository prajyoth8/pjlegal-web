// pages/admin/keywords.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Keyword = {
  id: string;
  keyword: string;
  type: "banned" | "legal";
};

export default function KeywordAdmin() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newType, setNewType] = useState<"banned" | "legal">("banned");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //   useEffect(() => {
  //     const checkSession = async () => {
  //       const {
  //         data: { session },
  //       } = await supabase.auth.getSession();

  //       if (!session) {
  //         router.push("/admin");
  //       } else {
  //         const { data: userData } = await supabase
  //           .from("users")
  //           .select("is_admin")
  //           .eq("id", session.user.id)
  //           .single();

  //         if (!userData?.is_admin) {
  //           router.push("/admin");
  //         }
  //       }
  //     };

  //     checkSession();
  //   }, []);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  async function checkAdminAccess() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      router.push("/admin");
      return;
    }

    // Fetch profile to verify admin status
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.is_admin) {
      router.push("/admin");
    } else {
      setLoading(false);
      fetchKeywords();
    }
  }

  async function fetchKeywords() {
    const { data, error } = await supabase
      .from("chatbot_keywords")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setKeywords(data as Keyword[]);
  }

  async function addKeyword() {
    if (!newKeyword) return;

    const { error } = await supabase
      .from("chatbot_keywords")
      .insert([{ keyword: newKeyword.trim(), type: newType }]);

    if (!error) {
      setNewKeyword("");
      fetchKeywords();
    }
  }

  async function deleteKeyword(id: string) {
    await supabase.from("chatbot_keywords").delete().eq("id", id);
    setKeywords((prev) => prev.filter((k) => k.id !== id));
  }

  if (loading) return <div className="p-6">🔒 Verifying admin access...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/admin");
        }}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <h1 className="text-3xl font-extrabold text-blue-800 mb-6">🛡️ Keyword Manager</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter keyword..."
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value as any)}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="banned">Banned</option>
          <option value="legal">Legal</option>
        </select>
        <button
          onClick={addKeyword}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-sm bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 border-b">Keyword</th>
              <th className="text-left p-4 border-b">Type</th>
              <th className="text-left p-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((kw, idx) => (
              <tr key={kw.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-4">{kw.keyword}</td>
                <td className="p-4">{kw.type === "banned" ? "🚫 Banned" : "✅ Legal"}</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteKeyword(kw.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
