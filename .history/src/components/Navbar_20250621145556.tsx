// components/Navbar.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w‑7xl mx-auto px‑6 py‑4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">PJ Legal</Link>
        <div className="hidden md:flex space-x-8 items-center">
          {["Home","About","Practice Areas","Articles","News","Contact"].map(item => (
            <Link key={item} href={item === "Home" ? "/" : `/#${item.toLowerCase().replace(/ /g, '-')}`} className="hover:underline">{item}</Link>
          ))}
          <div className="relative">
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              className="px‑4 py‑2 rounded-full border border-gray-300 focus:outline-none focus:ring‑2 focus:ring-blue-500"/>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              🔍
            </button>
          </div>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
      {menuOpen && <div className="px-6 py-4 space-y-2 md:hidden bg-white shadow-md">
        {["Home","About","Practice Areas","Articles","News","Contact"].map(item => (
          <Link key={item} href={`/#${item.toLowerCase().replace(/ /g, '-')}`} className="block py-2">{item}</Link>
        ))}
      </div>}
    </nav>
  );
}
