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

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/admin");
      } else {
        const { data: userData } = await supabase
          .from("users")
          .select("is_admin")
          .eq("id", session.user.id)
          .single();

        if (!userData?.is_admin) {
          router.push("/admin");
        }
      }
    };

    checkSession();
  }, []);

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
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🛡️ Keyword Manager</h1>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/admin"); // Redirect to login
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Enter keyword..."
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="banned">Banned</option>
          <option value="legal">Legal</option>
        </select>
        <button
          onClick={addKeyword}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Keyword</th>
            <th className="p-2">Type</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((kw) => (
            <tr key={kw.id} className="border-t">
              <td className="p-2">{kw.keyword}</td>
              <td className="p-2">
                {kw.type === "banned" ? "🚫" : "✅"} {kw.type}
              </td>
              <td className="p-2">
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
  );
}
