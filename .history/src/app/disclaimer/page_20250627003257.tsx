export default function DisclaimerPage() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50">
      <div className="absolute inset-0 bg-[url('/pj_logo_wall4.png')] bg-no-repeat bg-center bg-contain opacity-5 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 py-20 text-gray-800 relative z-10">
        <div className="text-center mb-10">
          <img src="/pj_logo_white.png" alt="PJ Legal Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-blue-900">Disclaimer</h1>
        </div>

        <div className="space-y-6 text-justify text-sm sm:text-base leading-relaxed bg-white bg-opacity-80 p-6 rounded-xl shadow-lg">
          <p>
            As per the rules of the Bar Council of India, law firms are not permitted to solicit
            work or advertise their services. This website is not intended to be a source of
            advertising or solicitation and the contents of this website should not be construed as
            legal advice.
          </p>

          <p>
            The information provided on this website is for informational purposes only and is made
            available to users upon their specific request. By accessing this site, the user
            acknowledges that:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              The user seeks information about PJ Legal and its areas of practice for their own
              knowledge and use.
            </li>
            <li>
              The information provided herein is not intended to, and does not, constitute legal
              advice or a legal opinion in any form.
            </li>
            <li>
              No lawyer-client relationship is created through transmission, receipt, or use of the
              website.
            </li>
            <li>
              PJ Legal will not be liable for any consequences arising from reliance on the content
              of this website.
            </li>
          </ul>

          <p>
            Users are advised to seek independent legal counsel before acting upon any information
            provided on this website. The content herein is not intended to substitute professional
            advice that may be required in specific legal situations.
          </p>

          <p>
            Any communication or exchange of information through this site shall not be construed as
            a form of invitation or inducement to establish a client relationship.
          </p>

          <p>
            PJ Legal respects your privacy. Any information shared by the user through emails or
            contact forms will be treated confidentially and in accordance with professional
            standards.
          </p>

          <p>
            This website may contain links to external websites. PJ Legal does not guarantee the
            accuracy, reliability, or completeness of any information on these external links.
          </p>

          <p className="font-semibold">
            By proceeding to use this site, the user affirms that they have read, understood, and
            voluntarily agreed to the terms of this disclaimer.
          </p>
        </div>
      </div>
    </section>
  );
}
