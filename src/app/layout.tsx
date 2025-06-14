// 📁 src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PJ Legal',
  description: 'PJ Legal – Trusted Legal Solutions in India',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Explicit favicon fix */}
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="bg-white text-gray-800 dark:bg-black dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
