// src/components/LayoutWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg: breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <div className="flex min-h-screen relative">
        {/* Sidebar */}
        <Sidebar isOpen={isDesktop || sidebarOpen} onClose={closeSidebar} isMobile={!isDesktop} />

        <div className="flex flex-col flex-1 min-h-screen">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-grow bg-gray-50 dark:bg-black p-4 pt-20" onClick={closeSidebar}>
            {children}
          </main>
          <Footer />
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
