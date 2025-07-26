import React from "react";

type NewsCardProps = {
  title: string;
  link: string;
  summary: string;
  published: string;
  image?: string;
  source: string;
};

export default function NewsCard({ title, link, summary, published, image, source }: NewsCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-lg shadow hover:shadow-md transition bg-white dark:bg-[#111827] dark:text-white overflow-hidden"
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{summary}</p>
        <div className="text-xs text-gray-500 mt-2 flex justify-between">
          <span>{source}</span>
          <span>{published}</span>
        </div>
      </div>
    </a>
  );
}
