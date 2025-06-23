"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Fuse from "fuse.js";

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
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const desktopMenuItems = [
    { name: "About", href: "/about" },
    { name: "Articles/Blogs", href: "/articles" },
    { name: "News", href: "/news" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ];

  const practiceSubItems = [
    { name: "Litigation", href: "/practice-areas/litigation" },
    { name: "Contracts", href: "/practice-areas/contracts" },
    { name: "IP & Trademarks", href: "/practice-areas/ip" },
    { name: "Legal Advisory", href: "/practice-areas/advisory" },
  ];

  const allItems = [
    ...desktopMenuItems,
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

  return (
    <nav
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-gradient-to-r from-white via-blue-50 to-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" passHref>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/assets/pj_logo_icon.png" alt="PJ Logo" width={40} height={40} />
            <span className="text-xl font-bold text-gray-900">PJ Legal</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {["About", "Articles/Blogs", "News", "Education", "Contact"].map((item, idx) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace("/", "").replace(/\s+/g, "")}`}
              className={clsx(
                "font-medium transition",
                pathname === `/${item.toLowerCase()}`
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              )}
            >
              {item}
            </Link>
          ))}

          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="relative"
          >
            <button
              className={clsx(
                "flex items-center font-medium transition",
                pathname?.startsWith("/practice-areas")
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
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
                  className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-2 w-48 z-50"
                >
                  {practiceSubItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/disclaimer"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            Disclaimer
          </Link>
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto rounded-b-lg"
          >
            <div>
              <p className="text-gray-500 font-semibold text-sm mb-1">Navigation</p>
              {["About", "Articles/Blogs", "News", "Education", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace("/", "").replace(/\s+/g, "")}`}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-gray-500 font-semibold text-sm mb-1">Practice Areas</p>
              {practiceSubItems.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              ))}
            </div>

            <Link
              href="/disclaimer"
              className="block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-center font-semibold py-2 mt-2 rounded-full shadow-md"
              onClick={() => setMenuOpen(false)}
            >
              Disclaimer
            </Link>

            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                      setMenuOpen(false);
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
