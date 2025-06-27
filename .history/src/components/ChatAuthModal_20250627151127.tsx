"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Use your UI library
import { Loader2, Lock } from "lucide-react";

export default function ChatAuthModal({
  onAuthenticate,
}: {
  onAuthenticate: (data: { email?: string; phone?: string; method: "email" | "phone" }) => void;
}) {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!value.trim()) return;
    setLoading(true);

    try {
      // Send OTP logic here (Supabase / API)
      onAuthenticate({
        [authMethod]: value,
        method: authMethod,
      });
    } catch (err) {
      console.error("OTP Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      {/* Welcome Message Bubble */}
      <div className="bg-gradient-to-br from-sky-200 to-sky-400 text-gray-900 dark:text-white p-3 rounded-xl mb-4 max-w-[85%]">
        <p>
          <strong>Hello!</strong> I'm PJ Legal AI Assistant.
          <br />
          How can I help you{" "}
          <span className="text-green-700 font-mono">with your legal questions today?</span>
        </p>
      </div>

      {/* Auth Box */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-2 text-amber-600 font-semibold">
          <Lock className="w-4 h-4" /> Authenticate to Use Chatbot
        </div>

        <Tabs
          value={authMethod}
          onValueChange={(v) => setAuthMethod(v as "email" | "phone")}
          className="mb-3"
        >
          <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-full">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
        </Tabs>

        <input
          type={authMethod === "email" ? "email" : "tel"}
          className="w-full border rounded-md px-3 py-2 mb-3 text-sm dark:bg-gray-800 dark:text-white"
          placeholder={authMethod === "email" ? "you@example.com" : "+91xxxxxxxxxx"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          onClick={handleSendOtp}
          disabled={loading || !value.trim()}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-md transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Send OTP"}
        </button>

        <p className="text-xs text-gray-500 mt-3">
          We value your privacy. Authentication is used only to protect from misuse.
        </p>
      </div>
    </div>
  );
}
