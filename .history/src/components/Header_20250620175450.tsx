"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();

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
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  const isPageRoute = (href: string) => href.startsWith("/");

  const renderLink = (link: { name: string; href: string }) => {
    const isActive = pathname === link.href;
    const isVisible = link.name.toLowerCase().includes(query.toLowerCase());

    return (
      isVisible && (
        <Link
          key={link.name}
          href={link.href}
          className={`block text-sm font-medium transition duration-200 px-2 py-1 rounded-lg ${
            isActive
              ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold"
              : "text-gray-300 hover:text-white hover:bg-white/10"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {link.name}
        </Link>
      )
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

          {/* Desktop Nav + Search */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(renderLink)}
            <button
              className="text-white hover:text-yellow-400"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              className="text-white hover:text-yellow-400"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="bg-black bg-opacity-90 px-4 py-3 mt-1 rounded-b-md md:rounded-md shadow-md">
            <input
              type="text"
              placeholder="Search menu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-black bg-opacity-90">
            {navLinks.map(renderLink)}
          </div>
        )}
      </div>
    </header>
  );
}
