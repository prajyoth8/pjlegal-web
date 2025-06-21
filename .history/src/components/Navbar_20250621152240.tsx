// ✅ src/components/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/pj_logo_black.png"
            alt="PJ Logo"
            width={30}
            height={30}
          />
          <Link href="/" className="text-xl font-bold text-blue-900">
            PJ Legal
          </Link>
        </div>

        {/* Center: Menu Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/about">About</Link>
          <Link href="/#practice-areas">Practice Areas</Link>
          <Link href="/news">News</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Right: Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-sm">🔍</span>
        </div>
      </div>
    </nav>
  );
}
