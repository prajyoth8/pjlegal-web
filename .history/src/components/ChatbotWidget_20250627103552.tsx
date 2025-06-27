"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Send, Volume2, X, MessageSquare } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Error getting response. Please try again later." },
      ]);
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
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      (window as any).webkitSpeechRecognition?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setInput("Listening...");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setInput("");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleInitialGreeting = () => {
    if (messages.length === 0 && isOpen) {
      setMessages([
        {
          role: "ai",
          content:
            "Hello! I'm PJ Legal AI Assistant. How can I help you with your legal questions today?",
        },
      ]);
    }
  };

  useEffect(() => {
    handleInitialGreeting();
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-14 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-4 rounded-full shadow-xl transition-all duration-300 ${isOpen ? "bg-amber-600" : "bg-amber-500 hover:bg-amber-600"} flex items-center justify-center`}
          aria-label="Chat with AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {messages.length}
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-6 w-[360px] max-h-[70vh] z-50 bg-white dark:bg-gray-900 shadow-2xl rounded-xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/ai_avatar.png"
                alt="AI Avatar"
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
              <h3 className="font-bold">PJ Legal AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-amber-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <Image
                    src="/assets/ai_avatar.png"
                    alt="AI Avatar"
                    width={32}
                    height={32}
                    className="rounded-full border flex-shrink-0"
                  />
                )}
                <div
                  className={`rounded-xl px-4 py-3 max-w-[80%] text-sm relative ${
                    msg.role === "user"
                      ? "bg-amber-500 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.role === "ai" && (
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      className="absolute -bottom-3 -right-3 bg-white dark:bg-gray-700 p-1 rounded-full shadow border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Read aloud"
                    >
                      <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 pl-2"
              >
                <Image
                  src="/assets/ai_avatar.png"
                  alt="AI Typing"
                  width={32}
                  height={32}
                  className="rounded-full border flex-shrink-0"
                />
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl rounded-bl-none px-4 py-3">
                  <div className="flex gap-1.5">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/50">
            {showEmoji && (
              <div className="absolute bottom-24 right-6 z-50">
                <Picker
                  data={data}
                  onEmojiSelect={(e: any) => {
                    setInput((prev) => prev + e.native);
                    inputRef.current?.focus();
                  }}
                  onClickOutside={() => setShowEmoji(false)}
                  theme={document.documentElement.classList.contains("dark") ? "dark" : "light"}
                  previewPosition="none"
                />
              </div>
            )}
            <div className="flex items-end gap-2">
              <div className="flex gap-1">
                <button
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="p-2 text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Emoji picker"
                >
                  <span className="text-lg">😊</span>
                </button>
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-full transition-colors ${isListening ? "animate-pulse bg-red-100 text-red-500 dark:bg-red-900/50" : "text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                  aria-label={isListening ? "Stop listening" : "Voice input"}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
              <textarea
                ref={inputRef}
                className="flex-1 border rounded-xl px-3 py-2 resize-none text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                placeholder="Type your legal question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={Math.min(4, Math.max(1, input.split("\n").length))}
                autoFocus
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`p-2 rounded-full ${input.trim() ? "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 bg-amber-100/50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30" : "text-gray-400 dark:text-gray-500"}`}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
              {isListening ? "Listening... Speak now" : "Press Enter to send"}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
