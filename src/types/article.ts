export interface ArticleSummary {
  id?: number;
  url: string;
  summary?: string;
  language: string;
  length: number;
  status: 'pending' | 'generated' | 'failed';
  errorMessage?: string;
  createdAt?: string;
}

export interface ArticleRequest {
  url: string;
  lang: string;
  length: number;
}
