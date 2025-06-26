// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { AlignLeft, Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import clsx from "clsx";
// import Fuse from "fuse.js";

// type Suggestion = {
//   label: string;
//   route: string;
//   matchIndices: [number, number][];
// };

// export default function Navbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [subDropdownOpen, setSubDropdownOpen] = useState<string | null>(null);
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeHash, setActiveHash] = useState<string>("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   // Desktop menu items including a marker for the dropdown
//   const desktopMenuItems = [
//     { name: "Home", href: "#" },
//     { name: "About", href: "#about" },
//     { name: "Practice Areas", isDropdown: true, href: "#practice" },
//     { name: "News", href: "#news" },
//     { name: "Articles/Blogs", href: "#articles" },
//     { name: "Education", href: "#education" },
//     { name: "Contact", href: "#contact" },
//   ];
//   // Practice Areas and their sub-menus
//   const practiceSubItems = [
//     { name: "Civil Law", href: "/practice-areas/civil-law" },
//     { name: "Constitutional Law", href: "/practice-areas/constitutional-law" },
//     { name: "Corporate Laws", href: "/practice-areas/corporate-laws" },
//     { name: "Criminal Law", href: "/practice-areas/criminal-law" },
//     { name: "Election Law", href: "/practice-areas/election-law" },
//     { name: "Family Law", href: "/practice-areas/family-law" },
//     { name: "Labour Law", href: "/practice-areas/labour-law" },
//     { name: "Property Law", href: "/practice-areas/property-law" },
//     { name: "Real Estate RERA", href: "/practice-areas/real-estate-rera" },
//     { name: "Service Law", href: "/practice-areas/service-law" },
//   ];

//   const allItems = [
//     ...desktopMenuItems.filter((item) => !item.isDropdown),
//     ...practiceSubItems,
//     { name: "Disclaimer", href: "/disclaimer" },
//   ];

//   const fuse = new Fuse(allItems, {
//     keys: ["name"],
//     includeMatches: true,
//     threshold: 0.3,
//   });

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (searchText.trim()) {
//         const results = fuse.search(searchText.trim()).slice(0, 6);
//         const formatted: Suggestion[] = results
//           .filter((r) => typeof r.item.href === "string")
//           .map((r) => ({
//             label: r.item.name,
//             route: r.item.href!,
//             matchIndices: [...(r.matches?.[0]?.indices || [])],
//           }));
//         setSuggestions(formatted);
//       } else {
//         setSuggestions([]);
//       }
//     }, 300);
//     return () => clearTimeout(delay);
//   }, [searchText]);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "auto";
//   }, [menuOpen]);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (pathname === "/" && typeof window !== "undefined") {
//       const hash = window.location.hash;
//       if (hash) {
//         setTimeout(() => {
//           scrollToId(hash.slice(1));
//           setActiveHash(hash);
//         }, 200);
//       }
//     }
//   }, [pathname]);

//   useEffect(() => {
//     const handleHashChange = () => {
//       setActiveHash(window.location.hash);
//     };
//     handleHashChange();
//     window.addEventListener("hashchange", handleHashChange);
//     return () => window.removeEventListener("hashchange", handleHashChange);
//   }, []);

//   const handleLogoClick = () => {
//     setMenuOpen(false);
//     setDropdownOpen(false);
//     setSubDropdownOpen(null);

//     if (pathname === "/") {
//       window.history.pushState(null, "", "/");
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       setActiveHash("");
//     } else {
//       router.push("/?scrollTo=welcome");
//     }
//   };

//   const scrollToId = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) {
//       const yOffset = -80;
//       const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//       setActiveHash(`#${id}`);
//       history.pushState(null, "", `#${id}`);
//     }
//   };

//   return (
//     <nav
//       className={clsx(
//         "fixed top-0 z-50 w-full transition-all duration-300",
//         scrolled
//           ? "bg-white/90 backdrop-blur-md shadow-md"
//           : "bg-gradient-to-r from-white via-amber-100 to-white"
//       )}
//     >
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Mobile Sidebar Toggle */}
//         <div className="lg:hidden flex items-center">
//           <button
//             onClick={() => {
//               console.log("Sidebar Toggle Clicked");
//               toggleSidebar?.();
//             }}
//             className="text-gray-700 hover:text-amber-600 mr-2"
//           >
//             <AlignLeft className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Desktop Sidebar Toggle */}
//         <div className="hidden lg:flex items-center">
//           <button
//             onClick={() => {
//               console.log("Sidebar Toggle Clicked");
//               toggleSidebar?.();
//             }}
//             className="text-gray-700 hover:text-amber-600 mr-4"
//           >
//             <AlignLeft className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Logo */}
//         <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
//           <Image src="/assets/pj_logo_icon.png" alt="PJ Logo" width={40} height={40} />
//           <span className="text-xl font-bold text-gray-900">PJ Legal</span>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex items-center gap-6">
//           {desktopMenuItems.map((item) => {
//             if (item.isDropdown) {
//               // Render Practice Areas dropdown
//               return (
//                 <div
//                   key="Practice Areas"
//                   onMouseEnter={() => setDropdownOpen(true)}
//                   onMouseLeave={() => {
//                     setDropdownOpen(false);
//                     setSubDropdownOpen(null);
//                   }}
//                   className="relative"
//                 >
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       if (pathname !== "/") {
//                         router.push(`/${item.href}`);
//                       } else {
//                         scrollToId(item.href!.slice(1));
//                       }
//                     }}
//                     className={clsx(
//                       "flex items-center px-3 py-2 rounded-lg font-medium transition",
//                       pathname?.startsWith("/practice-areas") || activeHash === "#practice"
//                         ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow"
//                         : "text-gray-700 hover:text-amber-600 hover:bg-amber-100"
//                     )}
//                   >
//                     {item.name} <ChevronDown className="ml-1 w-4 h-4" />
//                   </button>

//                   <AnimatePresence>
//                     {dropdownOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="absolute top-10 left-0 bg-white shadow-lg rounded-lg py-2 w-64 z-50"
//                       >
//                         {practiceSubItems.map((sub) => (
//                           <Link
//                             key={sub.name}
//                             href={sub.href}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-100"
//                           >
//                             {sub.name}
//                           </Link>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             }

//             // Normal menu links
//             const href = item.href!;
//             return (
//               <a
//                 key={item.name}
//                 href={item.href?.startsWith("#") ? item.href : undefined}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (item.name === "Home") {
//                     if (pathname === "/") {
//                       window.scrollTo({ top: 0, behavior: "smooth" });
//                     } else {
//                       router.push("/?scrollTo=welcome");
//                     }
//                   } else if (item.href?.startsWith("#")) {
//                     const target = item.href.slice(1);
//                     if (pathname === "/") {
//                       scrollToId(target);
//                     } else {
//                       router.push(`/?scrollTo=${target}`);
//                     }
//                   } else {
//                     router.push(item.href!);
//                   }
//                 }}
//                 className={clsx(
//                   "font-medium px-3 py-2 rounded-lg transition cursor-pointer",
//                   activeHash === item.href
//                     ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow"
//                     : "text-gray-700 hover:text-amber-600 hover:bg-amber-100"
//                 )}
//               >
//                 {item.name}
//               </a>
//             );
//           })}

//           {/* Search icon */}
//           <button
//             onClick={() => setShowSearch(!showSearch)}
//             className="text-gray-600 hover:text-amber-600"
//           >
//             <Search className="w-5 h-5" />
//           </button>

//           {/* Disclaimer CTA */}
//           <Link
//             href="/disclaimer"
//             className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition"
//           >
//             Disclaimer
//           </Link>
//         </div>

//         {/* ✅ Mobile Menu Toggle */}
//         <button className="lg:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden px-6 pb-4 space-y-2 bg-gray-50 shadow-inner max-h-[70vh] overflow-y-auto"
//           >
//             {desktopMenuItems.map((item) => {
//               if (item.isDropdown) {
//                 return (
//                   <div
//                     key="Practice Areas"
//                     onMouseEnter={() => setDropdownOpen(true)}
//                     onMouseLeave={() => {
//                       setDropdownOpen(false);
//                       setSubDropdownOpen(null);
//                     }}
//                     className="relative"
//                   >
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();

//                         const isHome = item.name === "Home";
//                         const isSection = item.href?.startsWith("#");
//                         const target = isSection ? item.href.slice(1) : "";

//                         // Always collapse menu before scroll
//                         setMenuOpen(false);
//                         setDropdownOpen(false);
//                         setSubDropdownOpen(null);

//                         // Scroll/navigate after collapse delay
//                         setTimeout(() => {
//                           if (isHome) {
//                             if (pathname === "/") {
//                               window.history.pushState(null, "", "/");
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               setActiveHash("");
//                             } else {
//                               router.push("/?scrollTo=welcome");
//                             }
//                           } else if (isSection) {
//                             if (pathname === "/") {
//                               scrollToId(target);
//                             } else {
//                               router.push(`/?scrollTo=${target}`);
//                             }
//                           } else {
//                             router.push(item.href!);
//                           }
//                         }, 300);
//                       }}
//                       className={clsx(
//                         "flex items-center px-3 py-2 rounded-lg font-medium transition",
//                         pathname?.startsWith("/practice-areas") || activeHash === "#practice"
//                           ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow"
//                           : "text-gray-700 hover:text-amber-600 hover:bg-amber-100"
//                       )}
//                     >
//                       {item.name} <ChevronDown className="ml-1 w-4 h-4" />
//                     </button>

//                     <AnimatePresence>
//                       {dropdownOpen && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           className="absolute top-12 left-0 w-[42rem] p-4 bg-white shadow-2xl rounded-lg z-50"
//                         >
//                           <div className="grid grid-cols-2 gap-4">
//                             {practiceSubItems.map((sub) => (
//                               <Link
//                                 key={sub.name}
//                                 href={sub.href}
//                                 className="flex items-start gap-2 p-3 rounded-md bg-white hover:bg-amber-50 border border-transparent hover:border-amber-300 transition-all duration-200 shadow-sm"
//                               >
//                                 <div className="flex-grow">
//                                   <p className="font-semibold text-gray-800">{sub.name}</p>
//                                   <p className="text-xs text-gray-500">
//                                     Learn more about {sub.name.replace("Law", "").trim()} law
//                                   </p>
//                                 </div>
//                               </Link>
//                             ))}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 );
//               } else {
//                 return (
//                   <a
//                     key={item.name}
//                     href={item.href?.startsWith("#") ? item.href : undefined}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       const isHome = item.name === "Home";
//                       const isSection = item.href?.startsWith("#");
//                       const target = isSection ? item.href.slice(1) : "";

//                       // Collapse the menu first
//                       setMenuOpen(false);
//                       setDropdownOpen(false);
//                       setSubDropdownOpen(null);

//                       setTimeout(() => {
//                         if (isHome) {
//                           if (pathname === "/") {
//                             window.scrollTo({ top: 0, behavior: "smooth" });
//                             setActiveHash("");
//                           } else {
//                             router.push("/?scrollTo=welcome");
//                           }
//                         } else if (isSection) {
//                           if (pathname === "/") {
//                             scrollToId(target);
//                           } else {
//                             router.push(`/?scrollTo=${target}`);
//                           }
//                         } else {
//                           router.push(item.href!);
//                         }
//                       }, 300); // Wait for dropdown to close
//                     }}
//                     className={clsx(
//                       "block font-medium px-3 py-2 rounded",
//                       activeHash === item.href
//                         ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow"
//                         : "text-gray-700 hover:text-amber-700 hover:bg-amber-100"
//                     )}
//                   >
//                     {item.name}
//                   </a>
//                 );
//               }
//             })}

//             <div className="pt-4 border-t">
//               <button
//                 onClick={() => setShowSearch(true)}
//                 className="text-gray-700 flex items-center gap-2 hover:text-amber-600"
//               >
//                 <Search className="w-4 h-4" /> Search
//               </button>
//               <Link
//                 href="/disclaimer"
//                 onClick={() => setMenuOpen(false)}
//                 className="block mt-3 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-center font-semibold py-2 rounded-full shadow hover:opacity-90"
//               >
//                 Disclaimer
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showSearch && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/40 flex items-start justify-center pt-24 z-50"
//           >
//             <div className="bg-white w-full max-w-lg p-4 rounded-lg shadow-xl">
//               <input
//                 type="text"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 placeholder="Search pages, sections..."
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-100 text-sm"
//               />
//               {suggestions.length > 0 && (
//                 <div className="mt-2 bg-white shadow-md rounded-md border border-gray-200">
//                   {suggestions.map(({ label, route, matchIndices }) => (
//                     <div
//                       key={route}
//                       className="px-4 py-2 hover:bg-amber-100 cursor-pointer text-sm text-gray-700"
//                       onClick={() => {
//                         setSearchText("");
//                         setShowSearch(false);
//                         setSuggestions([]);
//                         router.push(route);
//                       }}
//                     >
//                       {highlightMatch(label, matchIndices)}
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <button
//                 onClick={() => setShowSearch(false)}
//                 className="mt-4 text-sm text-gray-500 hover:text-gray-800"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// function highlightMatch(label: string, indices: [number, number][]) {
//   if (!indices.length) return label;
//   const result: JSX.Element[] = [];
//   let lastIndex = 0;

//   indices.forEach(([start, end], i) => {
//     if (lastIndex < start) {
//       result.push(<span key={`text-${i}`}>{label.slice(lastIndex, start)}</span>);
//     }
//     result.push(
//       <span
//         key={`highlight-${i}`}
//         className="font-semibold text-amber-700 bg-amber-100 rounded px-1"
//       >
//         {label.slice(start, end + 1)}
//       </span>
//     );
//     lastIndex = end + 1;
//   });

//   if (lastIndex < label.length) {
//     result.push(<span key="tail">{label.slice(lastIndex)}</span>);
//   }

//   return <>{result}</>;
// }
