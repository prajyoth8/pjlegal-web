"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "keen-slider/keen-slider.min.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollNavigator from "@/components//ScrollNavigator";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PJ Legal | AI-Powered Law Firm",
  description:
    "Next-gen law firm blending legal intelligence with AI, Cybersecurity, and Client Empowerment. Trusted. Modern. Powerful.",
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
