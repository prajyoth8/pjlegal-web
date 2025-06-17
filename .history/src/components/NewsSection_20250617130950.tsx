"use client";

import { articles } from "@/data/articles";
import Image from "next/image";

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
            <div className="relative w-full h-40 mb-3 rounded overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
