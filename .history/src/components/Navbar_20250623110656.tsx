"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Fuse from "fuse.js";

// Type definition for search suggestions
type Suggestion = {
  label: string;
  route: string;
  matchIndices: [number, number][];
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [scrolled, setScrolled] = useState(false);

  // Desktop menu items including a marker for the dropdown
  const desktopMenuItems = [
    { name: "About", href: "/about" },
    { name: "Practice Areas", isDropdown: true },
    { name: "Articles/Blogs", href: "/articles" },
    { name: "News", href: "/news" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ];

  // Practice Areas and their sub-menus
  const practiceSubItems = [
    {
      name: "Litigation",
      href: "/practice-areas/litigation",
      sub: [
        { name: "Civil Litigation", href: "/practice-areas/litigation/civil" },
        {
          name: "Criminal Litigation",
          href: "/practice-areas/litigation/criminal",
        },
      ],
    },
    {
      name: "Contracts",
      href: "/practice-areas/contracts",
      sub: [
        { name: "Drafting", href: "/practice-areas/contracts/drafting" },
        { name: "Review", href: "/practice-areas/contracts/review" },
      ],
    },
    {
      name: "IP & Trademarks",
      href: "/practice-areas/ip",
      sub: [
        { name: "Patent Filing", href: "/practice-areas/ip/patents" },
        {
          name: "Trademark Registration",
          href: "/practice-areas/ip/trademarks",
        },
      ],
    },
    {
      name: "Legal Advisory",
      href: "/practice-areas/advisory",
      sub: [
        {
          name: "Startup Consulting",
          href: "/practice-areas/advisory/startups",
        },
        {
          name: "Regulatory Advice",
          href: "/practice-areas/advisory/regulatory",
        },
      ],
    },
    {
      name: "Family & Property",
      href: "/practice-areas/family",
      sub: [
        { name: "Divorce", href: "/practice-areas/family/divorce" },
        { name: "Property Disputes", href: "/practice-areas/family/property" },
      ],
    },
  ];

  // Search engine setup using Fuse.js
  const allItems = [
    ...desktopMenuItems.filter((item) => !item.isDropdown),
    ...practiceSubItems.flatMap((item) => [item, ...(item.sub || [])]),
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
        const formatted: Suggestion[] = results.map((r) => ({
          label: r.item.name,
          route: r.item.href,
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo click navigation
  const handleLogoClick = () => {
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-gradient-to-r from-white via-blue-50 to-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/assets/pj_logo_icon.png"
            alt="PJ Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-gray-900">PJ Legal</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
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
                    className={clsx(
                      "flex items-center px-3 py-2 rounded-lg font-medium transition",
                      pathname?.startsWith("/practice-areas")
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    Practice Areas <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-10 left-0 bg-white shadow-lg rounded-lg py-2 w-64 z-50"
                      >
                        {practiceSubItems.map((item) => (
                          <div
                            key={item.name}
                            onMouseEnter={() => setSubDropdownOpen(item.name)}
                            onMouseLeave={() => setSubDropdownOpen(null)}
                            className="relative group"
                          >
                            <Link
                              href={item.href}
                              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                            >
                              {item.name} <ChevronRight className="w-4 h-4" />
                            </Link>
                            <AnimatePresence>
                              {subDropdownOpen === item.name && item.sub && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="absolute top-0 left-full ml-1 bg-white shadow-md rounded-lg py-2 w-64"
                                >
                                  {item.sub.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
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
              <Link
                key={item.name}
                href={href}
                className={clsx(
                  "font-medium px-3 py-2 rounded-lg transition",
                  pathname === href
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                )}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Search icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-blue-600"
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Search Input Below Navbar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="hidden md:block px-6 pb-4"
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search pages, sections..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {suggestions.length > 0 && (
              <div className="mt-2 bg-white shadow-md rounded-md border border-gray-200">
                {suggestions.map(({ label, route, matchIndices }) => (
                  <div
                    key={route}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                    onClick={() => {
                      setSearchText("");
                      setShowSearch(false);
                      setSuggestions([]);
                      router.push(route);
                    }}
                  >
                    {highlightMatch(label, matchIndices)}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Helper function to highlight matched keywords in suggestions
function highlightMatch(label: string, indices: [number, number][]) {
  if (!indices.length) return label;
  const result: JSX.Element[] = [];
  let lastIndex = 0;

  indices.forEach(([start, end], i) => {
    if (lastIndex < start) {
      result.push(
        <span key={`text-${i}`}>{label.slice(lastIndex, start)}</span>
      );
    }
    result.push(
      <span
        key={`highlight-${i}`}
        className="font-semibold text-blue-700 bg-blue-100 rounded px-1"
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
