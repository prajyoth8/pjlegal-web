// // 📁 app/layout.tsx
// import { Inter } from "next/font/google";
// import "./globals.css";
// import type { Metadata } from "next";
// import "keen-slider/keen-slider.min.css";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import ScrollNavigator from "@/components/ScrollNavigator";
// import { Toaster } from "react-hot-toast";
// import { ThemeProvider } from "next-themes"; // ✅ import this

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "PJ Legal",
//   description:
//     "Next-gen law firm blending legal intelligence and Client Empowerment. Trusted. Modern. Powerful.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       {/* 🌓 Add class for dark mode detection */}
//       <body
//         className={`${inter.className} bg-black text-white scroll-smooth snap-y snap-mandatory overflow-y-scroll`}
//       >
//         {/* ✅ Wrap the whole app with ThemeProvider */}
//         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
//           <Header />
//           <main className="pt-16">{children}</main>
//           <Footer />
//           <ScrollNavigator />
//           <Toaster position="top-center" />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

// ✅ app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollNavigator from "@/components/ScrollNavigator";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PJ Legal",
  description:
    "Independent legal practice by Advocate PJ – Trusted legal assistance in Telangana, India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black scroll-smooth snap-y snap-mandatory overflow-y-scroll`}
      >
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <ScrollNavigator />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
