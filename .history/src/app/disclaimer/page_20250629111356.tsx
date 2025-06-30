"use client";

import { useEffect } from "react";

export default function DisclaimerPage() {
  useEffect(() => {
    const anchor = window.location.hash;
    if (anchor === "#chatbot-disclaimer") {
      const section = document.getElementById("chatbot-disclaimer");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-100 text-gray-900 scroll-smooth">
      {/* Watermark Background */}
      <div className="absolute inset-0 bg-[url('/pj_logo_wall4.png')] bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <img
            src="/pj_logo_white.png"
            alt="PJ Legal Logo"
            className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-700 drop-shadow-sm">
            Disclaimer
          </h1>
          <p className="mt-2 text-sm text-gray-600 italic">
            Transparency • Integrity • Responsibility
          </p>

          {/* Sticky Alert Box to Jump to Chatbot Section */}
          <a
            href="#chatbot-disclaimer"
            className="inline-block mt-6 bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-200 hover:shadow transition-all animate-bounce"
          >
            ⚠️ View Chatbot Disclaimer Below
          </a>
        </div>

        {/* General Disclaimer Content */}
        <div className="space-y-6 text-justify text-base leading-relaxed bg-white/90 dark:bg-black/70 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-amber-100">
          <p>
            As per the rules of the{" "}
            <span className="text-amber-700 font-semibold">Bar Council of India</span>, law firms
            are not permitted to solicit work or advertise their services...
          </p>
          <p>
            The materials on this site are for general informational purposes only. By accessing
            this site, the user confirms:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300 marker:text-amber-600">
            <li>
              They are voluntarily seeking information about <strong>PJ Legal</strong>.
            </li>
            <li>No part of the content constitutes formal legal advice.</li>
            <li>
              No <strong>advocate–client relationship</strong> is created by using this site.
            </li>
            <li>PJ Legal is not liable for actions based on the website’s information.</li>
          </ul>
          <p>
            Content here does not substitute personalized legal consultation. Contact does not imply
            a formal legal bond.
          </p>
          <p>
            <strong>PJ Legal</strong> values{" "}
            <span className="text-blue-700 font-semibold">privacy and confidentiality</span>.
          </p>
          <p className="font-semibold text-amber-700">
            ✅ By continuing, you acknowledge and accept this disclaimer.
          </p>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-dashed border-amber-300" />

        {/* Chatbot Disclaimer Section */}
        <div
          id="chatbot-disclaimer"
          className="space-y-6 text-justify text-base leading-relaxed bg-blue-50 dark:bg-gray-800/80 p-8 rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300">
            🤖 PJ Legal Chatbot Usage Disclaimer
          </h2>
          <p>
            The PJ Legal AI Chat Assistant is offered for general informational purposes only.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-blue-900 dark:text-blue-100 marker:text-blue-600">
            <li>
              Interacting with the chatbot <strong>does not create a legal relationship</strong>.
            </li>
            <li>
              <strong>Do not share personal or sensitive information</strong> during conversations.
            </li>
            <li>
              The AI may not reflect jurisdiction-specific laws or recent legal changes.
            </li>
            <li>
              PJ Legal does not guarantee the <strong>accuracy or completeness</strong> of AI
              responses.
            </li>
            <li>
              All interactions may be monitored to improve service and prevent misuse.
            </li>
          </ul>
          <p className="text-blue-900 dark:text-blue-100 font-semibold">
            ✅ By using the chatbot, you agree to this disclaimer.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-12 text-center text-gray-800 dark:text-gray-100">
          <p className="italic text-lg text-amber-800">
            “Law must not only speak, it must resonate with reason and reach every citizen with
            clarity and care.”
          </p>
          <p className="mt-4 font-semibold text-sm text-gray-600">
            — Advocate R. Prajyoth Kumar, Founder of PJ Legal
          </p>
        </div>
      </div>
    </section>
  );
}
