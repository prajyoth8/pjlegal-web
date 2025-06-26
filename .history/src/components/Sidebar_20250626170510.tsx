// src/components/layout/HybridLayout.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    console.log("🔁 Toggling Sidebar:", !sidebarOpen);
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        closeSidebar();
      }
    }
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar with toggle button */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 relative">
        {/* Sidebar Slide Drawer */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#111827] text-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>

        {/* Overlay (Backlayer Blur) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-grow p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
