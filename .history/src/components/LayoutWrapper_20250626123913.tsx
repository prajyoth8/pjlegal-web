// src/components/LayoutWrapper.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const USE_SIDEBAR = true;

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {USE_SIDEBAR ? (
        <div className="flex min-h-screen">
          {/* Sidebar toggles via Navbar and overlay click */}
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          <div className="flex flex-col flex-1 overflow-y-auto" onClick={closeSidebar}>
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="flex-grow bg-gray-50 dark:bg-black p-4">{children}</main>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
