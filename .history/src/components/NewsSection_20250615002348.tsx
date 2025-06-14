"use client";

export default function NewsSection() {
  return (
    <section className="w-full max-w-6xl px-6 py-10 text-white">
      <h3 className="text-2xl font-semibold mb-6">News & Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-4 rounded-lg shadow-lg">
          <h4 className="font-bold text-lg">🚨 New Alert</h4>
          <p className="text-sm mt-1">
            Latest regulatory changes affecting your business.
          </p>
          <p className="text-xs mt-2">April 24, 2024</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg shadow-lg">
          <h4 className="font-bold text-lg">📘 Article</h4>
          <p className="text-sm mt-1">
            AI in Legal: Opportunities and Challenges Ahead.
          </p>
          <p className="text-xs mt-2">April 19, 2024</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-pink-600 p-4 rounded-lg shadow-lg">
          <h4 className="font-bold text-lg">✍️ Blog Post</h4>
          <p className="text-sm mt-1">
            How Machine Learning is Revolutionizing Legal Practice.
          </p>
          <p className="text-xs mt-2">April 11, 2024</p>
        </div>
      </div>
    </section>
  );
}
