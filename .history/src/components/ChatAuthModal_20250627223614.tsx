"use client";

import { useState } from "react";
import { Lock, Loader2, CheckCircle } from "lucide-react";

export default function ChatAuthModal({
  onAuthenticated,
}: {
  onAuthenticated: (sessionId: string, contact: string) => void;
  onClose: () => void;
}) {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!contact.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/proxy/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, method: authMethod }),
      });

      if (!res.ok) throw new Error("Failed to send OTP");

      setStep("verify");
    } catch (err: any) {
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/proxy/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, otp, method: authMethod }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "OTP verification failed");

      onAuthenticated(data.session_token || "pj-session", data.contact);
    } catch (err: any) {
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      {/* Welcome Bubble */}
      <div className="bg-gradient-to-br from-sky-200 to-sky-400 text-gray-900 dark:text-white p-3 rounded-xl mb-4 max-w-[85%]">
        <p>
          <strong>Hello!</strong> I'm PJ Legal AI Assistant.
          <br />
          How can I help you{" "}
          <span className="text-green-700 font-mono">with your legal questions today?</span>
        </p>
      </div>

      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-2 text-amber-600 font-semibold">
          <Lock className="w-4 h-4" /> Authenticate to Use Chatbot
        </div>

        {/* Method Toggle */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-all ${
              authMethod === "email"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            }`}
            onClick={() => setAuthMethod("email")}
          >
            Email
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-all ${
              authMethod === "phone"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            }`}
            onClick={() => setAuthMethod("phone")}
          >
            Phone
          </button>
        </div>

        {step === "request" && (
          <>
            <input
              type={authMethod === "email" ? "email" : "tel"}
              className="w-full border rounded-md px-3 py-2 mb-3 text-sm dark:bg-gray-800 dark:text-white"
              placeholder={authMethod === "email" ? "you@example.com" : "+91xxxxxxxxxx"}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <button
              onClick={handleSendOtp}
              disabled={loading || !contact.trim()}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-md transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Send OTP"}
            </button>
          </>
        )}

        {step === "verify" && (
          <>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="w-full border rounded-md px-3 py-2 mb-3 text-sm tracking-widest text-center dark:bg-gray-800 dark:text-white"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length < 4}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Verify OTP"}
            </button>

            <p className="text-xs text-gray-500 mt-3">
              Didn't get the code?{" "}
              <button onClick={handleSendOtp} className="text-amber-600 underline">
                Resend
              </button>
            </p>
          </>
        )}

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
}
