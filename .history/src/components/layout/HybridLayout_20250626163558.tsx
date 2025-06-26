"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    console.log("✅ Sidebar Toggle Clicked");
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => setSidebarOpen(false);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        closeSidebar();
      }
    };
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Top Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Content Wrapper */}
      <div className="flex flex-1 relative">
        {/* Sidebar (desktop toggle only) */}
        <div
          ref={sidebarRef}
          className={`fixed z-40 top-0 left-0 h-full w-64 bg-[#111827] text-white transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>

        {/* Backdrop when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-40"
            onClick={closeSidebar}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-grow p-4 md:p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
