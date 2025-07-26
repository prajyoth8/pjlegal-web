// pages/legal-updates.tsx
import { NewsItem, ArticleItem, BlogItem } from '../types/legalContent';
import NewsCard from '../components/NewsCard';
import ArticleCard from '../components/ArticleCard';
import BlogCard from '../components/BlogCard';

interface LegalUpdatesPageProps {
  news: NewsItem[];
  articles: ArticleItem[];
  blogs: BlogItem[];
}

export default function LegalUpdatesPage({ news, articles, blogs }: LegalUpdatesPageProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item: NewsItem) => (
        <NewsCard key={item.id} item={item} />
      ))}
      
      {articles.map((item: ArticleItem) => (
        <ArticleCard key={item.id} item={item} />
      ))}
      
      {blogs.map((item: BlogItem) => (
        <BlogCard key={item.id} item={item} />
      ))}
    </div>
  );
}