import axios from 'axios';
import type { ArticleSummary, ArticleRequest } from '../types/article';
import process from 'process';

const API_BASE_URL = process.env.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleService = {
  // CREATE - Crear nuevo resumen
  create: async (request: ArticleRequest): Promise<ArticleSummary> => {
    const response = await api.post<ArticleSummary>('', request);
    return response.data;
  },

  // READ - Obtener todos los artículos
  getAll: async (): Promise<ArticleSummary[]> => {
    const response = await api.get<ArticleSummary[]>('');
    return response.data;
  },

  // READ - Obtener por ID
  getById: async (id: number): Promise<ArticleSummary> => {
    const response = await api.get<ArticleSummary>(`/${id}`);
    return response.data;
  },

  // READ - Filtrar por estado
  getByStatus: async (status: string): Promise<ArticleSummary[]> => {
    const response = await api.get<ArticleSummary[]>(`/status/${status}`);
    return response.data;
  },

  // READ - Filtrar por idioma
  getByLanguage: async (lang: string): Promise<ArticleSummary[]> => {
    const response = await api.get<ArticleSummary[]>(`/lang/${lang}`);
    return response.data;
  },

  // UPDATE - Actualizar artículo
  update: async (id: number, request: ArticleRequest): Promise<ArticleSummary> => {
    const response = await api.put<ArticleSummary>(`/${id}`, request);
    return response.data;
  },

  // DELETE - Eliminar artículo
  delete: async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
  },
};
