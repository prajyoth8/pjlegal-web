'use client';

import Image from 'next/image';
import ChatbotIcon from '/public/assets/icon_chatbot.png';

export default function ChatbotButton() {
  return (
    <button
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-700 hover:bg-blue-800 shadow-xl flex items-center justify-center transition"
      onClick={() => alert('Chatbot coming soon!')}
    >
      <Image src={ChatbotIcon} alt="Chatbot" className="w-8 h-8" />
    </button>
  );
}
