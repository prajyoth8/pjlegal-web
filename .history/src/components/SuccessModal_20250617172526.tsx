"use client";

import Lottie from "react-lottie-player";
import { Dialog } from "@headlessui/react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm mx-auto shadow-xl">
        <Lottie
          loop={false}
          play
          style={{ width: 200, height: 200 }}
          // ✅ Use PUBLIC URL instead of import
          src="/assets/lottie/success.json"
        />
        <h2 className="text-xl font-semibold text-center mt-4 text-black dark:text-white">
          Message Sent!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-1">
          We’ll get back to you soon.
        </p>
        <button
          onClick={onClose}
          className="mt-4 mx-auto block px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}
