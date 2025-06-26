// // ✅ app/layout.tsx
// import { Inter } from "next/font/google";
// import "./globals.css";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Toaster } from "react-hot-toast";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "PJ Legal",
//   description:
//     "Independent legal practice by Advocate PJ – Trusted legal assistance in Telangana, India.",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${inter.className} bg-white text-black scroll-smooth snap-y snap-mandatory`}
//       >
//         <Navbar />

//         <main className="pt-16">{children}</main>

//         <Footer />

//         <Toaster position="top-center" reverseOrder={false} />
//       </body>
//     </html>
//   );
// }

// ✅ app/layout.tsx
// ✅ app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PJ Legal",
  description:
    "Independent legal practice by Advocate PJ – Trusted legal assistance in Telangana, India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-black scroll-smooth`}>
        <div className="flex min-h-screen flex-col">
          {/* Navbar */}
          <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

          {/* Sidebar + Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside
              ref={sidebarRef}
              className={`fixed z-40 top-0 left-0 h-full w-64 bg-[#111827] text-white transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:relative md:translate-x-0 md:block`}
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </aside>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
              <main className="flex-grow p-4 bg-gray-50 dark:bg-black">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>

        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
