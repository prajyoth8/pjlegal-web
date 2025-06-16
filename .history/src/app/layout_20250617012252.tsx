// 📁 src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import "keen-slider/keen-slider.min.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PJ Legal",
  description: "PJ Legal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        <main className="pt-16">{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
