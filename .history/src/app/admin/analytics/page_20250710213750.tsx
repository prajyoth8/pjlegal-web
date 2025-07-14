"use client";

"use client";

import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/analytics/summary")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#71717a',
          font: {
            family: 'Inter, sans-serif',
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#71717a',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#71717a',
        }
      }
    }
  };

  if (isLoading) return <AnalyticsSkeleton />;
  if (!analytics) return <div className="p-4 text-center">Failed to load analytics data</div>;

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
        borderColor: ["#1e40af", "#9a3412"],
        borderWidth: 1,
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
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const modelUsageBarData = {
    labels: modelUsageTimeline.map((d: any) => format(new Date(d.date), "MMM dd")),
    datasets: [
      {
        label: "OpenAI",
        data: modelUsageTimeline.map((d: any) => d.openai || 0),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "#1e40af",
        borderWidth: 1,
      },
      {
        label: "DeepSeek",
        data: modelUsageTimeline.map((d: any) => d.deepseek || 0),
        backgroundColor: "rgba(249, 115, 22, 0.7)",
        borderColor: "#9a3412",
        borderWidth: 1,
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
        backgroundColor: "rgba(250, 204, 21, 0.1)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-400">
          Chatbot Analytics Dashboard
        </h2>
        <div className="text-sm text-muted-foreground">
          Last updated: {format(new Date(), "MMM d, yyyy h:mm a")}
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Prompts" 
          value={totalRequests} 
          change="+12%"
          icon="📈"
        />
        <StatCard 
          title="OpenAI Usage" 
          value={openaiCount} 
          change="+8%"
          icon="🤖"
        />
        <StatCard 
          title="DeepSeek Usage" 
          value={deepseekCount} 
          change="+24%"
          icon="🔍"
        />
        <StatCard 
          title="Semantic Search" 
          value={`${semanticPercent}%`} 
          change="+5%"
          icon="🧠"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Usage Distribution */}
        <ChartCard title="Model Usage Distribution">
          <div className="h-80">
            <Pie 
              data={modelPieData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </ChartCard>

        {/* Average Response Latency */}
        <ChartCard title="Average Response Latency">
          <div className="h-80">
            <Line 
              data={latencyLineData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.dataset.label}: ${context.raw}ms`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </ChartCard>

        {/* Model Usage Over Time */}
        <ChartCard title="Model Usage Over Time">
          <div className="h-80">
            <Bar 
              data={modelUsageBarData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </ChartCard>

        {/* Semantic Search Usage Trend */}
        <ChartCard title="Semantic Search Usage Trend">
          <div className="h-80">
            <Line 
              data={semanticLineData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.dataset.label}: ${context.raw}%`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string; value: string | number; change?: string; icon?: string }) {
  return (
    <Card className="bg-background/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {change && (
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                {change}
              </span>
            )}
          </div>
          {icon && (
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
              <span className="text-xl">{icon}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="bg-background/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <Skeleton className="h-10 w-64" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-80 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}