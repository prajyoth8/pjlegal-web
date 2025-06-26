"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleSidebar(): void {
        throw new Error("Function not implemented.");
    }

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-col flex-1 overflow-x-hidden">
          <Navbar toggleSidebar={toggleSidebar} />

          <main className="pt-20 px-4 flex-grow bg-white dark:bg-black">{children}</main>
          <Footer />
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}
