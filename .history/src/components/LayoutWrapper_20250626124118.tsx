// src/components/LayoutWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    handleResize(); // initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar only shown on large or if toggled */}
        {isDesktop ? (
          <Sidebar isOpen={true} onClose={closeSidebar} />
        ) : (
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        )}

        <div className="flex flex-col flex-1 relative">
          <Navbar toggleSidebar={toggleSidebar} />
          {/* Overlay for mobile/tablet */}
          {sidebarOpen && !isDesktop && (
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={closeSidebar}
            />
          )}
          <main
            className="flex-grow bg-gray-50 dark:bg-black p-4 transition-all duration-300"
            onClick={closeSidebar}
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
