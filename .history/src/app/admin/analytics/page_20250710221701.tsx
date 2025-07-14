"use client";

import { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

export default function AnalyticsPage() {
  const [sourceData, setSourceData] = useState<any>(null);
  const [modelData, setModelData] = useState<any>(null);
  const [latencyData, setLatencyData] = useState<any>(null);
  const [volumeData, setVolumeData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllAnalytics() {
      try {
        const [sourceRes, modelRes, latencyRes, volumeRes, trendRes] = await Promise.all([
          fetch("/api/analytics/response-source"),
          fetch("/api/analytics/model-breakdown"),
          fetch("/api/analytics/latency-trends"),
          fetch("/api/analytics/volume-trends"),
          fetch("/api/analytics/source-trends"),
        ]);

        const [sourceJson, modelJson, latencyJson, volumeJson, trendJson] = await Promise.all([
          sourceRes.json(),
          modelRes.json(),
          latencyRes.json(),
          volumeRes.json(),
          trendRes.json(),
        ]);

        setSourceData({
          labels: sourceJson.map((i: any) => i.name),
          datasets: [
            {
              data: sourceJson.map((i: any) => i.value),
              backgroundColor: ["#10B981", "#3B82F6"],
            },
          ],
        });

        setModelData({
          labels: modelJson.map((i: any) => i.model),
          datasets: [
            {
              data: modelJson.map((i: any) => i.count),
              backgroundColor: ["#6366F1", "#F59E0B", "#EF4444", "#3B82F6"],
            },
          ],
        });

        setLatencyData({
          labels: latencyJson.labels,
          datasets: [
            {
              label: "Latency (ms)",
              data: latencyJson.values,
              fill: false,
              borderColor: "#F59E0B",
              tension: 0.3,
            },
          ],
        });

        setVolumeData({
          labels: volumeJson.labels,
          datasets: [
            {
              label: "Response Volume",
              data: volumeJson.values,
              backgroundColor: "#10B981",
            },
          ],
        });

        setTrendData({
          labels: trendJson.labels,
          datasets: [
            {
              label: "Semantic Search",
              data: trendJson.semantic,
              backgroundColor: "#6366F1",
            },
            {
              label: "Direct AI",
              data: trendJson.direct,
              backgroundColor: "#F43F5E",
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error("Analytics load error", err);
        setLoading(false);
      }
    }

    fetchAllAnalytics();
  }, []);

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">📊 Admin Analytics</h1>

      {loading ? (
        <p className="text-sm text-gray-500">Loading analytics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">🔍 Response Source</h2>
            <Pie data={sourceData} />
          </div>

          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">🧠 Model Usage</h2>
            <Bar data={modelData} />
          </div>

          <div className="col-span-1 md:col-span-2 bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">⚡ Average Latency Over Time</h2>
            <Line data={latencyData} />
          </div>

          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">📈 Response Volume</h2>
            <Bar data={volumeData} />
          </div>

          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">🧭 Semantic vs Direct Trend</h2>
            <Bar data={trendData} />
          </div>
        </div>
      )}
    </main>
  );
}
