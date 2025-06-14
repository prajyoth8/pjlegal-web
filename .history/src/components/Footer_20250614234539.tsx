'use client';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-12 text-center text-sm">
      <p>© {new Date().getFullYear()} PJ Legal. All rights reserved.</p>
      <div className="mt-2">
        <a href="/privacy" className="underline hover:text-gray-300">Privacy Policy</a> ·{' '}
        <a href="/terms" className="underline hover:text-gray-300">Terms of Use</a>
      </div>
    </footer>
  );
}
