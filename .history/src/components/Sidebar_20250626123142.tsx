// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";

export type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
  isMobile?: boolean;
};

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

export default function Sidebar({ isOpen, onClose, isMobile = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "bg-[#111827] text-white w-64 min-h-screen flex flex-col px-4 py-6 z-50 fixed top-0 left-0 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {isMobile && onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-400">
          ✖
        </button>
      )}

      <Link href="/consult">
        <div className="mt-4 bg-blue-600 hover:bg-blue-800 text-white text-center py-2 rounded-lg font-semibold cursor-pointer">
          📅 Book Consultation
        </div>
      </Link>

      <nav className="flex-1 space-y-1 mt-6">
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

      <div className="mt-auto pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PJ Legal
      </div>
    </aside>
  );
}
