"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CMSPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [laws, setLaws] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [selectedSource, setSelectedSource] = useState("");

  useEffect(() => {
    const loadData = async () => {
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

      // Fetch logs
      const { data: logsData } = await supabase
        .from("scraper_logs")
        .select("*")
        .order("scraped_at", { ascending: false })
        .limit(10);
      setLogs(logsData || []);

      // Fetch laws
      const { data: lawData } = await supabase
        .from("recent_laws")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      setLaws(lawData || []);

      // Fetch sources
      const { data: sourceData } = await supabase.from("law_sources").select("*");
      setSources(sourceData || []);
    };

    loadData();
  }, [router]);

  const triggerScraper = async () => {
    if (!selectedSource) return;
    await fetch(`/api/scrape?source=${selectedSource}`);
    alert("Scraper triggered!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">📚 CMS Manager</h1>
        <p className="text-blue-300">Upload legal content, trigger scrapers, view logs & manage laws.</p>

        {/* Trigger Scraper */}
        <div className="bg-gray-800 rounded-xl p-4 border border-white/10">
          <h2 className="text-xl font-semibold mb-2">🛠 Trigger Scraper</h2>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full p-2 rounded-md text-black"
          >
            <option value="">Select a source...</option>
            {sources.map((s) => (
              <option key={s.id} value={s.type}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            onClick={triggerScraper}
            className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
          >
            Run Scraper
          </button>
        </div>

        {/* Scraper Logs */}
        <div className="bg-gray-800 rounded-xl p-4 border border-white/10">
          <h2 className="text-xl font-semibold mb-2">📋 Scraper Logs</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {logs.map((log) => (
              <li key={log.id} className="text-sm text-gray-200">
                ✅ {log.status} @ {log.scraped_at?.slice(0, 19).replace("T", " ")} — {log.details}
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Laws */}
        <div className="bg-gray-800 rounded-xl p-4 border border-white/10">
          <h2 className="text-xl font-semibold mb-2">📜 Recent Laws</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {laws.map((law) => (
              <li key={law.id} className="text-sm text-blue-200">
                <strong>{law.title}</strong> — <em>{law.published_date}</em>
              </li>
            ))}
          </ul>
        </div>

        {/* Upload Legal Docs — Coming Soon */}
        <div className="bg-gray-800 rounded-xl p-4 border border-white/10 opacity-70">
          <h2 className="text-xl font-semibold mb-2">📄 Upload Legal Content</h2>
          <p className="text-gray-400">PDF/DOCX uploads & text paste will be added next.</p>
        </div>
      </div>
    </div>
  );
}
