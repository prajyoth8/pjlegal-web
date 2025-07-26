// "use client";

// import { useState } from "react";
// import Sidebar from "../Sidebar";

// export default function SidebarLayout({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);
//   const closeSidebar = () => setSidebarOpen(false);

//   return (
//     <div className="flex min-h-screen relative">
//       {/* Sidebar Component */}
//       <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 dark:bg-black p-6 overflow-y-auto w-full">
//         {children}
//       </main>

//       {/* Optional Toggle Button (for desktop view) */}
//       <button
//         className="hidden lg:block fixed top-4 left-4 z-50 bg-white text-black border border-gray-300 px-2 py-1 rounded shadow-md hover:bg-gray-100"
//         onClick={toggleSidebar}
//       >
//         ☰
//       </button>
//     </div>
//   );
// }
