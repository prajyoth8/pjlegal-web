"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Link } from "lucide-react";

// ✅ Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UsersPage() {
  const [chatbotSessions, setChatbotSessions] = useState<any[]>([]);
  const [consultationBookings, setConsultationBookings] = useState<any[]>([]);
  const [offensiveUsers, setOffensiveUsers] = useState<any[]>([]);
  const [interval, setInterval] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data: sessions } = await supabase.from("chatbot_sessions").select("*");
    const { data: bookings } = await supabase.from("consultation_bookings").select("*");

    const { data: requests } = await supabase.from("chatbot_requests").select("*");
    const { data: responses } = await supabase.from("chatbot_responses").select("*");

    const offensive = requests
      ?.filter((r) => r.is_offensive || r.is_banned || r.is_unethical)
      .map((r) => ({
        ...r,
        response: responses?.find((res) => res.request_id === r.id)?.text ?? "",
      }));

    setChatbotSessions(sessions || []);
    setConsultationBookings(bookings || []);
    setOffensiveUsers(offensive || []);
  };

  const getFilteredSessions = () =>
    chatbotSessions.filter(
      (u) =>
        (u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.mobile?.includes(searchTerm)) &&
        u.created_at
    );

  const groupByInterval = (items: any[]) => {
    const now = new Date();
    const keyFn = {
      daily: (date: Date) => format(date, "yyyy-MM-dd"),
      weekly: (date: Date) => format(subWeeks(date, 0), "yyyy-'W'II"),
      monthly: (date: Date) => format(date, "yyyy-MM"),
      yearly: (date: Date) => format(date, "yyyy"),
    }[interval];

    const result: Record<string, number> = {};
    items.forEach((item) => {
      const date = new Date(item.created_at);
      const key = keyFn(date);
      result[key] = (result[key] || 0) + 1;
    });
    return result;
  };

  const chatbotGrouped = groupByInterval(getFilteredSessions());
  const consultGrouped = groupByInterval(consultationBookings);
  const offensiveGrouped = groupByInterval(offensiveUsers);

  const buildChartData = (grouped: Record<string, number>, label: string) => ({
    labels: Object.keys(grouped),
    datasets: [
      {
        label,
        data: Object.values(grouped),
        backgroundColor: "rgba(0, 200, 255, 0.6)",
        borderColor: "rgba(0, 200, 255, 1)",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management & Analytics</h1>
        <Link
          href="/admin/dashboard"
          className="text-sm px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Search & Interval Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by email or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/2"
        />
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value as any)}
          className="px-4 py-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-lg font-semibold mb-2">📈 Chatbot Users</h2>
          <Bar data={buildChartData(chatbotGrouped, "Chatbot Usage")} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">📅 Consultations</h2>
          <Line data={buildChartData(consultGrouped, "Bookings")} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">❗ Offensive Users</h2>
          <Pie data={buildChartData(offensiveGrouped, "Offensive Flags")} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">📊 Histogram</h2>
          <Bar data={buildChartData(chatbotGrouped, "Chatbot Histogram")} />
        </div>
      </div>

      {/* Tables */}
      <div className="space-y-12">
        {/* Chatbot Users */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🤖 Chatbot Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Mobile</th>
                  <th className="p-2 border">Last Used</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredSessions().map((u, i) => (
                  <tr key={u.id}>
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{u.email || "-"}</td>
                    <td className="p-2 border">{u.mobile || "-"}</td>
                    <td className="p-2 border">
                      {new Date(u.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Consult Users */}
        <section>
          <h2 className="text-xl font-semibold mb-4">📞 Consultation Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {consultationBookings.map((b, i) => (
                  <tr key={b.id}>
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{b.full_name}</td>
                    <td className="p-2 border">{b.email}</td>
                    <td className="p-2 border">
                      {new Date(b.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Offensive Users */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-red-500">🚨 Offensive Queries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-red-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Query</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {offensiveUsers.map((u, i) => (
                  <tr key={u.id}>
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{u.user_id || "Anonymous"}</td>
                    <td className="p-2 border text-red-600">{u.text}</td>
                    <td className="p-2 border">
                      {new Date(u.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
