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
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PJ Legal",
  description:
    "Independent legal practice by Advocate PJ – Trusted legal assistance in Telangana, India.",
};

// ✅ Toggle this flag to enable/disable sidebar layout globally
const USE_SIDEBAR = true;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-black scroll-smooth`}>
        {USE_SIDEBAR ? (
          // ✅ Sidebar Mode Layout
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black p-4">
              {children}
            </main>
          </div>
        ) : (
          // ✅ Default Layout with Navbar + Footer
          <>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
          </>
        )}

        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}

