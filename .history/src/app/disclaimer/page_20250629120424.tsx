export default function DisclaimerPage() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-100 text-gray-900">
      {/* Watermark Background */}
      <div className="absolute inset-0 bg-[url('/pj_logo_wall4.png')] bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Header - Adjusted spacing */}
        <div className="text-center mb-8">
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
            Disclaimer
          </h1>
          <p className="mt-2 text-sm text-gray-600 italic">
            Transparency • Integrity • Responsibility
          </p>
        </div>

        {/* Main Content Box */}
        <div className="space-y-6 text-justify text-base leading-relaxed bg-white/90 dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-amber-100 dark:border-gray-700">
          {/* Your original disclaimer content... */}
          {/* ... */}
        </div>

        {/* Chatbot Disclaimer Section - No extra space above */}
        <div className="mt-8 bg-white/90 dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-800">
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
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">
              AI Chatbot Usage Terms
            </h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The PJ Legal AI Chat Assistant is for informational purposes only and not a substitute for professional legal advice.
          </p>
          
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {[
              "Does not create advocate-client relationships",
              "Do not share confidential information",
              "Responses may not reflect latest legal updates",
              "Accuracy of responses not guaranteed",
              "Activity may be monitored for quality"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300 font-medium">
              By interacting with the chatbot, you agree to these terms
            </p>
          </div>
        </div>

        {/* Signature Note */}
        <div className="mt-10 text-center pb-6">
          {/* ... your signature content ... */}
        </div>
      </div>
    </section>
  );
}