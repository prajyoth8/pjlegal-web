"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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
import AdminAuthGuard from "@/components/AdminAuthGuard";

const timeFrames = ["daily", "weekly", "monthly", "yearly"];

type UsageData = {
  date: string;
  tokens: number;
};

export default function TokenUsageDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");
  const [usageData, setUsageData] = useState<UsageData[]>([]);

  useEffect(() => {
    // Simulate fetching token usage data
    const mockData = {
      daily: [
        { date: "Mon", tokens: 1200 },
        { date: "Tue", tokens: 1500 },
        { date: "Wed", tokens: 1300 },
        { date: "Thu", tokens: 1800 },
        { date: "Fri", tokens: 2000 },
        { date: "Sat", tokens: 900 },
        { date: "Sun", tokens: 1100 },
      ],
      weekly: [
        { date: "Week 1", tokens: 8000 },
        { date: "Week 2", tokens: 9500 },
        { date: "Week 3", tokens: 7200 },
        { date: "Week 4", tokens: 8800 },
      ],
      monthly: [
        { date: "Jan", tokens: 36000 },
        { date: "Feb", tokens: 34000 },
        { date: "Mar", tokens: 39000 },
        { date: "Apr", tokens: 42000 },
        { date: "May", tokens: 41000 },
        { date: "Jun", tokens: 45500 },
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

    setUsageData(mockData[selectedTimeframe as keyof typeof mockData]);
  }, [selectedTimeframe]);

  const current = usageData[usageData.length - 1]?.tokens ?? 0;
  const previous = usageData[usageData.length - 2]?.tokens ?? 0;
  const trend = current >= previous ? "up" : "down";
  const diff = Math.abs(current - previous);
  const percent = previous ? ((diff / previous) * 100).toFixed(1) : "0";

  return (
    <AdminAuthGuard>
      <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold tracking-tight"
          >
            🧠 Token Usage Dashboard
          </motion.h1>

          <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <TabsList className="bg-slate-800/70 backdrop-blur border border-slate-600 rounded-full">
              {timeFrames.map((frame) => (
                <TabsTrigger
                  key={frame}
                  value={frame}
                  className="capitalize px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black transition"
                >
                  {frame}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedTimeframe}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card className="bg-slate-800/80 text-white border border-slate-700 shadow-xl backdrop-blur-md">
                  <CardContent className="p-6">
                    <p className="text-sm uppercase tracking-wide text-gray-400">Current Usage</p>
                    <p className="text-3xl font-bold mt-2">{current.toLocaleString()} tokens</p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-300">
                      {trend === "up" ? (
                        <ArrowUpRight className="text-green-400" size={20} />
                      ) : (
                        <ArrowDownRight className="text-red-400" size={20} />
                      )}
                      <span className={trend === "up" ? "text-green-400" : "text-red-400"}>
                        {percent}% {trend === "up" ? "↑" : "↓"} from last period
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-2 bg-slate-800/80 border border-slate-700 shadow-xl backdrop-blur-md">
                  <CardContent className="p-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="date" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1e293b", borderColor: "#64748b" }}
                          labelStyle={{ color: "#f1f5f9" }}
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
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
