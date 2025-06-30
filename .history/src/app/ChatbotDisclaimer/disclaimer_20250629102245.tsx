export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-sm text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Disclaimer & Terms of Use</h1>
      <p className="mb-4">
        The PJ Legal AI Assistant is provided for informational purposes only and does not
        constitute legal advice. Using this assistant does not establish an attorney-client
        relationship.
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Do not share any personal, sensitive, or confidential information.</li>
        <li>Your activity may be monitored for abuse prevention and service improvement.</li>
        <li>
          The tool may provide general information based on trained data, which could be inaccurate
          or outdated.
        </li>
      </ul>
      <p>
        For official legal advice, please consult a licensed advocate. By using this service, you
        accept these terms.
      </p>
    </div>
  );
}
