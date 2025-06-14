'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/logo.png';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm">
      <Link href="/">
        <Image src={Logo} alt="PJ Legal Logo" className="w-40 md:w-48" priority />
      </Link>
      <nav className="hidden md:flex space-x-6 text-gray-800 dark:text-gray-200 font-medium">
        <a href="#services">Services</a>
        <a href="#news">Articles</a>
        <a href="#clients">Clients</a>
        <a href="#faq">FAQs</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
