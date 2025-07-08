

// "use client";

// import { useRouter } from "next/navigation";
// import { createClient } from "@supabase/supabase-js";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import AdminAuthGuard from "@/components/AdminAuthGuard";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [userEmail, setUserEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();

//       if (!session || error) {
//         router.push("/admin");
//         return;
//       }

//       const { data: profile } = await supabase
//         .from("users")
//         .select("is_admin, email")
//         .eq("id", session.user.id)
//         .single();

//       if (!profile?.is_admin) {
//         await supabase.auth.signOut();
//         router.push("/admin");
//         return;
//       }

//       setUserEmail(profile.email);
//       setIsLoading(false);
//     };

//     checkSession();
//   }, [router]);

//   async function handleLogout() {
//     await supabase.auth.signOut();
//     router.push("/admin");
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <AdminAuthGuard>
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
//               <p className="text-blue-200 mt-1">Welcome back, {userEmail}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-100 px-4 py-2 rounded-lg shadow-md border border-red-500/30 transition-all duration-200"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                 />
//               </svg>
//               Logout
//             </button>
//           </div>

//           {/* Dashboard Tiles */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* CMS Tile */}
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => router.push("/admin/cms")}
//               className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-purple-600/20 rounded-lg">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-purple-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6M12 7h.01M7 7h.01M17 7h.01"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">CMS Manager</h3>
//                   <p className="text-purple-200 text-sm">Scrape, upload & manage legal content</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Legal Documents Tile */}
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => router.push("/admin/documents_list")}
//               className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-indigo-600/20 rounded-lg">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-indigo-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 16h8M8 12h8m-8-4h8m2-3H6a2 2 0 00-2 2v14l4-4h10a2 2 0 002-2V5a2 2 0 00-2-2z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">Legal Documents</h3>
//                   <p className="text-indigo-200 text-sm">View and manage uploaded legal docs</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Keywords Tile */}
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => router.push("/admin/keywords")}
//               className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-blue-600/20 rounded-lg">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-blue-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">Keyword Manager</h3>
//                   <p className="text-blue-200 text-sm">Manage banned and legal keywords</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Token Usage Logs Tile */}
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => router.push("/admin/tokens")}
//               className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-yellow-600/20 rounded-lg">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-yellow-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 17l-5-5m0 0l5-5m-5 5h12"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">Token Usage Logs</h3>
//                   <p className="text-yellow-200 text-sm">Monitor model usage & costs</p>
//                 </div>
//               </div>
//             </motion.div>

//             <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 opacity-70">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-green-600/20 rounded-lg">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-green-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">User Management</h3>
//                   <p className="text-blue-200 text-sm">Coming soon</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminAuthGuard>
//   );
// }
