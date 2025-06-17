"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Lottie from "react-lottie-player";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center text-center p-6 space-y-4 max-w-sm mx-auto">
        <Lottie
          loop={false}
          play
          src="/assets/lottie/success.json" // ✅ Use public URL path here
          style={{ width: 180, height: 180 }}
        />
        <h2 className="text-xl font-semibold text-green-600">Message Sent!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Thank you for reaching out. We'll get back to you soon.
        </p>
      </DialogContent>
    </Dialog>
  );
}
