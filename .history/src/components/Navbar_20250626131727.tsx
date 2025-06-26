"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlignLeft,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Search,
} from "lucide-react";
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
}: {
  toggleSidebar?: () => void;
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
        <div className="flex items-center gap-3">
          {/* ✅ Sidebar Toggle Icon for Desktop/Tablet */}
          <button
            onClick={toggleSidebar}
            className="lg:block hidden text-gray-700 hover:text-amber-600"
          >
            <AlignLeft className="w-6 h-6" />
          </button>

          {/* ✅ Logo */}
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
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ✅ ...rest of your JSX continues unchanged (menu items, search modal, dropdowns, etc.) */}
    </nav>
  );
}

// 🟡 Same highlightMatch function as you had
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
