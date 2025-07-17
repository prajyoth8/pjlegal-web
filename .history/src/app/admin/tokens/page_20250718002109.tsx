// src/app/admin/dashboard/token/page.tsx
"use client";

import {
  Card,
  Title,
  Text,
  AreaChart,
  BarList,
  Metric,
  Grid,
  DonutChart,
  Flex,
} from "@tremor/react";
import { supabase } from "@/lib/supabaseClient";
import { useMemo, useState, useEffect } from "react";
import { format, subDays, subMonths, subYears } from "date-fns";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiPieChart, FiBarChart2, FiTrendingUp } from "react-icons/fi";
import AdminAuthGuard from "@/components/AdminAuthGuard";

type TimeRange = "24h" | "7d" | "30d" | "90d" | "12m" | "custom";
type ProcessedData = {
  date: string;
  tokens: number;
  requests: number;
};
type ModelData = {
  name: string;
  value: number;
  icon?: () => JSX.Element;
};
type ChatbotResponse = {
  created_at: string;
  response_tokens: number | null;
  model_used: string | null;
};

const modelIcons: Record<string, () => JSX.Element> = {
  "gpt-4": () => <FiTrendingUp className="text-indigo-500" />,
  "gpt-3.5": () => <FiBarChart2 className="text-violet-500" />,
  claude: () => <FiPieChart className="text-fuchsia-500" />,
  unknown: () => <FiCalendar className="text-amber-500" />,
};

export default function TokenUsagePage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [fromDateInput, setFromDateInput] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [toDateInput, setToDateInput] = useState(format(new Date(), "yyyy-MM-dd"));
  const [responses, setResponses] = useState<ChatbotResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("chatbot_responses")
          .select("created_at, response_tokens, model_used")
          .gte("created_at", dateRange.from.toISOString())
          .lte("created_at", dateRange.to.toISOString());

        if (error) throw error;
        setResponses((data as ChatbotResponse[]) || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleTimeRangeChange = (value: TimeRange) => {
    setTimeRange(value);
    const now = new Date();

    switch (value) {
      case "24h":
        setDateRange({ from: subDays(now, 1), to: now });
        break;
      case "7d":
        setDateRange({ from: subDays(now, 7), to: now });
        setFromDateInput(format(subDays(now, 7), "yyyy-MM-dd"));
        setToDateInput(format(now, "yyyy-MM-dd"));
        break;
      case "30d":
        setDateRange({ from: subDays(now, 30), to: now });
        setFromDateInput(format(subDays(now, 30), "yyyy-MM-dd"));
        setToDateInput(format(now, "yyyy-MM-dd"));
        break;
      case "90d":
        setDateRange({ from: subDays(now, 90), to: now });
        setFromDateInput(format(subDays(now, 90), "yyyy-MM-dd"));
        setToDateInput(format(now, "yyyy-MM-dd"));
        break;
      case "12m":
        setDateRange({ from: subYears(now, 1), to: now });
        setFromDateInput(format(subYears(now, 1), "yyyy-MM-dd"));
        setToDateInput(format(now, "yyyy-MM-dd"));
        break;
    }
  };

  const handleCustomDateApply = () => {
    setDateRange({
      from: new Date(fromDateInput),
      to: new Date(toDateInput),
    });
  };

  // Process data for charts
  const processedData = useMemo<ProcessedData[]>(() => {
    const groupedByDay = responses.reduce<Record<string, ProcessedData>>((acc, response) => {
      const date = format(new Date(response.created_at), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = {
          date,
          tokens: 0,
          requests: 0,
        };
      }
      acc[date].tokens += response.response_tokens || 0;
      acc[date].requests += 1;
      return acc;
    }, {});

    return Object.values(groupedByDay).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [responses]);

  // Process data for model breakdown
  const modelData = useMemo<ModelData[]>(() => {
    const modelCounts = responses.reduce<Record<string, ModelData>>((acc, response) => {
      const model = response.model_used || "unknown";
      if (!acc[model]) {
        acc[model] = {
          name: model,
          value: 0,
          icon: modelIcons[model] || modelIcons["unknown"],
        };
      }
      acc[model].value += response.response_tokens || 0;
      return acc;
    }, {});

    return Object.values(modelCounts).sort((a, b) => b.value - a.value);
  }, [responses]);

  // Calculate totals
  const totalTokens = useMemo(
    () => processedData.reduce((sum, day) => sum + day.tokens, 0),
    [processedData]
  );

  const totalRequests = useMemo(
    () => processedData.reduce((sum, day) => sum + day.requests, 0),
    [processedData]
  );

  const avgTokensPerRequest = useMemo(
    () => (totalRequests > 0 ? Math.round(totalTokens / totalRequests) : 0),
    [totalTokens, totalRequests]
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 bg-white rounded-xl shadow-sm"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-80 bg-white rounded-xl shadow-sm"></div>
              ))}
            </div>
            <div className="h-80 bg-white rounded-xl shadow-sm"></div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 text-red-500">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 mb-4 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Token Usage Analytics</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Track your AI token consumption and optimize costs
            </p>
          </div>

          {/* Date controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value as TimeRange)}
              className="w-full sm:w-40 p-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
            >
              <option value="24h">Last 24h</option>
              <option value="7d">Last 7d</option>
              <option value="30d">Last 30d</option>
              <option value="90d">Last 90d</option>
              <option value="12m">Last 12m</option>
              <option value="custom">Custom</option>
            </select>

            {timeRange === "custom" && (
              <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="date"
                    value={fromDateInput}
                    onChange={(e) => setFromDateInput(e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-100"
                  />
                  <span className="text-gray-400 text-sm">to</span>
                  <input
                    type="date"
                    value={toDateInput}
                    onChange={(e) => setToDateInput(e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <button
                  onClick={handleCustomDateApply}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <Grid numItems={1} numItemsSm={2} numItemsMd={3} className="gap-4 sm:gap-6 mb-6">
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-all border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm">
            <Text className="text-sm font-medium text-gray-500">Total Tokens Used</Text>
            <Metric className="mt-1 text-2xl sm:text-3xl">{totalTokens.toLocaleString()}</Metric>
            <Text className="mt-2 text-xs sm:text-sm text-gray-400">
              {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
            </Text>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-all border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm">
            <Text className="text-sm font-medium text-gray-500">Total Requests</Text>
            <Metric className="mt-1 text-2xl sm:text-3xl">{totalRequests.toLocaleString()}</Metric>
            <Text className="mt-2 text-xs sm:text-sm text-gray-400">
              {avgTokensPerRequest.toLocaleString()} avg tokens/request
            </Text>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-all border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm">
            <Text className="text-sm font-medium text-gray-500">Estimated Cost</Text>
            <Metric className="mt-1 text-2xl sm:text-3xl">
              ${((totalTokens / 1000) * 0.002).toFixed(2)}
            </Metric>
            <Text className="mt-2 text-xs sm:text-sm text-gray-400">Based on GPT-4 pricing</Text>
          </Card>
        </Grid>

        {/* Main Charts */}
        <Grid numItems={1} numItemsLg={2} className="gap-4 sm:gap-6 mb-6">
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-all border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm">
            <Flex className="items-center gap-2">
              <FiTrendingUp className="text-indigo-500 w-5 h-5" />
              <Title className="text-lg font-semibold">Daily Token Usage</Title>
            </Flex>
            <AreaChart
              className="mt-6 h-64"
              data={processedData}
              index="date"
              categories={["tokens"]}
              colors={["indigo"]}
              valueFormatter={(value: number) => value.toLocaleString()}
              showAnimation
              yAxisWidth={60}
            />
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-all border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm">
            <Flex className="items-center gap-2">
              <FiPieChart className="text-violet-500 w-5 h-5" />
              <Title className="text-lg font-semibold">Model Distribution</Title>
            </Flex>
            <div className="flex flex-col lg:flex-row mt-6">
              <DonutChart
                className="h-64 w-full lg:w-1/2"
                data={modelData}
                category="value"
                index="name"
                colors={["indigo", "violet", "fuchsia", "cyan", "amber"]}
                valueFormatter={(value: number) => value.toLocaleString()}
                showAnimation
              />
              <div className="w-full lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
                <BarList
                  data={modelData}
                  valueFormatter={(value: number) => value.toLocaleString()}
                />
              </div>
            </div>
          </Card>
        </Grid>

        {/* Bottom Chart */}
        <Card className="p-4 sm:p-6 hover:shadow-lg transition-all border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm">
          <Flex className="items-center gap-2">
            <FiBarChart2 className="text-emerald-500 w-5 h-5" />
            <Title className="text-lg font-semibold">Request Volume</Title>
          </Flex>
          <AreaChart
            className="mt-6 h-64"
            data={processedData}
            index="date"
            categories={["requests"]}
            colors={["emerald"]}
            valueFormatter={(value: number) => value.toLocaleString()}
            showAnimation
            yAxisWidth={60}
          />
        </Card>
      </div>
    </div>
  );
}
