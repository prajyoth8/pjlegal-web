"use client";

import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import {
  CategoryScale,
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics/summary") // You'll create this backend route
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, []);

  if (!analytics) return <div className="p-4">📊 Loading analytics...</div>;

  const {
    totalRequests,
    openaiCount,
    deepseekCount,
    semanticUsedCount,
    responseLatencies,
    modelUsageTimeline,
    semanticTrend,
  } = analytics;

  const modelPieData = {
    labels: ["OpenAI", "DeepSeek"],
    datasets: [
      {
        data: [openaiCount, deepseekCount],
        backgroundColor: ["#3b82f6", "#f97316"],
      },
    ],
  };

  const semanticPercent = totalRequests
    ? ((semanticUsedCount / totalRequests) * 100).toFixed(1)
    : "0";

  const latencyLineData = {
    labels: responseLatencies.map((d: any) => format(new Date(d.date), "MMM dd")),
    datasets: [
      {
        label: "Avg Latency (ms)",
        data: responseLatencies.map((d: any) => d.avg_latency_ms),
        borderColor: "#10b981",
        backgroundColor: "#6ee7b7",
      },
    ],
  };

  const modelUsageBarData = {
    labels: modelUsageTimeline.map((d: any) => format(new Date(d.date), "MMM dd")),
    datasets: [
      {
        label: "OpenAI",
        data: modelUsageTimeline.map((d: any) => d.openai || 0),
        backgroundColor: "#3b82f6",
      },
      {
        label: "DeepSeek",
        data: modelUsageTimeline.map((d: any) => d.deepseek || 0),
        backgroundColor: "#f97316",
      },
    ],
  };

  const semanticLineData = {
    labels: semanticTrend.map((d: any) => format(new Date(d.date), "MMM dd")),
    datasets: [
      {
        label: "Semantic Usage %",
        data: semanticTrend.map((d: any) => d.percent),
        borderColor: "#facc15",
        backgroundColor: "#fde68a",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-4">📈 Chatbot Analytics Dashboard</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Prompts</p>
            <p className="text-2xl font-bold">{totalRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">OpenAI Usage</p>
            <p className="text-2xl font-bold">{openaiCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">DeepSeek Usage</p>
            <p className="text-2xl font-bold">{deepseekCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Semantic Search Usage</p>
            <p className="text-2xl font-bold">{semanticPercent}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-black rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Model Usage Distribution</h3>
        <Pie data={modelPieData} />
      </div>

      {/* Model Usage Timeline */}
      <div className="bg-white dark:bg-black rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Model Usage Over Time</h3>
        <Bar data={modelUsageBarData} />
      </div>

      {/* Latency Chart */}
      <div className="bg-white dark:bg-black rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Average Response Latency</h3>
        <Line data={latencyLineData} />
      </div>

      {/* Semantic Search Usage Trend */}
      <div className="bg-white dark:bg-black rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Semantic Search Usage Trend</h3>
        <Line data={semanticLineData} />
      </div>
    </div>
  );
}
