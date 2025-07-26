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



"use client";

import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { X, Menu } from "lucide-react";
import clsx from "clsx";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Optional: Lock scroll on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 1024;
      document.body.style.overflow = isMobile && isSidebarOpen ? "hidden" : "auto";
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen relative">
      {/* Overlay for mobile click-out-to-close */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <main
        className={clsx(
          "flex-1 bg-gray-100 dark:bg-black p-6 overflow-y-auto w-full transition-all duration-300",
          isSidebarOpen ? "lg:ml-64" : ""
        )}
      >
        {/* Top Navbar */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <button
            className="text-gray-800 dark:text-white p-2 rounded-md border border-gray-300 bg-white shadow"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          {isSidebarOpen && (
            <button
              className="text-gray-800 dark:text-white p-2 rounded-md border border-gray-300 bg-white shadow"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {children}
      </main>

      {/* Optional Floating Toggle Button for Desktop */}
      <button
        className="hidden lg:block fixed top-4 left-4 z-50 bg-white text-black border border-gray-300 px-2 py-1 rounded shadow-md hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        ☰
      </button>
    </div>
  );
}
