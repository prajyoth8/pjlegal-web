// components/BlogCard.tsx
import Link from 'next/link';
import { BlogItem } from '../types/legalContent';

interface BlogCardProps {
  item: BlogItem;
}

export default function BlogCard({ item }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group border-l-4 border-purple-600">
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-md mr-2">
            Expert Opinion
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
        <div className="flex items-start mb-3">
          <div className="mr-3">
            <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-bold">
              {item.author.split(' ').map(name => name[0]).join('')}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{item.author}</p>
            <p className="text-xs text-gray-500">{item.authorTitle}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
        <div className="flex justify-between items-center">
          <Link 
            href={`/blogs/${item.id}`} 
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center group"
          >
            Read Blog
            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <span className="text-xs text-gray-500">
            {Math.ceil(item.content.length / 1000)} min read
          </span>
        </div>
      </div>
    </div>
  );
}