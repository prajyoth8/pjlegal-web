// ✅ src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // 🔍 Debounced predictive search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        // Mock suggestions (replace with actual API call later)
        setSuggestions(
          [
            "Contract Drafting",
            "Cyber Law",
            "IPR Consultation",
            "Startup Advisory",
          ].filter((item) => item.toLowerCase().includes(search.toLowerCase()))
        );
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // 🧭 Scrollspy (active section highlight)
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "practice-areas",
        "articles",
        "news",
        "education",
        "contact",
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-gradient-to-r from-white/80 to-gray-100/80 shadow-sm transition duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/pj_logo_icon.png"
            alt="PJ Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="text-xl font-bold text-gray-800">PJ Legal</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "About", id: "about" },
            { name: "Practice Areas", id: "practice-areas", dropdown: true },
            { name: "Articles/Blogs", id: "articles" },
            { name: "News", id: "news" },
            { name: "Education", id: "education" },
            { name: "Contact", id: "contact" },
          ].map((item) => (
            <div key={item.id} className="relative">
              <Link
                href={`#${item.id}`}
                className={clsx(
                  "transition",
                  activeSection === item.id
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                )}
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white hidden group-hover:block">
                  <Link
                    href="#corporate"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Corporate
                  </Link>
                  <Link
                    href="#cyberlaw"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Cyber Law
                  </Link>
                  <Link
                    href="#litigation"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Litigation
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* 🔍 Search Icon */}
          <button
            className="text-gray-500 hover:text-blue-600"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </button>

          {/* 📄 Disclaimer */}
          <Link
            href="/disclaimer"
            className="bg-gradient-to-r from-yellow-400 to-red-400 px-4 py-2 rounded-full text-white font-medium shadow-md hover:opacity-90 transition"
          >
            Disclaimer
          </Link>
        </div>

        {/* ☰ Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* 🔍 Search Suggestion Box */}
      {showSearch && (
        <div className="px-6 pb-2 bg-white shadow-sm md:hidden">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 bg-white rounded-md border shadow-md">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() =>
                    router.push(`/search?q=${encodeURIComponent(s)}`)
                  }
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="px-6 py-4 space-y-2 md:hidden bg-white shadow-md">
          {[
            "About",
            "Practice Areas",
            "Articles/Blogs",
            "News",
            "Education",
            "Contact",
          ].map((item) => (
            <Link
              key={item}
              href={`#${item
                .toLowerCase()
                .replace(/\//g, "")
                .replace(/ /g, "-")}`}
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/disclaimer"
            className="block bg-gradient-to-r from-yellow-400 to-red-400 px-4 py-2 rounded-full text-white font-medium shadow-md text-center"
          >
            Disclaimer
          </Link>
        </div>
      )}
    </nav>
  );
}
