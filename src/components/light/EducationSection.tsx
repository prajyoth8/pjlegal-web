"use client";

import Link from "next/link";

export default function EducationSection() {
  return (
    <section id="education" className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Legal Education</h2>
        <p className="text-center text-lg text-gray-700 mb-10">
          Access legal knowledge and resources to stay informed, empowered, and legally aware.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder Cards */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Understanding Civil Rights</h3>
            <p className="text-gray-600 text-sm">
              A beginner’s guide to knowing your constitutional protections and fundamental rights.
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Property Ownership Essentials</h3>
            <p className="text-gray-600 text-sm">
              Key laws every property owner should know — titles, disputes, and safeguards.
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Marriage & Divorce: Legal Basics</h3>
            <p className="text-gray-600 text-sm">
              Understand legal procedures around marriage registration, divorce, and family laws.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/education"
            className="inline-block px-6 py-3 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 transition"
          >
            Explore Full Education Resources →
          </Link>
        </div>
      </div>
    </section>
  );
}
