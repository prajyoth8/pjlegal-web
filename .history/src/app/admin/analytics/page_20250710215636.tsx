"use client";

import { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    console.log("Fetching analytics...");
    fetch("src/api/analytics/response-source")
      .then((res) => res.json())
      .then((json) => {
        console.log("Received data:", json);
        setData(json);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics:", err);
      });
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
  );
}
