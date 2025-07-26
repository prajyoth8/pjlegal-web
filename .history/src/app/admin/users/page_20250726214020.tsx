"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { useEffect, useState, useCallback, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Activity,
  Calendar,
  AlertCircle,
  BarChart2,
  Users,
  Phone,
  AlertTriangle,
  Search,
  X,
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

// Typed debounce function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function highlightMatch(text: string, query: string) {
  if (!query || !text) return text;
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-yellow-100 text-yellow-800 px-1 rounded">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function UsersPage() {
  const [chatbotSessions, setChatbotSessions] = useState<any[]>([]);
  const [consultationBookings, setConsultationBookings] = useState<any[]>([]);
  const [chatbotRequests, setChatbotRequests] = useState<any[]>([]);
  const [offensiveQueries, setOffensiveQueries] = useState<any[]>([]);
  const [period, setPeriod] = useState("yearly");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: chatbot_sessions } = await supabase
      .from("chatbot_sessions")
      .select("*");

    const { data: consultation_bookings } = await supabase
      .from("consultation_bookings")
      .select("*");

    const { data: chatbot_requests } = await supabase
      .from("chatbot_requests")
      .select("*");

    const { data: feedback } = await supabase
      .from("feedback")
      .select("*, users(email)")
      .eq("rating", "offensive");

    setChatbotSessions(chatbot_sessions || []);
    setConsultationBookings(consultation_bookings || []);
    setChatbotRequests(chatbot_requests || []);
    setOffensiveQueries(feedback || []);
  };

  const debouncedSearch = useCallback(
    debounce(() => setIsSearching(false), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
    debouncedSearch();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  // Filter data based on period and search term
  const filterData = (data: any[], fieldsToSearch: string[]) => {
    const now = new Date();
    const periodFiltered = data.filter((item) => {
      const createdAt = new Date(item.created_at);
      switch (period) {
        case "daily": return createdAt.toDateString() === now.toDateString();
        case "weekly": return createdAt >= subDays(now, 7);
        case "monthly": return createdAt >= subDays(now, 30);
        default: return createdAt >= subDays(now, 365);
      }
    });

    if (!searchTerm) return periodFiltered;

    return periodFiltered.filter((item) =>
      fieldsToSearch.some((field) =>
        String(item[field] || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Group users by email and count usage
  const groupedUsers = useMemo(() => {
    return chatbotSessions.reduce((acc: any, session) => {
      const email = session.email;
      if (!email) return acc;
      if (!acc[email]) acc[email] = { email, count: 0 };
      acc[email].count += 1;
      return acc;
    }, {});
  }, [chatbotSessions]);

  // Apply filters to all data sections
  const filteredUserList = useMemo(() => {
    return Object.values(groupedUsers)
      .sort((a: any, b: any) => b.count - a.count)
      .filter((user: any) => 
        !searchTerm || user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [groupedUsers, searchTerm]);

  const filteredConsultations = useMemo(() => 
    filterData(consultationBookings, ["email", "full_name"]), 
    [consultationBookings, period, searchTerm]
  );

  const filteredOffensives = useMemo(() => 
    filterData(offensiveQueries, ["users.email", "comment", "query"]), 
    [offensiveQueries, period, searchTerm]
  );

  const filteredRequests = useMemo(() => 
    filterData(chatbotRequests, []), 
    [chatbotRequests, period]
  );

  // Prepare chart data
  const groupedRequests = filteredRequests.reduce((acc: any, item) => {
    const date = format(parseISO(item.created_at), "yyyy-MM-dd");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(groupedRequests).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">User Management & Analytics</h1>
        <Link href="/admin/dashboard" className="text-sm flex gap-1 text-blue-600 hover:underline">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search across all users and queries..."
            className="border rounded-lg pl-10 pr-8 py-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {isSearching && (
            <div className="absolute right-3 inset-y-0 flex items-center">
              <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
          {searchTerm && !isSearching && (
            <button
              onClick={clearSearch}
              className="absolute right-3 inset-y-0 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" /> Chatbot Usage
          </h2>
          <BarChart width={500} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="count" fill="#00CFE8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" /> Consultations
          </h2>
          <LineChart
            width={500}
            height={250}
            data={filteredConsults.map((c) => ({
              date: format(new Date(c.created_at), "yyyy-MM-dd"),
              count: 1,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis allowDecimals={false} stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" /> Offensive Users
          </h2>
          <PieChart width={400} height={250}>
            <Pie
              data={filteredOffensives.map((item, i) => ({
                name: item.users?.email || "Unknown",
                value: 1,
              }))}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name }) => name.substring(0, 12) + (name.length > 12 ? "..." : "")}
              labelLine={false}
            >
              {filteredOffensives.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, name]} />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-amber-500" /> Request Histogram
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="count" fill="#00CFE8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      {/* Tables with global search */}
      <div className="space-y-8">
        {/* Chatbot Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> Chatbot Users
              {searchTerm && (
                <span className="text-sm text-gray-500 ml-2">
                  ({filteredUserList.length} results)
                </span>
              )}
            </h2>
          </div>
          <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 font-semibold text-left">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Usage Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUserList.length > 0 ? (
                  filteredUserList.map((user: any, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3 font-medium">{highlightMatch(user.email, searchTerm)}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {user.count} {user.count === 1 ? "session" : "sessions"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Mail className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-gray-600">
                          {searchTerm ? "No users match your search" : "No chatbot users found"}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-3 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-500" /> Consultation Bookings
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 font-semibold text-left">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {consultationBookings.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3 font-medium">{item.full_name}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3 text-gray-500">
                      {item.created_at ? format(new Date(item.created_at), "PPpp") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden border border-red-100">
          <div className="p-4 border-b border-red-100 bg-red-50">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" /> Offensive Queries
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-red-50 font-semibold text-left">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Query</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                {offensiveQueries.map((item, i) => (
                  <tr key={i} className="hover:bg-red-50 transition-colors">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3 font-medium">{item.users?.email || "-"}</td>
                    <td className="p-3 max-w-xs truncate">{item.comment || item.query || "—"}</td>
                    <td className="p-3 text-red-500">
                      {item.created_at ? format(new Date(item.created_at), "PPpp") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";
// import { format, parseISO, subDays } from "date-fns";
// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

// function convertToIST(dateString: string) {
//   if (!dateString) return "-";
//   const utcDate = new Date(dateString);
//   return utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
// }

// export default function UsersPage() {
//   const [chatbotSessions, setChatbotSessions] = useState<any[]>([]);
//   const [consultationBookings, setConsultationBookings] = useState<any[]>([]);
//   const [chatbotRequests, setChatbotRequests] = useState<any[]>([]);
//   const [offensiveQueries, setOffensiveQueries] = useState<any[]>([]);
//   const [period, setPeriod] = useState("yearly");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const { data: chatbot_sessions } = await supabase
//       .from("chatbot_sessions")
//       .select("*");

//     const { data: consultation_bookings } = await supabase
//       .from("consultation_bookings")
//       .select("*");

//     const { data: chatbot_requests } = await supabase
//       .from("chatbot_requests")
//       .select("*");

//     const { data: feedback } = await supabase
//       .from("feedback")
//       .select("*, users(email)")
//       .eq("rating", "offensive");

//     setChatbotSessions(chatbot_sessions || []);
//     setConsultationBookings(consultation_bookings || []);
//     setChatbotRequests(chatbot_requests || []);
//     setOffensiveQueries(feedback || []);
//   };

//   const filterByPeriod = (data: any[]) => {
//     const now = new Date();
//     return data.filter((item) => {
//       const createdAt = new Date(item.created_at);
//       switch (period) {
//         case "daily":
//           return createdAt.toDateString() === now.toDateString();
//         case "weekly":
//           return createdAt >= subDays(now, 7);
//         case "monthly":
//           return createdAt >= subDays(now, 30);
//         default:
//           return createdAt >= subDays(now, 365);
//       }
//     });
//   };

//   const filteredSessions = filterByPeriod(chatbotSessions);
//   const filteredConsults = filterByPeriod(consultationBookings);
//   const filteredRequests = filterByPeriod(chatbotRequests);
//   const filteredOffensives = filterByPeriod(offensiveQueries);

//   const filteredSearch = chatbotSessions.filter((user) =>
//     (user.email || "")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase()) ||
//     (user.mobile_number || "")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const groupedRequests = filteredRequests.reduce((acc: any, item) => {
//     const date = format(parseISO(item.created_at), "yyyy-MM-dd");
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = Object.entries(groupedRequests).map(([date, count]) => ({
//     date,
//     count,
//   }));

//   const groupedUsers = Object.values(
//     filteredSessions.reduce((acc: any, session) => {
//       const email = session.email || "Unknown";
//       if (!acc[email]) {
//         acc[email] = {
//           email,
//           count: 1,
//           lastUsed: session.updated_at,
//         };
//       } else {
//         acc[email].count += 1;
//         if (
//           session.updated_at &&
//           new Date(session.updated_at) > new Date(acc[email].lastUsed)
//         ) {
//           acc[email].lastUsed = session.updated_at;
//         }
//       }
//       return acc;
//     }, {})
//   );

//   return (
//     <div className="p-6 max-w-screen-xl mx-auto">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold mb-2">
//           User Management & Analytics
//         </h1>
//         <Link
//           href="/admin/dashboard"
//           className="text-sm flex gap-1 text-blue-600 hover:underline"
//         >
//           <ArrowLeft size={18} />
//           Back to Dashboard
//         </Link>
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by email or mobile..."
//           className="border rounded px-4 py-2 w-1/2"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           value={period}
//           onChange={(e) => setPeriod(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//           <option value="yearly">Yearly</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <h2 className="font-semibold mb-2">🤖 Chatbot Users</h2>
//           <BarChart width={500} height={250} data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#00CFE8" />
//           </BarChart>
//         </div>

//         <div>
//           <h2 className="font-semibold mb-2">📅 Consultations</h2>
//           <LineChart width={500} height={250} data={filteredConsults.map(c => ({
//             date: format(new Date(c.created_at), "yyyy-MM-dd"),
//             count: 1,
//           }))}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Line type="monotone" dataKey="count" stroke="#8884d8" />
//           </LineChart>
//         </div>

//         <div>
//           <h2 className="font-semibold mb-2">❗ Offensive Users</h2>
//           <PieChart width={400} height={250}>
//             <Pie
//               data={filteredOffensives.map((item, i) => ({
//                 name: item.users?.email || "Unknown",
//                 value: 1,
//               }))}
//               dataKey="value"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//             >
//               {filteredOffensives.map((_, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         <div>
//           <h2 className="font-semibold mb-2">📊 Histogram</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#00CFE8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Tables */}
//       <div className="space-y-10">
//         <div>
//           <h2 className="text-xl font-semibold mb-2">🤖 Chatbot Users</h2>
//           <table className="w-full text-sm border">
//             <thead className="bg-gray-100 font-semibold">
//               <tr>
//                 <th className="p-2">#</th>
//                 <th className="p-2">Email</th>
//                 <th className="p-2">Times Used</th>
//                 <th className="p-2">Last Used (IST)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSearch.map((user, i) => (
//                 <tr key={i} className="text-center">
//                   <td className="p-2">{i + 1}</td>
//                   <td className="p-2">{user.email}</td>
//                   <td className="p-2">{user.count}</td>
//                   <td className="p-2">{convertToIST(user.lastUsed)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold mb-2">📞 Consultation Bookings</h2>
//           <table className="w-full text-sm border">
//             <thead className="bg-gray-100 font-semibold">
//               <tr>
//                 <th className="p-2">#</th>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Email</th>
//                 <th className="p-2">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {consultationBookings.map((item, i) => (
//                 <tr key={i} className="text-center">
//                   <td className="p-2">{i + 1}</td>
//                   <td className="p-2">{item.full_name}</td>
//                   <td className="p-2">{item.email}</td>
//                   <td className="p-2">
//                     {item.created_at ? format(new Date(item.created_at), "Pp") : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold mb-2 text-red-600">🎯 Offensive Queries</h2>
//           <table className="w-full text-sm border bg-red-50">
//             <thead className="bg-red-100 font-semibold">
//               <tr>
//                 <th className="p-2">#</th>
//                 <th className="p-2">User</th>
//                 <th className="p-2">Query</th>
//                 <th className="p-2">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {offensiveQueries.map((item, i) => (
//                 <tr key={i} className="text-center">
//                   <td className="p-2">{i + 1}</td>
//                   <td className="p-2">{item.users?.email || "-"}</td>
//                   <td className="p-2">{item.comment || item.query || "—"}</td>
//                   <td className="p-2">
//                     {item.created_at ? format(new Date(item.created_at), "Pp") : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
