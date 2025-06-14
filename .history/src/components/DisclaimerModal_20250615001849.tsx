"use client";

import React from "react";

type Props = {
  checked: boolean;
  onCheck: () => void;
  onProceed: () => void;
  disabled: boolean;
};

export default function DisclaimerModal({
  checked,
  onCheck,
  onProceed,
  disabled,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl max-w-2xl w-full p-8 border border-gray-300 dark:border-gray-700 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
        <p className="text-sm leading-relaxed mb-4">
          The Bar Council of India does not permit advertisement or solicitation
          by advocates in any form or manner. By accessing this website, you
          acknowledge and confirm that you are seeking information relating to
          PJ Legal of your own accord and that there has been no form of
          solicitation, advertisement, or inducement by PJ Legal or its members.
          The content of this website is for informational purposes only and
          should not be interpreted as soliciting or advertisement. No material
          or information provided on this website should be construed as legal
          advice. PJ Legal shall not be liable for any consequences of any
          action taken by relying on the material/information provided on this
          website. The contents of this website are the intellectual property of
          PJ Legal.
        </p>
        <div className="flex items-center mb-4">
          <input
            id="agreeCheckbox"
            type="checkbox"
            checked={checked}
            onChange={onCheck}
            className="mr-2"
          />
          <label htmlFor="agreeCheckbox" className="text-sm">
            I accept the above.
          </label>
        </div>
        <button
          onClick={onProceed}
          disabled={disabled}
          className={`px-6 py-2 rounded-md font-semibold transition-colors shadow-sm text-white ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          PROCEED TO WEBSITE
        </button>
      </div>
    </div>
  );
}
