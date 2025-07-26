// components/ArticleCard.jsx
import Link from 'next/link';

export default function ArticleCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md mr-2">
            Legal Analysis
          </span>
          <span className="text-xs text-gray-500">
            {new Date(item.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>By {item.author}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
        <div className="flex justify-between items-center">
          <Link 
            href={`/articles/${item.id}`} 
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center group"
          >
            Continue Reading
            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          {item.location.includes('telangana') && (
            <span className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
              Telangana Focus
            </span>
          )}
        </div>
      </div>
    </div>
  );
}