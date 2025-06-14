// 📁 src/app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Logo from '/public/logo.png';

export default function HomePage() {
  const [agreed, setAgreed] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleProceed = () => {
    if (checked) setAgreed(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-tr from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
      <Head>
        <title>PJ Legal</title>
        <meta name="description" content="PJ Legal - Trusted Legal Solutions in India" />
        <link rel="icon" href="/logo.png" type="image/png" />
      </Head>

      {!agreed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 shadow-2xl max-w-3xl w-full p-8 rounded-xl border border-gray-300 dark:border-gray-700 animate-fade-in text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Disclaimer</h2>
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed mb-4">
              The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website, you acknowledge and confirm that you are seeking information relating to PJ Legal of your own accord and that there has been no form of solicitation, advertisement, or inducement by PJ Legal or its members. The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. No material or information provided on this website should be construed as legal advice. PJ Legal shall not be liable for any consequences of any action taken by relying on the material/information provided on this website. The contents of this website are the intellectual property of PJ Legal.
            </p>
            <div className="flex items-center mb-4">
              <input
                id="agreeCheckbox"
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agreeCheckbox" className="text-sm text-gray-800 dark:text-gray-200">
                I accept the above.
              </label>
            </div>
            <button
              onClick={handleProceed}
              disabled={!checked}
              className={`px-6 py-2 rounded-md font-semibold transition-colors shadow-sm text-white ${
                checked ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              PROCEED TO WEBSITE
            </button>
          </div>
        </div>
      )}

      <main
        className={`transition-opacity duration-300 w-full flex flex-col items-center px-4 ${
          agreed ? 'opacity-100 blur-0' : 'opacity-20 blur-md pointer-events-none select-none'
        }`}
      >
        <Image src={Logo} alt="PJ Legal Logo" className="w-72 mb-6 drop-shadow-lg" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight mb-4">
          Trusted Legal Solutions
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
            className="px-6 py-3 border border-blue-700 text-blue-700 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900 font-medium rounded-lg"
          >
            Our Services
          </a>
        </div>
      </main>
    </div>
  );
}
