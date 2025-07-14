// app/admin/analytics/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch(console.error);
  }, []);

  if (!analytics) {
    return <div className="p-6 text-lg">Loading analytics...</div>;
  }

  const { modelBreakdown, trends, averageLatency } = analytics;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Chatbot Analytics</h1>

      {/* 🧠 Model Usage Breakdown */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Model Usage (OpenAI vs DeepSeek)</h2>
        <Pie
          data={{
            labels: Object.keys(modelBreakdown),
            datasets: [
              {
                data: Object.values(modelBreakdown),
                backgroundColor: ["#60A5FA", "#34D399"],
              },
            ],
          }}
        />
      </div>

      {/* 📈 Daily/Monthly Trends */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Daily Usage</h2>
        <Bar
          data={{
            labels: trends.daily.labels,
            datasets: [
              {
                label: "Requests",
                data: trends.daily.values,
                backgroundColor: "#6366F1",
              },
            ],
          }}
        />
      </div>

      {/* 📉 Latency Trends */}
<div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
  <h2 className="text-lg font-semibold mb-2">Average Latency</h2>
  <Line
    data={{
      labels: averageLatency.labels,
      datasets: [
        {
          label: "Latency (ms)",
          data: averageLatency.values,
          fill: false,
          borderColor: "#F59E0B",
        },
      ],
    }}
  />
</div>

    </div>
  );
}
