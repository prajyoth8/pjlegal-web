"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const timeFrames = ["daily", "weekly", "monthly", "yearly"];

type UsageData = { date: string; tokens: number };

export default function TokenPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");
  const [usageData, setUsageData] = useState<UsageData[]>([]);

  useEffect(() => {
    const mock = {
      daily: [
        { date: "Mon", tokens: 1200 },
        { date: "Tue", tokens: 1400 },
        { date: "Wed", tokens: 1700 },
        { date: "Thu", tokens: 1800 },
        { date: "Fri", tokens: 2000 },
        { date: "Sat", tokens: 900 },
        { date: "Sun", tokens: 1000 },
      ],
      weekly: [
        { date: "Week 1", tokens: 8800 },
        { date: "Week 2", tokens: 7200 },
        { date: "Week 3", tokens: 9500 },
        { date: "Week 4", tokens: 11000 },
      ],
      monthly: [
        { date: "Jan", tokens: 34000 },
        { date: "Feb", tokens: 31000 },
        { date: "Mar", tokens: 42000 },
        { date: "Apr", tokens: 39000 },
        { date: "May", tokens: 45000 },
        { date: "Jun", tokens: 47000 },
        { date: "Jul", tokens: 39800 },
      ],
      yearly: [
        { date: "2021", tokens: 200000 },
        { date: "2022", tokens: 340000 },
        { date: "2023", tokens: 420000 },
        { date: "2024", tokens: 470000 },
        { date: "2025", tokens: 510000 },
      ],
    };

    setUsageData(mock[selectedTimeframe as keyof typeof mock]);
  }, [selectedTimeframe]);

  const current = usageData[usageData.length - 1]?.tokens ?? 0;
  const previous = usageData[usageData.length - 2]?.tokens ?? 0;
  const trend = current >= previous ? "up" : "down";
  const diff = Math.abs(current - previous);
  const percent = previous ? ((diff / previous) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gradient-to-br from-slate-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight"
        >
          🧠 Token Usage Dashboard
        </motion.h1>

        {/* Timeframe Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
          {timeFrames.map((frame) => (
            <button
              key={frame}
              onClick={() => setSelectedTimeframe(frame)}
              className={`capitalize px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedTimeframe === frame
                  ? "bg-white text-black"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {frame}
            </button>
          ))}
        </div>

        {/* Current Stats & Chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Current Usage Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg backdrop-blur">
            <p className="text-sm uppercase text-gray-400">Current Usage</p>
            <p className="text-3xl font-bold mt-2">{current.toLocaleString()} tokens</p>
            <div className="flex items-center gap-2 mt-3 text-sm">
              {trend === "up" ? (
                <ArrowUpRight className="text-green-400" size={20} />
              ) : (
                <ArrowDownRight className="text-red-400" size={20} />
              )}
              <span className={trend === "up" ? "text-green-400" : "text-red-400"}>
                {percent}% {trend === "up" ? "↑" : "↓"} from last
              </span>
            </div>
          </div>

          {/* Line Chart */}
          <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg backdrop-blur">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#64748b" }}
                  labelStyle={{ color: "#f8fafc" }}
                  itemStyle={{ color: "#fcd34d" }}
                />
                <Line
                  type="monotone"
                  dataKey="tokens"
                  stroke="#fcd34d"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
