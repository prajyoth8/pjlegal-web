"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Layers,
  BookOpen,
  Users,
  FileText,
  Info,
  Mail,
} from "lucide-react";
import clsx from "clsx";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const linkClasses = (isActive: boolean) =>
    clsx(
      "block px-4 py-2 rounded-md transition text-sm font-medium",
      isActive
        ? "bg-amber-500 text-white"
        : "text-gray-700 hover:bg-amber-100 dark:text-gray-300 dark:hover:bg-amber-800"
    );

  const practiceAreas = [
    { name: "Civil Law", href: "/practice-areas/civil-law" },
    { name: "Constitutional Law", href: "/practice-areas/constitutional-law" },
    { name: "Corporate Laws", href: "/practice-areas/corporate-laws" },
    { name: "Criminal Law", href: "/practice-areas/criminal-law" },
    { name: "Election Law", href: "/practice-areas/election-law" },
    { name: "Family Law", href: "/practice-areas/family-law" },
    { name: "Labour Law", href: "/practice-areas/labour-law" },
    { name: "Property Law", href: "/practice-areas/property-law" },
    { name: "Real Estate RERA", href: "/practice-areas/real-estate-rera" },
    { name: "Service Law", href: "/practice-areas/service-law" },
  ];

  const insights = [
    { name: "News", href: "/insights/news" },
    { name: "Articles & Blogs", href: "/insights/articles" },
    { name: "Education", href: "/insights/education" },
  ];

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 shadow-lg z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0" // Always visible on large screens
      )}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold text-amber-600 mb-6">Navigation</h2>

        {/* Home */}
        <Link href="/" className={linkClasses(pathname === "/")} onClick={onClose}>
          <Home className="inline-block mr-2 w-4 h-4" />
          Home
        </Link>

        {/* About */}
        <a
          href="/?scrollTo=about"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            if (pathname === "/") {
              const el = document.getElementById("about");
              if (el) {
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            } else {
              router.push("/?scrollTo=about");
            }
          }}
          className={linkClasses(pathname === "/?scrollTo=about")}
        >
          <Info className="inline-block mr-2 w-4 h-4" />
          About
        </a>

        {/* Practice Areas Dropdown */}
        <button
          onClick={() => toggleSection("practice")}
          className={clsx(
            "w-full text-left px-4 py-2 mt-4 rounded-md font-medium text-sm transition flex justify-between items-center",
            openSection === "practice"
              ? "bg-amber-500 text-white"
              : "text-gray-700 hover:bg-amber-100 dark:text-gray-300 dark:hover:bg-amber-800"
          )}
        >
          <span>
            <Layers className="inline-block mr-2 w-4 h-4" />
            Practice Areas
          </span>
          {openSection === "practice" ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSection === "practice" && (
          <div className="ml-4 mt-2 space-y-1">
            {practiceAreas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className={linkClasses(pathname === area.href)}
                onClick={onClose}
              >
                {area.name}
              </Link>
            ))}
          </div>
        )}

        {/* Insights Dropdown */}
        <button
          onClick={() => toggleSection("insights")}
          className={clsx(
            "w-full text-left px-4 py-2 mt-4 rounded-md font-medium text-sm transition flex justify-between items-center",
            openSection === "insights"
              ? "bg-amber-500 text-white"
              : "text-gray-700 hover:bg-amber-100 dark:text-gray-300 dark:hover:bg-amber-800"
          )}
        >
          <span>
            <BookOpen className="inline-block mr-2 w-4 h-4" />
            Insights
          </span>
          {openSection === "insights" ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSection === "insights" && (
          <div className="ml-4 mt-2 space-y-1">
            {insights.map((insight) => (
              <Link
                key={insight.href}
                href={insight.href}
                className={linkClasses(pathname === insight.href)}
                onClick={onClose}
              >
                {insight.name}
              </Link>
            ))}
          </div>
        )}

        {/* Contact */}
        <a
          href="/?scrollTo=contact"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            if (pathname === "/") {
              const el = document.getElementById("contact");
              if (el) {
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            } else {
              router.push("/?scrollTo=contact");
            }
          }}
          className={linkClasses(false)}
        >
          <Mail className="inline-block mr-2 w-4 h-4" />
          Contact
        </a>
      </div>
    </aside>
  );
}
