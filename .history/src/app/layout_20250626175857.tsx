// // ✅ app/layout.tsx
// import { Inter } from "next/font/google";
// import "./globals.css";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Toaster } from "react-hot-toast";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "PJ Legal",
//   description:
//     "Independent legal practice by Advocate PJ – Trusted legal assistance in Telangana, India.",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${inter.className} bg-white text-black scroll-smooth snap-y snap-mandatory`}
//       >
//         <Navbar />

//         <main className="pt-16">{children}</main>

//         <Footer />

//         <Toaster position="top-center" reverseOrder={false} />
//       </body>
//     </html>
//   );
// }

// ✅ app/layout.tsx
// src/app/layout.tsx
// import { Inter } from "next/font/google";
// import "./globals.css";
// import type { Metadata } from "next";
// import LayoutWrapper from "@/components/LayoutWrapper";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "PJ Legal",
//   description:
//     "Independent legal practice by Advocate PJ – Trusted legal assistance in Telangana, India.",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} bg-white text-black scroll-smooth`}>
//         <LayoutWrapper>{children}</LayoutWrapper>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx or _app.tsx

// app/layout.tsx
//src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HybridLayout from "@/components/layout/HybridLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PJ Legal",
  description:
    "Independent legal practice by Advocate PJ – Trusted legal assistance in Telangana, India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <HybridLayout>{children}</HybridLayout>
      </body>
    </html>
  );
}

// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import MainLayout from "@/components/layout/MainLayout";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "PJ Legal",
//   description: "Independent legal practice by Advocate PJ",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-white text-black`}>
//         <MainLayout>{children}</MainLayout>
//       </body>
//     </html>
//   );
// }
