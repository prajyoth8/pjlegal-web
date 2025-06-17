import Lottie from "react-lottie-player";
import successAnimation from "@/../public/assets/lottie/success.json"; // ✅ Correct relative import for public file

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <Lottie
          loop={false}
          play
          animationData={successAnimation} // ✅ FIXED
          style={{ width: 200, height: 200 }}
        />
        <h2 className="text-xl font-semibold mt-4 text-black dark:text-white">
          Message Sent!
        </h2>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
