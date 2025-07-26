'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArticleContent from './';

export default function ClientArticlePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/article?id=${id}`)
        .then(res => res.json())
        .then(setArticle);
    }
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return <ArticleContent article={article} />;
}