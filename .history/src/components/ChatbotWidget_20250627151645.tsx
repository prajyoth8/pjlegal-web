"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ChatAuthModal({
  onAuthenticated,
}: {
  onAuthenticated: (sessionId: string, emailOrPhone: string) => void;
}) {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "otp">("input");
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    if (!value.trim()) return;
    setLoading(true);

    try {
      if (authMethod === "email") {
        await supabase.auth.signInWithOtp({ email: value });
      } else {
        await supabase.auth.signInWithOtp({ phone: value });
      }
      setStep("otp");
    } catch (err) {
      console.error("OTP Error", err);
      alert("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndCreateSession = async () => {
    setLoading(true);

    try {
      const { data, error } =
        authMethod === "email"
          ? await supabase.auth.verifyOtp({ email: value, token: otp, type: "magiclink" })
          : await supabase.auth.verifyOtp({ phone: value, token: otp, type: "sms" });

      if (error || !data.session) {
        alert("Invalid OTP");
        setLoading(false);
        return;
      }

      // Create session in chatbot_sessions
      const ip = await fetch("/api/ip")
        .then((res) => res.text())
        .catch(() => "unknown");
      const { data: sessionData, error: insertError } = await supabase
        .from("chatbot_sessions")
        .insert([
          {
            user_id: data.session.user.id,
            email: authMethod === "email" ? value : null,
            ip_address: ip,
            auth_method: authMethod,
            country_code: "IN", // You may use real IP geolocation later
            device_info: window.navigator ? { userAgent: window.navigator.userAgent } : {},
            session_purpose: null,
          },
        ])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      onAuthenticated(sessionData.id, value);
    } catch (err) {
      console.error("Verification or session creation error", err);
      alert("Something went wrong. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
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
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Verify & Continue"}
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
