


"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock, Mail, Smartphone } from "lucide-react";
import PhoneInputWithCountry from "@/components/PhoneInputWithCountry";
import Image from "next/image";

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

  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (timer > 0) {
      setCanResend(false);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const isValidPhone = () => {
    if (!value.startsWith("+91")) return true; // basic validation only for India
    return /^\+91\d{10}$/.test(value);
  };

  const sendOtp = async () => {
    if (!value.trim() || (authMethod === "phone" && !isValidPhone())) {
      alert("Please enter a valid contact.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: value, method: authMethod }),
      });

      if (!res.ok) throw new Error("Failed to send OTP");

      setStep("otp");
      setTimer(60);
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
      {/* Welcome Header - Updated with AI Avatar */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <div className="relative w-16 h-16 rounded-full border-2 border-amber-200 p-1">
            <Image
              src="/assets/ai_avatar.png"
              alt="PJ Legal AI Assistant"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full">
              <Lock className="w-3 h-3" />
            </div>
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
                ? "bg-white dark:bg-gray-700 shadow-sm text-amber-600 dark:text-amber-400"
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
              {authMethod === "email" ? (
                <input
                  id="contact-input"
                  type="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  placeholder="you@example.com"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              ) : (
                <PhoneInputWithCountry value={value} onChange={setValue} />
              )}
            </div>
            <button
              onClick={sendOtp}
              disabled={loading || !value.trim()}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 rounded-lg transition-all ${
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
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-center text-lg font-mono tracking-widest dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                autoFocus
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                We’ve sent a 6-digit code to your {authMethod === "email" ? "email" : "phone"}
              </p>
              {!canResend ? (
                <p className="text-sm text-gray-400 mt-2">⏱ Resend available in {timer}s</p>
              ) : (
                <button
                  onClick={sendOtp}
                  className="text-sm text-amber-600 dark:text-amber-400 underline mt-2"
                >
                  Resend Code
                </button>
              )}
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

      {/* Disclaimer */}
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        By using this assistant, you agree to our{" "}
        <a
          href="/disclaimer"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-600 dark:hover:text-amber-400"
        >
          Terms of Use
        </a>
        . Do not share personal or sensitive data.
      </div>
    </div>
  );
}
