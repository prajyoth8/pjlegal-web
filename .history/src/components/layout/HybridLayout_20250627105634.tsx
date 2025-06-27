// "use client";

// import { useState, useRef, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";

// export default function HybridLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement>(null);

//   const toggleSidebar = () => {
//     console.log("Toggling sidebar, current state:", sidebarOpen);
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     console.log("Closing sidebar");
//     setSidebarOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
//         closeSidebar();
//       }
//     };

//     if (sidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen]);

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Navbar toggleSidebar={toggleSidebar} />

//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <main className="flex-grow p-6">{children}</main>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar - always visible */}
//       <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

//       <div className="flex flex-1">
//         {/* Sidebar - hidden by default, appears when toggled */}
//         <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

//         {/* Main Content */}
//         <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : ""}`}>
//           <div className="pt-16">
//             {" "}
//             {/* Account for navbar height */}
//             {children}
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle body scroll locking on mobile when sidebar is open
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      if (isMobile) {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
      }
    }
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : ""}`}>
          <div className="pt-16 min-h-[calc(100vh-4rem)]">{children}</div>
          <Footer />
          <ChatbotWidget />
          
        </main>
      </div>
    </div>
  );
}
