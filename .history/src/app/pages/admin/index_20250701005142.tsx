// pages/admin/index.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setErrorMsg("❌ Invalid credentials");
      return;
    }

    // Fetch profile to check is_admin
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("is_admin")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile?.is_admin) {
      setErrorMsg("🚫 Access denied. Not an admin.");
      await supabase.auth.signOut();
      return;
    }

    router.push("/admin/keywords"); // ✅ redirect to admin dashboard
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Admin Login</h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {errorMsg}
          </div>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          className="border p-2 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
