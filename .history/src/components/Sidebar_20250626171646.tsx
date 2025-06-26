// src/components/Sidebar.tsx
"use client";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold">Sidebar</h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  );
}

