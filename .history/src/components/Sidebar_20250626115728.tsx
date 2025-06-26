"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React, { useEffect } from "react";

const navItems = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "About Us", href: "/about", icon: "👤" },
  { label: "Practice Areas", href: "/practice", icon: "⚖️" },
  { label: "Book Consultation", href: "/consult", icon: "📅", cta: true },
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

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Disable scroll when sidebar is open (mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay - visible only when sidebar is open on mobile */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 z-40 bg-[#111827] text-white p-4 shadow-lg transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "lg:translate-x-0": true, // always visible on large screens
          }
        )}
      >
        {/* Close button (mobile only) */}
        <div className="lg:hidden flex justify-end">
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-red-400"
            aria-label="Close sidebar"
          >
            ✖
          </button>
        </div>

        {/* Logo or heading */}
        <div className="text-xl font-bold my-4 text-center">PJ LEGAL</div>

        {/* CTA Button */}
        <Link href="/consult">
          <div className="mt-2 mb-4 bg-blue-600 hover:bg-blue-800 text-white text-center py-2 rounded-lg font-semibold cursor-pointer">
            📅 Book Consultation
          </div>
        </Link>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 mt-4">
          {navItems.map(({ label, href, icon, cta }) => (
            <Link key={href} href={href}>
              <div
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition",
                  pathname === href ? "bg-gray-800 font-semibold" : "",
                  cta && "bg-[#2563eb] hover:bg-[#1e40af] text-white"
                )}
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <hr className="my-4 border-gray-700" />

        {/* Footer Links */}
        <div className="space-y-1">
          {footerItems.map(({ label, href, icon }) => (
            <Link key={href} href={href}>
              <div
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition",
                  pathname === href ? "bg-gray-800 font-semibold" : ""
                )}
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Credit */}
        <div className="mt-auto pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} PJ Legal
        </div>
      </aside>
    </>
  );
}
