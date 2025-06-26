"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - always visible */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar - visible on desktop, toggleable on mobile */}
        <div className="hidden lg:block lg:w-64 lg:fixed lg:top-16 lg:left-0 lg:h-[calc(100vh-4rem)] lg:bg-[#111827] lg:overflow-y-auto">
          <Sidebar isOpen={true} onClose={closeSidebar} />
        </div>

        {/* Mobile Sidebar (overlay) */}
        <div className="lg:hidden">
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? "lg:ml-64" : ""} transition-all duration-300`}>
          <div className="pt-16 lg:pl-64">
            {" "}
            {/* Account for navbar and sidebar */}
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
