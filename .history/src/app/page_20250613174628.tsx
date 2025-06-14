// 📁 src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '/public/logo.png'; // Replace with your logo path

export default function HomePage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    setShowDisclaimer(true); // Always show on refresh
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 text-gray-800">
      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-xl border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">DISCLAIMER:</h2>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>
                The user wishes to gain more information about PJ Legal, its practice areas and its attorneys,
                for personal information and use.
              </li>
              <li>
                The information is made available only on specific request. Download or use is at the user&apos;s discretion and does not create a lawyer-client relationship.
              </li>
              <li>
                No information on this website is legal advice or opinion.
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              PJ Legal is not responsible for any consequences based on information herein. Users must seek independent legal advice for any issues.
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowDisclaimer(false)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <header className="py-6 px-4 flex justify-between items-center shadow-sm bg-white">
        <div className="flex items-center space-x-3">
          <Image src={Logo} alt="PJ Legal Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-indigo-700">PJ LEGAL</h1>
        </div>
        <nav className="space-x-6 text-sm font-medium text-gray-600">
          <a href="#who" className="hover:text-indigo-700">Who We Are</a>
          <a href="#services" className="hover:text-indigo-700">Services</a>
          <a href="#contact" className="hover:text-indigo-700">Contact</a>
        </nav>
      </header>

      <main className="px-4 py-12 max-w-6xl mx-auto">
        <section id="hero" className="text-center py-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Practice Smarter. Defend Stronger.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted legal expertise to guide your decisions and protect your interests — every step of the way.
          </p>
        </section>

        <section id="who" className="mt-16">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">Who We Are</h3>
          <p className="text-gray-700 max-w-3xl">
            PJ Legal is a boutique law practice founded by R. Prajyoth Kumar, Advocate. With expertise in property, civil, cyber, regulatory, and criminal law, we serve clients across Telangana with integrity and clarity.
          </p>
        </section>

        <section id="services" className="mt-16">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">Our Services</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 list-disc pl-5">
            <li>Property & Land Disputes</li>
            <li>Civil and Criminal Litigation</li>
            <li>Cybercrime & Digital Law</li>
            <li>Regulatory Compliance & RTI</li>
            <li>Document Drafting & Affidavits</li>
            <li>Legal Consultation & Opinions</li>
          </ul>
        </section>

        <section id="contact" className="mt-16">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">Contact Us</h3>
          <form
            className="space-y-4 max-w-xl"
            action="https://formsubmit.co/pjlegal.r@gmail.com" // Replace with your receiving email
            method="POST"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="w-full px-4 py-2 border rounded-md"
              rows={4}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} PJ Legal. All rights reserved.
      </footer>
    </div>
  );
}
