"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

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
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-white via-blue-50 to-white shadow-md">
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
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            About
          </Link>

          {/* Practice Areas Dropdown */}
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="relative"
          >
            <button className="flex items-center text-gray-700 font-medium hover:text-blue-600 transition">
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
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition text-sm"
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
              className="text-gray-700 font-medium hover:text-blue-600 transition"
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

          {/* 🚨 Disclaimer Button */}
          <Link
            href="/disclaimer"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:opacity-90 transition"
          >
            Disclaimer
          </Link>
        </div>

        {/* 📱 Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 🔍 Expand Search Bar */}
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
              placeholder="Search articles, cases, documents..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md px-6 pb-4 overflow-hidden"
          >
            <div className="space-y-2 mt-2">
              <Link href="/about" className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                About
              </Link>
              <div className="border-t" />
              <p className="font-semibold text-sm text-gray-700">Practice Areas</p>
              {practiceSubItems.map((sub) => (
                <Link key={sub.name} href={sub.href} className="block py-1 text-sm text-gray-600 hover:text-blue-600">
                  {sub.name}
                </Link>
              ))}
              {desktopMenuItems.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
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

              {/* 🔍 Mobile Search */}
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
