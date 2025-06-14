'use client';

import React from 'react';

interface DisclaimerModalProps {
  checked: boolean;
  onCheck: () => void;
  onProceed: () => void;
  disabled: boolean;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ checked, onCheck, onProceed, disabled }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-md">
      <div className="bg-white dark:bg-gray-900 text-left shadow-2xl max-w-2xl w-full p-8 mx-4 rounded-xl border border-gray-300 dark:border-gray-700 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h2>
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
          The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner.
          By accessing this website, you acknowledge and confirm that you are seeking information relating to PJ Legal
          of your own accord and that there has been no form of solicitation, advertisement, or inducement by PJ Legal
          or its members. The content of this website is for informational purposes only and should not be interpreted
          as soliciting or advertisement. No material or information provided on this website should be construed as
          legal advice. PJ Legal shall not be liable for any consequences of any action taken by relying on the
          material/information provided on this website. The contents of this website are the intellectual property of PJ Legal.
        </p>
        <div className="flex items-center mb-4">
          <input
            id="agreeCheckbox"
            type="checkbox"
            checked={checked}
            onChange={onCheck}
            className="mr-2"
          />
          <label htmlFor="agreeCheckbox" className="text-sm text-gray-800 dark:text-gray-200">
            I accept the above.
          </label>
        </div>
        <button
          onClick={onProceed}
          disabled={disabled}
          className={`px-6 py-2 rounded-md font-semibold transition-colors shadow-sm text-white ${
            !disabled ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          PROCEED TO WEBSITE
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;
