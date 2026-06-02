export interface ArticleRequest {
  url: string;
  lang?: string;
  length?: number;
  targetLanguage?: string;
  summaryLength?: 'short' | 'medium' | 'long';
}

export interface ArticleSummary {
  id: number;
  title: string;
  summary: string;
  url: string;
  originalUrl: string;
  language: string;
  lang?: string;
  length?: number;
  status: 'processing' | 'completed' | 'failed' | 'pending' | 'generated';
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}