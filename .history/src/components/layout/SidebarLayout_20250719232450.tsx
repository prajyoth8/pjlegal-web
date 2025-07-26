"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Lock body scroll when sidebar is open on small screens
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        document.body.style.overflow = isSidebarOpen ? "hidden" : "";
      }
    }
  }, [isSidebarOpen]);

  // Allow ESC key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 dark:bg-black p-6 overflow-y-auto w-full">
        {children}
      </main>

      {/* Sidebar Toggle Button (Desktop) */}
      <button
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        className="hidden lg:block fixed top-4 left-4 z-50 bg-white text-black border border-gray-300 px-2 py-1 rounded shadow-md hover:bg-gray-100"
      >
        ☰
      </button>
    </div>
  );
}
