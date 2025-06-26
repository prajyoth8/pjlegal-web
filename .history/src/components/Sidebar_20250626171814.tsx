"use client";

import { X } from "lucide-react";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#111827] text-white p-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button for mobile/tablet */}
        <div className="flex justify-end mb-4 lg:hidden">
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <nav className="space-y-4">
          <a href="/" className="block hover:text-amber-400">Dashboard</a>
          <a href="#about" className="block hover:text-amber-400">About</a>
          <a href="#practice" className="block hover:text-amber-400">Practice Areas</a>
          <a href="#contact" className="block hover:text-amber-400">Contact</a>
          {/* Add more items as needed */}
        </nav>
      </div>
    </>
  );
}
