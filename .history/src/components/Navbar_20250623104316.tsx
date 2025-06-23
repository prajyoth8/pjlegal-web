"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Fuse from "fuse.js";

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

  const practiceSubItems = [
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
        href:
          "/practice-areas/banking#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Competition & Antitrust",
      href: "/practice-areas/competition",
      sub: [
        "Anti‑Competitive Agreements",
        "Abuse of Dominant Position",
        "Merger Control",
        "Competition Compliance & Training",
        "Competition Advisory",
      ].map((name) => ({
        name,
        href:
          "/practice-areas/competition#" +
          name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Corporate & M&A",
      href: "/practice-areas/corporate",
      sub: [
        "Corporate Transactions",
        "Private Equity & Funds",
        "Capital Markets",
        "General Corporate",
        "ESG",
      ].map((name) => ({
        name,
        href:
          "/practice-areas/corporate#" +
          name.toLowerCase().replace(/\s+/g, "-"),
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
        href:
          "/practice-areas/dispute#" + name.toLowerCase().replace(/\s+/g, "-"),
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
        href:
          "/practice-areas/employment#" +
          name.toLowerCase().replace(/\s+/g, "-"),
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
        href:
          "/practice-areas/environment#" +
          name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Intellectual Property",
      href: "/practice-areas/ip",
      sub: [
        "Trademarks",
        "Copyright",
        "Patents",
        "IPR Litigation",
        "Technology & Licensing",
      ].map((name) => ({
        name,
        href: "/practice-areas/ip#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
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
        href:
          "/practice-areas/private#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Real Estate & Urban Infrastructure",
      href: "/practice-areas/realestate",
      sub: [
        "Land Acquisition",
        "REITs",
        "Development & Redevelopment",
        "Leases & Licenses",
      ].map((name) => ({
        name,
        href:
          "/practice-areas/realestate#" +
          name.toLowerCase().replace(/\s+/g, "-"),
      })),
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
        href:
          "/practice-areas/insolvency#" +
          name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
    {
      name: "Taxation",
      href: "/practice-areas/tax",
      sub: [
        "Direct Tax",
        "Indirect Tax",
        "GST",
        "Tax Litigation",
        "International Taxation",
      ].map((name) => ({
        name,
        href: "/practice-areas/tax#" + name.toLowerCase().replace(/\s+/g, "-"),
      })),
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
        href:
          "/practice-areas/technology#" +
          name.toLowerCase().replace(/\s+/g, "-"),
      })),
    },
  ];

  const desktopMenuItems = [
    { name: "About", href: "/about" },
    { name: "Practice Areas", href: "/practice-areas" },
    { name: "Articles/Blogs", href: "/articles" },
    { name: "News", href: "/news" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ];

  const allItems = [
    ...desktopMenuItems,
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
        const formatted: Suggestion[] = results.map((r) => ({
          label: r.item.name,
          route: r.item.href,
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  // ... (Remaining JSX and logic continues as in previous implementation)

}
