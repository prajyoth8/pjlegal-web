"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";

export type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const navItems = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "About Us", href: "/about", icon: "👤" },
  { label: "Practice Areas", href: "/practice", icon: "⚖️" },
  { label: "Book Consultation", href: "/consult", icon: "📅" },
  { label: "Articles & Blogs", href: "/articles", icon: "📰" },
  { label: "News & Insights", href: "/news", icon: "📢" },
  { label: "FAQs", href: "/faqs", icon: "❓" },
];

const footerItems = [
  { label: "Settings", href: "/settings", icon: "⚙️" },
  { label: "Disclaimer", href: "/disclaimer", icon: "📄" },
  { label: "Terms of Use", href: "/terms", icon: "👣" },
  { label: "Contact Us", href: "/contact", icon: "📧" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Dark overlay when sidebar is open */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      />

      {/* Sidebar panel */}
      <aside
        className={clsx(
  "fixed top-0 left-0 h-full w-64 bg-[#111827] text-white z-50 transform transition-transform duration-300",
  isOpen ? "translate-x-0" : "-translate-x-full"
)}
      >
        <div className="px-4 py-6 flex flex-col h-full">
          {/* Close (×) button for mobile */}
          <div className="lg:hidden flex justify-end mb-4">
            <button onClick={onClose} className="text-white text-2xl">
              ×
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map(({ label, href, icon }) => (
              <Link key={href} href={href}>
                <div
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition",
                    pathname === href ? "bg-gray-800 font-semibold" : ""
                  )}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <hr className="my-4 border-gray-700" />

          <div className="space-y-2">
            {footerItems.map(({ label, href, icon }) => (
              <Link key={href} href={href}>
                <div
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition",
                    pathname === href ? "bg-gray-800 font-semibold" : ""
                  )}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} PJ Legal
          </div>
        </div>
      </aside>
    </>
  );
}
