"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlignLeft, Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Fuse from "fuse.js";

type Suggestion = {
  label: string;
  route: string;
  matchIndices: [number, number][];
};

export default function Navbar({
  toggleSidebar,
  sidebarOpen,
}: {
  toggleSidebar?: () => void;
  sidebarOpen: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Desktop menu items including a marker for the dropdown
  const desktopMenuItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Practice Areas", isDropdown: true, href: "#practice" },
    { name: "News", href: "#news" },
    { name: "Articles/Blogs", href: "#articles" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];
  // Practice Areas and their sub-menus
  const practiceSubItems = [
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
  ];

  const allItems = [
    ...desktopMenuItems.filter((item) => !item.isDropdown),
    ...practiceSubItems,
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  const fuse = new Fuse(allItems, {
    keys: ["name"],
    includeMatches: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchText.trim()) {
        const results = fuse.search(searchText.trim()).slice(0, 6);
        const formatted: Suggestion[] = results
          .filter((r) => typeof r.item.href === "string")
          .map((r) => ({
            label: r.item.name,
            route: r.item.href!,
            matchIndices: [...(r.matches?.[0]?.indices || [])],
          }));
        setSuggestions(formatted);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchText]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          scrollToId(hash.slice(1));
          setActiveHash(hash);
        }, 200);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleLogoClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setSubDropdownOpen(null);

    if (pathname === "/") {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveHash("");
    } else {
      router.push("/?scrollTo=welcome");
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveHash(`#${id}`);
      history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-gradient-to-r from-white via-amber-100 to-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              console.log("Sidebar Toggle Clicked");
              toggleSidebar?.();
            }}
            className="text-gray-700 hover:text-amber-600 mr-2"
          >
            <AlignLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Sidebar Toggle */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              console.log("Sidebar Toggle Clicked");
              toggleSidebar?.();
            }}
            className="text-gray-700 hover:text-amber-600 mr-4"
          >
            <AlignLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
          <Image src="/assets/pj_logo_icon.png" alt="PJ Logo" width={40} height={40} />
          <span className="text-xl font-bold text-gray-900">PJ Legal</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {desktopMenuItems.map((item) => {
            if (item.isDropdown) {
              // Render Practice Areas dropdown
              return (
                <div
                  key="Practice Areas"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => {
                    setDropdownOpen(false);
                    setSubDropdownOpen(null);
                  }}
                  className="relative"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (pathname !== "/") {
                        router.push(`/${item.href}`);
                      } else {
                        scrollToId(item.href!.slice(1));
                      }
                    }}
                    className={clsx(
                      "flex items-center px-3 py-2 rounded-lg font-medium transition",
                      pathname?.startsWith("/practice-areas") || activeHash === "#practice"
                        ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow"
                        : "text-gray-700 hover:text-amber-600 hover:bg-amber-100"
                    )}
                  >
                    {item.name} <ChevronDown className="ml-1 w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-10 left-0 bg-white shadow-lg rounded-lg py-2 w-64 z-50"
                      >
                        {practiceSubItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-100"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // Normal menu links
            const href = item.href!;
            return (
              <a
                key={item.name}
                href={item.href?.startsWith("#") ? item.href : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.name === "Home") {
                    if (pathname === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      router.push("/?scrollTo=welcome");
                    }
                  } else if (item.href?.startsWith("#")) {
                    const target = item.href.slice(1);
                    if (pathname === "/") {
                      scrollToId(target);
                    } else {
                      router.push(`/?scrollTo=${target}`);
                    }
                  } else {
                    router.push(item.href!);
                  }
                }}
                className={clsx(
                  "font-medium px-3 py-2 rounded-lg transition cursor-pointer",
                  activeHash === item.href
                    ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow"
                    : "text-gray-700 hover:text-amber-600 hover:bg-amber-100"
                )}
              >
                {item.name}
              </a>
            );
          })}

          {/* Search icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-amber-600"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Disclaimer CTA */}
          <Link
            href="/disclaimer"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            Disclaimer
          </Link>
        </div>

           </nav>
  );
}

function highlightMatch(label: string, indices: [number, number][]) {
  if (!indices.length) return label;
  const result: JSX.Element[] = [];
  let lastIndex = 0;

  indices.forEach(([start, end], i) => {
    if (lastIndex < start) {
      result.push(<span key={`text-${i}`}>{label.slice(lastIndex, start)}</span>);
    }
    result.push(
      <span
        key={`highlight-${i}`}
        className="font-semibold text-amber-700 bg-amber-100 rounded px-1"
      >
        {label.slice(start, end + 1)}
      </span>
    );
    lastIndex = end + 1;
  });

  if (lastIndex < label.length) {
    result.push(<span key="tail">{label.slice(lastIndex)}</span>);
  }

  return <>{result}</>;
}
