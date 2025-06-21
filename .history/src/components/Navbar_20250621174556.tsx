"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 🔁 Debounced search redirect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchText.trim())}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText, router]);

  // 📏 Scroll blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* 🔷 Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/pj_logo_icon.png"
            alt="PJ Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold text-gray-900">PJ Legal</span>
        </Link>

        {/* 🖥️ Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 relative">
          <Link
            href="/about"
            className={clsx(
              "font-medium transition",
              pathname === "/about"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            )}
          >
            About
          </Link>

          {/* Practice Areas Dropdown */}
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
                      className={clsx(
                        "block px-4 py-2 text-sm transition",
                        pathname === subItem.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {desktopMenuItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={clsx(
                "font-medium transition",
                pathname === href
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              )}
            >
              {name}
            </Link>
          ))}

          {/* 🔍 Search Icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* 🚨 Disclaimer CTA */}
          <Link
            href="/disclaimer"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            Disclaimer
          </Link>
        </div>

        {/* 📱 Hamburger Menu */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 🔍 Search Input Desktop */}
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
              placeholder="Search cases, articles..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md px-6 pb-4"
          >
            <div className="space-y-2 mt-2">
              <Link href="/about" className="block py-2 text-sm text-gray-700">
                About
              </Link>
              <div>
                <p className="font-semibold text-sm">Practice Areas</p>
                {practiceSubItems.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
              {desktopMenuItems.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="block py-2 text-sm text-gray-700"
                >
                  {name}
                </Link>
              ))}
              <Link
                href="/disclaimer"
                className="block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-center font-semibold py-2 mt-4 rounded-full shadow-md"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
