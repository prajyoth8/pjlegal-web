


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
// import { useEffect, useState, useCallback, useMemo } from "react";
// import { createClient } from "@supabase/supabase-js";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Mail,
//   Activity,
//   Calendar,
//   AlertCircle,
//   BarChart2,
//   Users,
//   Phone,
//   AlertTriangle,
//   Search,
//   X,
//   Crown,
//   Shield,
//   UserPlus,
//   Rocket,
//   Sparkles,
//   MoreVertical,
//   Download,
//   Eye,
//   MessageSquare,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import AdminAuthGuard from "@/components/AdminAuthGuard";
// import { toast } from "react-hot-toast";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

// // Typed debounce function
// function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
//   let timeout: NodeJS.Timeout;
//   return function (this: any, ...args: Parameters<T>) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// function highlightMatch(text: string, query: string) {
//   if (!query || !text) return text;
//   const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"));
//   return (
//     <span>
//       {parts.map((part, i) =>
//         part.toLowerCase() === query.toLowerCase() ? (
//           <span key={i} className="bg-yellow-100 text-yellow-800 px-1 rounded">
//             {part}
//           </span>
//         ) : (
//           part
//         )
//       )}
//     </span>
//   );
// }

// function escapeRegExp(string: string) {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

// export default function UsersPage() {
//   const [chatbotSessions, setChatbotSessions] = useState<any[]>([]);
//   const [consultationBookings, setConsultationBookings] = useState<any[]>([]);
//   const [chatbotRequests, setChatbotRequests] = useState<any[]>([]);
//   const [offensiveQueries, setOffensiveQueries] = useState<any[]>([]);
//   const [period, setPeriod] = useState("yearly");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [
//         { data: chatbot_sessions },
//         { data: consultation_bookings },
//         { data: chatbot_requests },
//         { data: feedback }
//       ] = await Promise.all([
//         supabase.from("chatbot_sessions").select("*"),
//         supabase.from("consultation_bookings").select("*"),
//         supabase.from("chatbot_requests").select("*"),
//         supabase.from("feedback").select("*, users(email)").eq("rating", "offensive")
//       ]);

//       setChatbotSessions(chatbot_sessions || []);
//       setConsultationBookings(consultation_bookings || []);
//       setChatbotRequests(chatbot_requests || []);
//       setOffensiveQueries(feedback || []);
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     }
//   };

//   const refreshData = () => {
//     fetchData();
//     toast.success("Data refreshed");
//   };

//   const debouncedSearch = useCallback(
//     debounce(() => setIsSearching(false), 300),
//     []
//   );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setIsSearching(true);
//     debouncedSearch();
//   };

//   const clearSearch = () => {
//     setSearchTerm("");
//     setIsSearching(false);
//   };

//   // Filter data based on period and search term
//   const filterData = (data: any[], fieldsToSearch: string[]) => {
//     const now = new Date();
//     const periodFiltered = data.filter((item) => {
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

//     if (!searchTerm) return periodFiltered;

//     return periodFiltered.filter((item) =>
//       fieldsToSearch.some((field) =>
//         String(item[field] || "").toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   };

//   // Group users by email and count usage
//   const groupedUsers = useMemo(() => {
//     return chatbotSessions.reduce((acc: any, session) => {
//       const email = session.email;
//       if (!email) return acc;
//       if (!acc[email]) acc[email] = { email, count: 0 };
//       acc[email].count += 1;
//       return acc;
//     }, {});
//   }, [chatbotSessions]);

//   // Apply filters to all data sections
//   const filteredUserList = useMemo(() => {
//     return Object.values(groupedUsers)
//       .sort((a: any, b: any) => b.count - a.count)
//       .filter((user: any) => 
//         !searchTerm || user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//   }, [groupedUsers, searchTerm]);

//   const filteredConsultations = useMemo(() => 
//     filterData(consultationBookings, ["email", "full_name"]), 
//     [consultationBookings, period, searchTerm]
//   );

//   const filteredOffensives = useMemo(() => 
//     filterData(offensiveQueries, ["users.email", "comment", "query"]), 
//     [offensiveQueries, period, searchTerm]
//   );

//   const filteredRequests = useMemo(() => 
//     filterData(chatbotRequests, []), 
//     [chatbotRequests, period]
//   );

//   // Prepare chart data
//   const groupedRequests = filteredRequests.reduce((acc: any, item) => {
//     const date = format(parseISO(item.created_at), "yyyy-MM-dd");
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = Object.entries(groupedRequests).map(([date, count]) => ({
//     date,
//     count,
//   }));

//   // Pagination functions
//   const paginate = (array: any[], page: number, perPage: number) => {
//     return array.slice((page - 1) * perPage, page * perPage);
//   };

//   const totalPages = (array: any[]) => Math.ceil(array.length / rowsPerPage);

//   return (
//     <AdminAuthGuard>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
//         {/* Modern Header */}
//         <header className="mb-8">
//           <div className="flex justify-between items-start">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <Shield className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Welcome back, <span className="text-blue-600">PJLegal Admin</span>
//                 </h1>
//               </div>
//               <p className="text-gray-500">Manage your users and analyze platform activity</p>
//             </div>
//             <Link
//               href="/admin/dashboard"
//               className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span>Dashboard</span>
//             </Link>
//           </div>
//         </header>

//         {/* Enhanced Search and Filters */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="relative flex-1 w-full">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search users, bookings, queries..."
//                 className="w-full pl-12 pr-10 py-3 rounded-xl border-0 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               {searchTerm && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-3 inset-y-0 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
//                   aria-label="Clear search"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               )}
//             </div>
            
//             <div className="flex items-center gap-3">
//               <select
//                 value={period}
//                 onChange={(e) => setPeriod(e.target.value)}
//                 className="px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-400 appearance-none"
//               >
//                 <option value="daily">Today</option>
//                 <option value="weekly">This Week</option>
//                 <option value="monthly">This Month</option>
//                 <option value="yearly">This Year</option>
//               </select>
//               <button 
//                 onClick={refreshData}
//                 className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
//               >
//                 <Rocket className="w-5 h-5" />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-500">Total Users</p>
//                 <h3 className="text-3xl font-bold mt-1">{Object.keys(groupedUsers).length}</h3>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <Users className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center text-sm text-green-600">
//               <span>↑ 12% from last week</span>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-500">Consultations</p>
//                 <h3 className="text-3xl font-bold mt-1">{consultationBookings.length}</h3>
//               </div>
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <Phone className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center text-sm text-green-600">
//               <span>↑ 8% from last week</span>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-500">Offensive Queries</p>
//                 <h3 className="text-3xl font-bold mt-1">{offensiveQueries.length}</h3>
//               </div>
//               <div className="p-3 bg-red-100 rounded-lg">
//                 <AlertTriangle className="w-6 h-6 text-red-600" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center text-sm text-red-600">
//               <span>↓ 5% from last week</span>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-500">Active Sessions</p>
//                 <h3 className="text-3xl font-bold mt-1">{chatbotSessions.length}</h3>
//               </div>
//               <div className="p-3 bg-amber-100 rounded-lg">
//                 <Activity className="w-6 h-6 text-amber-600" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center text-sm text-green-600">
//               <span>↑ 15% from last week</span>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                 <Activity className="w-5 h-5 text-blue-500" />
//                 Chatbot Usage Trends
//               </h2>
//               <div className="flex gap-2">
//                 <button 
//                   className={`px-3 py-1 rounded-lg text-sm ${period === 'daily' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
//                   onClick={() => setPeriod('daily')}
//                 >
//                   Daily
//                 </button>
//                 <button 
//                   className={`px-3 py-1 rounded-lg text-sm ${period === 'weekly' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
//                   onClick={() => setPeriod('weekly')}
//                 >
//                   Weekly
//                 </button>
//               </div>
//             </div>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//                   <XAxis 
//                     dataKey="date" 
//                     axisLine={false} 
//                     tickLine={false}
//                     tick={{ fill: '#6b7280', fontSize: 12 }}
//                   />
//                   <YAxis 
//                     axisLine={false} 
//                     tickLine={false}
//                     tick={{ fill: '#6b7280', fontSize: 12 }}
//                   />
//                   <Tooltip 
//                     contentStyle={{
//                       borderRadius: '12px',
//                       boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//                       border: 'none'
//                     }}
//                   />
//                   <Bar 
//                     dataKey="count" 
//                     fill="#3b82f6" 
//                     radius={[6, 6, 0, 0]}
//                     animationDuration={1500}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-purple-500" />
//                 Consultation Types
//               </h2>
//               <div className="text-sm text-gray-500">
//                 Last 30 days
//               </div>
//             </div>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={[
//                       { name: 'Legal', value: 45 },
//                       { name: 'Financial', value: 25 },
//                       { name: 'Technical', value: 20 },
//                       { name: 'Other', value: 10 }
//                     ]}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={90}
//                     paddingAngle={2}
//                     dataKey="value"
//                     label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     labelLine={false}
//                   >
//                     <Cell fill="#6366f1" />
//                     <Cell fill="#8b5cf6" />
//                     <Cell fill="#a78bfa" />
//                     <Cell fill="#c4b5fd" />
//                   </Pie>
//                   <Tooltip 
//                     formatter={(value, name) => [`${value}`, `${name}`]}
//                     contentStyle={{
//                       borderRadius: '12px',
//                       boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//                       border: 'none'
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Tables Section */}
//         <div className="space-y-6">
//           {/* Chatbot Users Table */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
//             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//               <h2 className="text-xl font-bold flex items-center gap-3">
//                 <Users className="w-6 h-6 text-blue-500" />
//                 <span>Chatbot Users</span>
//                 <span className="text-sm font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
//                   {filteredUserList.length} users
//                 </span>
//               </h2>
//               <button 
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 onClick={() => toast.success("Export initiated")}
//               >
//                 <Download className="w-5 h-5" />
//                 <span>Export</span>
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">User</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Activity</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {paginate(filteredUserList, currentPage, rowsPerPage).map((user: any, i) => (
//                     <tr key={i} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                             <span className="text-blue-600 font-medium">
//                               {user.email.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {highlightMatch(user.email, searchTerm)}
//                             </div>
//                             <div className="text-sm text-gray-500">Active user</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{user.count} sessions</div>
//                         <div className="text-sm text-gray-500">Last seen recently</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                           Active
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button 
//                           className="text-blue-600 hover:text-blue-900 mr-3"
//                           onClick={() => toast.success(`Viewing ${user.email}`)}
//                         >
//                           <Eye className="w-5 h-5" />
//                         </button>
//                         <button 
//                           className="text-gray-600 hover:text-gray-900 mr-3"
//                           onClick={() => toast.success(`Messaging ${user.email}`)}
//                         >
//                           <MessageSquare className="w-5 h-5" />
//                         </button>
//                         <button 
//                           className="text-red-600 hover:text-red-900"
//                           onClick={() => toast.error(`Deleting ${user.email}`)}
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
//               <div className="text-sm text-gray-500">
//                 Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
//                 <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredUserList.length)}</span> of{' '}
//                 <span className="font-medium">{filteredUserList.length}</span> results
//               </div>
//               <div className="flex space-x-2">
//                 <button 
//                   className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <button 
//                   className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                   disabled={currentPage === totalPages(filteredUserList)}
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages(filteredUserList)))}
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Consultation Bookings Table */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
//             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//               <h2 className="text-xl font-bold flex items-center gap-3">
//                 <Phone className="w-6 h-6 text-purple-500" />
//                 <span>Recent Consultations</span>
//                 <span className="text-sm font-normal bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
//                   {filteredConsultations.length} bookings
//                 </span>
//               </h2>
//               <button 
//                 className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                 onClick={() => toast.success("Calendar view opened")}
//               >
//                 <Calendar className="w-5 h-5" />
//                 <span>View Calendar</span>
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">#</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Name</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {paginate(filteredConsultations, currentPage, rowsPerPage).map((item, i) => (
//                     <tr key={i} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * rowsPerPage + i + 1}</td>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium">
//                         {highlightMatch(item.full_name, searchTerm)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {highlightMatch(item.email, searchTerm)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                         {item.created_at ? format(new Date(item.created_at), "PPpp") : "-"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right">
//                         <button className="text-gray-600 hover:text-gray-900">
//                           <MoreVertical className="w-5 h-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
//               <div className="text-sm text-gray-500">
//                 Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
//                 <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredConsultations.length)}</span> of{' '}
//                 <span className="font-medium">{filteredConsultations.length}</span> results
//               </div>
//               <div className="flex space-x-2">
//                 <button 
//                   className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <button 
//                   className="px-3 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition-colors"
//                   disabled={currentPage === totalPages(filteredConsultations)}
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages(filteredConsultations)))}
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Offensive Queries Table */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-red-500 hover:shadow-2xl transition-shadow">
//             <div className="p-6 border-b border-red-100 bg-red-50 flex justify-between items-center">
//               <h2 className="text-xl font-bold flex items-center gap-3 text-red-600">
//                 <AlertTriangle className="w-6 h-6" />
//                 <span>Flagged Content</span>
//                 <span className="text-sm font-normal bg-red-100 text-red-800 px-3 py-1 rounded-full">
//                   {filteredOffensives.length} issues
//                 </span>
//               </h2>
//               <button 
//                 className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 onClick={() => toast.error("Action panel opened")}
//               >
//                 <Shield className="w-5 h-5" />
//                 <span>Take Action</span>
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-red-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-red-600 uppercase tracking-wider">#</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-red-600 uppercase tracking-wider">User</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-red-600 uppercase tracking-wider">Query</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-red-600 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-4 text-right text-sm font-semibold text-red-600 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-red-100">
//                   {paginate(filteredOffensives, currentPage, rowsPerPage).map((item, i) => (
//                     <tr key={i} className="hover:bg-red-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * rowsPerPage + i + 1}</td>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium">
//                         {highlightMatch(item.users?.email || "-", searchTerm)}
//                       </td>
//                       <td className="px-6 py-4 max-w-xs truncate">
//                         {highlightMatch(item.comment || item.query || "—", searchTerm)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-red-500">
//                         {item.created_at ? format(new Date(item.created_at), "PPpp") : "-"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right">
//                         <div className="flex justify-end gap-2">
//                           <button 
//                             className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
//                             onClick={() => toast.error(`Reviewing ${item.users?.email || 'unknown'} query`)}
//                           >
//                             <Eye className="w-5 h-5" />
//                           </button>
//                           <button 
//                             className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full"
//                             onClick={() => toast.error(`Blocking ${item.users?.email || 'unknown'}`)}
//                           >
//                             <Shield className="w-5 h-5" />
//                           </button>
//                           <button 
//                             className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
//                             onClick={() => toast.error(`More options for ${item.users?.email || 'unknown'}`)}
//                           >
//                             <MoreVertical className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="px-6 py-4 border-t border-red-100 flex items-center justify-between">
//               <div className="text-sm text-gray-500">
//                 Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
//                 <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredOffensives.length)}</span> of{' '}
//                 <span className="font-medium">{filteredOffensives.length}</span> results
//               </div>
//               <div className="flex space-x-2">
//                 <button 
//                   className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <button 
//                   className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
//                   disabled={currentPage === totalPages(filteredOffensives)}
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages(filteredOffensives)))}
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>


//       </div>
//     </AdminAuthGuard>
//   );
// }


// ---------------------------------------------------------

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
