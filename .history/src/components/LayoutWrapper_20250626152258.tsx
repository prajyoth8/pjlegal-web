"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Optional: debug */}
      <p className="fixed bottom-2 left-2 z-[999] bg-white p-2 text-black shadow">
        Sidebar Open: {sidebarOpen ? "Yes" : "No"}
      </p>

      <main className="min-h-screen pt-[80px] bg-gray-100 dark:bg-black">
        {children}
      </main>
    </>
  );
}
