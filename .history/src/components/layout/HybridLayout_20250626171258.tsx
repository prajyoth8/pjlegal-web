"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Transition } from "@headlessui/react";

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    console.log("🔁 Sidebar Toggle Clicked:", !sidebarOpen);
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        closeSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar Transition */}
      <Transition show={sidebarOpen}>
        <div className="fixed inset-0 z-40 flex" aria-modal="true" role="dialog">
          {/* Sidebar */}
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div ref={sidebarRef} className="w-64 bg-[#111827] p-4 text-white shadow-md">
              <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            </div>
          </Transition.Child>

          {/* Overlay */}
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" onClick={closeSidebar} />
          </Transition.Child>
        </div>
      </Transition>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-grow p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
