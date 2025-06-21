"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = ["About", "Practice Areas", "News", "Contact"];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
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
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}

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
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
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
