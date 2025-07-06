"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TokenUsagePage() {
  const router = useRouter();
  const [usageLogs, setUsageLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        router.push("/admin");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("is_admin, email")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        router.push("/admin");
        return;
      }

      setUserEmail(profile.email);

      const { data } = await supabase
        .from("model_usage_logs")
        .select("model_name, tokens_used, cost_usd, action, created_at")
        .order("created_at", { ascending: false });

      setUsageLogs(data || []);
      setLoading(false);
    };

    fetchData();
  }, [router]);

  const totalTokens = usageLogs.reduce((sum, l) => sum + l.tokens_used, 0);
  const totalCost = usageLogs.reduce((sum, l) => sum + parseFloat(l.cost_usd || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📊 Token Usage Logs</h1>
        <p className="mb-4 text-blue-200">Welcome, {userEmail}</p>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p>
                <strong>Total Tokens:</strong> {totalTokens}
              </p>
              <p>
                <strong>Total Cost:</strong> ${totalCost.toFixed(6)}
              </p>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full table-auto text-sm text-white border border-white/10">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-4 py-2 text-left">Model</th>
                    <th className="px-4 py-2 text-left">Tokens</th>
                    <th className="px-4 py-2 text-left">Cost ($)</th>
                    <th className="px-4 py-2 text-left">Action</th>
                    <th className="px-4 py-2 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {usageLogs.map((log, idx) => (
                    <tr key={idx} className="border-t border-white/10">
                      <td className="px-4 py-2">{log.model_name}</td>
                      <td className="px-4 py-2">{log.tokens_used}</td>
                      <td className="px-4 py-2">${log.cost_usd?.toFixed(6)}</td>
                      <td className="px-4 py-2">{log.action}</td>
                      <td className="px-4 py-2">{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
