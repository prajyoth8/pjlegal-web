export default function DisclaimerPage() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-100 text-gray-900">
      {/* Watermark Background */}
      <div className="absolute inset-0 bg-[url('/pj_logo_wall4.png')] bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <img
              src="/pj_logo_white.png"
              alt="PJ Legal Logo"
              className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md border-2 border-amber-200"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-sm">
              ℹ️
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-700 drop-shadow-sm">
            Legal Disclaimer
          </h1>
          <p className="mt-2 text-sm text-gray-600 italic">
            Transparency • Integrity • Responsibility
          </p>
        </div>

        {/* Main Content Box */}
        <div className="space-y-6 text-justify text-base leading-relaxed bg-white/95 dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-amber-100 dark:border-gray-700">
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500 dark:border-amber-400">
            <p className="text-gray-800 dark:text-gray-100">
              As per the rules of the{" "}
              <span className="text-amber-700 dark:text-amber-300 font-semibold">Bar Council of India</span>, 
              law firms are not permitted to solicit work or advertise their services. This website is not
              intended to be a source of advertisement or solicitation.
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-200">
            The materials on this site are provided for general informational purposes only and are
            accessible based on the user's voluntary interest. By accessing this site, the user
            confirms:
          </p>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            {[
              "They are seeking information about PJ Legal and its practice areas for personal knowledge",
              "No part of the content constitutes a legal opinion or formal legal advice",
              "No lawyer-client relationship is formed by accessing this website",
              "PJ Legal shall not be liable for actions taken based on this content"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Privacy Commitment</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                All shared data is protected under professional legal standards.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">External Links</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                We don't endorse or guarantee accuracy of linked sites.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-700/50 rounded-lg border border-amber-200 dark:border-amber-800 shadow-inner">
            <p className="text-center font-medium text-amber-700 dark:text-amber-300">
              ✅ By continuing to browse, you acknowledge and accept these terms
            </p>
          </div>
        </div>

        {/* Chatbot Disclaimer Section - Enhanced but kept in original position */}
        <div className="mt-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-sm transition duration-200"></div>
          <div className="relative space-y-4 text-justify bg-white/95 dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path d="M2 14h2"></path>
                  <path d="M20 14h2"></path>
                  <path d="M15 13v2"></path>
                  <path d="M9 13v2"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                AI Chatbot Usage Terms
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              The PJ Legal AI Chat Assistant is for informational purposes only and not a substitute for professional legal advice.
            </p>

            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {[
                "Does not create advocate-client relationships",
                "Do not share confidential information",
                "Responses may not reflect latest legal updates",
                "Accuracy of responses not guaranteed",
                "Activity may be monitored for quality"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-center text-blue-700 dark:text-blue-300 font-medium">
                By interacting with the chatbot, you agree to these terms
              </p>
            </div>
          </div>
        </div>

        {/* Signature Note */}
        <div className="mt-16 text-center">
          <div className="inline-block max-w-lg px-8 py-6 bg-white/90 dark:bg-gray-800 rounded-xl shadow-md border border-amber-100 dark:border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-amber-600 dark:text-amber-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="italic text-lg text-amber-800 dark:text-amber-300">
              "Law must not only speak, it must resonate with reason and reach every citizen with clarity and care."
            </p>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent dark:via-amber-600"></div>
            <p className="mt-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
              — Advocate R.Prajyoth Kumar, Founder of PJ Legal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}