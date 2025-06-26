"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Fuse from "fuse.js";

type Suggestion = {
  label: string;
  route: string;
  matchIndices: [number, number][];
};

export default function Navbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  const desktopMenuItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Practice Areas", isDropdown: true, href: "#practice" },
    { name: "News", href: "#news" },
    { name: "Articles/Blogs", href: "#articles" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

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
        setSuggestions(
          results.map((r) => ({
            label: r.item.name,
            route: r.item.href!,
            matchIndices: [...(r.matches?.[0]?.indices || [])],
          }))
        );
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

  useEffect(() => {
    setActiveHash(window.location.hash);
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
        {/* Left: Logo and Sidebar Toggle */}
        <div onClick={toggleSidebar} className="flex items-center gap-2 cursor-pointer">
          <Image src="/assets/pj_logo_icon.png" alt="PJ Logo" width={40} height={40} />
          <span className="text-xl font-bold text-gray-900">PJ Legal</span>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {desktopMenuItems.map((item) => {
            if (item.isDropdown) {
              return (
                <div
                  key="Practice Areas"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="relative"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.href!.slice(1));
                    }}
                    className={clsx(
                      "flex items-center px-3 py-2 rounded-lg font-medium transition",
                      activeHash === "#practice"
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

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = item.href?.slice(1);
                  scrollToId(target);
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

          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(true)}
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

        {/* Right: Mobile Hamburger */}
        <button onClick={toggleSidebar} className="lg:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-start justify-center pt-24 z-50"
          >
            <div className="bg-white w-full max-w-lg p-4 rounded-lg shadow-xl">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search pages..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-100 text-sm"
              />
              {suggestions.length > 0 && (
                <div className="mt-2 bg-white shadow-md rounded-md border border-gray-200">
                  {suggestions.map(({ label, route, matchIndices }) => (
                    <div
                      key={route}
                      className="px-4 py-2 hover:bg-amber-100 cursor-pointer text-sm text-gray-700"
                      onClick={() => {
                        setSearchText("");
                        setShowSearch(false);
                        router.push(route);
                      }}
                    >
                      {highlightMatch(label, matchIndices)}
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowSearch(false)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
