"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 border-t border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left: Branding */}
        <div>
          <h2 className="text-xl font-bold">PJ LEGAL</h2>
          <p className="text-sm text-gray-400 mt-1">
            Empowering Justice with Intelligence & Integrity.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Quick Links</h3>
          <ul className="flex flex-col gap-1 text-sm text-gray-400">
            {[
              { name: "🏠 Home", href: "/" },
              { name: "📜 About Us", href: "#about" },
              { name: "📚 Practice Areas", href: "#practice" },
              { name: "📝 Articles", href: "#articles" },
              { name: "📢 News", href: "#news" },
              { name: "📞 Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-yellow-400">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Contact</h3>
          <p className="text-sm text-gray-400">
            <FaPhoneAlt className="inline mr-2" />{" "}
            <a href="tel:+918712351102" className="hover:text-yellow-400">
              +91-8712351102
            </a>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            <FaEnvelope className="inline mr-2" />{" "}
            <a href="mailto:pjlegal.r@gmail.com" className="hover:text-yellow-400">
              pjlegal.r@gmail.com
            </a>
          </p>
          <div className="flex justify-center md:justify-start mt-4 gap-4 text-lg">
            <a href="https://wa.me/918712351102" className="text-green-500">
              <FaWhatsapp />
            </a>
            <a href="https://facebook.com" className="text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" className="text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="text-blue-400">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com" className="text-sky-400">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} PJ Legal. All rights reserved.
      </div>
    </footer>
  );
}
