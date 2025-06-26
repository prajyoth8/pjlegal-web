// src/components/ChatbotWidget.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating AI Button - offset to avoid overlap with scroll-up */}
      <div className="fixed bottom-24 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition duration-300 w-14 h-14 flex items-center justify-center"
            aria-label="Open Chatbot"
          >
            {/* AI Avatar Icon */}
            <img
              src="/assets/ai_avatar.png"
              alt="AI Agent"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        )}
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-80 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700 bg-amber-600 text-white rounded-t-xl">
            <span className="font-semibold">🤖 Ask PJ Legal</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chatbot">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 text-sm">
            👋 Hello! How can I assist you today?
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type your question..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
