'use client';

import { useState } from 'react';
import Head from 'next/head';
import DisclaimerModal from '../components/DisclaimerModal';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import NewsSection from '../components/NewsSection';
import ClientsSection from '../components/ClientsSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import ChatbotButton from '../components/ChatbotButton';

export default function HomePage() {
  const [agreed, setAgreed] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleProceed = () => {
    if (checked) setAgreed(true);
  };

  return (
    <>
      <Head>
        <title>PJ Legal</title>
        <meta name="description" content="PJ Legal – Trusted Legal Solutions in India" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="relative min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat transition-colors duration-300"
        style={{ backgroundImage: "url('/assets/homepage_bg.png')" }}
      >
        {/* Disclaimer */}
        {!agreed && (
          <DisclaimerModal
            checked={checked}
            onCheck={() => setChecked(!checked)}
            onProceed={handleProceed}
            disabled={!checked}
          />
        )}

        {/* Main Content */}
        <main
          className={`transition-opacity duration-300 w-full flex flex-col items-center px-4 space-y-12 ${
            agreed ? 'opacity-100 blur-0' : 'opacity-40 blur-sm pointer-events-none select-none'
          }`}
        >
          <Header />
          <HeroSection />
          <NewsSection />
          <ClientsSection />
          <FAQSection />
          <Footer />
        </main>

        {/* Floating Chatbot */}
        <ChatbotButton />
      </div>
    </>
  );
}
