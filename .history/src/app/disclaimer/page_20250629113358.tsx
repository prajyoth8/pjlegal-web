export default function DisclaimerPage() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-100 text-gray-900">
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
        </div>

        {/* Content Box */}
        <div className="space-y-6 text-justify text-base leading-relaxed bg-white/90 dark:bg-black/70 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-amber-100">
          <p className="text-gray-800 dark:text-gray-100">
            As per the rules of the{" "}
            <span className="text-amber-700 font-semibold">Bar Council of India</span>, law firms
            are not permitted to solicit work or advertise their services. This website is not
            intended to be a source of advertisement or solicitation and should not be construed as
            legal advice.
          </p>

          <p className="text-gray-700 dark:text-gray-200">
            The materials on this site are provided for general informational purposes only and are
            accessible based on the user’s voluntary interest. By accessing this site, the user
            confirms:
          </p>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300 marker:text-amber-600">
            <li>
              They are seeking information about <strong>PJ Legal</strong> and its practice areas
              for personal knowledge and understanding.
            </li>
            <li>No part of the content constitutes a legal opinion or formal legal advice.</li>
            <li>
              No <span className="text-amber-700 font-semibold">lawyer-client relationship</span> is
              formed by accessing, reading, or using the content of this website.
            </li>
            <li>
              <strong>PJ Legal</strong> shall not be held liable for any actions taken based on the
              information provided here.
            </li>
          </ul>

          <p>
            We recommend users to consult qualified legal professionals before relying on any
            content herein. The website content does not substitute personalized legal consultation.
          </p>

          <p>
            Any contact through the site does not imply an invitation or solicitation for legal
            services, nor does it establish a legal bond.
          </p>

          <p>
            PJ Legal values{" "}
            <span className="text-blue-700 font-semibold">privacy and confidentiality</span>. Any
            shared data via contact forms or emails will be protected under professional legal
            standards.
          </p>

          <p>
            External links, if any, are for reference only. PJ Legal does not endorse or guarantee
            the validity or accuracy of information on linked websites.
          </p>

          <p className="font-semibold text-amber-700">
            ✅ By continuing to browse this website, you acknowledge and accept the terms of this
            disclaimer.
          </p>


          
        </div>

        

        {/* Signature Note */}
        <div className="mt-12 text-center text-gray-800 dark:text-gray-100">
          <p className="italic text-lg text-amber-800">
            “Law must not only speak, it must resonate with reason and reach every citizen with
            clarity and care.”
          </p>
          <p className="mt-4 font-semibold text-sm text-gray-600">
            — Advocate R.Prajyoth Kumar, Founder of PJ Legal
          </p>
        </div>
      </div>
    </section>
  );
}
