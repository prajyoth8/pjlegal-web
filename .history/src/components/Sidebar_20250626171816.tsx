"use client";

import { X } from "lucide-react";
import clsx from "clsx";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-40 transform transition-transform duration-300 ease-in-out",
        {
          "-translate-x-full": !isOpen,
          "translate-x-0": isOpen,
        }
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Add your links here */}
      <nav className="px-4 py-4 space-y-3 text-gray-700 dark:text-gray-100">
        <a href="#" className="block hover:text-amber-600">Home</a>
        <a href="#about" className="block hover:text-amber-600">About</a>
        <a href="#practice" className="block hover:text-amber-600">Practice Areas</a>
        <a href="#contact" className="block hover:text-amber-600">Contact</a>
        <a href="/disclaimer" className="block hover:text-amber-600">Disclaimer</a>
      </nav>
    </aside>
  );
}
