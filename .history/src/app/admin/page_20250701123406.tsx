"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      setErrorMsg("❌ Invalid credentials");
      return;
    }

    const { data: profile } = await supabase
      .from("users")
      .select("is_admin")
      .eq("id", data.user.id)
      .single();

    if (!profile?.is_admin) {
      setErrorMsg("🚫 Access denied. Not an admin.");
      await supabase.auth.signOut();
      return;
    }

    router.push("/admin/keywords");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl px-8 py-10 text-white space-y-6">
        <div className="flex justify-center mb-4">
          <img src="/pj_logo_white.png" alt="PJ Legal Logo" className="h-14 drop-shadow-lg" />
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-200 tracking-wide">
          🔐 Admin Login
        </h1>

        {errorMsg && (
          <div className="bg-red-600/70 text-white p-3 rounded text-center shadow-md text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg font-semibold shadow-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
