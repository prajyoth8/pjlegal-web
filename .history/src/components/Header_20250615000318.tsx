"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center backdrop-blur-sm bg-black/30 text-white shadow-md z-40">
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/logo.png"
          alt="PJ Legal Logo"
          width={36}
          height={36}
        />
        <span className="text-xl font-bold">PJ Legal</span>
      </div>
      <nav className="hidden md:flex space-x-6 text-sm">
        <a href="#news" className="hover:text-teal-300 transition-colors">
          News
        </a>
        <a href="#clients" className="hover:text-teal-300 transition-colors">
          Clients
        </a>
        <a href="#faq" className="hover:text-teal-300 transition-colors">
          FAQs
        </a>
        <a href="#contact" className="hover:text-teal-300 transition-colors">
          Contact
        </a>
      </nav>
    </header>
  );
}
