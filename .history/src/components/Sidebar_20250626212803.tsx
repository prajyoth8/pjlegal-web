// components/Sidebar.tsx
"use client";

import { X, Search, Calendar } from "lucide-react";
import { useState } from "react";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#111827] text-white transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header with Close */}
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
        <span className="text-xl font-bold">Menu</span>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center px-4 py-3 border-b border-gray-700">
        <Search className="w-4 h-4 mr-2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent outline-none border-none placeholder:text-gray-400 text-sm"
        />
      </div>

      {/* Main Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm">
        <div className="text-lg font-bold mb-4">PJ Legal</div>
        <a href="#home" onClick={onClose}>Home</a>
        <a href="#about" onClick={onClose}>About</a>

        <details className="group">
          <summary className="cursor-pointer hover:underline">Practice Areas</summary>
          <div className="ml-4 mt-1 space-y-1">
            <a href="#civil" onClick={onClose}>Civil Law</a>
            <a href="#criminal" onClick={onClose}>Criminal Law</a>
            <a href="#family" onClick={onClose}>Family Law</a>
            <a href="#corporate" onClick={onClose}>Corporate</a>
          </div>
        </details>

        <a href="#news" onClick={onClose}>News</a>
        <a href="#articles" onClick={onClose}>Articles/Blogs</a>
        <a href="#education" onClick={onClose}>Education</a>
        <a href="#contact" onClick={onClose}>Contact</a>

        {/* CTA Button */}
        <div className="mt-6">
          <a
            href="#consultation"
            onClick={onClose}
            className="w-full flex justify-center items-center px-4 py-2 rounded-md bg-gold text-black font-semibold hover:bg-yellow-400"
          >
            <Calendar className="w-4 h-4 mr-2" /> Book Consultation
          </a>
        </div>
      </nav>

      {/* Footer Links */}
      <div className="px-4 py-3 border-t border-gray-700 text-xs space-y-2">
        <a href="#disclaimer" onClick={onClose}>Disclaimer</a>
        <a href="#terms" onClick={onClose}>Terms of Use</a>
        <a href="#contact" onClick={onClose}>Contact</a>
      </div>
    </div>
  );
}


// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import clsx from "clsx";

// const navItems = [
//   { label: "Dashboard", href: "/dashboard", icon: "📊" },
//   { label: "Cases", href: "/cases", icon: "📂" },
//   { label: "Clients", href: "/clients", icon: "👥" },
//   { label: "Documents", href: "/documents", icon: "📄" },
//   { label: "Calendar", href: "/calendar", icon: "📅" },
// ];

// const footerItems = [
//   { label: "Settings", href: "/settings", icon: "⚙️" },
//   { label: "Help", href: "/help", icon: "❓" },
// ];

// export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//   const pathname = usePathname();

//   return (
//     <>
//       {/* Overlay - only visible when sidebar is open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:bg-opacity-0 lg:pointer-events-none"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={clsx(
//           "fixed top-0 left-0 h-full w-64 bg-[#111827] text-white z-50",
//           "transform transition-transform duration-300 ease-in-out",
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         <div className="h-full flex flex-col pt-4 pb-4">
//           {/* Navigation items */}
//           <nav className="flex-1 px-4 space-y-2 mt-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={clsx(
//                   "flex items-center px-3 py-2 rounded-md text-sm font-medium",
//                   pathname === item.href
//                     ? "bg-gray-800 text-white"
//                     : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                 )}
//                 onClick={onClose}
//               >
//                 <span className="mr-3">{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Footer items */}
//           <div className="px-4 space-y-2 border-t border-gray-700 pt-4">
//             {footerItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={clsx(
//                   "flex items-center px-3 py-2 rounded-md text-sm font-medium",
//                   pathname === item.href
//                     ? "bg-gray-800 text-white"
//                     : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                 )}
//                 onClick={onClose}
//               >
//                 <span className="mr-3">{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
