"use client";

import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TokenDashboard() {
  const [tokenData, setTokenData] = useState<{ date: string; tokens: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    fetchTokenData();
  }, [range]);

  const fetchTokenData = async () => {
    setLoading(true);
    const { startDate, endDate } = range[0];

    const { data, error } = await supabase
      .from("chatbot_responses")
      .select("created_at, response_tokens")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString());

    if (error) {
      console.error("Error fetching token data:", error.message);
      return;
    }

    // Aggregate by date
    const grouped = data.reduce((acc: Record<string, number>, entry) => {
      const date = format(new Date(entry.created_at), "yyyy-MM-dd");
      acc[date] = (acc[date] || 0) + (entry.response_tokens || 0);
      return acc;
    }, {});

    const chartData = Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, tokens]) => ({ date, tokens }));

    setTokenData(chartData);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">📊 Token Usage Dashboard</h1>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md max-w-full overflow-x-auto">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={range}
        />
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <Chart
            type="line"
            height={350}
            options={{
              chart: { id: "token-chart", toolbar: { show: false } },
              xaxis: {
                categories: tokenData.map((d) => d.date),
                title: { text: "Date" },
              },
              yaxis: {
                title: { text: "Tokens Used" },
              },
              stroke: { curve: "smooth" },
              markers: { size: 4 },
              colors: ["#6366F1"],
            }}
            series={[
              {
                name: "Tokens",
                data: tokenData.map((d) => d.tokens),
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
