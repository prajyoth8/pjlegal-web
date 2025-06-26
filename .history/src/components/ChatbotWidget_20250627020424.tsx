"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Send, X } from "lucide-react";
import Image from "next/image";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        from: "ai",
        text: `🤖 Hello! You asked: "${userMessage.text}"\n\nHere's a thoughtful answer based on AI reasoning.`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);

      speak(aiResponse.text); // 🔊 Voice support
    }, 1200);
  };

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-IN";
      utter.pitch = 1;
      utter.rate = 1;
      window.speechSynthesis.speak(utter);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Bot Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-amber-600 hover:bg-amber-700 p-3 rounded-full shadow-lg"
        aria-label="Open chatbot"
      >
        <Image
          src="/assets/ai_avatar.png"
          alt="Chatbot Icon"
          width={32}
          height={32}
          className="rounded-full"
        />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[340px] max-h-[70vh] bg-white dark:bg-gray-900 shadow-xl rounded-xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-amber-600 text-white rounded-t-xl">
            <div className="flex items-center gap-2">
              <Image src="/assets/ai_avatar.png" alt="AI" width={28} height={28} className="rounded-full" />
              <span className="font-semibold text-sm">PJ Legal AI Assistant</span>
            </div>
            <X className="cursor-pointer w-5 h-5" onClick={toggleChat} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    msg.from === "user"
                      ? "bg-amber-100 text-black"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                  } whitespace-pre-wrap`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2">
                <Image src="/assets/ai_avatar.png" alt="typing" width={22} height={22} />
                <div className="flex space-x-1 animate-pulse">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full" />
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full" />
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 text-sm bg-transparent outline-none placeholder-gray-500 text-gray-800 dark:text-white"
              placeholder="Type your message..."
            />
            <Mic className="w-5 h-5 text-gray-500 hover:text-amber-600 cursor-pointer" />
            <Send
              onClick={handleSend}
              className="w-5 h-5 text-amber-600 hover:text-amber-700 cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
}
