"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnalyticsPage() {
  const [sourceData, setSourceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics/response-source");
        const breakdown = await res.json();

        const labels = breakdown.map((item: any) => item.name);
        const values = breakdown.map((item: any) => item.value);

        setSourceData({
          labels,
          datasets: [
            {
              label: "Responses",
              data: values,
              backgroundColor: ["#10B981", "#3B82F6"],
              borderWidth: 1
            }
          ]
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Analytics</h1>

      {/* 🔍 Response Source Breakdown */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Response Source</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading analytics...</p>
        ) : sourceData ? (
          <Pie data={sourceData} />
        ) : (
          <p className="text-red-500">No data available</p>
        )}
      </div>
    </main>
  );
}
