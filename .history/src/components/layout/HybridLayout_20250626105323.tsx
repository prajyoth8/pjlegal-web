"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Top Navbar */}
      <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {/* Mobile: absolute drawer; Desktop: sticky left panel */}
        <aside
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full z-40 w-64 bg-[#111827] text-white transition-transform duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:block`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} isMobile />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:ml-64">{children}</main>
      </div>
    </div>
  );
}
