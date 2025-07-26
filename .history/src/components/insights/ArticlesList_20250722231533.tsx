type Article = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  image_url?: string;
  // ... other fields
};

// In your article card component:
{article.image_url && (
  <div className="mb-4 rounded-lg overflow-hidden">
    <img 
      src={article.image_url} 
      alt={article.title}
      className="w-full h-40 object-cover"
    />
  </div>
)}