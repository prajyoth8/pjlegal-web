// types/legalContent.ts
export interface LegalContentBase {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string | Date;
  location: ('india' | 'telangana')[];
}

export interface NewsItem extends LegalContentBase {
  source: string;
  imageUrl?: string;
}

export interface ArticleItem extends LegalContentBase {
  author: string;
}

export interface BlogItem extends LegalContentBase {
  author: string;
  authorTitle: string;
}