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
    <AdminAuthGuard>

    </AdminAuthGuard>
    
  );
}
