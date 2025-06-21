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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Logo + Motto */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-xl font-bold">PJ LEGAL</h2>
          <p className="text-sm text-gray-400">
            Empowering Justice with Intelligence & Integrity.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="text-center space-y-1 text-sm">
          <h3 className="font-semibold text-gray-300">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-3 text-gray-400">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <Link href="#about" className="hover:text-yellow-400">About</Link>
            <Link href="#practice" className="hover:text-yellow-400">Practice</Link>
            <Link href="#articles" className="hover:text-yellow-400">Articles</Link>
            <Link href="#news" className="hover:text-yellow-400">News</Link>
            <Link href="/contact" className="hover:text-yellow-400">Contact</Link>
          </div>
        </div>

        {/* Right: Contact + Social */}
        <div className="text-center md:text-right space-y-2 text-sm">
          <p className="text-gray-400">
            📞 <a href="tel:+918712351102" className="hover:text-yellow-400">+91-8712351102</a>
          </p>
          <p className="text-gray-400">
            📧 <a href="mailto:pjlegal.r@gmail.com" className="hover:text-yellow-400">pjlegal.r@gmail.com</a>
          </p>
          <div className="flex justify-center md:justify-end space-x-4 mt-2 text-white text-lg">
            <a href="https://wa.me/918712351102" className="text-green-500"><FaWhatsapp /></a>
            <a href="https://facebook.com" className="text-blue-600"><FaFacebookF /></a>
            <a href="https://instagram.com" className="text-pink-500"><FaInstagram /></a>
            <a href="https://linkedin.com" className="text-blue-400"><FaLinkedinIn /></a>
            <a href="https://twitter.com" className="text-sky-400"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} PJ Legal. All rights reserved.
      </div>
    </footer>
  );
}
