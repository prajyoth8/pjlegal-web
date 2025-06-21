"use client";

import Link from "next/link";
import { FaWhatsapp, FaEnvelope, FaPhone, FaXTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-300 py-10 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-xl font-bold text-white">PJ LEGAL</h2>
          <p className="mt-2 text-sm text-gray-400">
            Empowering Justice with Intelligence & Integrity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/">🏠 Home</Link></li>
            <li><Link href="/#about">👩‍⚖️ About Us</Link></li>
            <li><Link href="/#practice">📚 Practice Areas</Link></li>
            <li><Link href="/#articles">📰 Articles</Link></li>
            <li><Link href="/#news">📣 News</Link></li>
            <li><Link href="/contact">📞 Contact</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-2">Connect With Us</h3>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <FaPhone /> <span>+91-8712351102</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope /> <span>pjlegal.r@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaWhatsapp /> <span>Chat on WhatsApp</span>
            </div>
          </div>
          <div className="flex mt-4 gap-4 text-lg text-gray-400">
            <FaFacebook className="hover:text-white transition" />
            <FaInstagram className="hover:text-white transition" />
            <FaXTwitter className="hover:text-white transition" />
            <FaLinkedin className="hover:text-white transition" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PJ Legal. All rights reserved.
      </div>
    </footer>
  );
}
