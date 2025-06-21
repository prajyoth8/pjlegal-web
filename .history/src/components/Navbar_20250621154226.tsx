// ✅ src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Text */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/pj_logo_icon.png"
            alt="PJ Logo"
            width={}
            height={100}
            className="object-contain"
          />
          <span className="text-xl font-bold text-gray-800">PJ Legal</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["About", "Practice Areas", "News", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="px-6 py-4 space-y-2 md:hidden bg-white shadow-md">
          {["About", "Practice Areas", "News", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
