"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "keen-slider/keen-slider.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollNavigator from "@/components/ScrollNavigator";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PJ Legal",
  description:
    "Next-gen law firm blending legal intelligence and Client Empowerment. Trusted. Modern. Powerful.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-black text-white scroll-smooth ${inter.className}`}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <ScrollNavigator />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
