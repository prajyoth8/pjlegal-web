"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminUsersPage() {
  const [chatbotUsers, setChatbotUsers] = useState<any[]>([]);
  const [consultUsers, setConsultUsers] = useState<any[]>([]);
  const [offensiveUsers, setOffensiveUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchChatbotUsers();
    fetchConsultUsers();
    fetchOffensiveUsers();
  }, []);

  async function fetchChatbotUsers() {
    const { data } = await supabase
      .from("chatbot_sessions")
      .select("*")
      .order("started_at", { ascending: false });

    setChatbotUsers(data || []);
  }

  async function fetchConsultUsers() {
    const { data } = await supabase
      .from("consultation_bookings")
      .select("*")
      .order("created_at", { ascending: false });

    setConsultUsers(data || []);
  }

  async function fetchOffensiveUsers() {
    const { data } = await supabase.rpc("get_offensive_users");
    setOffensiveUsers(data || []);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🧑‍💼 Admin Dashboard – Users</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">📦 Chatbot Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Email</th>
              <th>Mobile</th>
              <th>IP</th>
              <th>Auth Method</th>
              <th>Sessions</th>
              <th>Last Used</th>
            </tr>
          </thead>
          <tbody>
            {chatbotUsers.map((user, idx) => (
              <tr key={idx} className="border-t">
                <td>{user.email || "-"}</td>
                <td>{user.mobile || "-"}</td>
                <td>{user.ip_address}</td>
                <td>{user.auth_method}</td>
                <td>
                  {/* Count sessions for same user */}
                  {chatbotUsers.filter(u => u.user_id === user.user_id).length}
                </td>
                <td>{format(new Date(user.started_at), "PPpp")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">📋 Consultation Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {consultUsers.map((u, i) => (
              <tr key={i} className="border-t">
                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.preferred_date}</td>
                <td>{u.preferred_time}</td>
                <td>{u.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-red-600">🚨 Offensive Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-red-100">
              <th>Email</th>
              <th>Mobile</th>
              <th>Prompt</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {offensiveUsers.map((u, i) => (
              <tr key={i} className="border-t">
                <td>{u.email || "-"}</td>
                <td>{u.mobile || "-"}</td>
                <td className="text-sm">{u.prompt}</td>
                <td>{format(new Date(u.created_at), "PPpp")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
