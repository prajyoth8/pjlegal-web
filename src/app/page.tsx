// 📁 src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '/public/logo.png';

export default function HomePage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem('disclaimerAccepted');
    if (accepted === 'true') setShowDisclaimer(false);
  }, []);

  const handleAgree = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-white to-gray-100 flex flex-col items-center justify-center text-center">
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white shadow-2xl max-w-2xl w-full rounded-xl p-6 mx-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Website Disclaimer</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking on <strong>&apos;I AGREE&apos;</strong>, you acknowledge and confirm that:
            </p>
            <ul className="list-disc text-sm text-gray-700 pl-5 mb-4 space-y-2">
              <li>You are accessing this website solely to obtain information about PJ Legal, its services, and attorneys on your own accord.</li>
              <li>All information provided is at your request and is for informational purposes only. Accessing this site does not establish an attorney-client relationship.</li>
              <li>No part of this website constitutes legal advice or a legal opinion.</li>
              <li>PJ Legal is not responsible for any action taken based on the content herein. Always seek independent legal advice for your legal concerns.</li>
            </ul>
            <button
              onClick={handleAgree}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-sm transition"
            >
              I AGREE
            </button>
          </div>
        </div>
      )}

      <main className={`transition-opacity duration-300 ${showDisclaimer ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
        <Image src={Logo} alt="PJ Legal Logo" className="w-72 mb-6 drop-shadow-lg" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
          Trusted Legal Solutions
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          PJ Legal is committed to providing personalized and professional legal services. Explore our expertise in civil, criminal, and corporate law.
        </p>
        <div className="mt-8 space-x-4">
          <a
            href="#contact"
            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-md"
          >
            Contact Us
          </a>
          <a
            href="#services"
            className="px-6 py-3 border border-blue-700 text-blue-700 hover:bg-blue-100 font-medium rounded-lg"
          >
            Our Services
          </a>
        </div>
      </main>
    </div>
  );
}
