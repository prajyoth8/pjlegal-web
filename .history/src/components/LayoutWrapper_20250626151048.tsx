"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <div className="flex min-h-screen overflow-hidden">
        {/* Sidebar - slides in/out on all screen sizes */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Content area */}
        <div className="flex flex-col flex-1 relative z-0">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="pt-20 px-4 flex-grow bg-white dark:bg-black">{children}</main>
          <Footer />
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}
