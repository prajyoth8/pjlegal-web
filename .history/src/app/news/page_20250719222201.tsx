// pages/legal-updates.tsx
import { NewsItem, ArticleItem, BlogItem } from '../../types/legalContent';
import NewsCard from '../../components/NewsCard';
import ArticleCard from '../../components/ArticleCard';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Legal Updates 2025</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stay informed with the latest legal news, analysis, and expert opinions from India and Telangana
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full font-medium ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              All Updates
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 rounded-full font-medium ${activeTab === 'news' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 rounded-full font-medium ${activeTab === 'articles' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2 rounded-full font-medium ${activeTab === 'blogs' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Blogs
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setLocationFilter('india')}
              className={`px-4 py-2 rounded-full font-medium ${locationFilter === 'india' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              All India
            </button>
            <button
              onClick={() => setLocationFilter('telangana')}
              className={`px-4 py-2 rounded-full font-medium ${locationFilter === 'telangana' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Telangana
            </button>
          </div>
        </div>
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'all' || activeTab === 'news') && filteredNews.map(item => (
            <NewsCard key={item.id} item={item} />
          ))}
          
          {(activeTab === 'all' || activeTab === 'articles') && filteredArticles.map(item => (
            <ArticleCard key={item.id} item={item} />
          ))}
          
          {(activeTab === 'all' || activeTab === 'blogs') && filteredBlogs.map(item => (
            <BlogCard key={item.id} item={item} />
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50">
            Load More Updates
          </button>
        </div>
      </div>
    </div>
  );
}