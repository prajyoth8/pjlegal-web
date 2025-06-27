"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

export default function ChatAuthModal({
  onAuthenticated,
  onClose,
}: {
  onAuthenticated: (sessionId: string, emailOrPhone: string) => void;
  onClose: () => void;
}) {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!value.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: value,
          method: authMethod,
        }),
      });

      if (!res.ok) throw new Error("Failed to send OTP");

      setStep("otp");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndCreateSession = async () => {
    if (!otp.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: value,
          otp: otp,
          method: authMethod,
        }),
      });

      if (!res.ok) {
        alert("Invalid or expired OTP.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      onAuthenticated(data.session_token, value);
    } catch (err) {
      console.error(err);
      alert("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-sky-200 to-sky-400 text-gray-900 dark:text-white p-3 rounded-xl mb-4 max-w-[85%]">
        <p>
          <strong>Hello!</strong> I'm PJ Legal AI Assistant.
          <br />
          How can I help you{" "}
          <span className="text-green-700 font-mono">with your legal questions today?</span>
        </p>
      </div>

      {/* Auth Options */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-2 text-amber-600 font-semibold">
          <Lock className="w-4 h-4" /> Authenticate to Use Chatbot
        </div>

        <div className="flex justify-center gap-2 mb-4">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-all ${
              authMethod === "email"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            }`}
            onClick={() => {
              setAuthMethod("email");
              setValue("");
              setStep("input");
            }}
          >
            Email
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-all ${
              authMethod === "phone"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            }`}
            onClick={() => {
              setAuthMethod("phone");
              setValue("");
              setStep("input");
            }}
          >
            Phone
          </button>
        </div>

        {step === "input" ? (
          <>
            <input
              type={authMethod === "email" ? "email" : "tel"}
              className="w-full border rounded-md px-3 py-2 mb-3 text-sm dark:bg-gray-800 dark:text-white"
              placeholder={authMethod === "email" ? "you@example.com" : "+91xxxxxxxxxx"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              onClick={sendOtp}
              disabled={loading || !value.trim()}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-md transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mb-3 text-sm dark:bg-gray-800 dark:text-white"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtpAndCreateSession}
              disabled={loading || !otp.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Verify & Continue"
              )}
            </button>
          </>
        )}

        <p className="text-xs text-gray-500 mt-3">
          We value your privacy. Authentication is used only to protect from misuse.
        </p>
      </div>
    </div>
  );
}
