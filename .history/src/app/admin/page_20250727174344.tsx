// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const router = useRouter();

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();
//     setErrorMsg("");

//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error || !data.session) {
//       setErrorMsg("❌ Invalid credentials");
//       return;
//     }

//     const { data: profile } = await supabase
//       .from("users")
//       .select("is_admin")
//       .eq("id", data.user.id)
//       .single();

//     if (!profile?.is_admin) {
//       setErrorMsg("🚫 Access denied. Not an admin.");
//       await supabase.auth.signOut();
//       return;
//     }

//     router.push("/admin/keywords");
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl px-8 py-10 text-white space-y-6">
//         <div className="flex justify-center mb-4">
//           <img src="/pj_logo_white.png" alt="PJ Legal Logo" className="h-14 drop-shadow-lg" />
//         </div>

//         <h1 className="text-3xl font-bold text-center text-blue-200 tracking-wide">
//           🔐 Admin Login
//         </h1>

//         {errorMsg && (
//           <div className="bg-red-600/70 text-white p-3 rounded text-center shadow-md text-sm">
//             {errorMsg}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Admin Email"
//             className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg font-semibold shadow-md transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { FiLock, FiMail, FiLogIn, FiEye, FiEyeOff, FiShield } from "react-icons/fi";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deviceSecurity, setDeviceSecurity] = useState({
    isSecure: false,
    isMobile: false
  });
  const router = useRouter();

  // Check device security on mount
  useEffect(() => {
    const isSecure = window.location.protocol === 'https:';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setDeviceSecurity({ isSecure, isMobile });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error || !data.session) {
        setErrorMsg("Invalid credentials");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("is_admin")
        .eq("id", data.user.id)
        .single();

      if (!profile?.is_admin) {
        setErrorMsg("Access denied. Not an admin.");
        await supabase.auth.signOut();
        return;
      }

      // localStorage.setItem("admin_token", data.session.access_token);
      // document.cookie = `admin_token=${data.session.access_token}; path=/; secure; samesite=strict`;

      const isProd = process.env.NODE_ENV === "production";
document.cookie = `admin_token=${data.session.access_token}; path=/; samesite=strict${isProd ? "; secure" : ""}`;

      router.push("/admin/dashboard");
    } catch (error) {
      setErrorMsg("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0c10] p-4 md:p-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
          {/* Security indicator ribbon */}
          {!deviceSecurity.isSecure && (
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              Connection Not Secure
            </div>
          )}

          {/* Header */}
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                <FiShield className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Admin Portal
            </h1>
            <p className="text-gray-400">PJ Legal • Secure Access</p>
          </div>

          {/* Security status */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className={`h-2 w-2 rounded-full ${deviceSecurity.isSecure ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            {deviceSecurity.isSecure ? 'Secure Connection' : 'Unsecured Connection'}
            {deviceSecurity.isMobile && (
              <span className="flex items-center ml-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 mr-1"></span>
                Mobile Device
              </span>
            )}
          </div>

          {/* Error message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/20 border border-red-500/30 text-red-100 p-3 rounded-lg text-sm text-center backdrop-blur-sm"
              >
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700 transition-all duration-200 hover:border-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700 transition-all duration-200 hover:border-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-blue-700/70 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/20"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <FiLogIn className="h-5 w-5" />
                  <span>Login</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-800/50">
            <p>Restricted access. Unauthorized use prohibited.</p>
            <p className="mt-1">© {new Date().getFullYear()} PJ Legal. All rights reserved.</p>
          </div>
        </div>
      </motion.div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}