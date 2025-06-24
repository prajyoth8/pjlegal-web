"use client";

import Link from "next/link";

export default function ArticlesSection() {
  return (
    <section id="articles" className="py-16 bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Articles & Blogs</h2>
        <p className="text-center text-lg text-gray-700 mb-10">
          Explore expert legal insights, commentary, and practical tips from PJ Legal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Articles */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Recent SC Judgment on Property Law</h3>
            <p className="text-gray-600 text-sm">
              A look at the latest Supreme Court decision and its implications on ancestral property claims.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">How to File a Writ Petition</h3>
            <p className="text-gray-600 text-sm">
              A step-by-step guide for citizens seeking legal remedies under constitutional provisions.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Tenancy Rights in India: Myths vs. Law</h3>
            <p className="text-gray-600 text-sm">
              Understand legal safeguards for tenants and landlords under Indian tenancy laws.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/articles"
            className="inline-block px-6 py-3 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 transition"
          >
            Read All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
