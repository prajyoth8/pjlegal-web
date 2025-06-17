"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about" }, // in-page section
  { name: "Practice Areas", href: "#practice" },
  { name: "Articles", href: "#articles" },
  { name: "News", href: "#news" },
  { name: "Contact", href: "/contact" }, // real page route
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper to detect if it's a route or hash
  const isPageRoute = (href: string) => href.startsWith("/");

  const renderLink = (link: { name: string; href: string }) => {
    const isActive = pathname === link.href;

    return (
      <Link
        key={link.name}
        href={link.href}
        className={`text-sm font-medium transition duration-200 ${
          isPageRoute(link.href)
            ? isActive
              ? "text-white font-semibold"
              : "text-gray-300 hover:text-white"
            : "text-gray-300 hover:text-white"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-black bg-opacity-70 backdrop-blur-md border-b border-gray-800">
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

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map(renderLink)}
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
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-black bg-opacity-90">
          {navLinks.map(renderLink)}
        </div>
      )}
    </header>
  );
}
