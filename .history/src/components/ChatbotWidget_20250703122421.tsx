"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Send, Volume2, X, MessageSquare, Bot } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ChatAuthModal from "./ChatAuthModal";
import { sendChatbotPrompt } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";
import { FormattedBlock, RenderFormattedBlocks } from "./RenderFormattedBlocks";

const shouldShowContactButtons = (text: string) => {
  const lowered = text.toLowerCase();
  return (
    lowered.includes("thank") ||
    lowered.includes("bye") ||
    lowered.includes("contact") ||
    lowered.includes("appointment") ||
    lowered.includes("book") ||
    lowered.includes("how can i reach") ||
    lowered.includes("connect") ||
    lowered.includes("whatsapp")
  );
};

const ContactButtons = () => (
  <div className="mt-3 flex flex-wrap gap-2">
    <a
      href="https://wa.me/918712351102"
      target="_blank"
      className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700 transition"
    >
      💬 WhatsApp Us
    </a>
    <a
      href="tel:+918712351102"
      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition"
    >
      📞 Call Office
    </a>
    <a
      href="https://pjlegal.in#contact"
      target="_blank"
      className="bg-gray-700 text-white px-3 py-1 rounded-lg text-xs hover:bg-gray-800 transition"
    >
      📍 Contact Page
    </a>
  </div>
);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  type ChatMessage =
    | { role: "user"; content: string }
    | { role: "ai"; content: string | FormattedBlock[] };

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const existingSession = sessionStorage.getItem("chatbot_session_id");
    if (existingSession) {
      setSessionId(existingSession);
    } else {
      const newSessionId = uuidv4();
      sessionStorage.setItem("chatbot_session_id", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const data = await sendChatbotPrompt(sessionId, userMsg);
      const blocks = data.blocks as FormattedBlock[];

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: blocks as FormattedBlock[],
        },
      ]);

      // Optional: Add contact buttons if needed
      const displayText = blocks
        .filter((b) => "text" in b && typeof b.text === "string")
        .map((b) => (b as any).text)
        .join(" ");

      if (shouldShowContactButtons(userMsg) || shouldShowContactButtons(displayText)) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: (
              <>
                <p className="mb-1">You can reach us here:</p>
                <ContactButtons />
              </>
            ) as any,
          },
        ]);
      }
    } catch (err) {
      console.error("Chatbot error:", err);
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

  const stripHTML = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleSpeak = (text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }

    // Utility: Convert abbreviations like "AI" to "A I"
    const formatAbbreviations = (str: string) =>
      str.replace(/\b([A-Z]{2,})\b/g, (_, abbr) => abbr.split("").join(" "));

    // Apply basic emotion tone based on content
    let rate = 0.95;
    let pitch = 1.0;

    const lowered = text.toLowerCase();

    if (text.trim().endsWith("?")) {
      pitch = 1.3; // inquisitive tone
      rate = 1.05;
    } else if (
      lowered.includes("thank") ||
      lowered.includes("great") ||
      lowered.includes("welcome")
    ) {
      pitch = 1.2; // happy
      rate = 1.05;
    } else if (lowered.includes("error") || lowered.includes("warning") || lowered.includes("⚠️")) {
      pitch = 0.9; // serious
      rate = 0.9;
    } else if (lowered.includes("sorry") || lowered.includes("unfortunately")) {
      pitch = 0.85; // sad/apologetic
      rate = 0.9;
    }

    // Clean up icons or symbols (optional)
    const cleanText = formatAbbreviations(
      text.replace(/[\u2190-\u21FF\u2600-\u27BF\uFE0F]|[^\x00-\x7F]/g, "") // remove arrows/emojis
    );

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-IN";
    utterance.pitch = pitch;
    utterance.rate = rate;

    // Optional: Pick a more natural voice
    const voices = speechSynthesis.getVoices();
    const humanVoice = voices.find(
      (v) => v.name.includes("Google UK English Female") || v.name.includes("Samantha")
    );
    if (humanVoice) utterance.voice = humanVoice;

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
            "Hello! I am PJ Legal AI Assistant. How can I help you with your legal questions today?",
        },
      ]);
    }
  };

  useEffect(() => {
    handleInitialGreeting();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onAuthenticated = (sessionId: string, emailOrPhone: string) => {
    setSessionId(sessionId);
    setIsAuthenticated(true);
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: `✅ Authenticated successfully. You may now start chatting.` },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button - Updated with AI Avatar */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-amber-500 hover:bg-amber-600 text-white p-0 rounded-full shadow-lg transition duration-300 w-14 h-14 flex items-center justify-center"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Image
              src="/assets/ai_avatar.png"
              alt="AI Assistant"
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          )}
          {!isOpen && messages.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {messages.length}
            </span>
          )}
        </button>
      </div>

      {/* Chat Panel - Updated Header with AI Avatar */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-20 sm:bottom-24 left-2 right-2 sm:right-6 sm:left-auto mx-auto w-[95vw] sm:w-[400px] max-h-[80vh] z-50 bg-white dark:bg-gray-900 shadow-2xl rounded-xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full border-2 border-amber-200">
                <Image
                  src="/assets/ai_avatar.png"
                  alt="PJ Legal AI Assistant"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="font-bold">PJ Legal AI Assistant</h3>
                <p
                  className={`text-xs font-bold ${isAuthenticated ? "text-green-900" : "text-rose-900"} opacity-80`}
                >
                  {isAuthenticated ? "Online..." : "Authentication required!"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
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
                  <div className="flex-shrink-0">
                    <div className="relative w-8 h-8 rounded-full border border-amber-200 overflow-hidden">
                      <Image
                        src="/assets/ai_avatar.png"
                        alt="AI Assistant"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-xl px-4 py-3 max-w-[80%] text-sm relative ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  {Array.isArray(msg.content) ? (
                    <RenderFormattedBlocks blocks={msg.content as FormattedBlock[]} />
                  ) : typeof msg.content === "string" ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    msg.content
                  )}

                  {msg.role === "ai" && (
                    <button
                      onClick={() => {
                        const speakText =
                          typeof msg.content === "string"
                            ? msg.content
                            : msg.content
                                .map((block) => ("text" in block ? block.text : ""))
                                .join(" ");
                        handleSpeak(speakText);
                      }}
                      className="absolute -bottom-3 -right-3 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    </button>
                  )}
                </motion.div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="flex-shrink-0">
                  <div className="relative w-8 h-8 rounded-full border border-amber-200 overflow-hidden">
                    <Image
                      src="/assets/ai_avatar.png"
                      alt="AI Assistant"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                </div>
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

            {/* Auth Modal Inline in Chatbox */}
            {!isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ChatAuthModal onClose={() => {}} onAuthenticated={onAuthenticated} />
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          {isAuthenticated && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/50">
              {showEmoji && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-24 right-6 z-50"
                >
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
                </motion.div>
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
                    className={`p-2 rounded-full transition-colors ${
                      isListening
                        ? "animate-pulse bg-red-100 text-red-500 dark:bg-red-900/50"
                        : "text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    aria-label={isListening ? "Stop listening" : "Voice input"}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
                <textarea
                  ref={inputRef}
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-[10px] resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[15px] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all leading-[1.4] tracking-tight shadow-sm"
                  placeholder="Type your legal question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={Math.min(4, Math.max(1, input.split("\n").length))}
                />

                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`p-2 rounded-full ${
                    input.trim()
                      ? "text-white bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      : "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700"
                  } transition-all`}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                {isListening ? (
                  <span className="text-red-500 dark:text-red-400">Listening... Speak now</span>
                ) : (
                  "Press Enter to send, Shift+Enter for new line"
                )}
              </div>
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
          )}
        </motion.div>
      )}
    </>
  );
}
