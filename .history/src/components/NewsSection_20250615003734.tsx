"use client";

import { articles } from "@/data/articles";
// or: import { fetchNewsFeed } from '@/data/news_feed'; for dynamic version

export default function NewsSection() {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Legal News & Insights
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((item, index) => (
          <a
            href={item.url}
            key={index}
            className="bg-white/70 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="rounded mb-3 w-full h-40 object-cover"
            />
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
