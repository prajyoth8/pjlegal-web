"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";


export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Top Navbar */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-64 bg-[#111827] text-white p-4 transition-all duration-300`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Main Content + Footer */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="flex-grow p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

