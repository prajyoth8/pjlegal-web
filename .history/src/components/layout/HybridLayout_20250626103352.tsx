"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* ✅ Top Navbar */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* ✅ Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar collapses on small screens */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-64 bg-[#111827] text-white p-4 transition-all duration-300`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
