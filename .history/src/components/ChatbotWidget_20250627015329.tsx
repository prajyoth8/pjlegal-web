"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Send, Volume2, Bot, X } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", content: "⚠️ Error getting response." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event: any) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition duration-300"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[360px] max-h-[80vh] z-50 bg-white dark:bg-gray-900 shadow-2xl rounded-xl flex flex-col border border-gray-300 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-amber-600 text-white p-3 font-bold text-center">🤖 PJ Legal AI Assistant</div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-400">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs ${
                    msg.role === "user"
                      ? "bg-amber-100 text-right text-gray-900"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.role === "ai" && (
                    <button onClick={() => handleSpeak(msg.content)} className="mt-1 text-xs text-blue-500">
                      🔊 Speak
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500 italic animate-pulse">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-1">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowEmoji(!showEmoji)} className="text-gray-500 hover:text-amber-500">😊</button>
              <button onClick={handleVoiceInput} className="text-gray-500 hover:text-amber-500">
                <Mic className="w-5 h-5" />
              </button>
              <textarea
                className="flex-1 border rounded-lg px-3 py-1 resize-none text-sm dark:bg-gray-800 dark:text-white"
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button onClick={handleSend} className="text-amber-600 hover:text-amber-800">
                <Send className="w-5 h-5" />
              </button>
            </div>
            {showEmoji && (
              <div className="absolute bottom-20 right-6 z-50">
                <Picker
                  data={data}
                  onEmojiSelect={(e: any) => setInput((prev) => prev + e.native)}
                  theme="light"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
