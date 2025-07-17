// src/app/admin/dashboard/token/page.tsx
'use client';

import { Card, Title, Text, AreaChart, BarList, Metric, Grid, DonutChart, Flex } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { format, subDays, subMonths, subYears } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';

export default function TokenUsagePage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');
  const [dateRange, setDateRange] = useState({ from: subDays(new Date(), 7), to: new Date() });
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Enhanced color scheme for better visibility
  const colors = {
    background: 'bg-gray-950',
    cardBackground: 'bg-gray-900',
    cardBorder: 'border-gray-800',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-400',
    chartColors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
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
      const model = r.model_used || 'unknown';
      if (!acc[model]) acc[model] = { name: model, value: 0 };
      acc[model].value += r.response_tokens || 0;
      return acc;
    }, {});
    return Object.values(counts).sort((a, b) => b.value - a.value);
  }, [responses]);

  const totalTokens = processedData.reduce((sum, day) => sum + day.tokens, 0);

  return (
    <div className={`min-h-screen ${colors.background} p-6 text-gray-100`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Token Usage Analytics</h1>
            <p className={colors.textSecondary}>Track your AI token consumption</p>
          </div>
        </div>

        <Grid numItems={1} numItemsMd={3} className="gap-6">
          <Card className={`${colors.cardBackground} ${colors.cardBorder} p-6`}>
            <Text className={colors.textSecondary}>Total Tokens Used</Text>
            <Metric className="text-indigo-400">{totalTokens.toLocaleString()}</Metric>
            <Text className={`${colors.textSecondary} mt-2`}>
              {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
            </Text>
          </Card>

          <Card className={`${colors.cardBackground} ${colors.cardBorder} p-6`}>
            <Text className={colors.textSecondary}>Total Requests</Text>
            <Metric className="text-emerald-400">
              {processedData.reduce((sum, day) => sum + day.requests, 0).toLocaleString()}
            </Metric>
          </Card>

          <Card className={`${colors.cardBackground} ${colors.cardBorder} p-6`}>
            <Text className={colors.textSecondary}>Estimated Cost</Text>
            <Metric className="text-amber-400">${((totalTokens / 1000) * 0.002).toFixed(2)}</Metric>
          </Card>
        </Grid>

        <Grid numItems={1} numItemsLg={2} className="gap-6">
          <Card className={`${colors.cardBackground} ${colors.cardBorder} p-6`}>
            <Title className={colors.textPrimary}>Daily Token Usage</Title>
            <AreaChart
              className="mt-6 h-72"
              data={processedData}
              index="date"
              categories={['tokens']}
              colors={[colors.chartColors[0]]}
              valueFormatter={(value) => value.toLocaleString()}
              showAnimation
            />
          </Card>

          <Card className={`${colors.cardBackground} ${colors.cardBorder} p-6`}>
            <Title className={colors.textPrimary}>Model Distribution</Title>
            <div className="flex mt-6">
              <DonutChart
                className="h-64 w-1/2"
                data={modelData}
                category="value"
                index="name"
                colors={colors.chartColors}
                valueFormatter={(value) => value.toLocaleString()}
                showAnimation
              />
              <div className="w-1/2 pl-6">
                <BarList
                  data={modelData}
                  valueFormatter={(value) => value.toLocaleString()}
                />
              </div>
            </div>
          </Card>
        </Grid>

        <Card className={`${colors.cardBackground} ${colors.cardBorder} p-6`}>
          <Title className={colors.textPrimary}>Request Volume</Title>
          <AreaChart
            className="mt-6 h-72"
            data={processedData}
            index="date"
            categories={['requests']}
            colors={[colors.chartColors[2]]}
            valueFormatter={(value) => value.toLocaleString()}
            showAnimation
          />
        </Card>
      </div>
    </div>
  );
}