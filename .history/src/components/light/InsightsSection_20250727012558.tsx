"use client";

import Link from "next/link";
import { Newspaper, BookOpen, GraduationCap } from "lucide-react";

export default function InsightsSection() {
  return (
    <section
      id="insights"
      className="py-16 px-4 md:px-8 lg:px-24 bg-gradient-to-br from-white to-slate-100 text-gray-900"
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-orange-700">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* News Card */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all">
          <div className="flex items-center mb-4">
            <Newspaper className="text-orange-600 w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">Latest Legal News</h3>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Stay updated with the most recent legal developments, amendments, and notable verdicts
            from courts in India.
          </p>
          <Link
            href="/insights?type=news"
            className="text-sm font-medium text-orange-700 hover:underline"
          >
            Explore News →
          </Link>
        </div>

        {/* Blogs Card */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all">
          <div className="flex items-center mb-4">
            <BookOpen className="text-purple-600 w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">Legal Articles & Blogs</h3>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Read thought-provoking articles and legal commentary written to demystify complex topics
            for professionals and clients.
          </p>
          <Link
            href="/insights?type=articles"
            className="text-sm font-medium text-purple-700 hover:underline"
          >
            Browse Articles/Blogs →
          </Link>
        </div>

        {/* Education Card */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all">
          <div className="flex items-center mb-4">
            <GraduationCap className="text-green-600 w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">Legal Education & Tips</h3>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Empower yourself with simplified legal concepts, practical guides, and useful tools for
            everyday legal awareness.
          </p>
          <Link
            href="/insights?type=education"
            className="text-sm font-medium text-green-700 hover:underline"
          >
            Learn More →
          </Link>
        </div>
      </div>

      {/* <div className="text-center mt-12">
        <Link
          href="/insights"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all"
        >
          View All Insights
        </Link>
      </div> */}
    </section>
  );
}
