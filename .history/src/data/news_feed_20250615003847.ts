// src/data/news_feed.ts
import { ParseRssFeed } from "/utils/rssParser";

export const fetchNewsFeed = async () => {
  const url = "https://www.livelaw.in/rss/news"; // example RSS feed
  const items = await parseRssFeed(url);
  return items.slice(0, 5); // latest 5
};
