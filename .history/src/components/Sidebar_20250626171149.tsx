// src/components/Sidebar.tsx
"use client";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Menu</h2>
      <ul className="space-y-2">
        <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="hover:underline">
            About
          </a>
        </li>
      </ul>
      <button onClick={onClose} className="mt-4 text-sm underline text-gray-300">
        Close Sidebar
      </button>
    </div>
  );
}
