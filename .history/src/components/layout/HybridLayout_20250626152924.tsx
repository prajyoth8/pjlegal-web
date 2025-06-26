"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <div className="flex-1 flex flex-col">
          <main className="flex-grow p-4 md:p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
