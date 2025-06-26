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
// app/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex">
          {/* Sidebar shown conditionally on all screen sizes */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:relative lg:inset-auto lg:translate-x-0">
              <Sidebar isMobile onClose={closeSidebar} />
            </div>
          )}
          <main className="flex-1 w-full min-h-screen pt-20 px-4 lg:px-8 lg:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
