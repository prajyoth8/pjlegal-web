// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";
// import React from "react";

// export type SidebarProps = {
//   isOpen: boolean;
//   onClose?: () => void;
// };

// const navItems = [
//   { label: "Home", href: "/", icon: "🏠" },
//   { label: "About Us", href: "/about", icon: "👤" },
//   { label: "Practice Areas", href: "/practice", icon: "⚖️" },
//   { label: "Book Consultation", href: "/consult", icon: "📅" },
//   { label: "Articles & Blogs", href: "/articles", icon: "📰" },
//   { label: "News & Insights", href: "/news", icon: "📢" },
//   { label: "FAQs", href: "/faqs", icon: "❓" },
// ];

// const footerItems = [
//   { label: "Settings", href: "/settings", icon: "⚙️" },
//   { label: "Disclaimer", href: "/disclaimer", icon: "📄" },
//   { label: "Terms of Use", href: "/terms", icon: "👣" },
//   { label: "Contact Us", href: "/contact", icon: "📧" },
// ];

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname();

//   return (
//     <>
//       {/* Dark overlay when sidebar is open */}
//       <div
//         onClick={onClose}
//         className={clsx(
//           "fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity lg:hidden",
//           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//       />

//       {/* Sidebar panel */}
//       <aside
//         className={clsx(
//           "fixed top-0 left-0 h-full w-64 bg-[#111827] text-white z-50 transform transition-transform duration-300",
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         <div className="px-4 py-6 flex flex-col h-full">
//           {/* Close (×) button for mobile */}
//           <div className="lg:hidden flex justify-end mb-4">
//             <button onClick={onClose} className="text-white text-2xl">
//               ×
//             </button>
//           </div>

//           <nav className="space-y-2 flex-1">
//             {navItems.map(({ label, href, icon }) => (
//               <Link key={href} href={href}>
//                 <div
//                   className={clsx(
//                     "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition",
//                     pathname === href ? "bg-gray-800 font-semibold" : ""
//                   )}
//                 >
//                   <span>{icon}</span>
//                   <span>{label}</span>
//                 </div>
//               </Link>
//             ))}
//           </nav>

//           <hr className="my-4 border-gray-700" />

//           <div className="space-y-2">
//             {footerItems.map(({ label, href, icon }) => (
//               <Link key={href} href={href}>
//                 <div
//                   className={clsx(
//                     "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition",
//                     pathname === href ? "bg-gray-800 font-semibold" : ""
//                   )}
//                 >
//                   <span>{icon}</span>
//                   <span>{label}</span>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           <div className="mt-auto pt-6 text-center text-sm text-gray-400">
//             © {new Date().getFullYear()} PJ Legal
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import Fuse from "fuse.js";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeHash, setActiveHash] = useState("");
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    {
      name: "Practice Areas",
      href: "#practice",
      subItems: [
        { name: "Civil Law", href: "/practice-areas/civil-law" },
        { name: "Constitutional Law", href: "/practice-areas/constitutional-law" },
        { name: "Corporate Laws", href: "/practice-areas/corporate-laws" },
        { name: "Criminal Law", href: "/practice-areas/criminal-law" },
        { name: "Election Law", href: "/practice-areas/election-law" },
        { name: "Family Law", href: "/practice-areas/family-law" },
        { name: "Labour Law", href: "/practice-areas/labour-law" },
        { name: "Property Law", href: "/practice-areas/property-law" },
        { name: "Real Estate RERA", href: "/practice-areas/real-estate-rera" },
        { name: "Service Law", href: "/practice-areas/service-law" },
      ],
    },
    { name: "News", href: "#news" },
    { name: "Articles/Blogs", href: "#articles" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const footerItems = [
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Contact", href: "#contact" },
  ];

  const allItems = [
    ...menuItems.filter((item) => !item.subItems),
    ...menuItems.flatMap((item) => item.subItems || []),
    ...footerItems,
  ];

  const fuse = new Fuse(allItems, {
    keys: ["name"],
    threshold: 0.3,
  });

  useEffect(() => {
    if (searchText.trim()) {
      const results = fuse.search(searchText.trim()).slice(0, 5);
      setSuggestions(results.map((r) => r.item));
    } else {
      setSuggestions([]);
    }
  }, [searchText]);

  const scrollToId = (id: string) => {
    if (id.startsWith("#")) id = id.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveHash(`#${id}`);
      onClose();
    }
  };

  const handleItemClick = (href: string) => {
    if (href.startsWith("#")) {
      scrollToId(href);
    } else {
      router.push(href);
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-[#111827] text-white z-50",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:relative" // Always visible on desktop
        )}
      >
        <div className="h-full flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md pl-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-2 bg-gray-800 rounded-md shadow-lg">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleItemClick(item.href)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PJ Legal Name */}
          <div className="p-4 flex items-center gap-2 border-b border-gray-700">
            <div className="text-xl font-bold">PJ Legal</div>
          </div>

          {/* Main Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                <div
                  className={clsx(
                    "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer",
                    "hover:bg-gray-800 transition",
                    activeHash === item.href ? "bg-gray-800 font-semibold" : ""
                  )}
                  onClick={() => handleItemClick(item.href)}
                >
                  <span>{item.name}</span>
                  {item.subItems && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(!dropdownOpen);
                      }}
                    />
                  )}
                </div>

                {/* Practice Areas Dropdown */}
                {item.subItems && dropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.name}
                        className={clsx(
                          "px-3 py-2 rounded-md cursor-pointer text-sm",
                          "hover:bg-gray-800 transition",
                          pathname === subItem.href ? "bg-gray-800 font-semibold" : ""
                        )}
                        onClick={() => handleItemClick(subItem.href)}
                      >
                        {subItem.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Book Consultation Button */}
            <button
              className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition"
              onClick={() => {
                router.push("/consultation");
                onClose();
              }}
            >
              Book Consultation
            </button>
          </nav>

          {/* Footer Items */}
          <div className="p-4 border-t border-gray-700 space-y-2">
            {footerItems.map((item) => (
              <div
                key={item.name}
                className={clsx(
                  "px-3 py-2 rounded-md cursor-pointer",
                  "hover:bg-gray-800 transition",
                  pathname === item.href ? "bg-gray-800 font-semibold" : ""
                )}
                onClick={() => handleItemClick(item.href)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
