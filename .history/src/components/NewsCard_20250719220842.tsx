// components/NewsCard.jsx
import Link from 'next/link';

export default function NewsCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          src={item.imageUrl || "/legal-news-default.jpg"} 
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <span className="inline-block bg-indigo-600 text-white text-xs px-2 py-1 rounded-md mb-2">
            {item.location.includes('telangana') ? 'Telangana News' : 'India News'}
          </span>
          <h3 className="text-white font-bold text-lg">{item.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{item.source}</span>
          <span className="mx-2">•</span>
          <span>{new Date(item.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.summary}</p>
        <div className="flex justify-between items-center">
          <Link 
            href={`/news/${item.id}`} 
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center group"
          >
            Read Full Story
            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <button className="text-gray-400 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}