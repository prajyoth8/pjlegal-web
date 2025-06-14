"use client";

export default function Footer() {
  return (
    <footer className="w-full text-center text-sm text-gray-400 py-6 mt-10 border-t border-gray-700">
      <p>&copy; 2025 PJ Legal. All rights reserved.</p>
      <div className="space-x-4 mt-2">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-use">Terms of Use</a>
      </div>
    </footer>
  );
}
