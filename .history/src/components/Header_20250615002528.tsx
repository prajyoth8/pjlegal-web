'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between text-white bg-transparent z-30">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image src="/logo.png" alt="PJ Legal Logo" width={40} height={40} />

        <h1 className="font-bold text-xl tracking-wide">PJ LEGAL</h1>
      </div>

      {/* Nav Links (Desktop) */}
      <nav className="hidden md:flex space-x-6 text-sm">
        <Link href="#">Services</Link>
        <Link href="#">Expertise</Link>
        <Link href="#">Resources</Link>
        <Link href="#">About</Link>
      </nav>

      {/* Search + Menu */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="hidden md:block px-3 py-1 text-sm rounded bg-white/10 border border-white/20 placeholder-white focus:outline-none"
        />
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Expandable Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 space-y-3 w-40 z-40 text-sm">
          <Link href="#">Services</Link>
          <Link href="#">Expertise</Link>
          <Link href="#">Resources</Link>
          <Link href="#">About</Link>
        </div>
      )}
    </header>
  );
}
