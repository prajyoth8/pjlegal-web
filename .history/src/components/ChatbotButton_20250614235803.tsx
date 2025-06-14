"use client";

import Image from "next/image";

export default function ChatbotButton() {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 p-3 bg-white rounded-full shadow-lg hover:scale-105 transition-transform"
      aria-label="Open Chatbot"
    >
      <Image
        src="/assets/icon_chatbot.png"
        alt="Chatbot"
        width={40}
        height={40}
        priority
      />
    </button>
  );
}
