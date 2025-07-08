// "use client";

// import Link from "next/link";
// import DocumentList from "@/components/DocumentList";
// import { useRouter } from "next/navigation";
// import AdminAuthGuard from "@/components/AdminAuthGuard";

// export default function AdminDocumentsListPage() {
//   const router = useRouter();
//   return (
//     <AdminAuthGuard>
//       <div className="min-h-screen bg-gray-50 px-6 py-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-gray-900">📂 Legal Document Manager</h1>
//             <Link href="/admin/dashboard" className="text-sm text-blue-600 hover:underline">
//               ← Back to Dashboard
//             </Link>
//           </div>
//           <DocumentList />
//         </div>
//       </div>
//     </AdminAuthGuard>
//   );
// }

"use client";

import Link from "next/link";
import DocumentList from "@/components/DocumentList";
import { useRouter } from "next/navigation";
import AdminAuthGuard from "@/components/AdminAuthGuard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import UploadModal from "@/components/UploadModal";

export default function AdminDocumentsListPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden relative">
        {/* Animated background elements */}
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
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header with animated entrance */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            <div>
              <motion.h1
                whileHover={{ x: 2 }}
                className="text-3xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
              >
                Legal Document Hub
              </motion.h1>
              <p className="text-neutral-400 mt-1">Manage all legal documents in one place</p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-sm bg-neutral-800/50 hover:bg-neutral-800/70 border border-neutral-700 px-4 py-2 rounded-lg transition-colors duration-200"
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
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Dashboard
              </Link>
            </motion.div>
          </motion.header>

          {/* Loading state */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-12 w-12 border-2 border-transparent border-t-emerald-400 rounded-full"
              ></motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <DocumentList />
            </motion.div>
          )}

          Floating action button
          {/* Adjusted floating button */}
<motion.div 
  className="fixed bottom-8 right-20 z-20" 
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <button
    onClick={() => setShowUploadModal(true)}
    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg hover:shadow-emerald-500/30 transition-all duration-200"
    aria-label="Upload document"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  </button>
</motion.div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
