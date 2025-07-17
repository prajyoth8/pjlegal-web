// src/app/admin/dashboard/token/page.tsx
'use client';

import { AreaChart, BarList, DonutChart, Card, Title, Text, Metric, Grid, Flex } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiRefreshCw, FiTrendingUp, FiPieChart, FiDatabase } from 'react-icons/fi';
import { useEffect, useState, useMemo } from 'react';
import { format, subDays, subMonths, subYears } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';

type TimeRange = '24h' | '7d' | '30d' | '90d' | '12m' | 'custom';
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

export default function TokenUsagePage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [dateRange, setDateRange] = useState({ from: subDays(new Date(), 7), to: new Date() });
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Enhanced color palette for dark theme
  const colors = {
    background: 'bg-gray-950',
    card: 'bg-gray-900/80 border-gray-800',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-400',
    accent: 'text-indigo-400',
    chartColors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
  };

  const modelIcons: Record<string, () => JSX.Element> = {
    'gpt-4': () => <FiTrendingUp className={colors.accent} />,
    'system': () => <FiDatabase className="text-amber-400" />,
    'default': () => <FiPieChart className="text-fuchsia-400" />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('chatbot_responses')
          .select('created_at, response_tokens, model_used')
          .gte('created_at', dateRange.from.toISOString())
          .lte('created_at', dateRange.to.toISOString());
        setResponses(data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  const processedData = useMemo(() => {
    const grouped = responses.reduce((acc, r) => {
      const date = format(new Date(r.created_at), 'yyyy-MM-dd');
      if (!acc[date]) acc[date] = { date, tokens: 0, requests: 0 };
      acc[date].tokens += r.response_tokens || 0;
      acc[date].requests += 1;
      return acc;
    }, {});
    return Object.values(grouped).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [responses]);

  const modelData = useMemo(() => {
    const counts = responses.reduce((acc, r) => {
      const model = r.model_used || 'default';
      if (!acc[model]) acc[model] = { name: model, value: 0, icon: modelIcons[model] || modelIcons.default };
      acc[model].value += r.response_tokens || 0;
      return acc;
    }, {});
    return Object.values(counts).sort((a, b) => b.value - a.value);
  }, [responses]);

  const totalTokens = processedData.reduce((sum, day) => sum + day.tokens, 0);

  return (
    <div className={`min-h-screen ${colors.background} p-4 sm:p-6 text-gray-100`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <FiArrowLeft /> Back
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Token Usage Analytics
            </h1>
            <p className={colors.textSecondary}>Track your AI token consumption</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {/* Main Content */}
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-4">
          <Card className={`${colors.card} p-6 backdrop-blur-sm`}>
            <Title className={colors.textPrimary}>Total Tokens</Title>
            <Metric className="text-indigo-400">{totalTokens.toLocaleString()}</Metric>
            <Text className={colors.textSecondary}>
              {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d, yyyy')}
            </Text>
          </Card>

          <Card className={`${colors.card} p-6 backdrop-blur-sm`}>
            <Title className={colors.textPrimary}>Avg. Tokens/Request</Title>
            <Metric className="text-emerald-400">
              {Math.round(totalTokens / (processedData.reduce((sum, day) => sum + day.requests, 0)) || 1)}
            </Metric>
          </Card>

          <Card className={`${colors.card} p-6 backdrop-blur-sm`}>
            <Title className={colors.textPrimary}>Estimated Cost</Title>
            <Metric className="text-amber-400">${((totalTokens / 1000) * 0.002).toFixed(2)}</Metric>
            <Text className={colors.textSecondary}>GPT-4 pricing</Text>
          </Card>
        </Grid>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Token Usage */}
          <Card className={`${colors.card} p-6 backdrop-blur-sm`}>
            <Flex>
              <Title className={colors.textPrimary}>Daily Token Usage</Title>
            </Flex>
            <AreaChart
              className="mt-6 h-72"
              data={processedData}
              index="date"
              categories={['tokens']}
              colors={[colors.chartColors[0]]}
              valueFormatter={(value) => value.toLocaleString()}
              showAnimation
              yAxisWidth={60}
            />
          </Card>

          {/* Model Distribution */}
          <Card className={`${colors.card} p-6 backdrop-blur-sm`}>
            <Flex>
              <Title className={colors.textPrimary}>Model Distribution</Title>
            </Flex>
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
              <DonutChart
                className="h-64"
                data={modelData}
                category="value"
                index="name"
                colors={colors.chartColors}
                valueFormatter={(value) => value.toLocaleString()}
                showAnimation
              />
              <BarList
                className="w-full"
                data={modelData}
                valueFormatter={(value) => value.toLocaleString()}
              />
            </div>
          </Card>
        </div>

        {/* Request Volume */}
        <Card className={`${colors.card} p-6 backdrop-blur-sm`}>
          <Flex>
            <Title className={colors.textPrimary}>Request Volume</Title>
          </Flex>
          <AreaChart
            className="mt-6 h-72"
            data={processedData}
            index="date"
            categories={['requests']}
            colors={[colors.chartColors[2]]}
            valueFormatter={(value) => value.toLocaleString()}
            showAnimation
            yAxisWidth={60}
          />
        </Card>
      </div>
    </div>
  );
}