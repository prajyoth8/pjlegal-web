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
import AdminAuthGuard from "@/components/AdminAuthGuard";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 p-4 md:p-8 space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-xs sm:text-sm bg-neutral-800/50 hover:bg-neutral-800/70 border border-neutral-700 px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Dashboard
            </Link>
          </motion.div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              AI Performance Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-1">Real-time analytics and model insights</p>
          </div>

          <button
            onClick={fetchAllAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
        </header>

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-red-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Error loading analytics: {error}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Breakdown Card */}
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold">Model Usage Breakdown</h2>
            </div>
            <div className="h-80">
              {loading ? (
                <div className="h-full w-full rounded-lg bg-gray-800/50 animate-pulse" />
              ) : (
                <div className="grid grid-cols-1 gap-6 h-full">
                  <Pie
                    data={{
                      labels: modelBreakdown.map((m) => m.name),
                      datasets: [
                        {
                          data: modelBreakdown.map((m) => m.value),
                          backgroundColor: [
                            chartColors.primary,
                            chartColors.info,
                            chartColors.warning,
                            chartColors.danger,
                          ],
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        legend: {
                          ...chartOptions.plugins.legend,
                          position: "right",
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Response Volume Card */}
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold">Response Volume</h2>
              </div>
              <select
                className="bg-gray-800 border border-gray-700 text-sm text-white px-3 py-1 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={volumeInterval}
                onChange={(e) =>
                  setVolumeInterval(e.target.value as "daily" | "weekly" | "monthly" | "yearly")
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="h-80">
              {loading ? (
                <div className="h-full w-full rounded-lg bg-gray-800/50 animate-pulse" />
              ) : (
                <Bar
                  data={{
                    labels: volumeTrend.labels
                      .map((label) => {
                        // Parse date string into Date object
                        const date = new Date(label);
                        // Format as DD/MM/YYYY
                        return date.toLocaleDateString("en-GB");
                      })
                      .sort((a, b) => {
                        // Sort dates chronologically
                        return (
                          new Date(a.split("/").reverse().join("-")).getTime() -
                          new Date(b.split("/").reverse().join("-")).getTime()
                        );
                      }),
                    datasets: [
                      {
                        label: "Responses",
                        data: volumeTrend.values,
                        backgroundColor: chartColors.success,
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    ...chartOptions,
                    scales: {
                      ...chartOptions.scales,
                      x: {
                        ...chartOptions.scales?.x,
                        title: {
                          display: true,
                          text: "Time Period",
                          color: "#9CA3AF",
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* Latency Trend Card */}
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-semibold">Average Latency Over Time (ms)</h2>
            </div>
            <div className="h-96">
              {loading ? (
                <div className="h-full w-full rounded-lg bg-gray-800/50 animate-pulse" />
              ) : (
                <Line
                  data={{
                    labels: latencyTrend.labels,
                    datasets: [
                      {
                        label: "Latency (ms)",
                        data: latencyTrend.values,
                        borderColor: chartColors.warning,
                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: "rgba(255, 255, 255, 0.8)",
                        pointRadius: 4,
                        pointHoverRadius: 6,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </div>
          </div>

          {/* Response Source Card */}
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg font-semibold">Response Sources</h2>
            </div>
            <div className="h-80">
              {loading ? (
                <div className="h-full w-full rounded-lg bg-gray-800/50 animate-pulse" />
              ) : Array.isArray(responseSource) && responseSource.length > 0 ? (
                <Pie
                  data={{
                    labels: responseSource.map((r) => r.name),
                    datasets: [
                      {
                        data: responseSource.map((r) => r.value),
                        backgroundColor: [chartColors.secondary, chartColors.pink],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        ...chartOptions.plugins.legend,
                        position: "right",
                      },
                    },
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Model Comparison Card */}
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Model Performance</h2>
            </div>
            <div className="h-80">
              {loading ? (
                <div className="h-full w-full rounded-lg bg-gray-800/50 animate-pulse" />
              ) : (
                <Bar
                  data={{
                    labels: modelBreakdown.map((m) => m.name),
                    datasets: [
                      {
                        label: "Responses",
                        data: modelBreakdown.map((m) => m.value),
                        backgroundColor: chartColors.info,
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Requests"
            value={volumeTrend.values.reduce((a, b) => a + b, 0).toLocaleString()}
            icon={<Activity className="w-6 h-6 text-purple-400" />}
            loading={loading}
          />
          <StatCard
            title="Avg Latency"
            value={`${Math.round(
              latencyTrend.values.reduce((a, b) => a + b, 0) / (latencyTrend.values.length || 1)
            )}ms`}
            icon={<Clock className="w-6 h-6 text-amber-400" />}
            loading={loading}
          />
          <StatCard
            title="Top Model"
            value={modelBreakdown[0]?.name || "N/A"}
            icon={<Cpu className="w-6 h-6 text-blue-400" />}
            loading={loading}
          />
          <StatCard
            title="Cache Hit Rate"
            value={
              responseSource?.length === 2 && !loading
                ? `${Math.round(
                    (responseSource[0]?.value /
                      (responseSource[0]?.value + responseSource[1]?.value || 1)) *
                      100
                  )}%`
                : "N/A"
            }
            icon={<Zap className="w-6 h-6 text-emerald-400" />}
            loading={loading}
          />
        </div>
      </div>
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
