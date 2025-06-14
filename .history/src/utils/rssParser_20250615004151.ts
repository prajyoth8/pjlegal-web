// src/utils/rssParser.ts
import Parser from "rss-parser";

const parser = new Parser();

export async function parseRssFeed(url: string) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map((item) => ({
      title: item.title,
      summary: item.contentSnippet || "",
      url: item.link || "",
      date: item.pubDate,
    }));
  } catch (error) {
    console.error("Failed to parse RSS feed:", error);
    return [];
  }
}
