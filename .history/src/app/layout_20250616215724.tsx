// 📁 src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "PJ Legal",
  description: "PJ Legal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}


