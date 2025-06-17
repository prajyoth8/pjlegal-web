"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import successAnim from "@/public/assets/lottie/success.json"; // 👈 ensure you have this

export default function SuccessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 text-center max-w-sm w-full shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <Lottie
              animationData={successAnim}
              loop={false}
              className="w-32 mx-auto"
            />
            <h3 className="text-xl font-bold mt-4 text-green-700">
              Message Sent!
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Thank you for contacting PJ Legal. We'll get back to you shortly.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
