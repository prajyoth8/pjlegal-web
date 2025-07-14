"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type TrendData = { labels: string[]; values: number[] };

export default function AnalyticsPage() {
  const [modelBreakdown, setModelBreakdown] = useState<{ name: string; value: number }[]>([]);
  const [responseSource, setResponseSource] = useState<{ name: string; value: number }[]>([]);
  const [latencyTrend, setLatencyTrend] = useState<TrendData>({ labels: [], values: [] });
  const [volumeTrend, setVolumeTrend] = useState<TrendData>({ labels: [], values: [] });

  const fetchAllAnalytics = async () => {
    try {
      const [modelRes, sourceRes, latencyRes, volumeRes] = await Promise.all([
        fetch("/api/analytics/model-breakdown"),
        fetch("/api/analytics/response-source"),
        fetch("/api/analytics/latency-trend"),
        fetch("/api/analytics/volume-trend"),
      ]);

      setModelBreakdown(await modelRes.json());
      setResponseSource(await sourceRes.json());
      setLatencyTrend(await latencyRes.json());
      setVolumeTrend(await volumeRes.json());
    } catch (err) {
      console.error("❌ Analytics loading error:", err);
    }
  };

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-8">
      <h1 className="text-3xl font-semibold mb-6">📊 Admin Analytics</h1>

      {/* 📍 Model Breakdown */}
      <div className="bg-zinc-900 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Model Usage Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Pie
            data={{
              labels: modelBreakdown.map((m) => m.name),
              datasets: [
                {
                  data: modelBreakdown.map((m) => m.value),
                  backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
                },
              ],
            }}
          />
          <Bar
            data={{
              labels: modelBreakdown.map((m) => m.name),
              datasets: [
                {
                  label: "Responses",
                  data: modelBreakdown.map((m) => m.value),
                  backgroundColor: "#3B82F6",
                },
              ],
            }}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
      </div>

      {/* ⏱️ Latency Trend */}
      <div className="bg-zinc-900 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Average Latency Over Time (ms)</h2>
        <Line
          data={{
            labels: latencyTrend.labels,
            datasets: [
              {
                label: "Latency (ms)",
                data: latencyTrend.values,
                borderColor: "#F59E0B",
                fill: false,
              },
            ],
          }}
        />
      </div>

      {/* 📅 Volume Trend */}
      <div className="bg-zinc-900 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Response Volume (Daily)</h2>
        <Bar
          data={{
            labels: volumeTrend.labels,
            datasets: [
              {
                label: "Responses",
                data: volumeTrend.values,
                backgroundColor: "#10B981",
              },
            ],
          }}
        />
      </div>

      {/* ⚖️ Semantic vs Direct */}
      <div className="bg-zinc-900 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Semantic vs Direct AI Responses</h2>
        <Pie
          data={{
            labels: responseSource.map((r) => r.name),
            datasets: [
              {
                data: responseSource.map((r) => r.value),
                backgroundColor: ["#6366F1", "#EC4899"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
