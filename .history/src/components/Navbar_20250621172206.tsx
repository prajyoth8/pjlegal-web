"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = ["About", const practiceSubItems = [
    { name: "Litigation", href: "/practice-areas/litigation" },
    { name: "Contracts", href: "/practice-areas/contracts" },
    { name: "IP & Trademarks", href: "/practice-areas/ip" },
    { name: "Legal Advisory", href: "/practice-areas/advisory" },
  ]"News", "Contact"];
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

        {/* 🔶 Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 relative">
          {menuItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}

          {/* 📁 Dropdown: Practice Areas */}
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

          {/* 🔍 Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* 🚨 Disclaimer Button */}
          <Link
            href="/disclaimer"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:opacity-90 transition"
          >
            Disclaimer
          </Link>
        </div>

        {/* 🔘 Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md px-6 pb-4 overflow-hidden"
          >
            <div className="space-y-2 mt-2">
              {[...menuItems, "Practice Areas", "Disclaimer"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ &/g, "").replace(/ /g, "-")}`}
                  className="block text-gray-700 hover:text-blue-600 text-sm font-medium py-2"
                >
                  {item}
                </Link>
              ))}
              {/* 🔍 Mobile Search */}
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
