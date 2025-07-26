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
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Clock,
  Activity,
  Calendar,
  AlertCircle,
  BarChart2,
  Users,
  Phone,
  AlertTriangle,
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function convertToIST(date: Date | string) {
  try {
    if (!date) return "-";
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return "-";
    return format(dateObj, "PPpp"); // Using date-fns format instead of toLocaleString
  } catch {
    return "-";
  }
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

export default function UsersPage() {
  const [chatbotSessions, setChatbotSessions] = useState<any[]>([]);
  const [consultationBookings, setConsultationBookings] = useState<any[]>([]);
  const [chatbotRequests, setChatbotRequests] = useState<any[]>([]);
  const [offensiveQueries, setOffensiveQueries] = useState<any[]>([]);
  const [period, setPeriod] = useState("yearly");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch chatbot sessions with user information if available
    const { data: chatbot_sessions } = await supabase
      .from("chatbot_sessions")
      .select(`*`) 
    
  const validSessions = (chatbot_sessions || []).map(session => ({
    email: session.email || session.user?.email, // Get email from session or related user
    created_at: session.created_at || session.updated_at || session.date // Try multiple date fields
  })).filter(session => session.email); // Only keep sessions with email

  
    const { data: consultation_bookings } = await supabase
      .from("consultation_bookings")
      .select("*");

    const { data: chatbot_requests } = await supabase.from("chatbot_requests").select("*");

    const { data: feedback } = await supabase
      .from("feedback")
      .select("*, users(email)")
      .eq("rating", "offensive");

    setChatbotSessions(chatbot_sessions || []);
    setConsultationBookings(consultation_bookings || []);
    setChatbotRequests(chatbot_requests || []);
    setOffensiveQueries(feedback || []);
  };

  const filterByPeriod = (data: any[]) => {
    const now = new Date();
    return data.filter((item) => {
      const createdAt = new Date(item.created_at);
      switch (period) {
        case "daily":
          return createdAt.toDateString() === now.toDateString();
        case "weekly":
          return createdAt >= subDays(now, 7);
        case "monthly":
          return createdAt >= subDays(now, 30);
        default:
          return createdAt >= subDays(now, 365);
      }
    });
  };

  const filteredSessions = filterByPeriod(chatbotSessions);
  const filteredConsults = filterByPeriod(consultationBookings);
  const filteredRequests = filterByPeriod(chatbotRequests);
  const filteredOffensives = filterByPeriod(offensiveQueries);

  // Group users by email and count usage
  // Update the grouping logic to handle cases where email might be null
  const groupedUsers = chatbotSessions.reduce((acc: any, session) => {
  if (!session.email) return acc;

  // Try multiple possible date fields
  const dateValue = session.created_at || session.updated_at || session.date;
  const sessionDate = dateValue ? new Date(dateValue) : null;

  if (!acc[session.email]) {
    acc[session.email] = {
      email: session.email,
      count: 0,
      lastUsed: sessionDate,
    };
  }

  acc[session.email].count += 1;
  if (sessionDate && (!acc[session.email].lastUsed || sessionDate > acc[session.email].lastUsed)) {
    acc[session.email].lastUsed = sessionDate;
  }

  return acc;
}, {});

// Enhanced date display function
function formatDateDisplay(date: Date | string | null) {
  if (!date) return "-";
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    return isNaN(dateObj.getTime()) ? "-" : format(dateObj, "PPpp");
  } catch {
    return "-";
  }
}

  const userList = Object.values(groupedUsers)
    .sort((a: any, b: any) => b.count - a.count)
    .filter((user: any) => user.email.toLowerCase().includes(searchTerm.toLowerCase()));

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-2">User Management & Analytics</h1>
        <Link href="/admin/dashboard" className="text-sm flex gap-1 text-blue-600 hover:underline">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by email..."
            className="border rounded pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Chatbot Usage
          </h2>
          <BarChart width={500} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#00CFE8" />
          </BarChart>
        </div>

        <div>
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Consultations
          </h2>
          <LineChart
            width={500}
            height={250}
            data={filteredConsults.map((c) => ({
              date: format(new Date(c.created_at), "yyyy-MM-dd"),
              count: 1,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>

        <div>
          <h2 className="font-semibold mb-2 flex items-center gap-2">
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
              label
            >
              {filteredOffensives.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <BarChart2 className="w-5 h-5" /> Request Histogram
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00CFE8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="space-y-10">
        <div>
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Users className="w-5 h-5" /> Chatbot Users
          </h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Usage Count</th>
                  {/* <th className="p-3 text-left">First Seen</th> */}
                  <th className="p-3 text-left">Last Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userList.map((user: any, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3 font-medium">{user.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {user.count} sessions
                      </span>
                    </td>
                    {/* <td className="p-3 text-gray-500">{format(user.firstSeen, "PPpp")}</td> */}
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">
                          {user.lastUsed ? convertToIST(user.lastUsed) : "-"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Phone className="w-5 h-5" /> Consultation Bookings
          </h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {consultationBookings.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
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

        <div>
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" /> Offensive Queries
          </h2>
          <div className="border border-red-100 rounded-lg overflow-hidden bg-red-50">
            <table className="w-full text-sm">
              <thead className="bg-red-100 font-semibold">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Query</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                {offensiveQueries.map((item, i) => (
                  <tr key={i} className="hover:bg-red-50">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3 font-medium">{item.users?.email || "-"}</td>
                    <td className="p-3">{item.comment || item.query || "—"}</td>
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
