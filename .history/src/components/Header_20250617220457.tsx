"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const pathname = usePathname();

  const isPageRoute = (href: string) => href.startsWith("/");

  const renderLink = (link: { name: string; href: string }) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.name}
        href={link.href}
        className={`block text-base px-4 py-2 rounded transition duration-200 text-white hover:bg-white/10 ${
          isPageRoute(link.href) && isActive ? "font-bold bg-white/10" : ""
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

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition duration-200 ${
                  isPageRoute(link.href) && pathname === link.href ? "text-white font-semibold" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
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
        <div className="md:hidden bg-black bg-opacity-95 px-6 py-4 space-y-3 animate-fade-in-down">
          {navLinks.map(renderLink)}
        </div>
      )}
    </header>
  );
}
