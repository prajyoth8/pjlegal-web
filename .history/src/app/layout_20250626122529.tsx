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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={sidebarOpen ? "sidebar-open" : ""}>
        <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="lg:ml-0 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
