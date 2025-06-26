// components/Sidebar.tsx
// ✅ Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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

export default function Sidebar({
  onClose,
  isMobile = false,
}: {
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside className="bg-[#111827] text-white w-64 min-h-screen flex flex-col px-4 py-6 z-50 relative">
      {isMobile && onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-400">
          ✖
        </button>
      )}

      <div className="text-center mb-6">
        <img src="/pj_logo_white.png" alt="PJ Legal Logo" className="mx-auto h-12" />
        <h1 className="text-lg font-semibold mt-2 tracking-wider">PJ LEGAL</h1>
      </div>

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
