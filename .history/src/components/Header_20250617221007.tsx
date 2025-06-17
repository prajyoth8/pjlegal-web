"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about" },
  { name: "Practice Areas", href: "#practice" },
  { name: "Articles", href: "#articles" },
  { name: "News", href: "#news" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const isPageRoute = (href: string) => href.startsWith("/");

  const renderLink = (link: { name: string; href: string }) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.name}
        href={link.href}
        className={`text-sm font-medium transition duration-200 block md:inline ${
          isActive ? "bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent" : "text-gray-300 hover:text-white"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-black bg-opacity-70 backdrop-blur-md border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/pj_logo.png"
              alt="PJ Legal"
              width={40}
              height={40}
              priority
              className="rounded-sm"
            />
            <span className="text-white font-bold text-xl">PJ LEGAL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map(renderLink)}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-yellow-400"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 pt-4 bg-black bg-opacity-95 space-y-4">
          {navLinks.map(renderLink)}
          <div className="border-t border-gray-700 pt-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-yellow-400 flex items-center space-x-2"
              aria-label="Search"
            >
              <Search size={18} />
              <span className="text-sm">Search</span>
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {searchOpen && (
        <div className="absolute w-full top-full bg-black/90 px-4 py-2 border-t border-gray-800">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-800 text-white px-4 py-2 rounded outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
    </header>
  );
}
