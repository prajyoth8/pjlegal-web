"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const COLORS = ["#0088FE", "#FF8042"]; // Semantic, Direct

export default function AnalyticsPage() {
  const [data, setData] = useState([
    { name: "Semantic Search", value: 0 },
    { name: "Direct AI", value: 0 },
  ]);

  useEffect(() => {
    fetch("/api/analytics/response-source")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <>
      <Head>
        <title>Analytics – Admin Dashboard</title>
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            📊 Response Source Analytics
          </h1>

          <div className="text-gray-600 dark:text-gray-300 mb-4">
            Total Responses Analyzed: <span className="font-semibold">{total}</span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${percent !== undefined ? (percent * 100).toFixed(0) : "0"}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-2">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded"
              >
                <span>{item.name}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
