"use client";
import { useEffect, useState } from "react";

type Material = {
  title: string;
  url: string;
  summary: string;
  published: string;
  category?: string;
};

export default function EducationList() {
  const [resources, setResources] = useState<Material[]>([]);

  useEffect(() => {
    fetch("/api/education")
      .then((res) => res.json())
      .then((data) => setResources(data.resources || []));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Legal Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded border hover:shadow bg-white dark:bg-gray-900 transition"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">{item.summary}</p>
            <div className="mt-2 text-xs text-gray-500">{item.published}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
