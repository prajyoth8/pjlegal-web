"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-blue-900 via-amber-900 to-black text-gray-100 pt-20 pb-16 px-6 md:px-16 rounded-t-3xl"
    >
      {/* Wave SVG Separator */}
      <div className="absolute -top-12 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39,56.44C189.93,94.44,0,120,0,120V0H1200V120s-189.93-25.56-321.39-63.56C746.68,19.84,607.86,0,480,0,352.14,0,213.32,19.84,321.39,56.44Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image src="/pj_logo_black.png" alt="PJ Legal" width={100} height={100} />
            <h2 className="text-2xl font-extrabold text-white">PJ Legal</h2>
          </div>
          <p className="text-sm leading-relaxed text-white/80">
            Advancing legal practice with{" "}
            <span className="text-blue-400 font-semibold">integrity</span>,{" "}
            <span className="text-purple-400 font-semibold">intelligence</span>, and{" "}
            <span className="text-green-600 font-semibold">impact</span>.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Practice Areas", href: "/#practice" },
            { label: "News", href: "/#news" },
            { label: "Contact", href: "/#contact" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm text-white/80 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          {[
            { label: "Articles & Blogs", href: "/#articles" },
            { label: "Education", href: "/#education" },
            { label: "Disclaimer", href: "/disclaimer" },
            { label: "Terms & Conditions", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Sitemap", href: "#" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm text-white/80 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} /> pjlegal@lawmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 87123 51102
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Karimnagar, Telangana, India
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Hyderabad, Telangana, India
            </p>
          </div>
          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://wa.me/918712351102"
              className="text-green-300 hover:scale-110 transition"
            >
              <FaWhatsapp />
            </a>
            <a href="https://facebook.com" className="text-blue-300 hover:scale-110 transition">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" className="text-pink-300 hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="text-sky-300 hover:scale-110 transition">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com" className="text-sky-400 hover:scale-110 transition">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/30 mt-10 pt-4 text-center text-xs text-white/60 relative z-10">
        © {new Date().getFullYear()} PJ Legal. All rights reserved.
      </div>

      {/* Scroll to Top */}
      {/* {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-white text-black p-3 rounded-full shadow-md hover:bg-amber-400 transition z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )} */}
    </motion.footer>
  );
}
