import axios from 'axios';
import type { ArticleSummary, ArticleRequest } from '../types/article';

// URL base del API - usa la variable de entorno o el proxy local
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://article-extractor-api-38.onrender.com/articles'
  : '/api/articles';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleService = {
  create: async (request: ArticleRequest): Promise<ArticleSummary> => {
    const response = await api.post<ArticleSummary>('', request);
    return response.data;
  },

  getAll: async (): Promise<ArticleSummary[]> => {
    const response = await api.get<ArticleSummary[]>('');
    return response.data;
  },

  getById: async (id: number): Promise<ArticleSummary> => {
    const response = await api.get<ArticleSummary>(`/${id}`);
    return response.data;
  },

  getByStatus: async (status: string): Promise<ArticleSummary[]> => {
    const response = await api.get<ArticleSummary[]>(`/status/${status}`);
    return response.data;
  },

  getByLanguage: async (lang: string): Promise<ArticleSummary[]> => {
    const response = await api.get<ArticleSummary[]>(`/lang/${lang}`);
    return response.data;
  },

  update: async (id: number, request: ArticleRequest): Promise<ArticleSummary> => {
    const response = await api.put<ArticleSummary>(`/${id}`, request);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
  },
};
