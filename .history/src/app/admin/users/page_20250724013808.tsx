"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Tooltip, Legend } from "chart.js";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

ChartJS.register(BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Tooltip, Legend, ArcElement);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UserAnalyticsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [dailyStats, setDailyStats] = useState<any>({});
  const [monthlyStats, setMonthlyStats] = useState<any>({});
  const [offensiveUsers, setOffensiveUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    const filteredData = users.filter(u =>
      (u.email?.toLowerCase().includes(s) || u.mobile_number?.includes(s)) &&
      (filterType === "all" || u.type === filterType)
    );
    setFiltered(filteredData);
  }, [search, filterType, users]);

  const fetchData = async () => {
    // Fetch chatbot sessions
    const { data: chatbotSessions } = await supabase.from("chatbot_sessions").select("*") ?? [];
const { data: chatbotRequests } = await supabase.from("chatbot_requests").select("id, session_id, prompt") ?? [];
const { data: consultationBookings } = await supabase.from("consultation_bookings").select("*") ?? [];


    // Merge chatbot sessions by user (mobile/email)
    const chatbotUsers = chatbotSessions.map(session => ({
      id: session.id,
      type: "chatbot",
      email: session.email,
      mobile_number: session.mobile_number,
      created_at: session.created_at,
    }));

    const consultationUsers = consultationBookings.map(booking => ({
      id: booking.id,
      type: "consultation",
      email: booking.email,
      mobile_number: booking.phone,
      created_at: booking.created_at,
    }));

    const merged = [...chatbotUsers, ...consultationUsers];

    // Detect offensive users
    const offensive = chatbotRequests.filter(req =>
      /(abuse|hate|kill|slap|foul|rape|illegal|bomb)/i.test(req.prompt || "")
    ).map(req => req.session_id);

    const offensiveSet = new Set(offensive);

    const userWithOffense = merged.map(u => ({
      ...u,
      offensive: offensiveSet.has(u.id)
    }));

    // Daily stats
    const dayStats: Record<string, number> = {};
    const monthStats: Record<string, number> = {};

    merged.forEach(u => {
      const d = new Date(u.created_at);
      const day = d.toISOString().slice(0, 10);
      const month = d.toISOString().slice(0, 7);

      dayStats[day] = (dayStats[day] || 0) + 1;
      monthStats[month] = (monthStats[month] || 0) + 1;
    });

    setUsers(userWithOffense);
    setFiltered(userWithOffense);
    setDailyStats(dayStats);
    setMonthlyStats(monthStats);
  };

  const lineChartData = {
    labels: Object.keys(dailyStats),
    datasets: [{
      label: "Users per day",
      data: Object.values(dailyStats),
      borderColor: "rgba(34, 197, 94, 1)",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
    }]
  };

  const barChartData = {
    labels: Object.keys(monthlyStats),
    datasets: [{
      label: "Users per month",
      data: Object.values(monthlyStats),
      backgroundColor: "rgba(59, 130, 246, 0.6)"
    }]
  };

  const pieChartData = {
    labels: ["Chatbot", "Consultation"],
    datasets: [{
      data: [
        users.filter(u => u.type === "chatbot").length,
        users.filter(u => u.type === "consultation").length
      ],
      backgroundColor: ["#06b6d4", "#9333ea"]
    }]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <Link href="/admin/dashboard" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold">User Analytics</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by email or mobile"
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="chatbot">Chatbot Users</option>
          <option value="consultation">Consultation Bookers</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3">Type</th>
              <th className="p-3">Created</th>
              <th className="p-3">Flagged</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-3">{u.email || "-"}</td>
                <td className="p-3">{u.mobile_number || "-"}</td>
                <td className="p-3 text-center">{u.type}</td>
                <td className="p-3 text-center">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className={`p-3 text-center font-semibold ${u.offensive ? "text-red-500" : "text-green-600"}`}>
                  {u.offensive ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white border rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-4">User Types</h3>
          <Pie data={pieChartData} />
        </div>
        <div className="bg-white border rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-4">Daily Users</h3>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white border rounded-lg p-4 shadow col-span-2">
          <h3 className="font-semibold mb-4">Monthly Users</h3>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
}
