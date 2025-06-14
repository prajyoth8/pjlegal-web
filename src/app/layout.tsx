// 📁 src/app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PJ Legal',
  description: 'PJ Legal',
  icons: {
    icon: '/logo.png', // ✅ Make sure this file exists in /public
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white text-gray-800 dark:bg-black dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
