"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";

export type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const navItems = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "About Us", href: "/about", icon: "👤" },
  { label: "Practice Areas", href: "/practice", icon: "⚖️" },
  { label: "Book Consultation", href: "/consult", icon: "📅" },
  { label: "Articles & Blogs", href: "/articles", icon: "📰" },
  { label: "News & Insights", href: "/news", icon: "📢" },
  { label: "FAQs", href: "/faqs", icon: "❓" },
];

const footerItems = [
  { label: "Settings", href: "/settings", icon: "⚙️" },
  { label: "Disclaimer", href: "/disclaimer", icon: "📄" },
  { label: "Terms of Use", href: "/terms", icon: "👣" },
  { label: "Contact Us", href: "/contact", icon: "📧" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Dark overlay when sidebar is open */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      />

      {/* Sidebar panel */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-[#111827] text-white z-50 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-4 py-6 flex flex-col h-full">
          {/* Close (×) button for mobile */}
          <div className="lg:hidden flex justify-end mb-4">
            <button onClick={onClose} className="text-white text-2xl">
              ×
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map(({ label, href, icon }) => (
              <Link key={href} href={href}>
                <div
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition",
                    pathname === href ? "bg-gray-800 font-semibold" : ""
                  )}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <hr className="my-4 border-gray-700" />

          <div className="space-y-2">
            {footerItems.map(({ label, href, icon }) => (
              <Link key={href} href={href}>
                <div
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition",
                    pathname === href ? "bg-gray-800 font-semibold" : ""
                  )}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} PJ Legal
          </div>
        </div>
      </aside>
    </>
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
