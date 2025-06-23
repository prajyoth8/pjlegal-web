"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Fuse from "fuse.js";

// Type definition for search suggestions
type Suggestion = {
  label: string;
  route: string;
  matchIndices: [number, number][];
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [scrolled, setScrolled] = useState(false);

  // Desktop menu items including a marker for the dropdown
  const desktopMenuItems = [
    { name: "About", href: "/about" },
    { name: "Practice Areas", isDropdown: true },
    { name: "Articles/Blogs", href: "/articles" },
    { name: "News", href: "/news" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ];

  // Practice Areas and their sub-menus
  const practiceSubItems = [
    {
      name: "Private Client & Family Office",
      href: "/practice-areas/private",
      sub: [
        "Estate & Succession Planning",
        "Family Dispute Resolution",
        "Wealth Management",
        "Family Constitution",
      ].map((name) => ({
        name,
        href: "/practice-areas/private#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Dispute Resolution",
      href: "/practice-areas/dispute",
      sub: [
        "Litigation",
        "Arbitration",
        "Mediation & Conciliation",
        "White Collar & Regulatory Investigations",
        "Corporate & Commercial Disputes",
      ].map((name) => ({
        name,
        href: "/practice-areas/dispute#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Real Estate & Urban Infrastructure",
      href: "/practice-areas/realestate",
      sub: ["Land Acquisition", "REITs", "Development & Redevelopment", "Leases & Licenses"].map(
        (name) => ({
          name,
          href: "/practice-areas/realestate#" + name.toLowerCase().replace(/\s+/g, "-"),
        })
      ),
    },
    {
      name: "Banking & Finance",
      href: "/practice-areas/banking",
      sub: [
        "Acquisition Financing",
        "Asset Financing",
        "Climate & Energy Financing",
        "Cross Border Financing",
        "Corporate Financing",
        "Debt Restructuring & Recovery",
        "Debt Capital Markets",
        "Financial Regulatory",
        "Fintech",
        "Multilateral & Development Financing",
        "Project & Infrastructure Financing",
        "Securitization",
        "Structured Financing",
        "Syndicated Lending",
        "Trade Financing",
        "Environmental, Social & Governance (ESG)",
      ].map((name) => ({
        name,
        href: "/practice-areas/banking#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },

    {
      name: "Employment & Labour",
      href: "/practice-areas/employment",
      sub: [
        "Advisory & Compliance",
        "Dispute Management",
        "Employee Stock Option Plans",
        "Employment Contracts",
        "Workplace Harassment & Grievances",
      ].map((name) => ({
        name,
        href: "/practice-areas/employment#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Environment, Health & Safety",
      href: "/practice-areas/environment",
      sub: [
        "Environmental Clearances",
        "Compliance & Audits",
        "Litigation & Enforcement",
        "Environmental Advisory",
      ].map((name) => ({
        name,
        href: "/practice-areas/environment#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Intellectual Property",
      href: "/practice-areas/ip",
      sub: ["Trademarks", "Copyright", "Patents", "IPR Litigation", "Technology & Licensing"].map(
        (name) => ({
          name,
          href: "/practice-areas/ip#" + name.toLowerCase().replace(/\s+/g, "-"),
        })
      ),
    },

    {
      name: "Restructuring & Insolvency",
      href: "/practice-areas/insolvency",
      sub: [
        "Insolvency Resolution",
        "Liquidation",
        "NCLT Representation",
        "Creditor & Debtor Advisory",
      ].map((name) => ({
        name,
        href: "/practice-areas/insolvency#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Taxation",
      href: "/practice-areas/tax",
      sub: ["Direct Tax", "Indirect Tax", "GST", "Tax Litigation", "International Taxation"].map(
        (name) => ({
          name,
          href: "/practice-areas/tax#" + name.toLowerCase().replace(/\s+/g, "-"),
        })
      ),
    },
    {
      name: "Technology, Media & Telecommunications",
      href: "/practice-areas/technology",
      sub: [
        "Data Protection & Privacy",
        "E-Commerce",
        "Technology Contracts",
        "Gaming & OTT",
        "Cybersecurity",
      ].map((name) => ({
        name,
        href: "/practice-areas/technology#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
  ];

  // Search engine setup using Fuse.js
  const allItems = [
    ...desktopMenuItems.filter((item) => !item.isDropdown),
    ...practiceSubItems.flatMap((item) => [item, ...(item.sub || [])]),
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  const fuse = new Fuse(allItems, {
    keys: ["name"],
    includeMatches: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchText.trim()) {
        const results = fuse.search(searchText.trim()).slice(0, 6);
        const formatted: Suggestion[] = results
          .filter((r) => typeof r.item.href === "string")
          .map((r) => ({
            label: r.item.name,
            route: r.item.href!,
            matchIndices: [...(r.matches?.[0]?.indices || [])],
          }));
        setSuggestions(formatted);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchText]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo click navigation
  const handleLogoClick = () => {
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};


  return (
    <nav
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-gradient-to-r from-white via-purple-100 to-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
          <Image src="/assets/pj_logo_icon.png" alt="PJ Logo" width={40} height={40} />
          <span className="text-xl font-bold text-gray-900">PJ Legal</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {desktopMenuItems.map((item) => {
            if (item.isDropdown) {
              // Render Practice Areas dropdown
              return (
                <div
                  key="Practice Areas"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => {
                    setDropdownOpen(false);
                    setSubDropdownOpen(null);
                  }}
                  className="relative"
                >
                  <button
                    className={clsx(
                      "flex items-center px-3 py-2 rounded-lg font-medium transition",
                      pathname?.startsWith("/practice-areas")
                        ? "bg-gradient-to-r from-purple-100 to-purple-700 text-white shadow"
                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-100"
                    )}
                  >
                    Practice Areas <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-10 left-0 bg-white shadow-lg rounded-lg py-2 w-64 z-50"
                      >
                        {practiceSubItems.map((item) => (
                          <div
                            key={item.name}
                            onMouseEnter={() => setSubDropdownOpen(item.name)}
                            onMouseLeave={() => setSubDropdownOpen(null)}
                            className="relative group"
                          >
                            <Link
                              href={item.href}
                              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-100"
                            >
                              {item.name} <ChevronRight className="w-4 h-4" />
                            </Link>
                            <AnimatePresence>
                              {subDropdownOpen === item.name && item.sub && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="absolute top-0 left-full ml-1 bg-white shadow-md rounded-lg py-2 w-64"
                                >
                                  {item.sub.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-100"
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // Normal menu links
            const href = item.href!;
            return (
              <Link
                key={item.name}
                href={href}
                className={clsx(
                  "font-medium px-3 py-2 rounded-lg transition",
                  pathname === href
                    ? "bg-gradient-to-r from-purple-100 to-purple-700 text-white shadow"
                    : "text-gray-700 hover:text-purple-600 hover:bg-purple-100"
                )}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Search icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-purple-600"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Disclaimer CTA */}
          <Link
            href="/disclaimer"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            Disclaimer
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-4 space-y-2 bg-gray-50 shadow-inner max-h-[70vh] overflow-y-auto"
          >
            {desktopMenuItems.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key="mobile-practice" className="border-t pt-3">
                    <div
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center justify-between text-gray-700 font-medium cursor-pointer hover:bg-purple-50 p-2 rounded bg-purple-100/30"
                    >
                      Practice Areas <ChevronDown className="w-4 h-4" />
                    </div>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="pl-3 mt-2 space-y-2"
                        >
                          {practiceSubItems.map((pItem) => (
                            <div key={pItem.name}>
                              <div
                                className="text-sm text-gray-700 font-medium cursor-pointer hover:bg-purple-100 px-2 py-1 rounded flex justify-between"
                                onClick={() =>
                                  setSubDropdownOpen(
                                    subDropdownOpen === pItem.name ? null : pItem.name
                                  )
                                }
                              >
                                {pItem.name} <ChevronRight className="w-4 h-4" />
                              </div>
                              <AnimatePresence>
                                {subDropdownOpen === pItem.name && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -2 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -2 }}
                                    className="ml-4 space-y-1"
                                  >
                                    {pItem.sub?.map((sub) => (
                                      <Link
                                        key={sub.name}
                                        href={sub.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-gray-600 hover:text-purple-700 hover:bg-purple-100 px-2 py-1 rounded text-sm"
                                      >
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              } else {
                return (
                  <Link
                    key={item.name}
                    href={item.href!}
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "block font-medium px-3 py-2 rounded",
                      pathname === item.href
                        ? "bg-purple-100 text-purple-700 shadow"
                        : "text-gray-700 hover:text-purple-700 hover:bg-purple-100"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              }
            })}

            <div className="pt-4 border-t">
              <button
                onClick={() => setShowSearch(true)}
                className="text-gray-700 flex items-center gap-2 hover:text-purple-600"
              >
                <Search className="w-4 h-4" /> Search
              </button>
              <Link
                href="/disclaimer"
                onClick={() => setMenuOpen(false)}
                className="block mt-3 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-center font-semibold py-2 rounded-full shadow hover:opacity-90"
              >
                Disclaimer
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-start justify-center pt-24 z-50"
          >
            <div className="bg-white w-full max-w-lg p-4 rounded-lg shadow-xl">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search pages, sections..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 text-sm"
              />
              {suggestions.length > 0 && (
                <div className="mt-2 bg-white shadow-md rounded-md border border-gray-200">
                  {suggestions.map(({ label, route, matchIndices }) => (
                    <div
                      key={route}
                      className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-sm text-gray-700"
                      onClick={() => {
                        setSearchText("");
                        setShowSearch(false);
                        setSuggestions([]);
                        router.push(route);
                      }}
                    >
                      {highlightMatch(label, matchIndices)}
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowSearch(false)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function highlightMatch(label: string, indices: [number, number][]) {
  if (!indices.length) return label;
  const result: JSX.Element[] = [];
  let lastIndex = 0;

  indices.forEach(([start, end], i) => {
    if (lastIndex < start) {
      result.push(<span key={`text-${i}`}>{label.slice(lastIndex, start)}</span>);
    }
    result.push(
      <span
        key={`highlight-${i}`}
        className="font-semibold text-purple-700 bg-purple-100 rounded px-1"
      >
        {label.slice(start, end + 1)}
      </span>
    );
    lastIndex = end + 1;
  });

  if (lastIndex < label.length) {
    result.push(<span key="tail">{label.slice(lastIndex)}</span>);
  }

  return <>{result}</>;
}
