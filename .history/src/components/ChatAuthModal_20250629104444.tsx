"use client";

import { useState } from "react";
import { Loader2, Lock, Mail, Smartphone } from "lucide-react";
import PhoneInputWithCountry from "@/components/PhoneInputWithCountry";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://pjlegal-backend-production.up.railway.app";

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

  const [otpData, setOtpData] = useState({
    contact: "",
    method: "phone", // or "email"
  });

  {
    otpData.method === "phone" && (
      <PhoneInputWithCountry
        value={otpData.contact}
        onChange={(fullPhone) => setOtpData({ ...otpData, contact: fullPhone })}
      />
    );
  }

  const sendOtp = async () => {
    if (!value.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: value, method: authMethod }),
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
      const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: value, otp, method: authMethod }),
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
    <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl max-w-md w-full mx-auto backdrop-blur-lg">
      {/* Welcome Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full inline-flex">
            <Lock className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          Secure Authentication
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Verify your identity to continue chatting
        </p>
      </div>

      {/* Auth Method Toggle */}
      <div className="flex justify-center gap-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { method: "email", icon: Mail, label: "Email" },
          { method: "phone", icon: Smartphone, label: "Phone" },
        ].map(({ method, icon: Icon, label }) => (
          <button
            key={method}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all w-full ${
              authMethod === method
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
            onClick={() => {
              setAuthMethod(method as "email" | "phone");
              setValue("");
              setStep("input");
            }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Auth Content */}
      <div className="space-y-4">
        {step === "input" ? (
          <>
            <div>
              <label
                htmlFor="contact-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {authMethod === "email" ? "Email Address" : "Phone Number"}
              </label>
              <div className="relative">
                <input
                  id="contact-input"
                  type={authMethod === "email" ? "email" : "tel"}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={authMethod === "email" ? "you@example.com" : "+91xxxxxxxxxx"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={sendOtp}
              disabled={loading || !value.trim()}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all ${
                loading || !value.trim() ? "opacity-80" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </>
        ) : (
          <>
            <div>
              <label
                htmlFor="otp-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Verification Code
              </label>
              <input
                id="otp-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-center text-lg font-mono tracking-widest dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                autoFocus
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                We've sent a 6-digit code to your {authMethod === "email" ? "email" : "phone"}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("input")}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={verifyOtpAndCreateSession}
                disabled={loading || otp.length < 6}
                className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 rounded-lg transition-all ${
                  loading || otp.length < 6 ? "opacity-80" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Your information is secure and will not be shared
        </p>
      </div>
    </div>
  );
}
