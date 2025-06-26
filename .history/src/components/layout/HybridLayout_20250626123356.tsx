// components/layout/HybridLayout.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
const closeSidebar = () => setSidebarOpen(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    }
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Top Navbar with sidebar toggle */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Area */}
      <div className="flex flex-1 relative">
        {/* Sidebar Slide Panel */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#111827] text-white p-4 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        </div>

        {/* Backdrop when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-grow p-4 md:p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
