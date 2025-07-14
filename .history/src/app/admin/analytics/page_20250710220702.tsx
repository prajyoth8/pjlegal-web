"use client";

import { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [sourceData, setSourceData] = useState<any>(null);


  useEffect(() => {
  async function fetchData() {
    const res = await fetch("/api/analytics/response-source");
    const sourceBreakdown = await res.json();

    // Extract labels and values
    const labels = sourceBreakdown.map((item) => item.name);
    const values = sourceBreakdown.map((item) => item.value);

    setSourceData({
      labels,
      datasets: [
        {
          label: "Response Source",
          data: values,
          backgroundColor: ["#10B981", "#3B82F6"],
        },
      ],
    });
  }

  fetchData();
}, []);


  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">📊 Admin Analytics</h1>
      {data.length === 0 ? (
        <p>Loading analytics...</p>
      ) : (
        <ul className="list-disc pl-5">
          {data.map((item, idx) => (
            <li key={idx}>
              {item.name}: {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
    {/* 🧠 Source Breakdown */}
<div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6">
  <h2 className="text-lg font-semibold mb-2">Response Source</h2>
  {sourceData ? (
    <Pie data={sourceData} />
  ) : (
    <p>Loading source data...</p>
  )}
</div>

  );
}
