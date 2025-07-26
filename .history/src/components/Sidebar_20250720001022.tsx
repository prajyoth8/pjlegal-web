// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import clsx from "clsx";
// import { useState, useEffect } from "react";
// import { ChevronDown, Search, X } from "lucide-react";
// import Fuse from "fuse.js";
// import ConsultationModal from "@/components/ConsultationModal";

// export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [activeHash, setActiveHash] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const [openDropdownName, setOpenDropdownName] = useState<string | null>(null);

//   const [isModalOpen, setModalOpen] = useState(false);

//   const menuItems = [
//     { name: "Home", href: "#" },
//     { name: "About", href: "#about" },
//     {
//       name: "Practice Areas",
//       href: "#practice",
//       subItems: [
//         { name: "Civil Law", href: "/practice-areas/civil-law" },
//         { name: "Constitutional Law", href: "/practice-areas/constitutional-law" },
//         { name: "Corporate Laws", href: "/practice-areas/corporate-laws" },
//         { name: "Criminal Law", href: "/practice-areas/criminal-law" },
//         { name: "Election Law", href: "/practice-areas/election-law" },
//         { name: "Family Law", href: "/practice-areas/family-law" },
//         { name: "Labour Law", href: "/practice-areas/labour-law" },
//         { name: "Property Law", href: "/practice-areas/property-law" },
//         { name: "Real Estate RERA", href: "/practice-areas/real-estate-rera" },
//         { name: "Service Law", href: "/practice-areas/service-law" },
//       ],
//     },
//     {
//       name: "Insights",
//       href: "#insights",
//       subItems: [
//         { name: "News", href: "/insights/news" },
//         { name: "Articles & Blogs", href: "/insights/articles" },
//         { name: "Education", href: "/insights/education" },
//       ],
//     },
//     { name: "Contact", href: "#contact" },
//   ];

//   const footerItems = [
//     { name: "Disclaimer", href: "/disclaimer" },
//     { name: "Terms of Use", href: "/terms" },
//   ];

//   const allItems = [
//     ...menuItems.filter((item) => !item.subItems),
//     ...menuItems.flatMap((item) => item.subItems || []),
//     ...footerItems,
//   ];

//   const fuse = new Fuse(allItems, {
//     keys: ["name"],
//     threshold: 0.3,
//   });

//   useEffect(() => {
//     if (searchText.trim()) {
//       const results = fuse.search(searchText.trim()).slice(0, 5);
//       setSuggestions(results.map((r) => r.item));
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchText]);

//   useEffect(() => {
//     // Test for mobile devices
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     if (isMobile) {
//       console.log("Mobile device detected - applying specific styles");
//     }
//   }, []);

//   const scrollToId = (id: string) => {
//     if (id.startsWith("#")) id = id.slice(1);
//     const el = document.getElementById(id);
//     if (el) {
//       const yOffset = -80;
//       const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//       setActiveHash(`#${id}`);
//       onClose();
//     }
//   };

//   const handleItemClick = (href: string) => {
//     if (href === "#" || href === "/") {
//       if (pathname === "/") {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         setActiveHash("");
//       } else {
//         router.push("/");
//       }
//       onClose();
//     } else if (href.startsWith("#")) {
//       scrollToId(href);
//     } else {
//       router.push(href);
//       onClose();
//     }
//   };

//   return (
//     <>
//       {/* Overlay - only shown on mobile */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
//       )}

//       {/* Sidebar - using flex-col with proper height calculation */}
//       <aside
//         className={clsx(
//           "fixed top-0 left-0 w-64 bg-[#111827] text-white z-50",
//           "flex flex-col",
//           "transform transition-transform duration-300 ease-in-out",
//           isOpen ? "translate-x-0" : "-translate-x-full",
//           "lg:fixed ",
//           // Different height for mobile vs desktop
//           "h-[calc(100vh-4rem)] lg:h-screen" // Mobile accounts for navbar, desktop full height
//         )}
//       >
//         {/* Single scrollable container for ALL content */}
//         <div className="flex-1 overflow-y-auto pb-4">
//           {" "}


//           {/* Header with Logo and Close button */}
//           <div className="flex justify-between items-center p-4 border-b border-gray-700">
//             <div className="text-xl font-bold">PJ Legal</div>
//             <button
//               className="lg:hidden text-gray-700 hover:text-white"
//               onClick={onClose}
//               aria-label="Close sidebar"
//             >
//               <X className="w-10 h-10" />
//             </button>
//           </div>
//           {/* Added padding-bottom */}
//           {/* Search Bar */}
//           <div className="p-4 border-b border-gray-700 sticky top-0 bg-[#111827] z-10">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full bg-gray-800 text-white px-4 py-2 rounded-md pl-10"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//               />
//               <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//             </div>

//             {/* Search Suggestions */}
//             {suggestions.length > 0 && (
//               <div className="mt-2 bg-gray-800 rounded-md shadow-lg">
//                 {suggestions.map((item, index) => (
//                   <div
//                     key={index}
//                     className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
//                     onClick={() => handleItemClick(item.href)}
//                   >
//                     {item.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           {/* Header Row with Logo + Close */}
//           {/* <div className="flex justify-between items-center p-4 border-b border-gray-700">
//             <div className="text-xl font-bold">PJ Legal</div>
//             <button
//               className="lg:hidden text-gray-300 hover:text-white"
//               onClick={onClose}
//               aria-label="Close sidebar"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div> */}
//           {/* PJ Legal Name
//           <div className="p-4 flex items-center gap-2 border-b border-gray-700">
//             <div className="text-xl font-bold">PJ Legal</div>
//           </div> */}
//           {/* Main Menu Items */}
//           <div className="p-4 space-y-2">
//             {menuItems.map((item) => (
//               <div key={item.name}>
//                 <div
//                   className={clsx(
//                     "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer",
//                     "hover:bg-gray-800 transition",
//                     activeHash === item.href ? "bg-gray-800 font-semibold" : ""
//                   )}
//                   onClick={() => handleItemClick(item.href)}
//                 >
//                   <span>{item.name}</span>
//                   {item.subItems && (
//                     <ChevronDown
//                       className={`w-4 h-4 transition-transform ${
//                         openDropdownName === item.name ? "rotate-180" : ""
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setOpenDropdownName(openDropdownName === item.name ? null : item.name);
//                       }}
//                     />
//                   )}
//                 </div>

//                 {/* Practice Areas Dropdown */}
//                 {item.subItems && openDropdownName === item.name && (
//                   <div className="ml-4 mt-1 space-y-1">
//                     {item.subItems.map((subItem) => (
//                       <div
//                         key={subItem.name}
//                         className={clsx(
//                           "px-3 py-2 rounded-md cursor-pointer text-sm",
//                           "hover:bg-gray-800 transition",
//                           pathname === subItem.href ? "bg-gray-800 font-semibold" : ""
//                         )}
//                         onClick={() => handleItemClick(subItem.href)}
//                       >
//                         {subItem.name}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Book Consultation Button */}
//             <button
//               className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition"
//               onClick={() => setModalOpen(true)}
//             >
//               Book Consultation
//             </button>
//           </div>
//           {/* Footer Items - now part of the main scrollable content */}
//           <div className="p-4 border-t border-gray-700 space-y-2 bg-[#111827]">
//             {footerItems.map((item) => (
//               <div
//                 key={item.name}
//                 className={clsx(
//                   "px-3 py-2 rounded-md cursor-pointer",
//                   "hover:bg-gray-800 transition",
//                   pathname === item.href ? "bg-gray-800 font-semibold" : ""
//                 )}
//                 onClick={() => handleItemClick(item.href)}
//               >
//                 {item.name}
//               </div>
//             ))}
//             <div className="pt-2 text-center text-xs text-gray-400">
//               © {new Date().getFullYear()} PJ Legal
//             </div>
//           </div>
//         </div>

//         <ConsultationModal open={isModalOpen} onClose={() => setModalOpen(false)} />
//       </aside>
//     </>
//   );
// }




"use client";

import {
  Home,
  Info,
  Gavel,
  BookOpenCheck,
  Newspaper,
  Mail,
  X,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Auto-close on route change
  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <>
      {/* Overlay on small screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "tween" }}
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-[#0c1427] text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:z-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <span className="text-xl font-bold">PJ Legal</span>
          <button className="lg:hidden text-white" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 pl-10 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="/about" className="block py-2">About</Link>
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer py-2">
              <span>Practice Areas</span>
              <span>▾</span>
            </summary>
            <div className="ml-4 space-y-1 py-1">
              <Link href="/practice-areas/cyber-law">Cyber Law</Link>
              <Link href="/practice-areas/property-law">Property Law</Link>
            </div>
          </details>
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer py-2">
              <span>Insights</span>
              <span>▾</span>
            </summary>
            <div className="ml-4 space-y-1 py-1">
              <Link href="/insights/news">News</Link>
              <Link href="/insights/articles">Articles/Blogs</Link>
              <Link href="/insights/education">Education</Link>
            </div>
          </details>
          <Link href="/contact" className="block py-2">Contact</Link>

          <Link
            href="/consult"
            className="mt-4 inline-block w-full text-center bg-orange-600 hover:bg-orange-700 py-2 font-bold text-white rounded"
          >
            Book Consultation
          </Link>
        </nav>

        {/* Footer Links */}
        <div className="mt-auto px-4 py-4 text-sm border-t border-white/10">
          <Link href="/disclaimer" className="block py-1">Disclaimer</Link>
          <Link href="/terms" className="block py-1">Terms of Use</Link>
          <div className="text-xs text-gray-400 mt-2">© 2025 PJ Legal</div>
        </div>
      </motion.div>
    </>
  );
}
