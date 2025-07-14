// "use client";

// import { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import { Bar, Line, Pie } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// type TrendData = { labels: string[]; values: number[] };

// export default function AnalyticsPage() {
//   const [modelBreakdown, setModelBreakdown] = useState<{ name: string; value: number }[]>([]);
//   const [responseSource, setResponseSource] = useState<{ name: string; value: number }[]>([]);
//   const [latencyTrend, setLatencyTrend] = useState<TrendData>({ labels: [], values: [] });
//   const [volumeTrend, setVolumeTrend] = useState<TrendData>({ labels: [], values: [] });

//   const fetchAllAnalytics = async () => {
//     try {
//       const [modelRes, sourceRes, latencyRes, volumeRes] = await Promise.all([
//         fetch("/api/analytics/model-breakdown"),
//         fetch("/api/analytics/response-source"),
//         fetch("/api/analytics/latency-trend"),
//         fetch("/api/analytics/volume-trend"),
//       ]);

//       setModelBreakdown(await modelRes.json());
//       setResponseSource(await sourceRes.json());
//       setLatencyTrend(await latencyRes.json());
//       setVolumeTrend(await volumeRes.json());
//     } catch (err) {
//       console.error("❌ Analytics loading error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAllAnalytics();
//     // console.log("🔎 responseSource raw data:", sourceRes.text());
//   }, []);

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-8">
//       <h1 className="text-3xl font-semibold mb-6">📊 Admin Analytics</h1>

//       {/* 📍 Model Breakdown */}
//       <div className="bg-zinc-900 shadow rounded-xl p-6">
//         <h2 className="text-xl font-semibold mb-4">Model Usage Breakdown</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Pie
//             data={{
//               labels: modelBreakdown.map((m) => m.name),
//               datasets: [
//                 {
//                   data: modelBreakdown.map((m) => m.value),
//                   backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
//                 },
//               ],
//             }}
//           />
//           <Bar
//             data={{
//               labels: modelBreakdown.map((m) => m.name),
//               datasets: [
//                 {
//                   label: "Responses",
//                   data: modelBreakdown.map((m) => m.value),
//                   backgroundColor: "#3B82F6",
//                 },
//               ],
//             }}
//             options={{ plugins: { legend: { display: false } } }}
//           />
//         </div>
//       </div>

//       {/* ⏱️ Latency Trend */}
//       <div className="bg-zinc-900 shadow rounded-xl p-6">
//         <h2 className="text-xl font-semibold mb-4">Average Latency Over Time (ms)</h2>
//         <Line
//           data={{
//             labels: latencyTrend.labels,
//             datasets: [
//               {
//                 label: "Latency (ms)",
//                 data: latencyTrend.values,
//                 borderColor: "#F59E0B",
//                 fill: false,
//               },
//             ],
//           }}
//         />
//       </div>

//       {/* 📅 Volume Trend */}
//       <div className="bg-zinc-900 shadow rounded-xl p-6">
//         <h2 className="text-xl font-semibold mb-4">Response Volume (Daily)</h2>
//         <Bar
//           data={{
//             labels: volumeTrend.labels,
//             datasets: [
//               {
//                 label: "Responses",
//                 data: volumeTrend.values,
//                 backgroundColor: "#10B981",
//               },
//             ],
//           }}
//         />
//       </div>

//       {/* ⚖️ Semantic vs Direct */}
//       <div className="bg-zinc-900 shadow rounded-xl p-6">
//         <h2 className="text-xl font-semibold mb-4">Semantic vs Direct AI Responses</h2>
//         {Array.isArray(responseSource) && responseSource.length > 0 ? (
//           <Pie
//             data={{
//               labels: responseSource.map((r) => r.name),
//               datasets: [
//                 {
//                   data: responseSource.map((r) => r.value),
//                   backgroundColor: ["#6366F1", "#EC4899"],
//                 },
//               ],
//             }}
//           />
//         ) : (
//           <p className="text-sm text-gray-400">No data available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

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
  Filler,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  RefreshCw,
  PieChart,
  BarChart2,
  LineChart,
  Database,
  Activity,
  Clock,
  Cpu,
  Zap,
  AlertTriangle,
  BarChart,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

type TrendData = { labels: string[]; values: number[] };

export default function AnalyticsPage() {
  const [modelBreakdown, setModelBreakdown] = useState<{ name: string; value: number }[]>([]);
  const [responseSource, setResponseSource] = useState<{ name: string; value: number }[]>([]);
  const [latencyTrend, setLatencyTrend] = useState<TrendData>({ labels: [], values: [] });
  const [volumeTrend, setVolumeTrend] = useState<TrendData>({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volumeInterval, setVolumeInterval] = useState<"daily" | "weekly" | "monthly" | "yearly">(
    "daily"
  );

  const fetchAllAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const [modelRes, sourceRes, latencyRes, volumeRes] = await Promise.all([
        fetch("/api/analytics/model-breakdown"),
        fetch("/api/analytics/response-source"),
        fetch("/api/analytics/latency-trend"),
        fetch(`/api/analytics/volume-trend?interval=${volumeInterval}`),
      ]);

      if (!modelRes.ok || !sourceRes.ok || !latencyRes.ok || !volumeRes.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      setModelBreakdown(await modelRes.json());
      setResponseSource(await sourceRes.json());
      setLatencyTrend(await latencyRes.json());
      setVolumeTrend(await volumeRes.json());
    } catch (err) {
      console.error("Analytics loading error:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAnalytics();
    const intervalId = setInterval(fetchAllAnalytics, 300000); // Refresh every 5 mins
    return () => clearInterval(intervalId);
  }, [volumeInterval]); // 👈 Trigger re-fetch when interval changes

  // Helper function to get the first day of a specific week
  function getDateFromWeek(year: number, week: number): Date {
    const date = new Date(year, 0, 1);
    const dayOffset = date.getDay(); // 0-6 (Sun-Sat)

    // Adjust to Thursday of the same week (ISO week starts on Monday)
    date.setDate(date.getDate() - dayOffset + 3);

    // Get the first Thursday of the year (which is in week 1)
    const firstThursday = date.getTime();

    // Add the required number of weeks
    date.setTime(firstThursday + (week - 1) * 7 * 24 * 60 * 60 * 1000);

    // Set to Monday of the target week
    date.setDate(date.getDate() - 3);

    return date;
  }
  // Modern gradient colors
  const chartColors = {
    primary: "#6366F1",
    secondary: "#8B5CF6",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",
    pink: "#EC4899",
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#E5E7EB",
          font: {
            family: "Inter, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F3F4F6",
        bodyColor: "#E5E7EB",
        borderColor: "#4B5563",
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
    },
  };

  return (
    <AdminAuthGuard>


    </AdminAuthGuard>
    
    
  );
}

function StatCard({
  title,
  value,
  icon,
  loading,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  loading: boolean;
}) {
  return (
    <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="p-1.5 rounded-lg bg-gray-800">{icon}</div>
      </div>
      <div className="mt-2">
        {loading ? (
          <div className="h-8 w-3/4 rounded-md bg-gray-800/50 animate-pulse" />
        ) : (
          <p className="text-2xl font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}
