// src/components/Sidebar.tsx
"use client";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div className="h-full space-y-4">
      <h2 className="text-xl font-semibold">📂 Menu</h2>
      <ul className="space-y-2">
        <li className="hover:text-yellow-400 cursor-pointer">Home</li>
        <li className="hover:text-yellow-400 cursor-pointer">About</li>
        <li className="hover:text-yellow-400 cursor-pointer">Practice Areas</li>
        <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
      </ul>
    </div>
  );
}
