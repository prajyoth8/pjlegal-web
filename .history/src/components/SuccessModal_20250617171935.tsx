import Lottie from "react-lottie-player";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <Lottie
          loop={false}
          play
          src="/assets/lottie/success.json"
          style={{ width: 180, height: 180 }}
        />
        <h2 className="text-xl font-semibold text-green-600 mt-4">
          Message Sent!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Thank you for reaching out. We'll get back to you soon.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
