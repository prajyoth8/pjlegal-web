export default function DisclaimerPage() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-100 text-gray-900">
      {/* Watermark Background */}
      <div className="absolute inset-0 bg-[url('/pj_logo_wall4.png')] bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Header with Floating Chatbot Disclaimer */}
        <div className="sticky top-4 z-20 mb-8">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 rounded-xl shadow-lg animate-pulse">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9.5 9a2.5 2.5 0 0 1 5 0"></path>
                  <path d="M9.5 9h5"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Chatbot Usage Notice</h3>
                <p className="text-sm opacity-90">
                  By interacting with our chatbot, you agree to our terms below
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chatbot Disclaimer - Now Prominently Displayed */}
          <div className="order-1 lg:order-2 bg-white/90 dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-amber-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path d="M2 14h2"></path>
                  <path d="M20 14h2"></path>
                  <path d="M15 13v2"></path>
                  <path d="M9 13v2"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-400">
                AI Chatbot Terms
              </h2>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-bold flex-shrink-0">
                  1
                </span>
                Conversations are informational only - <strong>not legal advice</strong>
              </p>

              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-bold flex-shrink-0">
                  2
                </span>
                <strong>Do not share</strong> confidential information
              </p>

              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-bold flex-shrink-0">
                  3
                </span>
                Responses may not reflect <strong>latest legal updates</strong>
              </p>

              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-bold flex-shrink-0">
                  4
                </span>
                All activity may be <strong>monitored</strong> for quality
              </p>
            </div>

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  By using the chatbot, you accept these terms
                </p>
              </div>
            </div>
          </div>

          {/* Main Disclaimer Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Header */}
            <div className="text-center">
              <img
                src="/pj_logo_white.png"
                alt="PJ Legal Logo"
                className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md border-2 border-amber-200"
              />
              <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-700 drop-shadow-sm bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
                Legal Disclaimer
              </h1>
              <p className="mt-3 text-sm text-gray-600 italic flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Transparency • Integrity • Responsibility
              </p>
            </div>

            {/* Content Box */}
            <div className="space-y-6 text-justify text-base leading-relaxed bg-white/90 dark:bg-gray-800 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-100">
                As per the rules of the{" "}
                <span className="font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  Bar Council of India
                </span>
                , law firms are not permitted to solicit work or advertise their services. This
                website is not intended to be a source of advertisement or solicitation.
              </p>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500 dark:border-amber-400">
                <p className="text-gray-700 dark:text-gray-200 font-medium">
                  The materials on this site are for informational purposes only and do not
                  constitute legal advice.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-amber-700 dark:text-amber-400">
                  By accessing this site, you confirm:
                </h3>
                <ul className="space-y-3">
                  {[
                    "You seek information about PJ Legal for personal knowledge",
                    "No content constitutes formal legal advice",
                    "No lawyer-client relationship is formed",
                    "PJ Legal shall not be liable for actions taken based on this content",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Privacy Commitment
                  </h4>
                  <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                    All shared data is protected under professional legal standards.
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    External Links
                  </h4>
                  <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                    We don't endorse or guarantee accuracy of linked sites.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-400">
                <p className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  By continuing to browse, you accept these terms
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Note */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-white/90 dark:bg-gray-800 rounded-xl shadow-lg border border-amber-100 dark:border-gray-700">
            <p className="italic text-lg text-amber-800 dark:text-amber-300">
              "Law must not only speak, it must resonate with reason and reach every citizen with
              clarity and care."
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-amber-200 dark:bg-amber-800"></div>
              <p className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                — Advocate R.Prajyoth Kumar
              </p>
              <div className="h-px flex-1 bg-amber-200 dark:bg-amber-800"></div>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Founder of PJ Legal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
