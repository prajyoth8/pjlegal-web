"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

export default function ChatAuthModal({
  open,
  onClose,
  onAuthenticated,
}: {
  open: boolean;
  onClose: () => void;
  onAuthenticated: (sessionId: string, emailOrPhone: string) => void;
}) {
  const supabase = createClientComponentClient();

  const [tab, setTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "verify">("input");
  const [error, setError] = useState("");

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
    };
  };

  const getCountryCode = async (): Promise<string> => {
    try {
      const res = await fetch("https://ipapi.co/json");
      const data = await res.json();
      return data.country_code || "Unknown";
    } catch {
      return "Unknown";
    }
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    setError("");

    const contact = tab === "email" ? email : phone;

    const { error } =
      tab === "email"
        ? await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
        : await supabase.auth.signInWithOtp({ phone, options: { shouldCreateUser: true } });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setStep("verify");
    setIsLoading(false);
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError("");

    const verifyResult =
      tab === "email"
        ? await supabase.auth.verifyOtp({ email, token: otp, type: "email" })
        : await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });

    const user = verifyResult.data.user;

    if (!user) {
      setError("Verification failed.");
      setIsLoading(false);
      return;
    }

    // Insert into chatbot_sessions
    const country = await getCountryCode();
    const newSessionId = uuidv4();
    const { error: insertError } = await supabase.from("chatbot_sessions").insert({
      id: newSessionId,
      user_id: user.id,
      email: tab === "email" ? email : null,
      auth_method: tab,
      ip_address: "", // Optionally set via headers or client-side
      country_code: country,
      device_info: getDeviceInfo(),
      is_active: true,
      session_purpose: null,
      notes: null,
    });

    if (insertError) {
      setError("Session creation failed.");
      setIsLoading(false);
      return;
    }

    setSessionId(newSessionId);
    onAuthenticated(newSessionId, email || phone);
    onClose();
    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <Dialog.Title className="text-lg font-semibold mb-4 text-center">
          🔐 Authenticate to Use Chatbot
        </Dialog.Title>

        <div className="flex justify-center mb-4 gap-4">
          <button
            onClick={() => setTab("email")}
            className={`px-4 py-2 rounded ${tab === "email" ? "bg-amber-600 text-white" : "bg-gray-200"}`}
          >
            Email
          </button>
          <button
            onClick={() => setTab("phone")}
            className={`px-4 py-2 rounded ${tab === "phone" ? "bg-amber-600 text-white" : "bg-gray-200"}`}
          >
            Phone
          </button>
        </div>

        {step === "input" && (
          <div className="space-y-3">
            {tab === "email" ? (
              <input
                type="email"
                className="w-full border px-3 py-2 rounded"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <input
                type="tel"
                className="w-full border px-3 py-2 rounded"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}

            <button
              onClick={handleSendOTP}
              className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-3">
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </button>
          </div>
        )}

        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}

        <p className="mt-4 text-xs text-gray-500 text-center">
          We value your privacy. Authentication is used only to protect from misuse.
        </p>
      </Dialog.Panel>
    </Dialog>
  );
}
