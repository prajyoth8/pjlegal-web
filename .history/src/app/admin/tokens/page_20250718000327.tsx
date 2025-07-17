// src/app/admin/dashboard/token/page.tsx
'use client';

import { Card, Title, Text, AreaChart, BarList, Flex, Metric, Grid, DonutChart, Select, SelectItem } from '@tremor/react';
import { supabase } from '@/lib/supabase';
import { useMemo, useState, useEffect } from 'react';
import { format, subDays, subMonths, subYears } from 'date-fns';

type TimeRange = '24h' | '7d' | '30d' | '90d' | '12m' | 'custom';

export default function TokenUsagePage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [fromDateInput, setFromDateInput] = useState(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
  const [toDateInput, setToDateInput] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('chatbot_responses')
          .select('created_at, response_tokens, model_used')
          .gte('created_at', dateRange.from.toISOString())
          .lte('created_at', dateRange.to.toISOString());

        if (error) throw error;
        setResponses(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleTimeRangeChange = (value: string) => {
    const range = value as TimeRange;
    setTimeRange(range);
    const now = new Date();
    
    switch (range) {
      case '24h':
        setDateRange({ from: subDays(now, 1), to: now });
        break;
      case '7d':
        setDateRange({ from: subDays(now, 7), to: now });
        setFromDateInput(format(subDays(now, 7), 'yyyy-MM-dd'));
        setToDateInput(format(now, 'yyyy-MM-dd'));
        break;
      case '30d':
        setDateRange({ from: subDays(now, 30), to: now });
        setFromDateInput(format(subDays(now, 30), 'yyyy-MM-dd'));
        setToDateInput(format(now, 'yyyy-MM-dd'));
        break;
      case '90d':
        setDateRange({ from: subDays(now, 90), to: now });
        setFromDateInput(format(subDays(now, 90), 'yyyy-MM-dd'));
        setToDateInput(format(now, 'yyyy-MM-dd'));
        break;
      case '12m':
        setDateRange({ from: subYears(now, 1), to: now });
        setFromDateInput(format(subYears(now, 1), 'yyyy-MM-dd'));
        setToDateInput(format(now, 'yyyy-MM-dd'));
        break;
      case 'custom':
        // Custom range will be handled by the date inputs
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
  const processedData = useMemo(() => {
    if (!responses) return [];

    const groupedByDay = responses.reduce((acc, response) => {
      const date = format(new Date(response.created_at), 'yyyy-MM-dd');
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
    }, {} as Record<string, { date: string; tokens: number; requests: number }>);

    return Object.values(groupedByDay).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [responses]);

  // Process data for model breakdown
  const modelData = useMemo(() => {
    if (!responses) return [];

    const modelCounts = responses.reduce((acc, response) => {
      const model = response.model_used || 'unknown';
      if (!acc[model]) {
        acc[model] = {
          name: model,
          value: 0,
        };
      }
      acc[model].value += response.response_tokens || 0;
      return acc;
    }, {} as Record<string, { name: string; value: number }>);

    return Object.values(modelCounts).sort((a, b) => b.value - a.value);
  }, [responses]);

  // Calculate totals
  const totalTokens = processedData.reduce((sum, day) => sum + day.tokens, 0);
  const totalRequests = processedData.reduce((sum, day) => sum + day.requests, 0);
  const avgTokensPerRequest = totalRequests > 0 ? Math.round(totalTokens / totalRequests) : 0;

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Token Usage Analytics</h1>
          <p className="text-gray-500">Track your AI token consumption and optimize costs</p>
        </div>
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => handleTimeRangeChange(e.target.value)}
            className="min-w-[120px] p-2 border rounded-md"
          >
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7d</option>
            <option value="30d">Last 30d</option>
            <option value="90d">Last 90d</option>
            <option value="12m">Last 12m</option>
            <option value="custom">Custom</option>
          </select>
          
          {timeRange === 'custom' && (
            <div className="flex gap-2 items-center">
              <input
                type="date"
                value={fromDateInput}
                onChange={(e) => setFromDateInput(e.target.value)}
                className="p-2 border rounded-md"
              />
              <span>to</span>
              <input
                type="date"
                value={toDateInput}
                onChange={(e) => setToDateInput(e.target.value)}
                className="p-2 border rounded-md"
              />
              <button
                onClick={handleCustomDateApply}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      <Grid numItems={1} numItemsMd={3} className="gap-6 mb-6">
        <Card className="hover:shadow-lg transition-shadow">
          <Text>Total Tokens Used</Text>
          <Metric>{totalTokens.toLocaleString()}</Metric>
          <Text className="mt-2">{format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}</Text>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <Text>Total Requests</Text>
          <Metric>{totalRequests.toLocaleString()}</Metric>
          <Text className="mt-2">{avgTokensPerRequest.toLocaleString()} avg tokens/request</Text>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <Text>Estimated Cost</Text>
          <Metric>${((totalTokens / 1000) * 0.002).toFixed(2)}</Metric>
          <Text className="mt-2">Based on GPT-4 pricing</Text>
        </Card>
      </Grid>

      <Grid numItems={1} numItemsLg={2} className="gap-6 mb-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <Title>Daily Token Usage</Title>
          <AreaChart
            className="mt-6"
            data={processedData}
            index="date"
            categories={["tokens"]}
            colors={["indigo"]}
            valueFormatter={(value) => value.toLocaleString()}
            showAnimation
            yAxisWidth={60}
          />
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <Title>Model Distribution</Title>
          <div className="flex">
            <DonutChart
              className="mt-6 w-1/2"
              data={modelData}
              category="value"
              index="name"
              colors={["indigo", "violet", "fuchsia", "cyan", "amber"]}
              valueFormatter={(value) => value.toLocaleString()}
              showAnimation
            />
            <div className="w-1/2 pl-6">
              <BarList
                data={modelData}
                valueFormatter={(value) => value.toLocaleString()}
                className="mt-6"
              />
            </div>
          </div>
        </Card>
      </Grid>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <Title>Request Volume</Title>
        <AreaChart
          className="mt-6"
          data={processedData}
          index="date"
          categories={["requests"]}
          colors={["emerald"]}
          valueFormatter={(value) => value.toLocaleString()}
          showAnimation
          yAxisWidth={60}
        />
      </Card>
    </div>
  );
}