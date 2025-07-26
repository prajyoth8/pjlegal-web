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

"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AdminAuthGuard from "@/components/AdminAuthGuard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        router.push("/admin");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("is_admin, email")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        router.push("/admin");
        return;
      }

      setUserEmail(profile.email);
      setIsLoading(false);

      setTimeout(() => setShowWelcome(false), 3000);
    };

    checkSession();
  }, [router]);

  async function handleLogout() {
    // Supabase session logout
    await supabase.auth.signOut();

    // Clear admin_token cookie
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Redirect to admin login
    router.push("/admin");
  }

  // async function handleLogout() {
  //   await supabase.auth.signOut();
  //   router.push("/admin");
  // }

  const dashboardItems = [
    {
    id: "articles",
    title: "Articles",
    description: "Manage and publish articles",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    color: "cyan",
    path: "/admin/articles",
  },
    {
      id: "cms",
      title: "CMS Manager",
      description: "Scrape, upload & manage legal content",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
          <line x1="8" y1="4" x2="8" y2="20"></line>
          <line x1="16" y1="4" x2="16" y2="20"></line>
          <line x1="2" y1="8" x2="22" y2="8"></line>
          <line x1="2" y1="16" x2="22" y2="16"></line>
        </svg>
      ),
      color: "purple",
      path: "/admin/cms",
    },
    {
      id: "documents",
      title: "Legal Documents",
      description: "View and manage uploaded legal docs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      color: "indigo",
      path: "/admin/documents_list",
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "View insights and data reports",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
      ),
      color: "blue", // Or "teal", "purple", etc.
      path: "/admin/analytics",
    },
    {
      id: "keywords",
      title: "Keyword Manager",
      description: "Manage banned and legal keywords",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ),
      color: "blue",
      path: "/admin/keywords",
    },
    {
      id: "tokens",
      title: "Token Usage Logs",
      description: "Monitor model usage & costs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      color: "yellow",
      path: "/admin/tokens",
    },
    {
      id: "users",
      title: "User Management",
      description: "Monitor Users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      color: "green",
      path: "/admin/users",
      disabled: ,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400"
        ></motion.div>
      </div>
    );
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 to-neutral-950/90"></div>
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"
          ></motion.div>
        </div>

        {/* Welcome Animation */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-center px-4"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
                >
                  Welcome Back
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-neutral-400 text-sm sm:text-base"
                >
                  Loading your admin dashboard...
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          {/* Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                Admin Dashboard
              </h1>
              <motion.p
                whileHover={{ x: 5 }}
                className="text-neutral-400 mt-1 sm:mt-2 flex items-center gap-2 text-sm sm:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {userEmail}
              </motion.p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/20 text-red-100 px-4 py-2 rounded-lg shadow-md border border-red-500/30 transition-all duration-200 text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </motion.button>
          </motion.header>

          {/* Dashboard Tiles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {dashboardItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                whileHover={{
                  scale: window.innerWidth > 768 ? 1.03 : 1,
                  boxShadow:
                    window.innerWidth > 768
                      ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      : "none",
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => window.innerWidth > 768 && setActiveHover(item.id)}
                onHoverEnd={() => window.innerWidth > 768 && setActiveHover(null)}
                onClick={() => !item.disabled && router.push(item.path)}
                className={`relative overflow-hidden bg-neutral-900/50 backdrop-blur-md border ${item.disabled ? "border-neutral-800" : "border-neutral-700 hover:border-emerald-500/30"} rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${item.disabled ? "opacity-60" : "hover:bg-neutral-800/30"}`}
              >
                {/* Hover effect background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeHover === item.id ? 0.2 : 0,
                    scale: activeHover === item.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/10 to-transparent rounded-xl pointer-events-none`}
                ></motion.div>

                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className={`p-2 sm:p-3 rounded-lg bg-${item.color}-600/10 border border-${item.color}-500/20`}
                  >
                    <div
                      className={`text-${item.color}-300`}
                      style={{ width: "24px", height: "24px" }}
                    >
                      {item.icon}
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-white">{item.title}</h3>
                    <p className={`text-${item.color}-200 text-xs sm:text-sm`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Animated arrow for clickable items */}
                {!item.disabled && (
                  <motion.div
                    initial={{ x: 10, opacity: 0 }}
                    animate={{
                      x: activeHover === item.id ? 0 : 10,
                      opacity: activeHover === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </motion.div>
                )}

                {/* Coming soon badge */}
                {/* {item.disabled && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="absolute right-3 sm:right-4 top-3 sm:top-4 px-2 py-1 rounded-full text-xs bg-neutral-800/50 text-neutral-400 border border-neutral-700"
                  >
                    Coming Soon
                  </motion.div>
                )} */}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
